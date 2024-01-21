import { Component, ViewChild, AfterViewInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable, Subscription } from 'rxjs';
import { selectTutorPreferences } from '../course-schedule/store/tutor-preferences/reducers';
import { tutorPreferencesActions } from '../course-schedule/store/tutor-preferences/actions';
import { AllocationService } from '@miApp/components/course-schedule-allocations/services/allocation.service';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { CommonModule } from '@angular/common';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';

@Component({
  selector: 'mi-course-schedule-allocations',
  standalone: true,
  imports: [
    CommonModule,
    MatTableModule,
    MatSortModule,
    MatInputModule,
    MatFormFieldModule,
  ],
  templateUrl: './course-schedule-allocations.component.html',
  styleUrls: ['./course-schedule-allocations.component.scss'],
})
export class CourseScheduleAllocationsComponent implements AfterViewInit {
  tutorpreferences$: Observable<any[]>;
  tutorPreferencesSubscription: Subscription;
  dataSource: MatTableDataSource<any>;
  displayedColumns: string[] = ['userId', 'classCode', 'priority']; // Adjust columns as needed

  @ViewChild(MatSort) sort: MatSort;

  constructor(
    private store: Store,
    private allocationsService: AllocationService
  ) {}

  ngOnInit() {
    this.store.dispatch(
      tutorPreferencesActions.getTutorPreferences({ url: 'tutorpreferences' })
    );
    this.tutorpreferences$ = this.store.select(selectTutorPreferences);

    this.tutorPreferencesSubscription = this.tutorpreferences$.subscribe(
      (tutorPreferences) => {
        if (tutorPreferences && tutorPreferences.length > 0) {
          const allocations =
            this.allocationsService.processAllocations(tutorPreferences);
          this.dataSource = new MatTableDataSource(allocations);
        }
      }
    );
  }

  ngAfterViewInit() {
    this.dataSource.sort = this.sort;
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  ngOnDestroy() {
    if (this.tutorPreferencesSubscription) {
      this.tutorPreferencesSubscription.unsubscribe();
    }
  }
}
