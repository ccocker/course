import { Injectable } from '@angular/core'
import { ISkill } from '../interfaces/schedule.interface'
import { ColorService } from './color.service'

import {
  IRoom,
  ITimeslot,
  IStaff,
  ICourse,
  IOffering,
  IOfferingGroup,
  IGroupClasses,
  DayOfWeek,
  IScheduleEvent,
} from '../interfaces/schedule.interface'

@Injectable({
  providedIn: 'root',
})
export class ScheduleService {
  private colorService: ColorService = new ColorService()
  private scheduleData: IScheduleEvent[] = [
    {
      class: this.getGroupClasses()[0],
      course: this.getAllCourses()[0],
    },
    {
      class: this.getGroupClasses()[1],
      course: this.getAllCourses()[0],
    },
    {
      class: this.getGroupClasses()[2],
      course: this.getAllCourses()[2],
    },
    {
      class: this.getGroupClasses()[3],
      course: this.getAllCourses()[0],
    },
    {
      class: this.getGroupClasses()[4],
      course: this.getAllCourses()[0],
    },
    {
      class: this.getGroupClasses()[5],
      course: this.getAllCourses()[0],
    },
    {
      class: this.getGroupClasses()[6],
      course: this.getAllCourses()[0],
    },
    {
      class: this.getGroupClasses()[7],
      course: this.getAllCourses()[2],
    },
    {
      class: this.getGroupClasses()[8],
      course: this.getAllCourses()[1],
    },
    {
      class: this.getGroupClasses()[9],
      course: this.getAllCourses()[0],
    },
    {
      class: this.getGroupClasses()[10],
      course: this.getAllCourses()[1],
    },
    {
      class: this.getGroupClasses()[11],
      course: this.getAllCourses()[0],
    },
    {
      class: this.getGroupClasses()[12],
      course: this.getAllCourses()[0],
    },
    {
      class: this.getGroupClasses()[13],
      course: this.getAllCourses()[0],
    },
    {
      class: this.getGroupClasses()[14],
      course: this.getAllCourses()[0],
    },
    {
      class: this.getGroupClasses()[15],
      course: this.getAllCourses()[0],
    },
    {
      class: this.getGroupClasses()[16],
      course: this.getAllCourses()[0],
    },
    {
      class: this.getGroupClasses()[17],
      course: this.getAllCourses()[2],
    },
    {
      class: this.getGroupClasses()[18],
      course: this.getAllCourses()[1],
    },
    {
      class: this.getGroupClasses()[19],
      course: this.getAllCourses()[2],
    },
    {
      class: this.getGroupClasses()[20],
      course: this.getAllCourses()[0],
    },
    {
      class: this.getGroupClasses()[21],
      course: this.getAllCourses()[1],
    },
    {
      class: this.getGroupClasses()[22],
      course: this.getAllCourses()[0],
    },
    {
      class: this.getGroupClasses()[23],
      course: this.getAllCourses()[0],
    },
    {
      class: this.getGroupClasses()[24],
      course: this.getAllCourses()[0],
    },
    {
      class: this.getGroupClasses()[25],
      course: this.getAllCourses()[0],
    },
    {
      class: this.getGroupClasses()[26],
      course: this.getAllCourses()[0],
    },
    {
      class: this.getGroupClasses()[27],
      course: this.getAllCourses()[0],
    },
    {
      class: this.getGroupClasses()[28],
      course: this.getAllCourses()[1],
    },
    {
      class: this.getGroupClasses()[29],
      course: this.getAllCourses()[0],
    },
    {
      class: this.getGroupClasses()[30],
      course: this.getAllCourses()[1],
    },
    {
      class: this.getGroupClasses()[31],
      course: this.getAllCourses()[2],
    },
    {
      class: this.getGroupClasses()[32],
      course: this.getAllCourses()[1],
    },
    {
      class: this.getGroupClasses()[33],
      course: this.getAllCourses()[2],
    },
    {
      class: this.getGroupClasses()[34],
      course: this.getAllCourses()[1],
    },
    {
      class: this.getGroupClasses()[35],
      course: this.getAllCourses()[0],
    },
    {
      class: this.getGroupClasses()[36],
      course: this.getAllCourses()[0],
    },
    {
      class: this.getGroupClasses()[37],
      course: this.getAllCourses()[2],
    },
    {
      class: this.getGroupClasses()[38],
      course: this.getAllCourses()[0],
    },
    {
      class: this.getGroupClasses()[39],
      course: this.getAllCourses()[0],
    },
    {
      class: this.getGroupClasses()[40],
      course: this.getAllCourses()[0],
    },
    {
      class: this.getGroupClasses()[41],
      course: this.getAllCourses()[0],
    },
    {
      class: this.getGroupClasses()[42],
      course: this.getAllCourses()[0],
    },
    {
      class: this.getGroupClasses()[43],
      course: this.getAllCourses()[2],
    },
  ]

