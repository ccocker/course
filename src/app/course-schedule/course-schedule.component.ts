import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatChipsModule } from '@angular/material/chips';
import { MatGridListModule } from '@angular/material/grid-list';
import { ScheduleService, ScheduleEvent } from './schedule.service';

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
  imports: [CommonModule, MatCardModule, MatChipsModule, MatGridListModule],
  templateUrl: './course-schedule.component.html',
  styleUrl: './course-schedule.component.scss',
})
export class CourseScheduleComponent {
  schedule: ScheduleEvent[];
  timeSlots: string[];

  constructor(private scheduleService: ScheduleService) {}

  ngOnInit() {
    this.schedule = this.scheduleService.getSchedule();
    this.timeSlots = this.scheduleService.getTimeSlots();
  }
}
