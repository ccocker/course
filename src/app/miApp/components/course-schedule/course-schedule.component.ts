import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
// import { ScheduleService } from './services/schedule.service';

import {
  DayOfWeek,
  ICourse,
  IScheduleEvent,
} from './interfaces/schedule.interface';
import { Store } from '@ngrx/store';
import { Observable, combineLatest, map, startWith } from 'rxjs';
import { selectCurrentUser } from '@miCommon/features/auth/store/reducers';
import { Subscription } from 'rxjs';
import { IPerson } from '@miCommon/interfaces';
import { DynamicFormComponent } from '@miCommon/features/dynamic-form/dynamic-form.component';
import { courseScheduleActions } from './store/course-schedules/actions';
import { tutorPreferencesActions } from './store/tutor-preferences/actions';
import { selectEntities as selectEventsEntities } from './store/course-schedules/reducers';
import { selectEntities as selectPeopleEntities } from '@miCommon/features/entity/store/reducers';
import { CalendarComponent } from '@miCommon/features/calendar/calendar.component';
import { selectTutorPreferences } from './store/tutor-preferences/reducers';
import { courseScheduleFeatureKey } from './store/course-schedules/reducers';
import { events } from './data/events.data';
import { courses } from './data/courses.data';
// import { offering } from './data/offering.data';
// import { offeringGroups } from './data/offering-group.data';
// import { rooms } from './data/rooms.data';
// import { groupClasses } from './data/group-classes.data';
import { LoadingComponent } from '@src/src/app/miCommon/components/loading/loading.component';
import { FirestoreDataService } from '@miCommon/services/firestore.data';

@Component({
  selector: 'mi-course-schedule',
  standalone: true,
  imports: [
    CommonModule,
    DynamicFormComponent,
    CalendarComponent,
    LoadingComponent,
  ],
  templateUrl: './course-schedule.component.html',
  styleUrl: './course-schedule.component.scss',
})
export class CourseScheduleComponent implements OnInit, OnDestroy {
  customStartDate: Date;
  private dataSubscription: Subscription;
  DayOfWeek = DayOfWeek;
  private earliestStartTime: Date;
  showOnlyUnderstaffed: boolean = false;
  weekdays: string[] = [];
  schedule: IScheduleEvent[];
  filteredStaffList: IPerson[] = []; // Filtered list for display in the dropdown
  tutorPreferences: Array<{
    userId: string;
    id: string;
    classCode: string;
    priority: string;
  }> = [];
  tutorPreferencesMap = new Map();
  timeSlots: { startTime: string; endTime: string }[] = [];
  headerColumns: Record<string, { start: number; span: number }> = {};
  coursesList: ICourse[] = [];
  selectedCourses: string[] = [];
  staffList: IPerson[] = [];
  selectedStaff: string[] = [];

  currentUser: any;
  groupColours: { [key: string]: { [shade: string]: string } } = {};
  /**
  groupColours = {
    BC1: {
      G1: '#FFF2E6',
      G2: '#FFDFCC',
      G3: '#FFCCB3',
      G4: '#FFB899',
      G5: '#FFA380',
      G6: '#FF8F66',
      G7: '#FF7A4D',
    },
    BC2: {
      G1: '#c8e6c9',
      G2: '#e9f5db',
    },
    WBC: {
      G1: '#e6f0ff',
      G2: '#cce0ff',
    },
  }
*/
  data$ = combineLatest({
    currentUser: this.store.select(selectCurrentUser),
    people: this.store.select(selectPeopleEntities),
    tutorpreferences: this.store.select(selectTutorPreferences),
  });
  collection!: string;
  selectedEvent: any | null = null;
  people$: Observable<any>;
  events$: Observable<any>;
  // groupClasses = groupClasses;
  courses = courses;
  // offering = offering;
  // offeringGroups = offeringGroups;
  events = events;
  // rooms = rooms;

  constructor(
    // public scheduleService: ScheduleService,
    private store: Store,
    private firestoreDataService: FirestoreDataService
  ) {
    this.customStartDate = new Date(2024, 2, 4);
  }

