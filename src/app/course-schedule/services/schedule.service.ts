import { Injectable } from '@angular/core'
import { ISkill } from '../interfaces/schedule.interface'
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
  private scheduleData: IScheduleEvent[] = [
    {
      class: this.getGroupClasses()[0],
      course: this.getCourses()[0],
    },
    {
      class: this.getGroupClasses()[1],
      course: this.getCourses()[0],
    },
    {
      class: this.getGroupClasses()[2],
      course: this.getCourses()[2],
    },
    {
      class: this.getGroupClasses()[3],
      course: this.getCourses()[0],
    },
    {
      class: this.getGroupClasses()[4],
      course: this.getCourses()[0],
    },
    {
      class: this.getGroupClasses()[5],
      course: this.getCourses()[0],
    },
    {
      class: this.getGroupClasses()[6],
      course: this.getCourses()[0],
    },
    {
      class: this.getGroupClasses()[7],
      course: this.getCourses()[2],
    },
    {
      class: this.getGroupClasses()[8],
      course: this.getCourses()[1],
    },
    {
      class: this.getGroupClasses()[9],
      course: this.getCourses()[0],
    },
    {
      class: this.getGroupClasses()[10],
      course: this.getCourses()[1],
    },
    {
      class: this.getGroupClasses()[11],
      course: this.getCourses()[0],
    },
    {
      class: this.getGroupClasses()[12],
      course: this.getCourses()[0],
    },
    {
      class: this.getGroupClasses()[13],
      course: this.getCourses()[0],
    },
    {
      class: this.getGroupClasses()[14],
      course: this.getCourses()[0],
    },
    {
      class: this.getGroupClasses()[15],
      course: this.getCourses()[0],
    },
    {
      class: this.getGroupClasses()[16],
      course: this.getCourses()[0],
    },
    {
      class: this.getGroupClasses()[17],
      course: this.getCourses()[2],
    },
    {
      class: this.getGroupClasses()[18],
      course: this.getCourses()[1],
    },
    {
      class: this.getGroupClasses()[19],
      course: this.getCourses()[2],
    },
    {
      class: this.getGroupClasses()[20],
      course: this.getCourses()[0],
    },
    {
      class: this.getGroupClasses()[21],
      course: this.getCourses()[1],
    },
    {
      class: this.getGroupClasses()[22],
      course: this.getCourses()[0],
    },
    {
      class: this.getGroupClasses()[23],
      course: this.getCourses()[0],
    },
    {
      class: this.getGroupClasses()[24],
      course: this.getCourses()[0],
    },
    {
      class: this.getGroupClasses()[25],
      course: this.getCourses()[0],
    },
    {
      class: this.getGroupClasses()[26],
      course: this.getCourses()[0],
    },
    {
      class: this.getGroupClasses()[27],
      course: this.getCourses()[0],
    },
    {
      class: this.getGroupClasses()[28],
      course: this.getCourses()[1],
    },
    {
      class: this.getGroupClasses()[29],
      course: this.getCourses()[0],
    },
    {
      class: this.getGroupClasses()[30],
      course: this.getCourses()[1],
    },
    {
      class: this.getGroupClasses()[31],
      course: this.getCourses()[2],
    },
    {
      class: this.getGroupClasses()[32],
      course: this.getCourses()[1],
    },
    {
      class: this.getGroupClasses()[33],
      course: this.getCourses()[2],
    },
    {
      class: this.getGroupClasses()[34],
      course: this.getCourses()[1],
    },
    {
      class: this.getGroupClasses()[35],
      course: this.getCourses()[0],
    },
    {
      class: this.getGroupClasses()[36],
      course: this.getCourses()[0],
    },
    {
      class: this.getGroupClasses()[37],
      course: this.getCourses()[2],
    },
    {
      class: this.getGroupClasses()[38],
      course: this.getCourses()[0],
    },
    {
      class: this.getGroupClasses()[39],
      course: this.getCourses()[0],
    },
    {
      class: this.getGroupClasses()[40],
      course: this.getCourses()[0],
    },
    {
      class: this.getGroupClasses()[41],
      course: this.getCourses()[0],
    },
    {
      class: this.getGroupClasses()[42],
      course: this.getCourses()[0],
    },
    {
      class: this.getGroupClasses()[43],
      course: this.getCourses()[2],
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
        pEmail: 'simba@thepridelands.za',
        rEmail: 'rodneyian.cocker@rmit.edu.a',
        phone: '0411 123 123',
        qualification: 'Masters',
        type: 'Lead',
        isAvailable: true,
      },
      {
        enumber: 'E07583',
        firstName: 'Matt',
        lastName: 'Bomer',
        pEmail: 'simba@thepridelands.za',
        rEmail: 'rodneyian.cocker@rmit.edu.a',
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
        pEmail: 'simba@thepridelands.za',
        rEmail: 'rodneyian.cocker@rmit.edu.a',
        phone: '0411 123 123',
        qualification: 'Masters',
        type: 'Tutor',
        isAvailable: true,
      },
      {
        enumber: 'E07585',
        firstName: 'Paul',
        lastName: 'Walker',
        pEmail: 'simba@thepridelands.za',
        rEmail: 'rodneyian.cocker@rmit.edu.a',
        phone: '0411 123 123',
        qualification: 'Masters',
        type: 'Tutor',
        isAvailable: true,
      },
      {
        enumber: 'E07586',
        firstName: 'Ian',
        lastName: 'Somerhalder',
        pEmail: 'simba@thepridelands.za',
        rEmail: 'rodneyian.cocker@rmit.edu.a',
        phone: '0411 123 123',
        qualification: 'Masters',
        type: 'Tutor',
        isAvailable: true,
      },
      {
        enumber: 'E07587',
        firstName: 'Alex',
        lastName: "O'Laoughlin",
        pEmail: 'simba@thepridelands.za',
        rEmail: 'rodneyian.cocker@rmit.edu.a',
        phone: '0411 123 123',
        qualification: 'Masters',
        type: 'Tutor',
        isAvailable: true,
      },
      {
        enumber: 'E07588',
        firstName: 'Nick',
        lastName: 'Henrix',
        pEmail: 'simba@thepridelands.za',
        rEmail: 'rodneyian.cocker@rmit.edu.a',
        phone: '0411 123 123',
        qualification: 'Masters',
        type: 'Tutor',
        isAvailable: true,
      },
      {
        enumber: 'E07586',
        firstName: 'David James',
        lastName: 'Elliot',
        pEmail: 'simba@thepridelands.za',
        rEmail: 'rodneyian.cocker@rmit.edu.a',
        phone: '0411 123 123',
        qualification: 'Masters',
        type: 'Tutor',
        isAvailable: true,
      },
      {
        enumber: 'E07586',
        firstName: 'Ryan',
        lastName: 'Gosling',
        pEmail: 'simba@thepridelands.za',
        rEmail: 'rodneyian.cocker@rmit.edu.a',
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
      id: 'skill1',
      name: 'Problem Solving',
      description: 'Ability to solve problems',
    },
    // Add more skills as needed
  ]

  getCourses(): ICourse[] {
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
        staff: this.assignTutorsToClass(
          this.getOfferingGroups()[0].groupCapacity,
        ),
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
        staff: this.assignTutorsToClass(
          this.getOfferingGroups()[10].groupCapacity,
        ),
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
        staff: this.assignTutorsToClass(
          this.getOfferingGroups()[5].groupCapacity,
        ),
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

  private calculateTutors(capacity: number): number {
    // Subtract 30 from the capacity, divide by 30, and round up
    return Math.ceil((capacity - 30) / 30)
  }

  getSchedule() {
    return this.scheduleData
  }

  private extractCourseIdentifiers(): string[] {
    const courseSet = new Set<string>()
    this.scheduleData.forEach((event) => {
      const courseIdentifier = event.course.code
      courseSet.add(courseIdentifier)
    })
    return Array.from(courseSet)
  }

  public generateColorShades(): Record<string, Record<string, string>> {
    const courses = this.getCourses()
    const groupColours: Record<string, Record<string, string>> = {}

    courses.forEach((course) => {
      // Use course's code as key and generate shades for its base color
      groupColours[course.code] = this.generateShadesForColor(course.baseColour)
    })

    return groupColours
  }

  private generateShadesForColor(
    color: string,
    shadesCount: number = 7,
  ): Record<string, string> {
    const hexToRgb = (hex: string): [number, number, number] => {
      const parsedHex = parseInt(hex.slice(1), 16)
      return [(parsedHex >> 16) & 255, (parsedHex >> 8) & 255, parsedHex & 255]
    }

    const rgbToHex = (r: number, g: number, b: number): string => {
      return `#${[r, g, b]
        .map((x) => x.toString(16).padStart(2, '0'))
        .join('')}`
    }

    const adjustShade = (colorComponent: number, factor: number): number => {
      // Ensuring that the color component is between 0 and 255
      return Math.min(
        255,
        Math.max(
          0,
          Math.round(colorComponent + factor * (255 - colorComponent)),
        ),
      )
    }

    const createShade = (
      rgb: [number, number, number],
      factor: number,
    ): string => {
      return rgbToHex(
        adjustShade(rgb[0], factor),
        adjustShade(rgb[1], factor),
        adjustShade(rgb[2], factor),
      )
    }

    const baseRgb = hexToRgb(color)
    let shades: Record<string, string> = {}

    // Calculate the increment for lightening/darkening each shade
    const increment = 1 / (shadesCount + 1)

    // Generate shades
    for (let i = 0; i < shadesCount; i++) {
      // Alternate the factor for lightening and darkening
      const factor =
        i % 2 === 0 ? increment * (i / 2 + 1) : -increment * (i / 2 + 1)
      shades[`G${i + 1}`] = createShade(baseRgb, factor)
    }

    // Sort the shades by their luminance value
    shades = Object.entries(shades)
      .sort((a, b) => {
        const sumLuminance = (rgb: string) =>
          hexToRgb(rgb).reduce((acc, val) => acc + val, 0)
        return sumLuminance(a[1]) - sumLuminance(b[1])
      })
      .reduce((acc, [k, v]) => ({ ...acc, [k]: v }), {})

    return shades
  }
}