  constructor() {}

  private getRooms(): IRoom[] {
    const existingRooms: IRoom[] = [
      { buildingNo: 12, floor: 10, roomNumber: 5, capacity: 120 },
      { buildingNo: 12, floor: 10, roomNumber: 6, capacity: 150 },
      { buildingNo: 14, floor: 9, roomNumber: 23, capacity: 60 },
    ]
    return existingRooms
  }

  private getTimeSlots(): ITimeslot[] {
    const slots: ITimeslot[] = [
      { startTime: '08:30', endTime: '10:30' },
      { startTime: '09:00', endTime: '11:00' },
      { startTime: '10:30', endTime: '12:30' },
      { startTime: '12:30', endTime: '14:30' },
      { startTime: '14:30', endTime: '16:30' },
      { startTime: '16:30', endTime: '18:30' },
      { startTime: '18:30', endTime: '20:30' },
      { startTime: '06:30', endTime: '08:30' },
    ]
    return slots
  }

  getStaff(): IStaff[] {
    const staff: IStaff[] = [
      {
        enumber: 'E07581',
        firstName: 'Henry',
        lastName: 'Cavill',
        pEmail: 'henry.cavill@thepridelands.za',
        rEmail: 'henry.cavill@rmit.edu.au',
        phone: '0411 123 123',
        qualification: 'Masters',
        type: 'Lead',
        isAvailable: true,
      },
      {
        enumber: 'E07583',
        firstName: 'Matt',
        lastName: 'Bomer',
        pEmail: 'matt.bomer@thepridelands.za',
        rEmail: 'matt.bomer@rmit.edu.au',
        phone: '0411 123 123',
        qualification: 'Masters',
        type: 'Lead',
        isAvailable: true,
      },
      {
        enumber: 'E07582',
        firstName: 'Rodney',
        lastName: 'Cocker',
        pEmail: 'simba@thepridelands.za',
        rEmail: 'rodneyian.cocker@rmit.edu.a',
        phone: '0411 123 123',
        qualification: 'Masters',
        type: 'Tutor',
        isAvailable: true,
      },
      {
        enumber: 'E07584',
        firstName: 'David',
        lastName: 'Leon',
        pEmail: 'david.leon@thepridelands.za',
        rEmail: 'david.leon@rmit.edu.au',
        phone: '0411 123 123',
        qualification: 'Masters',
        type: 'Tutor',
        isAvailable: true,
      },
      {
        enumber: 'E07585',
        firstName: 'Paul',
        lastName: 'Walker',
        pEmail: 'paul.walker@thepridelands.za',
        rEmail: 'paul.walker@rmit.edu.au',
        phone: '0411 123 123',
        qualification: 'Masters',
        type: 'Tutor',
        isAvailable: true,
      },
      {
        enumber: 'E07586',
        firstName: 'Ian',
        lastName: 'Somerhalder',
        pEmail: 'ian.somerhalder@thepridelands.za',
        rEmail: 'ian.somerhalder@rmit.edu.au',
        phone: '0411 123 123',
        qualification: 'Masters',
        type: 'Tutor',
        isAvailable: true,
      },
      {
        enumber: 'E07587',
        firstName: 'Alex',
        lastName: "O'Laoughlin",
        pEmail: 'alex.olaoughlin@thepridelands.za',
        rEmail: 'alex.aolaoughlin@rmit.edu.au',
        phone: '0411 123 123',
        qualification: 'Masters',
        type: 'Tutor',
        isAvailable: true,
      },
      {
        enumber: 'E07588',
        firstName: 'Nick',
        lastName: 'Henrix',
        pEmail: 'nick.henrix@thepridelands.za',
        rEmail: 'nick.henrix@rmit.edu.au',
        phone: '0411 123 123',
        qualification: 'Masters',
        type: 'Tutor',
        isAvailable: true,
      },
      {
        enumber: 'E07589',
        firstName: 'David James',
        lastName: 'Elliot',
        pEmail: 'david.james.elliot@thepridelands.za',
        rEmail: 'david.james.elliot@rmit.edu.au',
        phone: '0411 123 123',
        qualification: 'Masters',
        type: 'Tutor',
        isAvailable: true,
      },
      {
        enumber: 'E07590',
        firstName: 'Oleg',
        lastName: 'Zagorodnii',
        pEmail: 'oleg.zagorodnii@thepridelands.za',
        rEmail: 'oleg.zagorodnii@rmit.edu.au',
        phone: '0411 123 123',
        qualification: 'Masters',
        type: 'Tutor',
        isAvailable: true,
      },
    ]
    return staff
  }
  skills: ISkill[] = [
    {
      id: 'probsolve',
      name: 'Problem Solving',
      description: 'Ability to solve problems',
    },
    {
      id: 'oodesign',
      name: 'Object Oriented Design',
      description: 'Ability to model data in an objected oriented framework',
    },
  ]

