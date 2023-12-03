import { Pipe, PipeTransform } from '@angular/core'
import { IScheduleEvent } from './interfaces/schedule.interface'

@Pipe({
  name: 'filterEvents',
  standalone: true,
})
export class FilterEventsPipe implements PipeTransform {
  transform(
    events: IScheduleEvent[],
    day: string,
    timeslot: string,
  ): IScheduleEvent[] {
    return events.filter((event) => {
      const eventStartTime = event.class.timeslot.startTime // Extracts the start time
      return event.class.day === day && eventStartTime === timeslot
    })
  }
}

@Pipe({ name: 'enumToArray', standalone: true })
export class EnumToArrayPipe implements PipeTransform {
  transform(data: Object) {
    return Object.keys(data)
      .filter((key) => isNaN(+key))
      .map((key) => key.toUpperCase())
  }
}
