import { CommonModule } from '@angular/common';
import {
  AfterViewInit,
  Component,
  ContentChild,
  ElementRef,
  EventEmitter,
  Input,
  OnInit,
  Output,
  TemplateRef,
  ViewChild,
} from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatNativeDateModule } from '@angular/material/core';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatSelectModule } from '@angular/material/select';
import { ModelFactory } from '../../common/services/model.factory';
import { BaseModel, Event } from '../../common/models';
import { from, pipe, tap } from 'rxjs';

interface CalendarEvent {
  id: string;
  startDate: Date;
  startTime: string;
  endDate: Date;
  endTime: string;
  description: string;
  color: string;
}

@Component({
  selector: 'mi-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.scss'],
  standalone: true,
  imports: [
    CommonModule,
    MatButtonModule,
    MatDatepickerModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule,
    MatNativeDateModule,
    MatSelectModule,
    MatToolbarModule,
  ],
})
export class CalendarComponent implements OnInit, AfterViewInit {
  @Input()
  set startDate(value: Date) {
    this._startDate = value || new Date(); // Use today's date as default
    this.updateCalendar(this._startDate);
  }
  @Input()
  showDateNavigator: boolean = true;
  @Input()
  events: CalendarEvent[] = [];
  @Input() startTime: string = '00:00';
  @Input() scrollToCurrentTime: boolean = true;
  @Output() eventDoubleClick = new EventEmitter<any>();

  @ViewChild('calendar') calendar: ElementRef;
  @ContentChild(TemplateRef) eventTemplate: TemplateRef<any>;
  private _startDate: Date;
  dates: Date[] = [];
  timeslots: string[] = [];
  timeslotIncrement: number = 30;
  filteredEvents: CalendarEvent[] = [];
  currentView: 'day' | 'workWeek' | 'week' | 'month' = 'workWeek';
  selectedDate: Date = new Date();
  model!: BaseModel;

  constructor(private modelFactory: ModelFactory) {}

  ngOnInit() {
    this.selectedDate = this.startDate || new Date();
    this.initializeWeek();
    this.initializeTimeslots();
    this.filteredEvents = this.events.slice();
  }

  ngAfterViewInit() {
    if (this.scrollToCurrentTime) {
      this.scrollToCurrentTimeSlot();
    }
  }

  get startDate(): Date {
    return this._startDate;
  }

  initializeWeek() {
    switch (this.currentView) {
      case 'day':
        this.dates = [new Date(this.selectedDate)];
        break;
      case 'workWeek':
        this.generateWeek(true);
        break;
      case 'week':
        this.generateWeek(false);
        break;
      case 'month':
        this.generateMonth();
        break;
      default:
        this.generateWeek(false);
    }
  }