  private getCourseById(id: string): ICourse | null {
    const allCourses: ICourse[] = this.getAllCourses()
    for (const course of allCourses) {
      if (id === course.code) {
        return course
      }
    }
    return null
  }

  private getTutorById(id: string): IStaff | null {
    const allStaff: IStaff[] = this.getStaff()
    for (const staff of allStaff) {
      if (id === staff.enumber) {
        return staff
      }
    }
    return null
  }

  getAllCourses(): ICourse[] {
    const classes: ICourse[] = [
      {
        code: 'BC1',
        name: 'Programming Bootcamp 1',
        description:
          'Learn algorithmic thinkng in the context of object oriented programming',
        baseColour: '#FF8C00',
        teachingSkills: this.skills,
        coordinator: this.getStaff()[0],
      },
      {
        code: 'BC2',
        name: 'Programming Bootcamp 2',
        description: 'Develop your understanding of OO programming through C++',
        baseColour: '#3399FF',
        teachingSkills: this.skills,
        coordinator: this.getStaff()[0],
      },
      {
        code: 'WBC',
        name: 'Web Bootcamp',
        description: 'Learn HTML, CSS and Javascript',
        baseColour: '#3CB371',
        teachingSkills: this.skills,
        coordinator: this.getStaff()[0],
      },
      {
        code: 'PS1',
        name: 'Programming Studio 1',
        description:
          'Learn to develop a technology product for a target market that focusses on solving an aspect of a social challenge.',
        baseColour: '#3CB371',
        teachingSkills: this.skills,
        coordinator: this.getStaff()[0],
      },
    ]
    return classes
  }

  private getOfferings(): IOffering[] {
    const offerings: IOffering[] = [
      {
        startDate: new Date('2024-03-04T08:30:00'),
        finishDate: new Date('2024-06-30T23:59:00'),
        teachStartDate: new Date('2024-03-04T08:30:00'),
        teachFinishDate: new Date('2024-04-30T08:30:00'),
      },
    ]
    return offerings
  }

  private getOfferingGroups(): IOfferingGroup[] {
    const group: IOfferingGroup[] = [
      {
        lead: this.getStaff()[0],
        group: 1,
        groupCapacity: 120,
        offering: this.getOfferings()[0],
      },
      {
        lead: this.getStaff()[1],
        group: 2,
        groupCapacity: 150,
        offering: this.getOfferings()[0],
      },
      {
        lead: this.getStaff()[0],
        group: 3,
        groupCapacity: 120,
        offering: this.getOfferings()[0],
      },
      {
        lead: this.getStaff()[1],
        group: 4,
        groupCapacity: 150,
        offering: this.getOfferings()[0],
      },
      {
        lead: this.getStaff()[0],
        group: 5,
        groupCapacity: 120,
        offering: this.getOfferings()[0],
      },
      {
        lead: this.getStaff()[1],
        group: 6,
        groupCapacity: 150,
        offering: this.getOfferings()[0],
      },
      {
        lead: this.getStaff()[0],
        group: 7,
        groupCapacity: 120,
        offering: this.getOfferings()[0],
      },
      {
        lead: this.getStaff()[0],
        group: 1,
        groupCapacity: 120,
        offering: this.getOfferings()[0],
      },
      {
        lead: this.getStaff()[0],
        group: 2,
        groupCapacity: 120,
        offering: this.getOfferings()[0],
      },
      {
        lead: this.getStaff()[0],
        group: 1,
        groupCapacity: 120,
        offering: this.getOfferings()[0],
      },
      {
        lead: this.getStaff()[0],
        group: 2,
        groupCapacity: 60,
        offering: this.getOfferings()[0],
      },
    ]
    return group
  }

