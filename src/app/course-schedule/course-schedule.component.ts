import { Component, Inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatChipsModule } from '@angular/material/chips';
import { MatGridListModule } from '@angular/material/grid-list';
import { ScheduleService, ScheduleEvent } from './services/schedule.service';
import { FilterEventsPipe } from './events-filter.pipe';
import { ColorService } from './services/color.service';

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
  timeSlots: { start: string, end: string }[] = [];
  private occupiedColumnsByTime: Record<string, number> = {};


  currentColumn: number = 2;

  constructor(
    private scheduleService: ScheduleService,
    private colorService: ColorService
  ) {}



// Helper function to check if two events overlap
eventsOverlap(event1: ScheduleEvent, event2: ScheduleEvent): boolean {
  const start1 = this.convertTimeToMinutes(event1.timeSlot.split(' - ')[0]);
  const end1 = this.convertTimeToMinutes(event1.timeSlot.split(' - ')[1]);
  const start2 = this.convertTimeToMinutes(event2.timeSlot.split(' - ')[0]);
  const end2 = this.convertTimeToMinutes(event2.timeSlot.split(' - ')[1]);

  return start1 < end2 && end1 > start2;
}

// Helper function to sort events by day and start time
sortEventsByDayAndTime(schedule: ScheduleEvent[]): ScheduleEvent[] {
  return schedule.sort((a, b) => {
    if (a.day === b.day) {
      return this.convertTimeToMinutes(a.timeSlot.split(' - ')[0]) -
             this.convertTimeToMinutes(b.timeSlot.split(' - ')[0]);
    }
    return a.day.localeCompare(b.day);
  });
}

assignColumnsToEvents() {
  // Sort events by day and start time to compare overlapping times
  const sortedSchedule = this.sortEventsByDayAndTime(this.schedule);
  let currentColumn = 2;

  sortedSchedule.forEach((event, index, sortedSchedule) => {
    if (index > 0) { // Skip the first event as it has nothing to compare with
      const previousEvent = sortedSchedule[index - 1];
      const previousEventEnd = this.convertTimeToMinutes(previousEvent.timeSlot.split(' - ')[1]);
      const currentEventStart = this.convertTimeToMinutes(event.timeSlot.split(' - ')[0]);

      // Check for overlap
      if (currentEventStart < previousEventEnd) {
        // If overlapping, increment the column
        currentColumn++;
      } else {
        // If not overlapping, reset the column to 2
        currentColumn = 2;
      }
    }

    // Assign the current column to the event
    event.gridColumnStart = currentColumn;
    event.gridColumnEnd = currentColumn; // Assuming events take up only one column
  });
}

assignRowsToEvents() {
  // Sort events by day and start time to compare overlapping times
  const sortedSchedule = this.sortEventsByDayAndTime(this.schedule);

  sortedSchedule.forEach(event => {
    // Convert start and end times to grid rows
    const startRow = this.convertTimeToGridRow(event.timeSlot.split(' - ')[0]);
    const endRow = this.convertTimeToGridRow(event.timeSlot.split(' - ')[1]);

    // Assign the start and end rows to the event
    event.gridRowStart = startRow;
    event.gridRowEnd = endRow; // endRow is inclusive in CSS Grid
  });
}

convertTimeToGridRow(time: string): number {
  // Assuming grid starts at 08:00 as row 2, each half-hour block is a new row
  const baseTime = new Date(0, 0, 0, 8, 0); // Base time corresponding to row 2
  const timeParts = time.split(':');
  const eventTime = new Date(0, 0, 0, parseInt(timeParts[0]), parseInt(timeParts[1]));
  const diffMinutes = (eventTime.getTime() - baseTime.getTime()) / (1000 * 60);
  return 1 + (diffMinutes / 30); // Calculate row based on 30-minute increments
}
  ngOnInit() {
  this.schedule = this.scheduleService.getSchedule();
  this.assignColumnsToEvents();
  this.assignRowsToEvents();
  this.generateTimeSlots();

  const colorConfig = {
    BC1: '#FFA500',
    BC2: '#008000',
    WBC: '#0000ff',
    // Add more mappings as needed
  };

  // Apply color configuration
  this.schedule = this.colorService.addColorsToObjects(this.schedule, colorConfig);

  console.log(this.schedule);
  console.log(this.timeSlots);
}



sortEventsByStartTime(schedule: ScheduleEvent[]): ScheduleEvent[] {
  return schedule.sort((a, b) => {
    return this.convertTimeToMinutes(a.timeSlot.split(' - ')[0]) -
           this.convertTimeToMinutes(b.timeSlot.split(' - ')[0]);
  });
}

calculateColumnForEvent(event: ScheduleEvent, schedule: ScheduleEvent[]): number {
  // Start with column 2 as per the previous logic
  let column = 2;

  // Keep checking and incrementing the column until you find one where the event doesn't overlap with any other event
  let overlapExists;
  do {
    overlapExists = schedule.some(e => {
      return e.day === event.day &&
             e.gridColumnStart === column &&
             this.eventsOverlap(event, e);
    });

    if (overlapExists) {
      // If an overlap is found, try the next column
      column++;
    }
  } while (overlapExists);

  // Return the column where no overlap exists
  return column;
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

  generateTimeSlots() {
    let startTime = new Date(2023, 0, 1, 8, 30); // Starting at 8:30
    for (let i = 0; i < 20; i++) { // Assuming you want 20 slots of 30 minutes
      let endTime = new Date(startTime.getTime() + 30 * 60000); // 30 minutes later
      this.timeSlots.push({
        start: this.formatTime(startTime),
        end: this.formatTime(endTime)
      });
      startTime = endTime; // Set start time for the next slot
    }
  }

  formatTime(date: Date): string {
    return date.toLocaleTimeString(navigator.language, {
      hour: '2-digit',
      minute:'2-digit',
      hour12: false
    }).replace(/:\d{2}\s/, ''); // Remove seconds and AM/PM for clarity
  }

  convertTimeToMinutes(time: string): number {
  const [hours, minutes] = time.split(':').map(Number);
  return hours * 60 + minutes;
}



getGridRow(eventTime: string, isStart: boolean): number {
  const eventTimeMinutes = this.convertTimeToMinutes(eventTime);

  // Find the timeslot index for either the start time or the end time
  const slotIndex = this.timeSlots.findIndex(slot => {
    const startTimeMinutes = this.convertTimeToMinutes(slot.start);
    const endTimeMinutes = this.convertTimeToMinutes(slot.end);
    return isStart ? eventTimeMinutes >= startTimeMinutes : eventTimeMinutes < endTimeMinutes;
  });

  // Adjust for the header row and the fact that grid rows are 1-based
  return slotIndex + 2;
}

findIndexOfCurrentEvent(currentEvent: ScheduleEvent): number {
  // Assuming 'schedule' is the array of ScheduleEvent objects
  return this.schedule.findIndex(event => event.class === currentEvent.class);
}





}
