import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatChipsModule } from '@angular/material/chips';
import { MatGridListModule } from '@angular/material/grid-list';
import { ScheduleService, ScheduleEvent } from './schedule.service';
import { FilterEventsPipe } from './events-filter.pipe';

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

  // Calculate the row span for each event based on the time duration
  calculateRowSpan(event: any): number {
    const startTime = event.timeSlot.split(' - ')[0];
    const endTime = event.timeSlot.split(' - ')[1];
    const startHour = parseInt(startTime.split(':')[0], 10);
    const endHour = parseInt(endTime.split(':')[0], 10);
    const startMinute = parseInt(startTime.split(':')[1], 10);
    const endMinute = parseInt(endTime.split(':')[1], 10);
    const totalMinutes = (endHour - startHour) * 60 + (endMinute - startMinute);
    const rowSpan = totalMinutes / 30; // Assuming each row represents 30 minutes
    return rowSpan;
  }
}