  ngOnInit() {
    this.events.forEach((event) => {
      event.id =
        event['offeringGroupCode'] +
        '-' +
        event['groupNumber'] +
        '-' +
        event['classNumber'];
      event.description =
        event['offeringGroupCode'] +
        '-' +
        event['groupNumber'] +
        '-' +
        event['classNumber'] +
        '-' +
        event['roomCode'] +
        '-' +
        event['leadName'] +
        '-' +
        event['tutors'];
    });

    this.collection = 'course-schedules';

    this.store.dispatch(
      tutorPreferencesActions.getTutorPreferences({ url: 'tutorpreferences' })
    );
    this.store.dispatch(
      courseScheduleActions.getCourseSchedules({ url: 'course-schedules' })
    );

    this.people$ = this.store.select(selectPeopleEntities);
    this.events$ = this.store.select(selectEventsEntities);

    this.filteredStaffList = this.staffList;
    // this.schedule = this.scheduleService.getSchedule();

    this.determineEarliestStartTime();

    this.assignColumnsToEvents();
    this.assignRowsToEvents();
    this.generateTimeSlots();
    this.calculateHeaderColumns();
    this.weekdays.push(DayOfWeek.Monday);
    this.weekdays.push(DayOfWeek.Tuesday);
    this.weekdays.push(DayOfWeek.Wednesday);
    this.weekdays.push(DayOfWeek.Thursday);
    this.weekdays.push(DayOfWeek.Friday);

    // this.groupColours = this.scheduleService.generateColorShades();
  }

  ngAfterViewInit() {
    this.dataSubscription = this.data$.subscribe((data) => {
      this.currentUser = data.currentUser;
      // this.coursesList = this.scheduleService.getAllCourses();
      this.selectedCourses = this.coursesList.map((course) => course.code);

      // Get the complete staff list
      // const completeStaffList = this.scheduleService.getStaff();

      // Check if the current user is in the staff list
      // const currentUserStaffRecord = completeStaffList.find(
      //   (staff) => staff.emails[1].address === data.currentUser?.email
      // );

      // If the current user is a staff member, filter the list; otherwise, use the complete list
      // this.staffList = currentUserStaffRecord
      //   ? [currentUserStaffRecord]
      //   : completeStaffList;

      // Map the selected staff depending on the filtered staff list
      this.selectedStaff = this.staffList.map((staff) => staff.miId);
      if (data.tutorpreferences) {
        this.tutorPreferences = data.tutorpreferences;

        this.processTutorPreferences(data.tutorpreferences, this.currentUser);
      }
    });
  }

  processTutorPreferences(tutorPreferences, currentUser) {
    const filteredPreferences = tutorPreferences.filter(
      (p) => p?.userId === currentUser?.email
    );

    filteredPreferences.forEach((preference) => {
      this.tutorPreferencesMap.set(preference.classCode, preference.priority);
    });
  }

  buildClassCode(event) {
    return (
      event['offeringGroupCode'] +
      '-' +
      event['groupNumber'] +
      '-' +
      event['classNumber']
    );
  }

  toggleUnderstaffedFilter() {
    this.showOnlyUnderstaffed = !this.showOnlyUnderstaffed;
  }

  private determineEarliestStartTime() {
    let earliestTime = new Date(0, 0, 0, 23, 59); // Initialize to latest possible time
    this.schedule.forEach((event) => {
      const eventStartTime = new Date(
        0,
        0,
        0,
        ...event.class.timeslot.startTime.split(':').map(Number)
      );
      if (eventStartTime < earliestTime) {
        earliestTime = eventStartTime;
      }
    });
    this.earliestStartTime = earliestTime;
  }

  sortEventsByDayAndTime(schedule: IScheduleEvent[]): IScheduleEvent[] {
    // Define the order of the days
    const daysOrder = [
      DayOfWeek.Monday,
      DayOfWeek.Tuesday,
      DayOfWeek.Wednesday,
      DayOfWeek.Thursday,
      DayOfWeek.Friday,
    ];

    return schedule.sort((a, b) => {
      // Compare the index of the days in the daysOrder array
      const dayIndexA = daysOrder.indexOf(a.class.day);
      const dayIndexB = daysOrder.indexOf(b.class.day);

      if (dayIndexA !== dayIndexB) {
        return dayIndexA - dayIndexB; // Sort by the index of the day
      }

      // If the days are the same, compare the start times
      const startA = this.convertTimeToMinutes(a.class.timeslot.startTime);
      const startB = this.convertTimeToMinutes(b.class.timeslot.startTime); // Corrected to compare start times
      return startA - startB; // Sort by start time if the days are the same
    });
  }

