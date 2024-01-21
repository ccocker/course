import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable, Subscription } from 'rxjs';
import { selectTutorPreferences } from '../course-schedule/store/tutor-preferences/reducers';
import { entityActions } from '@src/src/app/miCommon/features/entity/store/actions';
import { CommonModule } from '@angular/common';
import { tutorPreferencesActions } from '../course-schedule/store/tutor-preferences/actions';
import { AllocationService } from '@miApp/components/course-schedule-allocations/services/allocation.service';

@Component({
  selector: 'mi-course-schedule-allocations',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './course-schedule-allocations.component.html',
  styleUrl: './course-schedule-allocations.component.scss',
})
export class CourseScheduleAllocationsComponent {
  tutorpreferences$: Observable<any[]>;
  tutorPreferencesSubscription: Subscription;
  allocations: any[];

  constructor(
    private store: Store,
    private allocationsService: AllocationService
  ) {}

  ngOnInit() {
    this.store.dispatch(
      tutorPreferencesActions.getTutorPreferences({ url: 'tutorpreferences' })
    );
    this.tutorpreferences$ = this.store.select(selectTutorPreferences);

    // Subscribe to the tutor preferences observable
    this.tutorPreferencesSubscription = this.tutorpreferences$.subscribe(
      (tutorPreferences) => {
        console.log('tutorPreferences', tutorPreferences);
        if (tutorPreferences && tutorPreferences.length > 0) {
          this.allocations =
            this.allocationsService.processAllocations(tutorPreferences);
          console.log(
            'Allocations considering time conflicts:',
            this.allocations
          );
        } else {
          console.log('No tutor preferences found');
        }
      }
    );
  }

  ngOnDestroy() {
    // Unsubscribe to avoid memory leaks
    if (this.tutorPreferencesSubscription) {
      this.tutorPreferencesSubscription.unsubscribe();
    }
  }
}