  private getTutors(): IStaff[] {
    const tutors: IStaff[] = []
    const staffMembers = this.getStaff()

    for (let staff of staffMembers) {
      if (staff.type !== 'Lead') {
        tutors.push(staff)
      }
    }

    return tutors
  }

  private getGroupClasses(): IGroupClasses[] {
    const classes: IGroupClasses[] = [
      {
        classNumber: 1,
        day: DayOfWeek.Monday,
        timeslot: this.getTimeSlots()[0],
        room: this.getRooms()[0],
        staff: this.assignSpecificTutorsToClass(['E07582', 'E07584']),
        offeringGroup: this.getOfferingGroups()[0],
      },
      {
        classNumber: 1,
        day: DayOfWeek.Monday,
        timeslot: this.getTimeSlots()[0],
        room: this.getRooms()[1],
        staff: this.assignTutorsToClass(
          this.getOfferingGroups()[1].groupCapacity,
        ),
        offeringGroup: this.getOfferingGroups()[1],
      },
      {
        classNumber: 1,
        day: DayOfWeek.Monday,
        timeslot: this.getTimeSlots()[1],
        room: this.getRooms()[2],
        staff: this.assignSpecificTutorsToClass(['']),
        offeringGroup: this.getOfferingGroups()[10],
      },
      {
        classNumber: 1,
        day: DayOfWeek.Monday,
        timeslot: this.getTimeSlots()[2],
        room: this.getRooms()[0],
        staff: this.assignTutorsToClass(
          this.getOfferingGroups()[2].groupCapacity,
        ),
        offeringGroup: this.getOfferingGroups()[2],
      },
      {
        classNumber: 1,
        day: DayOfWeek.Monday,
        timeslot: this.getTimeSlots()[2],
        room: this.getRooms()[1],
        staff: this.assignTutorsToClass(
          this.getOfferingGroups()[3].groupCapacity,
        ),
        offeringGroup: this.getOfferingGroups()[3],
      },
      {
        classNumber: 1,
        day: DayOfWeek.Monday,
        timeslot: this.getTimeSlots()[3],
        room: this.getRooms()[0],
        staff: this.assignTutorsToClass(
          this.getOfferingGroups()[4].groupCapacity,
        ),
        offeringGroup: this.getOfferingGroups()[4],
      },
      {
        classNumber: 1,
        day: DayOfWeek.Monday,
        timeslot: this.getTimeSlots()[3],
        room: this.getRooms()[1],
        staff: this.assignTutorsToClass(
          this.getOfferingGroups()[5].groupCapacity,
        ),
        offeringGroup: this.getOfferingGroups()[5],
      },
      {
        classNumber: 1,
        day: DayOfWeek.Monday,
        timeslot: this.getTimeSlots()[4],
        room: this.getRooms()[0],
        staff: this.assignTutorsToClass(
          this.getOfferingGroups()[9].groupCapacity,
        ),
        offeringGroup: this.getOfferingGroups()[9],
      },
      {
        classNumber: 1,
        day: DayOfWeek.Monday,
        timeslot: this.getTimeSlots()[4],
        room: this.getRooms()[1],
        staff: this.assignTutorsToClass(
          this.getOfferingGroups()[7].groupCapacity,
        ),
        offeringGroup: this.getOfferingGroups()[7],
      },
      {
        classNumber: 1,
        day: DayOfWeek.Monday,
        timeslot: this.getTimeSlots()[5],
        room: this.getRooms()[0],
        staff: this.assignTutorsToClass(
          this.getOfferingGroups()[6].groupCapacity,
        ),
        offeringGroup: this.getOfferingGroups()[6],
      },
      {
        classNumber: 2,
        day: DayOfWeek.Monday,
        timeslot: this.getTimeSlots()[5],
        room: this.getRooms()[1],
        staff: this.assignTutorsToClass(
          this.getOfferingGroups()[8].groupCapacity,
        ),
        offeringGroup: this.getOfferingGroups()[8],
      },
      {
        classNumber: 2,
        day: DayOfWeek.Tuesday,
        timeslot: this.getTimeSlots()[0],
        room: this.getRooms()[0],
        staff: this.assignTutorsToClass(
          this.getOfferingGroups()[0].groupCapacity,
        ),
        offeringGroup: this.getOfferingGroups()[0],
      },
      {
        classNumber: 2,
        day: DayOfWeek.Tuesday,
        timeslot: this.getTimeSlots()[0],
        room: this.getRooms()[1],
        staff: this.assignTutorsToClass(
          this.getOfferingGroups()[1].groupCapacity,
        ),
        offeringGroup: this.getOfferingGroups()[1],
      },
      {
        classNumber: 2,
        day: DayOfWeek.Tuesday,
        timeslot: this.getTimeSlots()[2],
        room: this.getRooms()[0],
        staff: this.assignTutorsToClass(
          this.getOfferingGroups()[2].groupCapacity,
        ),
        offeringGroup: this.getOfferingGroups()[2],
      },
      {
        classNumber: 2,
        day: DayOfWeek.Tuesday,
        timeslot: this.getTimeSlots()[2],
        room: this.getRooms()[1],
        staff: this.assignTutorsToClass(
          this.getOfferingGroups()[3].groupCapacity,
        ),
        offeringGroup: this.getOfferingGroups()[3],
      },
      {
        classNumber: 2,
        day: DayOfWeek.Tuesday,
        timeslot: this.getTimeSlots()[3],
        room: this.getRooms()[0],
        staff: this.assignTutorsToClass(
          this.getOfferingGroups()[4].groupCapacity,
        ),
        offeringGroup: this.getOfferingGroups()[4],
      },
      {
        classNumber: 2,
        day: DayOfWeek.Tuesday,
        timeslot: this.getTimeSlots()[3],
        room: this.getRooms()[1],
        staff: this.assignSpecificTutorsToClass(['E07582', 'E07584', 'E07585']),
        offeringGroup: this.getOfferingGroups()[5],
      },
      {
        classNumber: 2,
        day: DayOfWeek.Tuesday,
        timeslot: this.getTimeSlots()[4],
        room: this.getRooms()[0],
        staff: this.assignTutorsToClass(
          this.getOfferingGroups()[9].groupCapacity,
        ),
        offeringGroup: this.getOfferingGroups()[9],
      },
      {
        classNumber: 2,
        day: DayOfWeek.Tuesday,
        timeslot: this.getTimeSlots()[4],
        room: this.getRooms()[1],
        staff: this.assignTutorsToClass(
          this.getOfferingGroups()[7].groupCapacity,
        ),
        offeringGroup: this.getOfferingGroups()[7],
      },
      {
        classNumber: 2,
        day: DayOfWeek.Tuesday,
        timeslot: this.getTimeSlots()[4],
        room: this.getRooms()[2],
        staff: this.assignTutorsToClass(
          this.getOfferingGroups()[10].groupCapacity,
        ),
        offeringGroup: this.getOfferingGroups()[10],
      },
      {
        classNumber: 2,
        day: DayOfWeek.Tuesday,
        timeslot: this.getTimeSlots()[5],
        room: this.getRooms()[0],
        staff: this.assignTutorsToClass(
          this.getOfferingGroups()[6].groupCapacity,
        ),
        offeringGroup: this.getOfferingGroups()[6],
      },
      {
        classNumber: 2,
        day: DayOfWeek.Tuesday,
        timeslot: this.getTimeSlots()[5],
        room: this.getRooms()[1],
        staff: this.assignTutorsToClass(
          this.getOfferingGroups()[8].groupCapacity,
        ),
        offeringGroup: this.getOfferingGroups()[8],
      },
      {
        classNumber: 3,
        day: DayOfWeek.Wednesday,
        timeslot: this.getTimeSlots()[0],
        room: this.getRooms()[0],
        staff: this.assignTutorsToClass(
          this.getOfferingGroups()[0].groupCapacity,
        ),
        offeringGroup: this.getOfferingGroups()[0],
      },
      {
        classNumber: 3,
        day: DayOfWeek.Wednesday,
        timeslot: this.getTimeSlots()[0],
        room: this.getRooms()[1],
        staff: this.assignTutorsToClass(
          this.getOfferingGroups()[1].groupCapacity,
        ),
        offeringGroup: this.getOfferingGroups()[1],
      },
      {
        classNumber: 3,
        day: DayOfWeek.Wednesday,
        timeslot: this.getTimeSlots()[2],
        room: this.getRooms()[0],
        staff: this.assignTutorsToClass(
          this.getOfferingGroups()[2].groupCapacity,
        ),
        offeringGroup: this.getOfferingGroups()[2],
      },
      {
        classNumber: 3,
        day: DayOfWeek.Wednesday,
        timeslot: this.getTimeSlots()[2],
        room: this.getRooms()[1],
        staff: this.assignTutorsToClass(
          this.getOfferingGroups()[3].groupCapacity,
        ),
        offeringGroup: this.getOfferingGroups()[3],
      },
      {
        classNumber: 3,
        day: DayOfWeek.Wednesday,
        timeslot: this.getTimeSlots()[3],
        room: this.getRooms()[0],
        staff: this.assignTutorsToClass(
          this.getOfferingGroups()[4].groupCapacity,
        ),
        offeringGroup: this.getOfferingGroups()[4],
      },
      {
        classNumber: 3,
        day: DayOfWeek.Wednesday,
        timeslot: this.getTimeSlots()[3],
        room: this.getRooms()[1],
        staff: this.assignTutorsToClass(
          this.getOfferingGroups()[5].groupCapacity,
        ),
        offeringGroup: this.getOfferingGroups()[5],
      },
      {
        classNumber: 3,
        day: DayOfWeek.Wednesday,
        timeslot: this.getTimeSlots()[4],
        room: this.getRooms()[0],
        staff: this.assignTutorsToClass(
          this.getOfferingGroups()[7].groupCapacity,
        ),
        offeringGroup: this.getOfferingGroups()[7],
      },
      {
        classNumber: 3,
        day: DayOfWeek.Wednesday,
        timeslot: this.getTimeSlots()[4],
        room: this.getRooms()[1],
        staff: this.assignTutorsToClass(
          this.getOfferingGroups()[6].groupCapacity,
        ),
        offeringGroup: this.getOfferingGroups()[6],
      },
      {
        classNumber: 3,
        day: DayOfWeek.Wednesday,
        timeslot: this.getTimeSlots()[5],
        room: this.getRooms()[0],
        staff: this.assignTutorsToClass(
          this.getOfferingGroups()[8].groupCapacity,
        ),
        offeringGroup: this.getOfferingGroups()[8],
      },
      {
        classNumber: 3,
        day: DayOfWeek.Thursday,
        timeslot: this.getTimeSlots()[1],
        room: this.getRooms()[0],
        staff: this.assignTutorsToClass(
          this.getOfferingGroups()[10].groupCapacity,
        ),
        offeringGroup: this.getOfferingGroups()[10],
      },
      {
        classNumber: 4,
        day: DayOfWeek.Thursday,
        timeslot: this.getTimeSlots()[4],
        room: this.getRooms()[0],
        staff: this.assignTutorsToClass(
          this.getOfferingGroups()[7].groupCapacity,
        ),
        offeringGroup: this.getOfferingGroups()[7],
      },
      {
        classNumber: 3,
        day: DayOfWeek.Thursday,
        timeslot: this.getTimeSlots()[4],
        room: this.getRooms()[1],
        staff: this.assignTutorsToClass(
          this.getOfferingGroups()[9].groupCapacity,
        ),
        offeringGroup: this.getOfferingGroups()[9],
      },
      {
        classNumber: 4,
        day: DayOfWeek.Thursday,
        timeslot: this.getTimeSlots()[5],
        room: this.getRooms()[0],
        staff: this.assignTutorsToClass(
          this.getOfferingGroups()[8].groupCapacity,
        ),
        offeringGroup: this.getOfferingGroups()[8],
      },
      {
        classNumber: 4,
        day: DayOfWeek.Friday,
        timeslot: this.getTimeSlots()[0],
        room: this.getRooms()[0],
        staff: this.assignTutorsToClass(
          this.getOfferingGroups()[0].groupCapacity,
        ),
        offeringGroup: this.getOfferingGroups()[0],
      },
      {
        classNumber: 4,
        day: DayOfWeek.Friday,
        timeslot: this.getTimeSlots()[0],
        room: this.getRooms()[1],
        staff: this.assignTutorsToClass(
          this.getOfferingGroups()[1].groupCapacity,
        ),
        offeringGroup: this.getOfferingGroups()[1],
      },
      {
        classNumber: 4,
        day: DayOfWeek.Friday,
        timeslot: this.getTimeSlots()[0],
        room: this.getRooms()[2],
        staff: this.assignTutorsToClass(
          this.getOfferingGroups()[10].groupCapacity,
        ),
        offeringGroup: this.getOfferingGroups()[10],
      },
      {
        classNumber: 4,
        day: DayOfWeek.Friday,
        timeslot: this.getTimeSlots()[2],
        room: this.getRooms()[0],
        staff: this.assignTutorsToClass(
          this.getOfferingGroups()[2].groupCapacity,
        ),
        offeringGroup: this.getOfferingGroups()[2],
      },
      {
        classNumber: 4,
        day: DayOfWeek.Friday,
        timeslot: this.getTimeSlots()[2],
        room: this.getRooms()[1],
        staff: this.assignTutorsToClass(
          this.getOfferingGroups()[3].groupCapacity,
        ),
        offeringGroup: this.getOfferingGroups()[3],
      },
      {
        classNumber: 4,
        day: DayOfWeek.Friday,
        timeslot: this.getTimeSlots()[3],
        room: this.getRooms()[0],
        staff: this.assignTutorsToClass(
          this.getOfferingGroups()[4].groupCapacity,
        ),
        offeringGroup: this.getOfferingGroups()[4],
      },
      {
        classNumber: 4,
        day: DayOfWeek.Friday,
        timeslot: this.getTimeSlots()[3],
        room: this.getRooms()[1],
        staff: this.assignTutorsToClass(
          this.getOfferingGroups()[5].groupCapacity,
        ),
        offeringGroup: this.getOfferingGroups()[5],
      },
      {
        classNumber: 4,
        day: DayOfWeek.Friday,
        timeslot: this.getTimeSlots()[4],
        room: this.getRooms()[0],
        staff: this.assignTutorsToClass(
          this.getOfferingGroups()[6].groupCapacity,
        ),
        offeringGroup: this.getOfferingGroups()[6],
      },
      {
        classNumber: 4,
        day: DayOfWeek.Friday,
        timeslot: this.getTimeSlots()[4],
        room: this.getRooms()[1],
        staff: this.assignTutorsToClass(
          this.getOfferingGroups()[9].groupCapacity,
        ),
        offeringGroup: this.getOfferingGroups()[9],
      },
    ]
    return classes
  }