  assignColumnsToEvents() {
    // Sort events by day and start time to compare overlapping times
    const sortedSchedule = this.sortEventsByDayAndTime(this.schedule);
    let currentColumn = 2;
    let maxDailyColumn = 1;
    let currentDay = sortedSchedule[0].class.day;
    // Keep track of the last end time for each column to check for overlaps
    const lastEndTimeByColumn: Record<string, Record<number, number>> = {};

    sortedSchedule.forEach((event, index) => {
      const currentEventDay = event.class.day;

      const currentEventStart = this.convertTimeToMinutes(
        event.class.timeslot.startTime
      );
      const currentEventEnd = this.convertTimeToMinutes(
        event.class.timeslot.endTime
      );

      // Initialize tracking for the new day
      if (!lastEndTimeByColumn[currentEventDay]) {
        lastEndTimeByColumn[currentEventDay] = {};
      }

      if (currentDay !== currentEventDay) {
        currentDay = currentEventDay;
        currentColumn = maxDailyColumn + 1;
        maxDailyColumn = currentColumn;
      } else if (index > 0) {
        // Find a column where the event does not overlap with the previous ones
        const availableColumn = Object.keys(
          lastEndTimeByColumn[currentEventDay]
        ).find(
          (column) =>
            lastEndTimeByColumn[currentEventDay][column] <= currentEventStart
        );

        if (availableColumn) {
          // If an available column is found, use it
          currentColumn = parseInt(availableColumn);
        } else {
          // Otherwise, increment the column
          currentColumn = maxDailyColumn + 1;
        }
      }

      maxDailyColumn = Math.max(maxDailyColumn, currentColumn);
      lastEndTimeByColumn[currentEventDay][currentColumn] = currentEventEnd;

      // Assign the current column to the event
      event.gridColumnStart = currentColumn;
      event.gridColumnEnd = currentColumn; // Assuming events take up only one column
    });
  }

  isUnderstaffed(event: IScheduleEvent): boolean {
    // const requiredStaff = this.scheduleService.calculateTutors(
    //   event.class.offeringGroupCode['groupCapacity']
    // );
    const assignedStaff = event.class['staff']?.length;
    return false;
  }

  assignRowsToEvents() {
    // Sort events by day and start time to compare overlapping times
    const sortedSchedule = this.sortEventsByDayAndTime(this.schedule);

    sortedSchedule.forEach((event) => {
      // Convert start and end times to grid rows
      const startRow = this.convertTimeToGridRow(
        event.class.timeslot.startTime
      );
      const endRow = this.convertTimeToGridRow(event.class.timeslot.endTime);

      // Assign the start and end rows to the event
      event.gridRowStart = startRow;
      event.gridRowEnd = endRow; // endRow is inclusive in CSS Grid
    });
  }

  convertTimeToGridRow(time: string): number {
    const timeParts = time.split(':').map(Number);
    const eventTime = new Date(0, 0, 0, timeParts[0], timeParts[1]);
    const diffMinutes =
      (eventTime.getTime() - this.earliestStartTime.getTime()) / (1000 * 60);
    return 2 + diffMinutes / 30; // Assuming header row is 1 and time slots start from row 2
  }

  toggleStaffSelection(enumber: string) {
    const index = this.selectedStaff.indexOf(enumber);
    if (index > -1) {
      this.selectedStaff.splice(index, 1); // Remove if found
    } else {
      this.selectedStaff.push(enumber); // Add if not found
    }
  }

  isStaffSelected(enumber: string): boolean {
    return this.selectedStaff.includes(enumber);
  }

  shouldDisplayEvent(event: IScheduleEvent): boolean {
    const isCourseSelected = this.selectedCourses.includes(event.course.code);
    const isAnyStaffSelected =
      event.class['staff']?.some((staff) =>
        this.selectedStaff?.includes(staff.miId)
      ) || '1';

    // Check if no courses or no staff are selected
    if (
      this.selectedCourses?.length === 0 ||
      this.selectedStaff?.length === 0
    ) {
      return false;
    }

    const isUnderstaffed = this.isUnderstaffed(event);

    // Show event only if it's understaffed when the filter is active and the user is available for the class
    return (
      isCourseSelected &&
      isAnyStaffSelected &&
      (!this.showOnlyUnderstaffed || isUnderstaffed)
    );
  }

