import { CommonModule } from '@angular/common';
import {
  AfterViewInit,
  Component,
  ElementRef,
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
  @ViewChild('calendar') calendar: ElementRef;
  dates: Date[] = [];
  timeslots: string[] = [];
  timeslotIncrement: number = 15;

  ngOnInit() {
    this.initializeWeek();
    this.initializeTimeslots();
  }

  ngAfterViewInit() {
    this.scrollToCurrentTimeSlot();
  }

  initializeWeek() {
    const today = new Date();
    const firstDayOfWeek =
      today.getDate() - today.getDay() + (today.getDay() === 0 ? -6 : 1); // Adjust to start week from Monday
    const week = [];

    for (let i = 0; i < 7; i++) {
      let day = new Date(
        today.getFullYear(),
        today.getMonth(),
        firstDayOfWeek + i
      );
      week.push(day);
    }

    this.dates = week;
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

  // Add this method inside the CalendarComponent class

  private timeslotStringToDate(timeslot: string): Date {
    const [hours, minutes] = timeslot.split(':').map(Number);
    const date = new Date();
    date.setHours(hours, minutes, 0, 0); // set hours and minutes, seconds and ms to 0
    return date;
  }
}
