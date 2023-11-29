import { Pipe, PipeTransform } from '@angular/core'
import { ScheduleEvent } from './services/schedule.service'

@Pipe({
  name: 'filterEvents',
  standalone: true,
})
export class FilterEventsPipe implements PipeTransform {
  transform(
    events: ScheduleEvent[],
    day: string,
    timeslot: string,
  ): ScheduleEvent[] {
    return events.filter((event) => {
      const eventStartTime = event.class.timeslot.startTime // Extracts the start time
      return event.class.day === day && eventStartTime === timeslot
    })
  }
}