  selectAllCourses() {
    this.selectedCourses = this.coursesList.map((staff) => staff.code);
  }

  ngOnDestroy() {
    this.dataSubscription.unsubscribe();
  }

  deselectAllCourses() {
    this.selectedCourses = [];
  }

  selectAllStaff() {
    this.selectedStaff = this.staffList.map((staff) => staff.miId);
  }

  deselectAllStaff() {
    this.selectedStaff = [];
  }

  toggleCourseSelection(courseCode: string) {
    const index = this.selectedCourses.indexOf(courseCode);
    if (index > -1) {
      this.selectedCourses.splice(index, 1); // Remove the courseCode if it's already in the array
    } else {
      this.selectedCourses.push(courseCode); // Add the courseCode if it's not in the array
    }
  }

  isCourseSelected(courseCode: string): boolean {
    return this.selectedCourses.includes(courseCode);
  }

  calculateHeaderColumns() {
    const daysOrder = [
      DayOfWeek.Monday,
      DayOfWeek.Tuesday,
      DayOfWeek.Wednesday,
      DayOfWeek.Thursday,
      DayOfWeek.Friday,
    ];
    let currentStartColumn = 2; // Assuming the first column is for time slots

    daysOrder.forEach((day) => {
      const eventsForDay = this.schedule.filter(
        (event) => event.class.day === day
      );
      const maxColumnForDay = eventsForDay.reduce(
        (max, event) => Math.max(max, event.gridColumnEnd),
        1
      );
      this.headerColumns[day.toUpperCase()] = {
        start: currentStartColumn,
        span: maxColumnForDay - currentStartColumn + 1,
      };
      currentStartColumn = maxColumnForDay + 1; // Prepare for the next day
    });
  }

  generateTimeSlots() {
    // Initialize variables to store the earliest start time and the latest end time
    let earliestStart = 24 * 60; // Represented in minutes, initialized to the latest possible time in a day
    let latestEnd = 0; // Represented in minutes, initialized to the earliest possible time in a day

    // Iterate through all the events to update earliestStart and latestEnd
    this.schedule.forEach((event) => {
      const startTimeInMinutes = this.convertTimeToMinutes(
        event.class.timeslot.startTime
      );
      const endTimeInMinutes = this.convertTimeToMinutes(
        event.class.timeslot.endTime
      );

      if (startTimeInMinutes < earliestStart) {
        earliestStart = startTimeInMinutes;
      }

      if (endTimeInMinutes > latestEnd) {
        latestEnd = endTimeInMinutes;
      }
    });

    // Clear existing timeslots
    this.timeSlots = [];

    // Generate new timeslots based on the range from earliestStart to latestEnd
    for (
      let currentTime = earliestStart;
      currentTime < latestEnd;
      currentTime += 30
    ) {
      const startTime = this.minutesToTime(currentTime);
      const endTime = this.minutesToTime(currentTime + 30);
      this.timeSlots.push({ startTime, endTime });
    }
  }

  selectClassAvailability(classCode: string) {
    const index = this.selectedCourses.indexOf(classCode);
    if (index > -1) {
      this.selectedCourses.splice(index, 1); // Remove the classCode if it's already in the array
    } else {
      this.selectedCourses.push(classCode); // Add the classCode if it's not in the array
    }
  }

  // Helper function to convert minutes to time string format
  minutesToTime(minutes: number): string {
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    return `${hours.toString().padStart(2, '0')}:${mins
      .toString()
      .padStart(2, '0')}`;
  }

  formatTime(date: Date): string {
    return date
      .toLocaleTimeString(navigator.language, {
        hour: '2-digit',
        minute: '2-digit',
        hour12: false,
      })
      .replace(/:\d{2}\s/, ''); // Remove seconds and AM/PM for clarity
  }

  convertTimeToMinutes(time: string): number {
    const [hours, minutes] = time.split(':').map(Number);
    return hours * 60 + minutes;
  }

  getEventColor(event: any): string {
    const courseCode = event.offeringGroupCode;
    const groupNumber = event.offeringGroupCode['group'];

    // Access the specific shade for the group.
    // The group number is used to directly access the correct shade.
    const shadeKey = `G${groupNumber}`;
    const colorShades = this.groupColours[courseCode];

    if (colorShades && colorShades[shadeKey]) {
      return colorShades[shadeKey];
    }

    // Fallback color if no specific shade is found
    return '#FFFFFF'; // White or any default color
  }

