export enum DayOfWeek {
  Monday = 'MONDAY',
  Tuesday = 'TUESDAY',
  Wednesday = 'WEDNESDAY',
  Thursday = 'THURSDAY',
  Friday = 'FRIDAY',
  Saturday = 'SATURDAY',
  Sunday = 'SUNDAY',
}

export interface Timeslot {
  startTime: string
  endTime: string
}

export interface Staff {
  enumber: string
  firstName: string
  lastName: string
  pEmail: string
  rEmail: string
  phone: string
  qualification: string
  type: string
  isAvailable: boolean
}

export interface Course {
  code: string
  name: string
  description: string
  baseColour: string
  offerings: Offering[]
}

export interface Offering {
  startDate: Date
  finishDate: Date
  teachStartDate: Date
  teachFinishDate: Date
}

export interface OfferingGroup {
  lead: Staff
  group: number
  offering: Offering
}

export interface Room {
  buildingNo: number
  floor: number
  roomNumber: number
  capacity: number
}

export interface GroupClasses {
  classNumber: number
  day: DayOfWeek
  timeslot: Timeslot
  room: Room
  staff: Staff[]
  offeringGroup: OfferingGroup
}

export interface ScheduleEvent {
  class: GroupClasses // Link directly to a specific class
  course: Course // Link directly to a specific course
  // UI-specific properties
  gridColumnStart?: number
  gridColumnEnd?: number
  gridRowStart?: number
  gridRowEnd?: number
  color?: string // Optional color for UI purposes
}