  private assignTutorsToClass(capacity: number): IStaff[] {
    // Calculate the number of tutors needed for the given capacity
    const numberOfTutors = this.calculateTutors(capacity)

    // Get all available tutors
    const allTutors = this.getTutors()

    // Select the needed number of tutors from the available tutors
    const assignedTutors = allTutors.slice(0, numberOfTutors)

    return assignedTutors
  }

  calculateTutors(capacity: number): number {
    // Subtract 30 from the capacity, divide by 30, and round up
    return Math.ceil((capacity - 30) / 30)
  }

  getSchedule() {
    return this.scheduleData
  }

  private assignSpecificTutorsToClass(
    specificStaffIds?: string[],
  ): IStaff[] | null {
    // If specific staff IDs are provided, use them to assign staff
    if (specificStaffIds && specificStaffIds.length > 0) {
      const allStaff = this.getStaff()
      return allStaff.filter(
        (staff) =>
          specificStaffIds.includes(staff.enumber) && staff.type !== 'Lead',
      )
    }
    return null
  }

  public generateColorShades(): Record<string, Record<string, string>> {
    const courses = this.getAllCourses()
    const groupColours: Record<string, Record<string, string>> = {}

    courses.forEach((course) => {
      // Use course's code as key and generate shades for its base color
      groupColours[course.code] = this.colorService.generateShadesForColor(
        course.baseColour,
      )
    })

    return groupColours
  }
}
