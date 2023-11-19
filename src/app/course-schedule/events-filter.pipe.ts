import { Pipe, PipeTransform } from '@angular/core';
import { ScheduleEvent } from './schedule.service';

@Pipe({
  name: 'filterEvents',
  standalone: true,
})
export class FilterEventsPipe implements PipeTransform {
  transform(
    events: ScheduleEvent[],
    day: string,
    timeslot: string
  ): ScheduleEvent[] {
    return events.filter((event) => {
      const eventStartTime = event.timeSlot.split(' - ')[0]; // Extracts the start time
      return event.day === day && eventStartTime === timeslot;
    });
  }
}
