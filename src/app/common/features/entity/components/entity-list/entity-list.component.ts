import { Component, OnInit, OnDestroy, Input } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ModelFactory } from '@miCommon/services/model.factory';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { ConfirmDialogComponent } from '@miCommon/features/confirm-dialog/confirm-dialog.component';
import { BaseModel } from '@miCommon/models/base.model';
import { EntityStateService } from '@miCommon/services/entity-state.service';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { MiTableComponent } from '@miCommon/features/table/table.component';
import { AsyncPipe, JsonPipe, NgIf, TitleCasePipe } from '@angular/common';
import { DataAnalysisComponent } from '@miCommon/features/data-analysis/data-analysis.component';
import { ExcelReaderComponent } from '@miCommon/features/excel-reader/excel-reader.component';
import { Store, select } from '@ngrx/store';
import { entityActions } from '../../store/actions';
import { selectEntities } from '../../store/reducers';
import { LoadingComponent } from '@miCommon/components/loading/loading.component';
import { FirestoreDataService } from '@miCommon/services/firestore.data';

@Component({
  selector: 'mi-entity-list',
  templateUrl: './entity-list.component.html',
  styleUrls: ['./entity-list.component.scss'],
  standalone: true,
  imports: [
    DataAnalysisComponent,
    NgIf,
    MiTableComponent,
    TitleCasePipe,
    MatDialogModule,
    ExcelReaderComponent,
    LoadingComponent,
    JsonPipe,
    AsyncPipe,
  ],
})
export class EntityListComponent implements OnInit, OnDestroy {
  @Input() data: any[] = [];
  @Input() collection!: string;
  model!: BaseModel;
  totalEntities: number = 0;
  @Input() columns: { property: string; label: string }[] = [];
  private routeSub: any;
  collectionName$!: Observable<string | null>;
  newData: any[] = [];
  isLoading: boolean = true;
  startRange: number = 1;
  endRange: number = 45;
  percentage: number | null = 0;
  numberPercentages: { [key: number]: number } = {};
  public numberPercentagesTable: { number: number; percentage: number }[] = [];
  lastDocument: any = null;
  @Input() totalColumns: string[] = [];
  data$: Observable<any>;

  constructor(
    public entityStateService: EntityStateService,
    private route: ActivatedRoute,
    private router: Router,
    private modelFactory: ModelFactory,
    private dialog: MatDialog,
    private store: Store,
    private firestoreDataService: FirestoreDataService
  ) {}

  ngOnInit(): void {
    this.routeSub = this.route.paramMap.subscribe((params) => {
      this.collection = params.get('collection') ?? this.collection ?? 'people'; // Provide a default value
      this.store.dispatch(
        entityActions.getEntities({
          url: `${this.collection}`,
        })
      );
      this.modelFactory.createModel(this.collection).then((model) => {
        this.model = model;

        this.entityStateService.setCurrentModel(model);

        this.model.collectionName = this.collection;
        this.data$ = this.store.pipe(select(selectEntities));
        this.loadEntities();
        this.collectionName$ = this.entityStateService
          .getCurrentModel()
          .pipe(map((model) => model?.collectionName ?? null));
      });
    });
  }

  private loadEntities(loadMore: boolean = false): void {
    this.data$.subscribe((entities) => {
      this.data = loadMore ? this.data.concat(entities) : entities;
      this.totalEntities = this.data?.length || 0;

      if (entities?.length > 0) {
        this.lastDocument = this.data[this.data.length - 1];
        if (
          !this.model.listProperties ||
          this.model.listProperties.length === 0
        ) {
          this.addPropertiesToModel(this.data[0]);
          this.columns = this.model.getDisplayNames();
        } else {
          this.columns = this.model.getDisplayNames();
        }
      }

      this.isLoading = false;
    });
  }

  onLoadMoreClick(): void {
    this.loadEntities(true);
  }

  private addPropertiesToModel(record: any): void {
    class DynamicModel extends BaseModel {
      constructor() {
        super();
        this.listProperties = Object.keys(record);
        this.listProperties = this.listProperties.filter(
          (item) => item !== 'Date'
        );
        this.createFormConfiguration(this.listProperties);
      }
    }

    for (const property in record) {
      if (record.hasOwnProperty(property)) {
        Object.defineProperty(DynamicModel.prototype, property, {
          value: record[property],
          enumerable: true,
          configurable: true,
          writable: true,
        });
      }
    }

    this.model = new DynamicModel();
  }

  ngOnDestroy(): void {
    if (this.routeSub) {
      this.routeSub.unsubscribe();
    }
  }

  getEntityProperty(entity: any, columnName: string): any {
    const propertyName = columnName.replace(/ /g, '');
    const propertyValue =
      entity[propertyName.charAt(0).toLowerCase() + propertyName.slice(1)];
    return propertyValue !== undefined ? propertyValue : '-';
  }

  getDisplayedColumnProperties(): string[] {
    return this.columns.map((column) => column.property);
  }

  deleteEntity(id: string, event: Event): void {
    event.stopPropagation(); // Prevent row click event from triggering navigation to details view
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      width: '80vw', // 80% of viewport width
      maxWidth: '800px', // Max-width of the dialog
      data: {
        title: 'Delete Entity',
        content: 'Are you sure you want to delete this entity?',
        actionLabel: 'Delete',
      },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        if (this.model.collectionName === 'dynamic_models') {
          const firstSegment = this.router.url.split('/')[1];
          this.model.collectionName = firstSegment;
        }
        // this.entityService.deleteEntity(this.model.collectionName, id);
      }
    });
  }

  async onDataChanged(updatedEntities: any[]): Promise<void> {
    // Hack because wfdtranslations is not a dynamic_models
    // The model factory is not bringing back the correct model
    if (this.model.collectionName === 'dynamic_models') {
      const firstSegment = this.router.url.split('/')[1];
      this.model.collectionName = firstSegment;
    }
    for (const entity of updatedEntities) {
      try {
        // await this.entityService.updateEntity(
        //   this.model.collectionName,
        //   entity
        // );
      } catch (error) {
        error = `Failed to update entity with id ${entity.id}: ${error}`;
        throw error;
      }
    }
  }

  addNewRecord() {
    const newId = 'new';
    this.navigateToDetails(newId);
  }

  bulkUpload() {
    this.router.navigate([`/excel-upload`]);
  }

  deleteAll() {
    console.log('delete all', this.model.collectionName);
    this.firestoreDataService.deleteAllRecords(this.model.collectionName);
  }

  navigateToDetails(id: string) {
    this.router.navigate([`/${this.model.collectionName}/details`, id]);
  }

  hasData(): boolean {
    return !this.isLoading && this.data.length > 0;
  }
}
