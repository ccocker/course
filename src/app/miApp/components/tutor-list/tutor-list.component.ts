import { Component, ViewChild, AfterViewInit } from '@angular/core'
import { Store } from '@ngrx/store'
import { Observable, Subscription, combineLatest } from 'rxjs'
import { selectTutorPreferences } from '../course-schedule/store/tutor-preferences/reducers'
import { tutorPreferencesActions } from '../course-schedule/store/tutor-preferences/actions'
import { AllocationService } from './services/tutor-list.service'
import { MatTableDataSource, MatTableModule } from '@angular/material/table'
import { MatSort, MatSortModule } from '@angular/material/sort'
import { CommonModule } from '@angular/common'
import { MatInputModule } from '@angular/material/input'
import { MatFormFieldModule } from '@angular/material/form-field'
import { courseScheduleActions } from '../course-schedule/store/course-schedules/actions'
import { selectEntities } from '../course-schedule/store/course-schedules/reducers'
import { entityActions as peopleActions } from '@miCommon/features/entity/store/actions'
import { selectEntities as selectPeopleEntities } from '@miCommon/features/entity/store/reducers'
import { MatExpansionModule } from '@angular/material/expansion' // Import for expansion module
import { FirestoreDataService } from '@miCommon/services/firestore.data'
import { map, filter } from 'rxjs/operators'
import { selectCurrentUser } from '@miCommon/features/auth/store/reducers'

@Component({
  selector: 'mi-tutor-list',
  standalone: true,
  imports: [
    CommonModule,
    MatExpansionModule,
    MatTableModule,
    MatSortModule,
    MatInputModule,
    MatFormFieldModule,
  ],
  templateUrl: './tutor-list.component.html',
  styleUrls: ['./tutor-list.component.scss'],
})
export class TutorListComponent implements AfterViewInit {
  courseSchedule$: Observable<any[]>
  tutorpreferences$: Observable<any[]>
  people$: Observable<any[]>
  courseScheduleSubscription: Subscription
  tutorPreferencesSubscription: Subscription
  dataSource: MatTableDataSource<any>
  dataSource1: MatTableDataSource<any>
  displayedColumns: string[] = ['userId'] // Adjust columns as needed
  displayedColumns1: string[] = ['classCode', 'tutors']
  @ViewChild(MatSort) sort: MatSort

  currentUser$: Observable<any> // Assuming "any" is the type of your user, adjust as needed
  currentUser: any // Adjust the type as needed
  public filterValue: string = ''

  constructor(
    private store: Store,
    private allocationsService: AllocationService,
    private firestoreDataService: FirestoreDataService,
  ) {
    this.currentUser$ = this.store.select(selectCurrentUser) // Ensure you have a selector for the current user
  }

  ngOnInit() {
    this.currentUser$.subscribe((user) => {
      this.currentUser = user
      this.initializeData()
    })
    this.store.dispatch(
      tutorPreferencesActions.getTutorPreferences({ url: 'tutorpreferences' }),
    )
    this.store.dispatch(
      courseScheduleActions.getCourseSchedules({ url: 'course-schedules' }),
    )
    this.store.dispatch(
      tutorPreferencesActions.getTutorPreferences({ url: 'tutorpreferences' }),
    )

    this.store.dispatch(peopleActions.getEntities({ url: 'people' })) // Corrected this line

    this.tutorpreferences$ = this.store.select(selectTutorPreferences)
    this.courseSchedule$ = this.store.select(selectEntities) // Corrected this line
    this.people$ = this.store.select(selectPeopleEntities) // Corrected this line
    this.tutorPreferencesSubscription = combineLatest([
      this.tutorpreferences$,
      this.courseSchedule$,
      this.people$,
    ]).subscribe(([tutorPreferences, courseSchedule, people]) => {
      if (tutorPreferences && tutorPreferences.length > 0) {
        const allocations = this.allocationsService.processAllocations(
          tutorPreferences,
          courseSchedule,
        )
        this.dataSource = new MatTableDataSource(allocations)
        if (this.currentUser?.displayName === 'Julie Porteous') {
          this.filterValue = 'BC2'
          this.filterEmailsForBC2('BC2')
        }
        if (this.currentUser?.displayName === 'Edouard Amouroux') {
          this.filterValue = 'BC1'
          this.filterEmailsForBC2('BC1')
        }
        console.log('Filtered', this.dataSource.data)
        console.log()
        /*
           const henry = new Set(
          this.dataSource.data
            .filter((item) => item.classCode.includes('BC2'))
            .map((item) => item.userId), // Assuming each item has an email field
        )

        console.log('henry', henry)
        let henryArray = [...henry]
        this.dataSource.data = henryArray

        //    this.applyFilter({ target: { value: '' } } as any) // Apply the filter to the dataSource

        // this.updateCourseSchedules(allocations, courseSchedule, people);
        */
      }
    })
  }

