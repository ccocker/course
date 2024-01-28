import { IPerson } from '@miCommon/interfaces/';
export enum DayOfWeek {
  Monday = 'MONDAY',
  Tuesday = 'TUESDAY',
  Wednesday = 'WEDNESDAY',
  Thursday = 'THURSDAY',
  Friday = 'FRIDAY',
  Saturday = 'SATURDAY',
  Sunday = 'SUNDAY',
}

/**
 * Skill interface representing the required teaching skills for a class.
 */
export interface ISkill {
  id: string;
  name: string;
  description: string;
}

/**
 * TeachingSkills interface representing an array of required skills for a class.
 */
export interface ITeachingSkills {
  skills: ISkill[];
}

export interface ITimeslot {
  startTime: string;
  endTime: string;
}

export interface IStaff extends IPerson {
  enumber: string;
}

export interface ICourse {
  code: string;
  name: string;
  description: string;
  teachingSkills: ISkill[];
  baseColour: string;
  coordinator: any;
}

export interface IOffering {
  courseCode: string;
  startDate: Date;
  finishDate: Date;
  teachStartDate: Date;
  teachFinishDate: Date;
}

export interface IOfferingGroup {
  offeringCode: any;
  leadName: string;
  group: number;
  groupCapacity: number;
}

export interface IRoom {
  buildingNo: number;
  floor: number;
  roomNumber: number;
  capacity: number;
}

export interface IGroupClasses {
  offeringGroupCode: any;
  roomCode: any;
  leadName: any;
  staffCodes: any[];
  classNumber: number;
  day: DayOfWeek;
  timeslot: ITimeslot;
}

export interface IScheduleEvent {
  class: IGroupClasses; // Link directly to a specific class
  course: ICourse; // Link directly to a specific course
  // UI-specific properties
  gridColumnStart?: number;
  gridColumnEnd?: number;
  gridRowStart?: number;
  gridRowEnd?: number;
  color?: string; // Optional color for UI purposes
}