  formatNumber(num: number, pad: number, padChar: string): string {
    return num?.toString().padStart(pad, padChar);
  }

  getSelectDisplayValue(selectedValues: any[]): string {
    if (selectedValues?.length > 1) {
      return 'Multiple Selections';
    } else if (selectedValues?.length === 1) {
      return selectedValues[0]; // Assuming this is the display value you want
    }
    return ''; // Default display value when nothing is selected
  }

  isOverstaffed(event: IScheduleEvent): boolean {
    // const requiredStaff = this.scheduleService.calculateTutors(
    //   event.class.offeringGroupCode['groupCapacity']
    // );
    const assignedStaff = event.class['staff']?.length;
    return false;
  }

  filterStaff(searchTerm: string) {
    if (!searchTerm) {
      this.filteredStaffList = this.staffList;
    } else {
      this.filteredStaffList = this.staffList.filter(
        (staff) =>
          staff.firstName.toLowerCase().includes(searchTerm.toLowerCase()) ||
          staff.lastName.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
  }

  updatePreferences(event: IScheduleEvent, priority: string) {
    const userId = this.currentUser.email;
    const classCode =
      event['offeringGroupCode'] +
      '-' +
      event['groupNumber'] +
      '-' +
      event['classNumber'];

    // Find an existing preference with the same userId and classCode
    const existingPreference = this.tutorPreferences.find(
      (preference) =>
        preference?.userId === userId && preference?.classCode === classCode
    );

    // Prepare the preference data
    let preferenceData = {
      userId,
      id: userId + classCode, // Use existing eventId if found
      priority,
      classCode: classCode,
    };

    // Dispatch the action with the updated preference data
    this.store.dispatch(
      tutorPreferencesActions.createTutorPreferences({
        url: 'tutorpreferences',
        tutorPreferences: preferenceData,
      })
    );
  }

  bulkUpload() {
    this.events = events;
    const convertedArray = this.schedule.map((item) => {
      const course = this.convertToPlainObject(item.course);

      switch (course.code) {
        case 'BC1':
          course.description = 'Bootcamp 1: Java';
          break;
        case 'BC2':
          course.description = 'Bootcamp 2: C++';
          break;
        case 'WBC':
          course.description = 'Web Bootcamp: Html, Css, Javascript';
          break;
      }

      return course;
    });

    this.events.forEach((course) => {
      switch (course.offeringGroupCode) {
        case 'BC1':
          course.description = 'Bootcamp 1: Java';
          break;
        case 'BC2':
          course.description = 'Bootcamp 2: C++';
          break;
        case 'WBC':
          course.description = 'Web Bootcamp: Html, Css, Javascript';
          break;
      }

      return course;
    });

    this.firestoreDataService.uploadBulkData(
      'course-schedules',
      this.events,
      true
    );
  }

  convertToPlainObject = (obj: any): any => {
    if (obj === null || obj === undefined || typeof obj !== 'object') {
      return obj;
    }

    if (Array.isArray(obj)) {
      return obj.map(this.convertToPlainObject);
    }

    const plainObj: any = {};
    Object.keys(obj).forEach((key) => {
      const value = obj[key];
      plainObj[key] = this.convertToPlainObject(value);
    });

    return plainObj;
  };

  onPriorityChange(event: any, selectedPriority: string): void {
    // Show an alert dialog with the selected priority and event details
    alert(
      `Selected priority for event '${event.description}': ${selectedPriority}`
    );
  }

  onEventEdit(eventData: any): void {
    this.selectedEvent = eventData;
  }

  onFormSubmit(updatedEventData: any): void {
    // Find the index of the event in the array
    const index = this.events.findIndex(
      (event) => event.id === updatedEventData.id
    );

    // Check if the event was found
    if (index !== -1) {
      // Update the event at the found index
      this.events[index] = updatedEventData;
    } else {
      console.warn('Event not found for updating:', updatedEventData.id);
    }

    this.store.dispatch(
      courseScheduleActions.updateCourseSchedule({
        url: 'courseschedules',
        courseSchedule: updatedEventData,
      })
    );

    // Additional logic to refresh the calendar if needed

    this.selectedEvent = null;
  }
}
