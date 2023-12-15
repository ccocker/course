import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import {
  Location,
  NgIf,
  NgFor,
  NgSwitch,
  NgSwitchCase,
  NgSwitchDefault,
  AsyncPipe,
  JsonPipe,
} from '@angular/common';
import { FirestoreDataService } from '@miCommon/services/firestore.data';
import { BehaviorSubject, Observable, combineLatest, from, of } from 'rxjs';
import { ModelFactory } from '@miCommon/services/model.factory';
import { switchMap, tap, catchError } from 'rxjs/operators';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatRippleModule } from '@angular/material/core';

import { DynamicFormComponent } from '@miCommon/components/dynamic-form/dynamic-form.component';

@Component({
  selector: 'mi-entity-details',
  templateUrl: './entity-details.component.html',
  styleUrls: ['./entity-details.component.scss'],
  standalone: true,
  imports: [
    NgIf,
    MatIconModule,
    MatButtonModule,
    MatFormFieldModule,
    MatRippleModule,
    MatToolbarModule,
    FormsModule,
    ReactiveFormsModule,
    NgFor,
    NgSwitch,
    NgSwitchCase,
    MatInputModule,
    NgSwitchDefault,
    AsyncPipe,
    JsonPipe,
    DynamicFormComponent,
  ],
})
export class EntityDetailsComponent implements OnInit {
  entity$!: Observable<any | undefined>;
  collection!: string;
  id!: string | null;
  formGroup!: FormGroup;
  error!: any;
  types!: { [key: string]: string };

  model: any;
  formConfiguration$: BehaviorSubject<any> = new BehaviorSubject(null);
  formData$: BehaviorSubject<any> = new BehaviorSubject(null);

  public formGroupData: any;
  constructor(
    private entityService: FirestoreDataService,
    private route: ActivatedRoute,
    private location: Location,
    private modelFactory: ModelFactory
  ) {}

  ngOnInit(): void {
    this.id = this.route.snapshot.paramMap.get('id');

    this.route.paramMap.subscribe((params) => {
      this.collection = params.get('collection') ?? 'people';

      this.id = params.get('id') ?? '';

      this.entity$ = combineLatest([
        this.entityService.getEntity(this.collection, this.id),
        from(this.modelFactory.createModel(this.collection)),
      ]).pipe(
        switchMap(([data, model]) => {
          if (this.id === 'new') {
            data = model;
          }
          this.formData$.next(data);

          if (data?.id === undefined || data?.id === null || data?.id === '') {
            data!.id = this.id!;
          }
          Object.assign(model, { ...data, id: this.id });
          this.model = model;
          this.formConfiguration$.next(model.formConfiguration); // assuming formConfiguration is a field in your model

          return of(data);
        }),
        catchError((err) => {
          console.log('An error occurred:', err);
          this.error = err;
          return of(undefined);
        })
      );
    });

    this.entity$.subscribe();
  }

  /**
   * Creates a model and form based on the received data.
   * @param data - The received data.
   * @returns Observable
   */
  createModelAndForm(data: any): Observable<any> {
    return from(this.modelFactory.createModel(this.collection)).pipe(
      tap((model) => {
        // Assign data from Firestore
        Object.assign(model, {
          ...data,
          id: this.id,
        });

        this.model = model;
      })
    );
  }

  async onSubmit(formData: any) {
    const updatedEntity = formData;
    if (updatedEntity.id === 'new') {
      const newId = this.entityService.getNewFirestoreId();
      updatedEntity.id = newId;
      this.addNewEntity(updatedEntity);
    }

    try {
      await this.entityService.updateEntity(this.collection, updatedEntity);
      this.goBack();
    } catch (error) {
      // Update failed - handle the error as needed.
    }
  }

  async addNewEntity(newEntity: any) {
    try {
      await this.entityService.createEntity(this.collection, newEntity);
      this.goBack();
    } catch (error) {
      // Update failed - handle the error as needed.
    }
  }

  goBack() {
    this.location.back();
  }

  uploadBackground(backgroundFiles: FileList) {
    const backgroundFile = backgroundFiles[0];
  }

  removeBackground() {}

  delete() {}
}