  filterEmailsForBC2(course: string) {
    const emailsForBC2 = new Set(
      this.dataSource.data
        .filter((item) => item.classCode && item.classCode.includes(course))
        .map((item) => item.userId),
    )
    this.dataSource.data = Array.from(emailsForBC2)
  }

  transformDataSource(): void {
    const userIdsSet = new Set()
    const filteredData = this.dataSource.data.filter((item) => {
      if (!userIdsSet.has(item.userId)) {
        userIdsSet.add(item.userId)
      }
      return true
    })

    // Now, filteredData contains the desired array with unique userIds

    // Update dataSource.data with the filtered array
    const henry = new Set(filteredData.map((item) => item.userId))
    let henryArray = [...henry]

    this.dataSource.data = henryArray
  }

  initializeData() {
    // Dispatch actions to fetch tutor preferences, course schedules, and people only if currentUser is defined
    if (this.currentUser) {
      this.store.dispatch(
        tutorPreferencesActions.getTutorPreferences({
          url: 'tutorpreferences',
        }),
      )
      this.store.dispatch(
        courseScheduleActions.getCourseSchedules({ url: 'course-schedules' }),
      )
      this.store.dispatch(peopleActions.getEntities({ url: 'people' }))

      // Now, with the currentUser, you can filter the courses and tutors accordingly
      this.setupFilteredTutors()
    }
  }

  ngAfterViewInit() {
    // this.dataSource.sort = this.sort;
  }

  applyFilter(value: string) {
    console.log('Event', value)
    this.dataSource.filter = value.trim().toLowerCase() // This sets the filter string

    // Now, to create a Set of userIds based on a condition, filter the dataSource's data array instead
    // const filteredData = this.dataSource.data.filter((item) =>
    // item.yourStringProperty.toLowerCase().includes(this.dataSource.filter),
    //)
    // const userIdSet = new Set(filteredData.map((item) => item.userId))
    // console.log(userIdSet)
  }

  // updateCourseSchedules(allocations, courseSchedules, people) {
  //   // Create a map for quick access to people's details by email
  //   const peopleMap = new Map(
  //     people.map((person) => [person.userDetail.userEmail, person])
  //   );

  //   // Create a new array with updated course schedules
  //   const updatedCourseSchedules = courseSchedules.map((schedule) => {
  //     // Create a shallow copy of the schedule
  //     const scheduleCopy = { ...schedule };

  //     // Use a Set to collect unique tutor names
  //     const tutorSet = new Set();

  //     allocations.forEach((a) => {
  //       // Match allocation to the current course schedule
  //       if (a.classCode === scheduleCopy.id) {
  //         const tutor = peopleMap.get(a.userId);
  //         if (tutor) {
  //           const tutorName = `${tutor['firstName']} ${tutor['lastName']}`;
  //           tutorSet.add(tutorName);
  //         } else {
  //         }
  //       }
  //     });

  //     // Convert Set to Array
  //     scheduleCopy.tutors = Array.from(tutorSet);

  //     return scheduleCopy;
  //   });

  //   // Log updated course schedules if needed

  //   this.bulkUpload(updatedCourseSchedules);

  //   const simplifiedCourseSchedules = updatedCourseSchedules.map(
  //     (schedule) => ({
  //       classCode: schedule.id,
  //       tutors: schedule.tutors,
  //     })
  //   );

  //   this.dataSource1 = new MatTableDataSource(simplifiedCourseSchedules);
  //   return updatedCourseSchedules; // Return the new array
  // }

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
        data['tutors']
    })
    this.firestoreDataService.uploadBulkData('course-schedules', data, true)
  }

  setupFilteredTutors() {
    // Combine latest data streams: tutor preferences, course schedules, and people
    this.tutorPreferencesSubscription = combineLatest([
      this.tutorpreferences$,
      this.courseSchedule$,
      this.people$,
    ])
      .pipe(
        map(([tutorPreferences, courseSchedule, people]) => {
          // Filter logic here: Use this.currentUser to filter courseSchedule and tutorPreferences
          // Example:
          const myCourses = courseSchedule.filter(
            (c) => c.leadId === this.currentUser.id,
          )
          const tutorIds = new Set(myCourses.map((c) => c.tutorId))
          const tutors = people.filter((p) => tutorIds.has(p.id))
          return { tutors, myCourses } // Adjust according to your data structure
        }),
      )
      .subscribe(({ tutors, myCourses }) => {
        // Use this data to set your dataSource or any other properties you need for display
      })
  }

  ngOnDestroy() {
    if (this.tutorPreferencesSubscription) {
      this.tutorPreferencesSubscription.unsubscribe()
    }
    if (this.tutorPreferencesSubscription) {
      this.tutorPreferencesSubscription.unsubscribe()
    }
  }
}
