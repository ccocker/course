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
  private occupiedColumnsByTime: Record<string, number> = {}
  headerColumns: Record<string, { start: number; span: number }> = {}

  maxDailyColumn = 2
  currentColumn: number = 2

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

  constructor(
    private scheduleService: ScheduleService,
    private colorService: ColorService,
  ) {}

  // Helper function to check if two events overlap
  eventsOverlap(event1: ScheduleEvent, event2: ScheduleEvent): boolean {
    const start1 = this.convertTimeToMinutes(event1.timeSlot.split(' - ')[0])
    const end1 = this.convertTimeToMinutes(event1.timeSlot.split(' - ')[1])
    const start2 = this.convertTimeToMinutes(event2.timeSlot.split(' - ')[0])
    const end2 = this.convertTimeToMinutes(event2.timeSlot.split(' - ')[1])

    return start1 < end2 && end1 > start2
  }

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

    const colorConfig = {
      BC1: '#FFA500',
      BC2: '#008000',
      WBC: '#0000ff',
      // Add more mappings as needed
    }

    // Apply color configuration
    //this.schedule = this.colorService.addColorsToObjects(this.schedule, colorConfig);
    // this.groupColours = this.scheduleService.assignColorsToGroups();

    console.log(this.schedule)
    console.log(this.timeSlots)
  }

  sortEventsByStartTime(schedule: ScheduleEvent[]): ScheduleEvent[] {
    return schedule.sort((a, b) => {
      return (
        this.convertTimeToMinutes(a.timeSlot.split(' - ')[0]) -
        this.convertTimeToMinutes(b.timeSlot.split(' - ')[0])
      )
    })
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

  // Calculate the row span for each event based on the time duration
  calculateRowSpan(event: any): number {
    const startTime = event.timeSlot.split(' - ')[0]
    const endTime = event.timeSlot.split(' - ')[1]
    const startHour = parseInt(startTime.split(':')[0], 10)
    const endHour = parseInt(endTime.split(':')[0], 10)
    const startMinute = parseInt(startTime.split(':')[1], 10)
    const endMinute = parseInt(endTime.split(':')[1], 10)
    const totalMinutes = (endHour - startHour) * 60 + (endMinute - startMinute)
    const rowSpan = totalMinutes / 30 // Assuming each row represents 30 minutes
    return rowSpan
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

  getGridRow(eventTime: string, isStart: boolean): number {
    const eventTimeMinutes = this.convertTimeToMinutes(eventTime)

    // Find the timeslot index for either the start time or the end time
    const slotIndex = this.timeSlots.findIndex((slot) => {
      const startTimeMinutes = this.convertTimeToMinutes(slot.start)
      const endTimeMinutes = this.convertTimeToMinutes(slot.end)
      return isStart
        ? eventTimeMinutes >= startTimeMinutes
        : eventTimeMinutes < endTimeMinutes
    })

    // Adjust for the header row and the fact that grid rows are 1-based
    return slotIndex + 2
  }

  findIndexOfCurrentEvent(currentEvent: ScheduleEvent): number {
    // Assuming 'schedule' is the array of ScheduleEvent objects
    return this.schedule.findIndex(
      (event) => event.class === currentEvent.class,
    )
  }

  // Add a method to get the color based on the event's class and group number
  getEventColor(event: ScheduleEvent): string {
    const [course, group] = event.class.split('-')
    // Assuming groupColours is a property with the correct structure
    // e.g., groupColours = { 'BC1': { 'G1': '#color', ... }, ... }
    return this.groupColours[course][group]
  }
}
