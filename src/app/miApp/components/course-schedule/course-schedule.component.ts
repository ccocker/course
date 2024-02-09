import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';

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
import { events } from './data/events.data';
import { courses } from './data/courses.data';
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
  filteredStaffList: IPerson[] = [];
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
  courses = courses;
  events = events;

  constructor(
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
  }

  ngAfterViewInit() {
    this.dataSubscription = this.data$.subscribe((data) => {
      this.currentUser = data.currentUser;
      this.selectedCourses = this.coursesList.map((course) => course.code);

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
    let earliestTime = new Date(0, 0, 0, 23, 59);
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
    const daysOrder = [
      DayOfWeek.Monday,
      DayOfWeek.Tuesday,
      DayOfWeek.Wednesday,
      DayOfWeek.Thursday,
      DayOfWeek.Friday,
    ];

    return schedule.sort((a, b) => {
      const dayIndexA = daysOrder.indexOf(a.class.day);
      const dayIndexB = daysOrder.indexOf(b.class.day);

      if (dayIndexA !== dayIndexB) {
        return dayIndexA - dayIndexB;
      }

      const startA = this.convertTimeToMinutes(a.class.timeslot.startTime);
      const startB = this.convertTimeToMinutes(b.class.timeslot.startTime);
      return startA - startB;
    });
  }

  assignColumnsToEvents() {
    const sortedSchedule = this.sortEventsByDayAndTime(this.schedule);
    let currentColumn = 2;
    let maxDailyColumn = 1;
    let currentDay = sortedSchedule[0].class.day;
    const lastEndTimeByColumn: Record<string, Record<number, number>> = {};

    sortedSchedule.forEach((event, index) => {
      const currentEventDay = event.class.day;

      const currentEventStart = this.convertTimeToMinutes(
        event.class.timeslot.startTime
      );
      const currentEventEnd = this.convertTimeToMinutes(
        event.class.timeslot.endTime
      );

      if (!lastEndTimeByColumn[currentEventDay]) {
        lastEndTimeByColumn[currentEventDay] = {};
      }

      if (currentDay !== currentEventDay) {
        currentDay = currentEventDay;
        currentColumn = maxDailyColumn + 1;
        maxDailyColumn = currentColumn;
      } else if (index > 0) {
        const availableColumn = Object.keys(
          lastEndTimeByColumn[currentEventDay]
        ).find(
          (column) =>
            lastEndTimeByColumn[currentEventDay][column] <= currentEventStart
        );

        if (availableColumn) {
          currentColumn = parseInt(availableColumn);
        } else {
          currentColumn = maxDailyColumn + 1;
        }
      }

      maxDailyColumn = Math.max(maxDailyColumn, currentColumn);
      lastEndTimeByColumn[currentEventDay][currentColumn] = currentEventEnd;

      event.gridColumnStart = currentColumn;
      event.gridColumnEnd = currentColumn;
    });
  }

  isUnderstaffed(event: IScheduleEvent): boolean {
    const assignedStaff = event.class['staff']?.length;
    return false;
  }

  assignRowsToEvents() {
    const sortedSchedule = this.sortEventsByDayAndTime(this.schedule);

    sortedSchedule.forEach((event) => {
      const startRow = this.convertTimeToGridRow(
        event.class.timeslot.startTime
      );
      const endRow = this.convertTimeToGridRow(event.class.timeslot.endTime);

      event.gridRowStart = startRow;
      event.gridRowEnd = endRow;
    });
  }

  convertTimeToGridRow(time: string): number {
    const timeParts = time.split(':').map(Number);
    const eventTime = new Date(0, 0, 0, timeParts[0], timeParts[1]);
    const diffMinutes =
      (eventTime.getTime() - this.earliestStartTime.getTime()) / (1000 * 60);
    return 2 + diffMinutes / 30;
  }

  toggleStaffSelection(enumber: string) {
    const index = this.selectedStaff.indexOf(enumber);
    if (index > -1) {
      this.selectedStaff.splice(index, 1);
    } else {
      this.selectedStaff.push(enumber);
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

    if (
      this.selectedCourses?.length === 0 ||
      this.selectedStaff?.length === 0
    ) {
      return false;
    }

    const isUnderstaffed = this.isUnderstaffed(event);

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
      this.selectedCourses.splice(index, 1);
    } else {
      this.selectedCourses.push(courseCode);
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
    let currentStartColumn = 2;

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
      currentStartColumn = maxColumnForDay + 1;
    });
  }

  generateTimeSlots() {
    let earliestStart = 24 * 60;
    let latestEnd = 0;

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

    this.timeSlots = [];

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
      this.selectedCourses.splice(index, 1);
    } else {
      this.selectedCourses.push(classCode);
    }
  }

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
      .replace(/:\d{2}\s/, '');
  }

  convertTimeToMinutes(time: string): number {
    const [hours, minutes] = time.split(':').map(Number);
    return hours * 60 + minutes;
  }

  getEventColor(event: any): string {
    const courseCode = event.offeringGroupCode;
    const groupNumber = event.offeringGroupCode['group'];

    const shadeKey = `G${groupNumber}`;
    const colorShades = this.groupColours[courseCode];

    if (colorShades && colorShades[shadeKey]) {
      return colorShades[shadeKey];
    }

    return '#FFFFFF';
  }

  formatNumber(num: number, pad: number, padChar: string): string {
    return num?.toString().padStart(pad, padChar);
  }

  getSelectDisplayValue(selectedValues: any[]): string {
    if (selectedValues?.length > 1) {
      return 'Multiple Selections';
    } else if (selectedValues?.length === 1) {
      return selectedValues[0];
    }
    return '';
  }

  isOverstaffed(event: IScheduleEvent): boolean {
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

    const existingPreference = this.tutorPreferences.find(
      (preference) =>
        preference?.userId === userId && preference?.classCode === classCode
    );

    let preferenceData = {
      userId,
      id: userId + classCode,
      priority,
      classCode: classCode,
    };

    this.store.dispatch(
      tutorPreferencesActions.createTutorPreferences({
        url: 'tutorpreferences',
        tutorPreferences: preferenceData,
      })
    );
  }

  bulkUpload() {
    this.events = events;
    // const convertedArray = this.schedule.map((item) => {
    //   const course = this.convertToPlainObject(item.course)

    //   switch (course.code) {
    //     case 'BC1':
    //       course.description = 'Bootcamp 1: Java'
    //       break
    //     case 'BC2':
    //       course.description = 'Bootcamp 2: C++'
    //       break
    //     case 'WBC':
    //       course.description = 'Web Bootcamp: Html, Css, Javascript'
    //       break
    //   }

    //   return course
    // })

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

    console.log(this.events);

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

    if (index !== -1) {
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

    this.selectedEvent = null;
  }
}
