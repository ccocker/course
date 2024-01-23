import { Component, ViewChild, AfterViewInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable, Subscription, combineLatest } from 'rxjs';
import { selectTutorPreferences } from '../course-schedule/store/tutor-preferences/reducers';
import { tutorPreferencesActions } from '../course-schedule/store/tutor-preferences/actions';
import { AllocationService } from '@miApp/components/course-schedule-allocations/services/allocation.service';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { CommonModule } from '@angular/common';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { courseScheduleActions } from '../course-schedule/store/course-schedules/actions';
import { selectEntities } from '../course-schedule/store/course-schedules/reducers';
import { entityActions as peopleActions } from '@miCommon/features/entity/store/actions';
import { selectEntities as selectPeopleEntities } from '@miCommon/features/entity/store/reducers';
import { MatExpansionModule } from '@angular/material/expansion'; // Import for expansion module
import { FirestoreDataService } from '@src/src/app/miCommon/services/firestore.data';

@Component({
  selector: 'mi-course-schedule-allocations',
  standalone: true,
  imports: [
    CommonModule,
    MatExpansionModule,
    MatTableModule,
    MatSortModule,
    MatInputModule,
    MatFormFieldModule,
  ],
  templateUrl: './course-schedule-allocations.component.html',
  styleUrls: ['./course-schedule-allocations.component.scss'],
})
export class CourseScheduleAllocationsComponent implements AfterViewInit {
  courseSchedule$: Observable<any[]>;
  tutorpreferences$: Observable<any[]>;
  people$: Observable<any[]>;
  courseScheduleSubscription: Subscription;
  tutorPreferencesSubscription: Subscription;
  dataSource: MatTableDataSource<any>;
  dataSource1: MatTableDataSource<any>;
  displayedColumns: string[] = ['userId', 'classCode', 'priority']; // Adjust columns as needed
  displayedColumns1: string[] = ['classCode', 'tutors'];
  @ViewChild(MatSort) sort: MatSort;

  constructor(
    private store: Store,
    private allocationsService: AllocationService,
    private firestoreDataService: FirestoreDataService
  ) {}

  ngOnInit() {
    this.store.dispatch(
      tutorPreferencesActions.getTutorPreferences({ url: 'tutorpreferences' })
    );
    this.store.dispatch(
      courseScheduleActions.getCourseSchedules({ url: 'course-schedules' })
    );
    this.store.dispatch(
      tutorPreferencesActions.getTutorPreferences({ url: 'tutorpreferences' })
    );

    this.store.dispatch(peopleActions.getEntities({ url: 'people' })); // Corrected this line

    this.tutorpreferences$ = this.store.select(selectTutorPreferences);
    this.courseSchedule$ = this.store.select(selectEntities); // Corrected this line
    this.people$ = this.store.select(selectPeopleEntities); // Corrected this line
    this.tutorPreferencesSubscription = combineLatest([
      this.tutorpreferences$,
      this.courseSchedule$,
      this.people$,
    ]).subscribe(([tutorPreferences, courseSchedule, people]) => {
      if (tutorPreferences && tutorPreferences.length > 0) {
        const allocations = this.allocationsService.processAllocations(
          tutorPreferences,
          courseSchedule
        );
        this.dataSource = new MatTableDataSource(allocations);
        this.updateCourseSchedules(allocations, courseSchedule, people);
      }
    });
  }

  ngAfterViewInit() {
    // this.dataSource.sort = this.sort;
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  updateCourseSchedules(allocations, courseSchedules, people) {
    console.log('Allocations: ', allocations);

    // Create a map for quick access to people's details by email
    const peopleMap = new Map(
      people.map((person) => [person.userDetail.userEmail, person])
    );
    console.log('People Map: ', peopleMap);

    // Create a new array with updated course schedules
    const updatedCourseSchedules = courseSchedules.map((schedule) => {
      // Create a shallow copy of the schedule
      const scheduleCopy = { ...schedule };

      // Use a Set to collect unique tutor names
      const tutorSet = new Set();

      allocations.forEach((a) => {
        // Match allocation to the current course schedule
        if (a.classCode === scheduleCopy.id) {
          const tutor = peopleMap.get(a.userId);
          if (tutor) {
            const tutorName = `${tutor['firstName']} ${tutor['lastName']}`;
            tutorSet.add(tutorName);
          } else {
            // console.log(`No tutor found for userId: ${a.userId}`);
          }
        }
      });

      // Convert Set to Array
      scheduleCopy.tutors = Array.from(tutorSet);

      return scheduleCopy;
    });

    // Log updated course schedules if needed
    console.log('Updated Course Schedules: ', updatedCourseSchedules);
    this.bulkUpload(updatedCourseSchedules);

    const simplifiedCourseSchedules = updatedCourseSchedules.map(
      (schedule) => ({
        classCode: schedule.id,
        tutors: schedule.tutors,
      })
    );

    console.log('Simplified Course Schedules: ', simplifiedCourseSchedules);

    this.dataSource1 = new MatTableDataSource(simplifiedCourseSchedules);
    return updatedCourseSchedules; // Return the new array
  }

  bulkUpload(data: any) {
    data.forEach((data) => {
      data.description =
        data['offeringGroupCode'] +
        '-' +
        data['groupNumber'] +
        '-' +
        data['classNumber'] +
        '-' +
        data['roomCode'] +
        '-' +
        data['leadName'] +
        '-' +
        data['tutors'];
    });
    this.firestoreDataService.uploadBulkData('course-schedules', data, true);
  }

  ngOnDestroy() {
    if (this.tutorPreferencesSubscription) {
      this.tutorPreferencesSubscription.unsubscribe();
    }
  }
}