  filterEvents(searchTerm: string): void {
    if (!searchTerm) {
      this.filteredEvents = this.events.slice();
      return;
    }
    this.filteredEvents = this.events.filter((event) =>
      event.description.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }

  initializeTimeslots() {
    this.timeslots = []; // clear previous timeslots

    // Parse the hour and minutes from the startTime input
    const [startHour, startMinute] = this.startTime.split(':').map(Number);

    // Determine the number of slots per hour based on the increment
    const slotsPerHour = 60 / this.timeslotIncrement;

    for (let hour = startHour; hour < 24; hour++) {
      for (let slot = 0; slot < slotsPerHour; slot++) {
        const minutes = startMinute + slot * this.timeslotIncrement;
        if (hour === startHour && minutes < startMinute) continue; // Skip slots before the startMinute in the first hour

        const hourFormatted = hour.toString().padStart(2, '0');
        const minuteFormatted = (minutes % 60).toString().padStart(2, '0');
        this.timeslots.push(`${hourFormatted}:${minuteFormatted}`);
      }
    }
  }

  onDateSelect(event: any) {
    this.updateCalendar(event.value);
  }

  updateCalendar(newStartDate: Date) {
    this.selectedDate = newStartDate;
    this.initializeWeek();
    // Set the start date to the selected date without adjusting to the beginning of the week
    const startOfWeek = new Date(newStartDate);

    // Clear the current dates array
    this.dates = [];

    // Fill the dates array with the new week's dates
    for (let i = 0; i < 7; i++) {
      this.dates.push(
        new Date(
          startOfWeek.getFullYear(),
          startOfWeek.getMonth(),
          startOfWeek.getDate() + i
        )
      );
    }
  }

  onViewChange() {
    this.initializeWeek();
  }

  generateWeek(workWeekOnly: boolean) {
    let startDay = workWeekOnly ? 1 : 1; // 0 for Sunday, 1 for Monday
    let firstDayOfWeek =
      this.selectedDate.getDate() - this.selectedDate.getDay() + startDay;
    let week = [];

    for (let i = 0; i < 7; i++) {
      let day = new Date(
        this.selectedDate.getFullYear(),
        this.selectedDate.getMonth(),
        firstDayOfWeek + i
      );
      week.push(day);
    }

    this.dates = workWeekOnly ? week.slice(0, 5) : week; // slice for work week (Mon-Fri)
  }

  generateMonth() {
    let month = [];
    const start = new Date(
      this.selectedDate.getFullYear(),
      this.selectedDate.getMonth(),
      1
    );
    const end = new Date(
      this.selectedDate.getFullYear(),
      this.selectedDate.getMonth() + 1,
      0
    );

    for (let day = start; day <= end; day.setDate(day.getDate() + 1)) {
      month.push(new Date(day));
    }

    this.dates = month;
  }

  navigateTo(direction: 'prev' | 'next') {
    // Get the current start date from the dates array
    const startDate = this.dates[0];

    // Calculate the new start date based on the direction
    const newStartDate = new Date(startDate);
    if (direction === 'prev') {
      // Move to the previous day, which could potentially be in the previous week
      newStartDate.setDate(startDate.getDate() - 7);
    } else {
      // Move to the next day, which could potentially be in the next week
      newStartDate.setDate(startDate.getDate() + 7);
    }

    // Update the calendar view based on the new start date
    this.updateCalendar(newStartDate);
  }

  // Modify this method inside the CalendarComponent class

  scrollToCurrentTimeSlot(): void {
    console.log('Timeslots', this.timeslots);
    const now = new Date();
    // Subtract one hour from the current time
    now.setHours(now.getHours() - 1);

    // Find the index of the timeslot that's closest to one hour before the current time
    const closestTimeslotIndex = this.timeslots.findIndex((timeslot) => {
      const timeslotDate = this.timeslotStringToDate(timeslot);
      return timeslotDate >= now;
    });
    console.log('closestTimeslotIndex,', closestTimeslotIndex);

    // Adjust index to get the timeslot before the current time
    const scrollToIndex = Math.max(closestTimeslotIndex - 1, 0);
    console.log('scrollToIndex,', scrollToIndex);
    setTimeout(() => {
      const timeslotElement = this.calendar.nativeElement.querySelector(
        `#timeslot-${scrollToIndex}`
      );
      timeslotElement?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }, 0);
  }

  private timeslotStringToDate(timeslot: string): Date {
    const [hours, minutes] = timeslot.split(':').map(Number);
    const date = new Date();
    date.setHours(hours, minutes, 0, 0); // set hours and minutes, seconds and ms to 0
    return date;
  }

  getEventsForTimeslot(timeslot: string, date: Date): CalendarEvent[] {
    return this.filteredEvents.filter((event) => {
      // Transform timeslot and event start time to Date objects for comparison
      const eventStartTime = this.timeslotStringToDate(event.startTime);
      const eventEndTime = this.timeslotStringToDate(event.endTime);
      const timeslotStartTime = this.timeslotStringToDate(timeslot);
      // Calculate the end time of the timeslot
      const timeslotEndTime = new Date(
        timeslotStartTime.getTime() + this.timeslotIncrement * 60000
      );

      // Check if the event's start time is within the timeslot
      const isWithinTimeslot =
        eventStartTime >= timeslotStartTime && eventStartTime < timeslotEndTime;

      // Check if the event's date matches the current date
      const eventStartDate = new Date(event.startDate.setHours(0, 0, 0, 0));
      const currentDate = new Date(date.setHours(0, 0, 0, 0));

      // The event should be included if it starts within the timeslot and has the same date
      return (
        eventStartDate.getTime() === currentDate.getTime() && isWithinTimeslot
      );
    });
  }

  calculateEventStyle(event: CalendarEvent, date: Date, timeslot: string): any {
    // Duration calculation
    const startTime = this.timeslotStringToDate(event.startTime);
    const endTime = this.timeslotStringToDate(event.endTime);
    const durationInMinutes = (endTime.getTime() - startTime.getTime()) / 60000;
    const durationInSlots = durationInMinutes / this.timeslotIncrement;

    // Offset calculation
    const timeslotStart = this.timeslotStringToDate(timeslot);
    const offsetInMinutes =
      (startTime.getTime() - timeslotStart.getTime()) / 60000;
    const offsetInSlots = offsetInMinutes / this.timeslotIncrement;

    // Assuming each timeslot's height is 60px.
    const eventHeight = durationInSlots * 60;
    const eventTopOffset = offsetInSlots * 60;

    // Concurrent events calculation
    const concurrentEvents = this.getConcurrentEvents(event, date, timeslot);
    const eventIndex = concurrentEvents.findIndex((e) => e.id === event.id);
    const numberOfConcurrentEvents = concurrentEvents.length;

    // You might want to limit the maximum number of concurrent events displayed side by side
    // to avoid events becoming too narrow to be interacted with or read.
    const maxConcurrentEventsDisplayed = 3;
    const adjustedNumberOfConcurrentEvents = Math.min(
      numberOfConcurrentEvents,
      maxConcurrentEventsDisplayed
    );
    const widthPerEvent = 100 / adjustedNumberOfConcurrentEvents; // Divide the width equally among concurrent events
    const eventLeftOffset =
      (eventIndex % maxConcurrentEventsDisplayed) * widthPerEvent; // Calculate left offset

    return {
      position: 'absolute',
      top: `${eventTopOffset}px`,
      height: `${eventHeight}px`,
      width: `${widthPerEvent}%`,
      left: `${eventLeftOffset}%`, // Adjusted to use eventLeftOffset
      'background-color': event.color,
      'z-index': 100 + eventIndex, // Increment z-index to handle slight overlaps
      // Add other styling as needed.
    };
  }

  calculateEventDurationInSlots(event: CalendarEvent): number {
    const startTime = this.timeslotStringToDate(event.startTime);
    const endTime = this.timeslotStringToDate(event.endTime);
    const durationInMinutes = (endTime.getTime() - startTime.getTime()) / 60000;
    return durationInMinutes / this.timeslotIncrement;
  }

  // Helper method to calculate the top offset based on the event's start time
  // ...

  calculateEventOffset(event: CalendarEvent, timeslot: string): number {
    const eventStart = this.timeslotStringToDate(event.startTime);
    const timeslotStart = this.timeslotStringToDate(timeslot);
    const offsetMinutes =
      (eventStart.getTime() - timeslotStart.getTime()) / 60000;
    return offsetMinutes / this.timeslotIncrement;
  }

  getConcurrentEvents(
    event: CalendarEvent,
    date: Date,
    timeslot: string
  ): CalendarEvent[] {
    const timeslotStart = this.timeslotStringToDate(timeslot);
    const timeslotEnd = new Date(
      timeslotStart.getTime() + this.timeslotIncrement * 60000
    );

    return this.events.filter((e) => {
      const start = this.timeslotStringToDate(e.startTime);
      const end = this.timeslotStringToDate(e.endTime);
      return (
        e.startDate.getDate() === date.getDate() &&
        !(end <= timeslotStart || start >= timeslotEnd)
      );
    });
  }

  // Inside CalendarComponent
  onEventDoubleClick(data: any): void {
    console.log('Event double clicked', data);

    from(this.modelFactory.createModel('events'))
      .pipe(
        tap((model) => {
          console.log('Model', model);
          // Assign data from Firestore
          Object.assign(model, {
            ...data,
          });

          this.model = model;
          console.log('Event double clicked', this.model);

          // Emit the event here, after the model has been created and assigned
          this.eventDoubleClick.emit(this.model);
        })
      )
      .subscribe(); // Don't forget to subscribe to trigger the observable
  }
}
