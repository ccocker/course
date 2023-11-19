import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatChipsModule } from '@angular/material/chips';
import { MatGridListModule } from '@angular/material/grid-list';
import { ScheduleService, ScheduleEvent } from './schedule.service';
import { FilterEventsPipe } from './events-filter.pipe';

interface CourseBooking {
  timeSlot: string;
  bookings: {
    [key: string]: {
      roomNumber: string;
      class: string;
      lecturer: string;
      capacity: number;
      tutors: string[];
    }[];
  };
}
@Component({
  selector: 'mi-course-schedule',
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    MatChipsModule,
    MatGridListModule,
    FilterEventsPipe,
  ],
  templateUrl: './course-schedule.component.html',
  styleUrl: './course-schedule.component.scss',
})
export class CourseScheduleComponent {
  schedule: ScheduleEvent[];
  timeSlots: string[];

  constructor(private scheduleService: ScheduleService) {}

  ngOnInit() {
    this.schedule = this.scheduleService.getSchedule();
    console.log(this.schedule);
    this.timeSlots = this.scheduleService.getTimeSlots();
    console.log(this.timeSlots);
  }

  calculateEventStyles(event: any) {
    return {
      'grid-row': 'span ' + (event.gridRowEnd - event.gridRowStart + 1),
      'grid-column':
        'span ' + (event.gridColumnEnd - event.gridColumnStart + 1),
    };
  }
}
