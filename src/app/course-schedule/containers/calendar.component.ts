import { CommonModule } from '@angular/common';
import {
  AfterViewInit,
  Component,
  ElementRef,
  Input,
  OnInit,
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

interface CalendarEvent {
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
  @ViewChild('calendar') calendar: ElementRef;
  private _startDate: Date;
  dates: Date[] = [];
  timeslots: string[] = [];
  timeslotIncrement: number = 30;
  filteredEvents: CalendarEvent[] = [];
  currentView: 'day' | 'workWeek' | 'week' | 'month' = 'week';
  selectedDate: Date = new Date();

  ngOnInit() {
    this.selectedDate = this.startDate || new Date();
    console.log(this.startDate, this.selectedDate);
    this.initializeWeek();
    this.initializeTimeslots();
    this.filteredEvents = this.events.slice();
  }

  ngAfterViewInit() {
    this.scrollToCurrentTimeSlot();
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

    // Determine the number of slots per hour based on the increment
    const slotsPerHour = 60 / this.timeslotIncrement;

    for (let hour = 0; hour < 24; hour++) {
      for (let slot = 0; slot < slotsPerHour; slot++) {
        // Calculate the minutes for the current slot
        const minutes = slot * this.timeslotIncrement;
        // Format the hour and minutes to ensure two digits
        const hourFormatted = hour.toString().padStart(2, '0');
        const minuteFormatted = minutes.toString().padStart(2, '0');
        // Add the time slot to the array
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
    const now = new Date();
    // Subtract one hour from the current time
    now.setHours(now.getHours() - 1);

    // Find the index of the timeslot that's closest to one hour before the current time
    const closestTimeslotIndex = this.timeslots.findIndex((timeslot) => {
      const timeslotDate = this.timeslotStringToDate(timeslot);
      return timeslotDate >= now;
    });

    // Adjust index to get the timeslot before the current time
    const scrollToIndex = Math.max(closestTimeslotIndex - 1, 0);

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
      // Check if the event's date and timeslot match the provided date and timeslot
      const eventStartTime = this.timeslotStringToDate(event.startTime);
      const eventStartDate = new Date(event.startDate.setHours(0, 0, 0, 0));
      const timeslotDate = this.timeslotStringToDate(timeslot);
      const currentDate = new Date(date.setHours(0, 0, 0, 0));
      return (
        eventStartDate.getTime() === currentDate.getTime() &&
        eventStartTime.getHours() === timeslotDate.getHours() &&
        eventStartTime.getMinutes() === timeslotDate.getMinutes()
      );
    });
  }

  calculateEventStyle(event: CalendarEvent, date: Date, timeslot: string): any {
    const duration = this.calculateEventDurationInSlots(event);
    const offset = this.calculateEventOffset(event, timeslot);
    const concurrentEvents = this.getConcurrentEvents(event, date, timeslot);

    // Assuming a gap of 2%
    const gap = 2;
    const width =
      (100 - gap * (concurrentEvents.length - 1)) / concurrentEvents.length;
    const index = concurrentEvents.indexOf(event);
    const left = (width + gap) * index;

    return {
      height: `${duration * 60}px`, // Assuming each timeslot is 60px high
      top: `${offset * 60}px`,
      width: `${width}%`,
      left: `${left}%`,
      'background-color': event.color, // Set the background color
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
}
