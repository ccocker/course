import { Component, Inject } from '@angular/core'
import { CommonModule } from '@angular/common'
import { MatCardModule } from '@angular/material/card'
import { MatChipsModule } from '@angular/material/chips'
import { MatGridListModule } from '@angular/material/grid-list'
import { ScheduleService, ScheduleEvent } from './services/schedule.service'
import { FilterEventsPipe } from './events-filter.pipe'
import { ColorService } from './services/color.service'

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
  schedule: ScheduleEvent[]
  timeSlots: { start: string; end: string }[] = []
  headerColumns: Record<string, { start: number; span: number }> = {}

  groupColours: { [key: string]: { [shade: string]: string } } = {}
  /**
  groupColours = {
    BC1: {
      G1: '#FFF2E6',
      G2: '#FFDFCC',
      G3: '#FFCCB3',
      G4: '#FFB899',
      G5: '#FFA380',
      G6: '#FF8F66',
      G7: '#FF7A4D',
    },
    BC2: {
      G1: '#c8e6c9',
      G2: '#e9f5db',
    },
    WBC: {
      G1: '#e6f0ff',
      G2: '#cce0ff',
    },
  }
*/
  constructor(
    private scheduleService: ScheduleService,
    private colorService: ColorService,
  ) {}

  sortEventsByDayAndTime(schedule: ScheduleEvent[]): ScheduleEvent[] {
    // Define the order of the days
    const daysOrder = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday']

    return schedule.sort((a, b) => {
      // Compare the index of the days in the daysOrder array
      const dayIndexA = daysOrder.indexOf(a.day)
      const dayIndexB = daysOrder.indexOf(b.day)

      if (dayIndexA !== dayIndexB) {
        return dayIndexA - dayIndexB // Sort by the index of the day
      }

      // If the days are the same, compare the start times
      const startA = this.convertTimeToMinutes(a.timeSlot.split(' - ')[0])
      const startB = this.convertTimeToMinutes(b.timeSlot.split(' - ')[0])
      return startA - startB // Sort by start time if the days are the same
    })
  }

  assignColumnsToEvents() {
    // Sort events by day and start time to compare overlapping times
    const sortedSchedule = this.sortEventsByDayAndTime(this.schedule)
    let currentColumn = 2
    let maxDailyColumn = 1
    let currentDay = sortedSchedule[0].day
    // Keep track of the last end time for each column to check for overlaps
    const lastEndTimeByColumn: Record<string, Record<number, number>> = {}

    sortedSchedule.forEach((event, index) => {
      const currentEventDay = event.day

      const currentEventStart = this.convertTimeToMinutes(
        event.timeSlot.split(' - ')[0],
      )
      const currentEventEnd = this.convertTimeToMinutes(
        event.timeSlot.split(' - ')[1],
      )

      // Initialize tracking for the new day
      if (!lastEndTimeByColumn[currentEventDay]) {
        lastEndTimeByColumn[currentEventDay] = {}
      }

      if (currentDay !== currentEventDay) {
        currentDay = currentEventDay
        currentColumn = maxDailyColumn + 1
        maxDailyColumn = currentColumn
      } else if (index > 0) {
        // Find a column where the event does not overlap with the previous ones
        const availableColumn = Object.keys(
          lastEndTimeByColumn[currentEventDay],
        ).find(
          (column) =>
            lastEndTimeByColumn[currentEventDay][column] <= currentEventStart,
        )

        if (availableColumn) {
          // If an available column is found, use it
          currentColumn = parseInt(availableColumn)
        } else {
          // Otherwise, increment the column
          currentColumn = maxDailyColumn + 1
        }
      }

      maxDailyColumn = Math.max(maxDailyColumn, currentColumn)
      lastEndTimeByColumn[currentEventDay][currentColumn] = currentEventEnd

      // Assign the current column to the event
      event.gridColumnStart = currentColumn
      event.gridColumnEnd = currentColumn // Assuming events take up only one column
    })
  }

  assignRowsToEvents() {
    // Sort events by day and start time to compare overlapping times
    const sortedSchedule = this.sortEventsByDayAndTime(this.schedule)

    sortedSchedule.forEach((event) => {
      // Convert start and end times to grid rows
      const startRow = this.convertTimeToGridRow(event.timeSlot.split(' - ')[0])
      const endRow = this.convertTimeToGridRow(event.timeSlot.split(' - ')[1])

      // Assign the start and end rows to the event
      event.gridRowStart = startRow
      event.gridRowEnd = endRow // endRow is inclusive in CSS Grid
    })
  }

  convertTimeToGridRow(time: string): number {
    // Assuming grid starts at 08:00 as row 2, each half-hour block is a new row
    const baseTime = new Date(0, 0, 0, 8, 0) // Base time corresponding to row 2
    const timeParts = time.split(':')
    const eventTime = new Date(
      0,
      0,
      0,
      parseInt(timeParts[0]),
      parseInt(timeParts[1]),
    )
    const diffMinutes = (eventTime.getTime() - baseTime.getTime()) / (1000 * 60)
    return 1 + diffMinutes / 30 // Calculate row based on 30-minute increments
  }
  ngOnInit() {
    this.schedule = this.scheduleService.getSchedule()
    this.assignColumnsToEvents()
    this.assignRowsToEvents()
    this.generateTimeSlots()
    this.calculateHeaderColumns()
    const baseColors = ['#FF8C00', '#3399FF', '#3CB371', '#CFA0E9'] // Orange, Blue, Green, Purple in hex
    this.groupColours = this.scheduleService.generateColorShades(baseColors)
    console.log()
  }

  calculateHeaderColumns() {
    const daysOrder = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday']
    let currentStartColumn = 2 // Assuming the first column is for time slots

    daysOrder.forEach((day) => {
      const eventsForDay = this.schedule.filter((event) => event.day === day)
      const maxColumnForDay = eventsForDay.reduce(
        (max, event) => Math.max(max, event.gridColumnEnd),
        1,
      )
      this.headerColumns[day] = {
        start: currentStartColumn,
        span: maxColumnForDay - currentStartColumn + 1,
      }
      currentStartColumn = maxColumnForDay + 1 // Prepare for the next day
    })
  }

  generateTimeSlots() {
    let startTime = new Date(2023, 0, 1, 8, 30) // Starting at 8:30
    for (let i = 0; i < 20; i++) {
      // Assuming you want 20 slots of 30 minutes
      let endTime = new Date(startTime.getTime() + 30 * 60000) // 30 minutes later
      this.timeSlots.push({
        start: this.formatTime(startTime),
        end: this.formatTime(endTime),
      })
      startTime = endTime // Set start time for the next slot
    }
  }

  formatTime(date: Date): string {
    return date
      .toLocaleTimeString(navigator.language, {
        hour: '2-digit',
        minute: '2-digit',
        hour12: false,
      })
      .replace(/:\d{2}\s/, '') // Remove seconds and AM/PM for clarity
  }

  convertTimeToMinutes(time: string): number {
    const [hours, minutes] = time.split(':').map(Number)
    return hours * 60 + minutes
  }

  getEventColor(event: ScheduleEvent): string {
    const [course, group] = event.class.split('-')
    // Assuming groupColours is a property with the correct structure
    // e.g., groupColours = { 'BC1': { 'G1': '#color', ... }, ... }
    return this.groupColours[course][group]
  }
}
