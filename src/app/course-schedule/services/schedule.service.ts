import { Injectable } from '@angular/core'

export interface ScheduleEvent {
  day: string
  roomNumber: string
  timeSlot: string
  class: string
  lecturer: string
  capacity: number
  tutors?: string[]
  color?: string
  gridColumnStart?: number
  gridColumnEnd?: number
  gridRowStart?: number
  gridRowEnd?: number
}

interface TimeSlotEventGroup {
  timeSlot: string
  events: ScheduleEvent[]
}

interface GroupColor {
  [group: string]: string
}

interface CourseGroupColors {
  [course: string]: GroupColor
}

@Injectable({
  providedIn: 'root',
})
export class ScheduleService {
  private scheduleData: ScheduleEvent[] = [
    {
      day: 'Monday',
      roomNumber: '012.10.005',
      timeSlot: '08:30 - 10:30',
      class: 'BC1-G1-1',
      lecturer: 'Lead',
      capacity: 120,
    },
    {
      day: 'Monday',
      roomNumber: '012.10.006',
      timeSlot: '08:30 - 10:30',
      class: 'BC1-G2-1',
      lecturer: 'Lead',
      capacity: 150,
    },
    {
      day: 'Monday',
      roomNumber: '012.10.005',
      timeSlot: '09:30 - 11:30',
      class: 'WBC-G2-1',
      lecturer: 'Lead',
      capacity: 120,
    },
    {
      day: 'Monday',
      roomNumber: '012.10.005',
      timeSlot: '10:30 - 12:30',
      class: 'BC1-G3-1',
      lecturer: 'Lead',
      capacity: 120,
    },
    {
      day: 'Monday',
      roomNumber: '012.10.006',
      timeSlot: '10:30 - 12:30',
      class: 'BC1-G4-1',
      lecturer: 'Lead',
      capacity: 150,
    },
    {
      day: 'Monday',
      roomNumber: '012.10.005',
      timeSlot: '12:30 - 14:30',
      class: 'BC1-G5-1',
      lecturer: 'Lead',
      capacity: 120,
    },
    {
      day: 'Monday',
      roomNumber: '012.10.006',
      timeSlot: '12:30 - 14:30',
      class: 'BC1-G6-1',
      lecturer: 'Lead',
      capacity: 150,
    },
    {
      day: 'Monday',
      roomNumber: '012.10.005',
      timeSlot: '14:30 - 16:30',
      class: 'WBC-G1-1',
      lecturer: 'Lead',
      capacity: 120,
    },
    {
      day: 'Monday',
      roomNumber: '012.10.006',
      timeSlot: '14:30 - 16:30',
      class: 'BC2-G2-1',
      lecturer: 'Lead',
      capacity: 150,
    },
    {
      day: 'Monday',
      roomNumber: '012.10.005',
      timeSlot: '16:30 - 18:30',
      class: 'BC1-G7-1',
      lecturer: 'Lead',
      capacity: 120,
    },
    {
      day: 'Monday',
      roomNumber: '012.10.006',
      timeSlot: '16:30 - 18:30',
      class: 'BC2-G2-1',
      lecturer: 'Lead',
      capacity: 150,
    },
    {
      day: 'Tuesday',
      roomNumber: '012.10.005',
      timeSlot: '08:30 - 10:30',
      class: 'BC1-G1-2',
      lecturer: 'Lead',
      capacity: 120,
    },
    {
      day: 'Tuesday',
      roomNumber: '012.10.006',
      timeSlot: '08:30 - 10:30',
      class: 'BC1-G2-2',
      lecturer: 'Lead',
      capacity: 150,
    },
    {
      day: 'Tuesday',
      roomNumber: '012.10.005',
      timeSlot: '10:30 - 12:30',
      class: 'BC1-G3-2',
      lecturer: 'Lead',
      capacity: 120,
    },
    {
      day: 'Tuesday',
      roomNumber: '012.10.006',
      timeSlot: '10:30 - 12:30',
      class: 'BC1-G4-2',
      lecturer: 'Lead',
      capacity: 150,
    },
    {
      day: 'Tuesday',
      roomNumber: '012.10.005',
      timeSlot: '12:30 - 14:30',
      class: 'BC1-G5-2',
      lecturer: 'Lead',
      capacity: 120,
    },
    {
      day: 'Tuesday',
      roomNumber: '012.10.006',
      timeSlot: '12:30 - 14:30',
      class: 'BC1-G6-2',
      lecturer: 'Lead',
      capacity: 150,
    },
    {
      day: 'Tuesday',
      roomNumber: '012.10.005',
      timeSlot: '14:30 - 16:30',
      class: 'WBC-G1-2',
      lecturer: 'Lead',
      capacity: 120,
    },
    {
      day: 'Tuesday',
      roomNumber: '012.10.006',
      timeSlot: '14:30 - 16:30',
      class: 'BC2-G1-2',
      lecturer: 'Lead',
      capacity: 150,
    },
    {
      day: 'Tuesday',
      roomNumber: '014.09.023',
      timeSlot: '14:30 - 16:30',
      class: 'WBC-G2-2',
      lecturer: 'Lead',
      capacity: 60,
    },
    {
      day: 'Tuesday',
      roomNumber: '012.10.005',
      timeSlot: '16:30 - 18:30',
      class: 'BC1-G7-2',
      lecturer: 'Lead',
      capacity: 120,
    },
    {
      day: 'Tuesday',
      roomNumber: '012.10.006',
      timeSlot: '16:30 - 18:30',
      class: 'BC2-G2-2',
      lecturer: 'Lead',
      capacity: 150,
    },
    {
      day: 'Wednesday',
      roomNumber: '012.10.005',
      timeSlot: '08:30 - 10:30',
      class: 'BC1-G1-A',
      lecturer: 'Lead',
      capacity: 120,
    },
    {
      day: 'Wednesday',
      roomNumber: '012.10.006',
      timeSlot: '08:30 - 10:30',
      class: 'BC1-G2-A',
      lecturer: 'Lead',
      capacity: 150,
    },
    {
      day: 'Wednesday',
      roomNumber: '012.10.005',
      timeSlot: '10:30 - 12:30',
      class: 'BC1-G3-A',
      lecturer: 'Lead',
      capacity: 120,
    },
    {
      day: 'Wednesday',
      roomNumber: '012.10.006',
      timeSlot: '10:30 - 12:30',
      class: 'BC1-G4-A',
      lecturer: 'Lead',
      capacity: 150,
    },
    {
      day: 'Wednesday',
      roomNumber: '012.10.005',
      timeSlot: '12:30 - 14:30',
      class: 'BC1-G5-A',
      lecturer: 'Lead',
      capacity: 120,
    },
    {
      day: 'Wednesday',
      roomNumber: '012.10.006',
      timeSlot: '12:30 - 14:30',
      class: 'BC1-G6-A',
      lecturer: 'Lead',
      capacity: 150,
    },
    {
      day: 'Wednesday',
      roomNumber: '012.10.005',
      timeSlot: '14:30 - 16:30',
      class: 'BC2-G1-3',
      lecturer: 'Lead',
      capacity: 120,
    },
    {
      day: 'Wednesday',
      roomNumber: '012.10.006',
      timeSlot: '14:30 - 16:30',
      class: 'BC1-G7-A',
      lecturer: 'Lead',
      capacity: 150,
    },
    {
      day: 'Wednesday',
      roomNumber: '012.10.005',
      timeSlot: '16:30 - 18:30',
      class: 'BC2-G2-3',
      lecturer: 'Lead',
      capacity: 120,
    },
    {
      day: 'Thursday',
      roomNumber: '012.10.005',
      timeSlot: '09:00 - 11:00',
      class: 'WBC-G2-3',
      lecturer: 'Lead',
      capacity: 120,
    },
    {
      day: 'Thursday',
      roomNumber: '012.10.005',
      timeSlot: '14:30 - 16:30',
      class: 'BC2-G1-A',
      lecturer: 'Lead',
      capacity: 120,
    },
    {
      day: 'Thursday',
      roomNumber: '012.10.006',
      timeSlot: '14:30 - 16:30',
      class: 'WBC-G1-3',
      lecturer: 'Lead',
      capacity: 150,
    },
    {
      day: 'Thursday',
      roomNumber: '012.10.005',
      timeSlot: '16:30 - 18:30',
      class: 'BC2-G2-A',
      lecturer: 'Lead',
      capacity: 120,
    },
    {
      day: 'Friday',
      roomNumber: '012.10.005',
      timeSlot: '08:30 - 10:30',
      class: 'BC1-G1-3',
      lecturer: 'Lead',
      capacity: 120,
    },
    {
      day: 'Friday',
      roomNumber: '012.10.006',
      timeSlot: '08:30 - 10:30',
      class: 'BC1-G2-3',
      lecturer: 'Lead',
      capacity: 150,
    },
    {
      day: 'Friday',
      roomNumber: '014.09.023',
      timeSlot: '08:30 - 10:30',
      class: 'WBC-G2-A',
      lecturer: 'Lead',
      capacity: 60,
    },
    {
      day: 'Friday',
      roomNumber: '012.10.005',
      timeSlot: '10:30 - 12:30',
      class: 'BC1-G1-3',
      lecturer: 'Lead',
      capacity: 120,
    },
    {
      day: 'Friday',
      roomNumber: '012.10.006',
      timeSlot: '10:30 - 12:30',
      class: 'BC1-G4-3',
      lecturer: 'Lead',
      capacity: 150,
    },
    {
      day: 'Friday',
      roomNumber: '012.10.005',
      timeSlot: '12:30 - 14:30',
      class: 'BC1-G5-3',
      lecturer: 'Lead',
      capacity: 120,
    },
    {
      day: 'Friday',
      roomNumber: '012.10.006',
      timeSlot: '12:30 - 14:30',
      class: 'BC1-G6-3',
      lecturer: 'Lead',
      capacity: 150,
    },
    {
      day: 'Friday',
      roomNumber: '012.10.005',
      timeSlot: '14:30 - 16:30',
      class: 'BC1-G7-3',
      lecturer: 'Lead',
      capacity: 120,
    },
  ]

  constructor() {}

  private calculateTutors(capacity: number): string[] {
    // Subtract 30 from the capacity, divide by 30, and round up
    const numberOfTutors = Math.ceil((capacity - 30) / 30)
    // Create an array of tutor names based on the number calculated
    return Array.from(
      { length: numberOfTutors },
      (_, index) => `Tutor ${index + 1}`,
    )
  }

  getSchedule() {
    return this.scheduleData
  }
}
