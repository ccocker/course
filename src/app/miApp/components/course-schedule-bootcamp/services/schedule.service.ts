import { Injectable } from '@angular/core';
import { ISkill } from '../interfaces/schedule.interface';
import { ColorService } from './color.service';

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
} from '../interfaces/schedule.interface';

import { IPerson } from '@miCommon/interfaces';
import { Person } from '@miCommon/models';

@Injectable({
  providedIn: 'root',
})
export class ScheduleService {
  private colorService: ColorService = new ColorService();
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
  ];

  constructor() {}

  private getRooms(): IRoom[] {
    const existingRooms: IRoom[] = [
      { buildingNo: 12, floor: 10, roomNumber: 5, capacity: 120 },
      { buildingNo: 12, floor: 10, roomNumber: 6, capacity: 150 },
      { buildingNo: 14, floor: 9, roomNumber: 23, capacity: 60 },
    ];
    return existingRooms;
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
    ];
    return slots;
  }

  getStaff(): string {
    const staff: IPerson[] = [
      new Person({
        miId: 'E07581',
        firstName: 'Henry',
        lastName: 'Cavill',
        emails: [
          { label: 'person', address: 'henry.cavill@thepridelands.za' },
          { label: 'RMIT', address: 'henry.cavill@gmail.com' },
        ],
        phoneNumbers: [
          { label: 'mobile', country: 'Australia', number: '0411 123 123' },
        ],
        qualifications: [
          { label: 'Masters', description: '', expiry: new Date() },
        ],
      }),
      new Person({
        miId: 'E07583',
        firstName: 'Matt',
        lastName: 'Bomer',
        emails: [
          { label: 'person', address: 'matt.bomer@thepridelands.za' },
          { label: 'RMIT', address: 'matt.bomer@gmail.com' },
        ],
        phoneNumbers: [
          { label: 'mobile', country: 'Australia', number: '0411 123 123' },
        ],
        qualifications: [
          { label: 'Masters', description: '', expiry: new Date() },
        ],
      }),
      new Person({
        miId: 'E07582',
        firstName: 'Rodney',
        lastName: 'Cocker',
        emails: [
          { label: 'person', address: 'rodney.cocker@thepridelands.za' },
          { label: 'RMIT', address: 'rodney.cocker@gmail.com' },
        ],
        phoneNumbers: [
          { label: 'mobile', country: 'Australia', number: '0411 123 123' },
        ],
        qualifications: [
          { label: 'Masters', description: '', expiry: new Date() },
        ],
      }),
      new Person({
        miId: 'E07584',
        firstName: 'David',
        lastName: 'Leon',
        emails: [
          { label: 'person', address: 'david.leon@thepridelands.za' },
          { label: 'RMIT', address: 'david.leon@gmail.com' },
        ],
        phoneNumbers: [
          { label: 'mobile', country: 'Australia', number: '0411 123 123' },
        ],
        qualifications: [
          { label: 'Masters', description: '', expiry: new Date() },
        ],
      }),
      new Person({
        miId: 'E07585',
        firstName: 'Paul',
        lastName: 'Walker',
        emails: [
          { label: 'person', address: 'paul.walker@thepridelands.za' },
          { label: 'RMIT', address: 'paul.walker@gmail.com' },
        ],
        phoneNumbers: [
          { label: 'mobile', country: 'Australia', number: '0411 123 123' },
        ],
        qualifications: [
          { label: 'Masters', description: '', expiry: new Date() },
        ],
      }),
      new Person({
        miId: 'E07586',
        firstName: 'Ian',
        lastName: 'Somerhalder',
        emails: [
          { label: 'person', address: 'ian.somerhalder@thepridelands.za' },
          { label: 'RMIT', address: 'ian.somerhalder@gmail.com' },
        ],
        phoneNumbers: [
          { label: 'mobile', country: 'Australia', number: '0411 123 123' },
        ],
        qualifications: [
          { label: 'Masters', description: '', expiry: new Date() },
        ],
      }),
      new Person({
        miId: 'E07587',
        firstName: 'Alex',
        lastName: "O'Laoughlin",
        emails: [
          { label: 'person', address: 'alex.olaoughlin@thepridelands.za' },
          { label: 'RMIT', address: 'alex.olaoughlin@gmail.com' },
        ],
        phoneNumbers: [
          { label: 'mobile', country: 'Australia', number: '0411 123 123' },
        ],
        qualifications: [
          { label: 'Masters', description: '', expiry: new Date() },
        ],
      }),
      new Person({
        miId: 'E07588',
        firstName: 'Nick',
        lastName: 'Hendrix',
        emails: [
          { label: 'person', address: 'nick.henrix@thepridelands.za' },
          { label: 'RMIT', address: 'nick.henrix@gmail.com' },
        ],
        phoneNumbers: [
          { label: 'mobile', country: 'Australia', number: '0411 123 123' },
        ],
        qualifications: [
          { label: 'Masters', description: '', expiry: new Date() },
        ],
      }),
      new Person({
        miId: 'E07589',
        firstName: 'David James',
        lastName: 'Elliot',
        emails: [
          { label: 'person', address: 'david.james.elliot@thepridelands.za' },
          { label: 'RMIT', address: 'david.james.elliot@gmail.com' },
        ],
        phoneNumbers: [
          { label: 'mobile', country: 'Australia', number: '0411 123 123' },
        ],
        qualifications: [
          { label: 'Masters', description: '', expiry: new Date() },
        ],
      }),
      new Person({
        miId: 'E07590',
        firstName: 'Oleg',
        lastName: 'Zagorodnii',
        emails: [
          { label: 'person', address: 'oleg.zagorodnii@thepridelands.za' },
          { label: 'RMIT', address: 'oleg.zagorodnii@gmail.com' },
        ],
        phoneNumbers: [
          { label: 'mobile', country: 'Australia', number: '0411 123 123' },
        ],
        qualifications: [
          { label: 'Masters', description: '', expiry: new Date() },
        ],
      }),
      new Person({
        miId: 'E07591',
        firstName: 'Craig',
        lastName: 'Cocker',
        emails: [
          { label: 'person', address: 'craig.cocker@thepridelands.za' },
          { label: 'RMIT', address: 'craig.cocker1@gmail.com' },
        ],
        phoneNumbers: [
          { label: 'mobile', country: 'Australia', number: '0411 123 123' },
        ],
        qualifications: [
          { label: 'Masters', description: '', expiry: new Date() },
        ],
      }),
      new Person({
        miId: 'E07600',
        firstName: 'Tutor',
        lastName: '1',
        emails: [
          { label: 'person', address: 'tutor.1@thepridelands.za' },
          { label: 'RMIT', address: 'tutor.1@gmail.com' },
        ],
        phoneNumbers: [
          { label: 'mobile', country: 'Australia', number: '0411 123 123' },
        ],
        qualifications: [
          { label: 'Masters', description: '', expiry: new Date() },
        ],
      }),
      new Person({
        miId: 'E07601',
        firstName: 'Tutor',
        lastName: '2',
        emails: [
          { label: 'person', address: 'tutor.1@thepridelands.za' },
          { label: 'RMIT', address: 'tutor.1@gmail.com' },
        ],
        phoneNumbers: [
          { label: 'mobile', country: 'Australia', number: '0411 123 123' },
        ],
        qualifications: [
          { label: 'Masters', description: '', expiry: new Date() },
        ],
      }),
      new Person({
        miId: 'E07602',
        firstName: 'Tutor',
        lastName: '3',
        emails: [
          { label: 'person', address: 'tutor.1@thepridelands.za' },
          { label: 'RMIT', address: 'tutor.1@gmail.com' },
        ],
        phoneNumbers: [
          { label: 'mobile', country: 'Australia', number: '0411 123 123' },
        ],
        qualifications: [
          { label: 'Masters', description: '', expiry: new Date() },
        ],
      }),
      new Person({
        miId: 'E07603',
        firstName: 'Tutor',
        lastName: '4',
        emails: [
          { label: 'person', address: 'tutor.1@thepridelands.za' },
          { label: 'RMIT', address: 'tutor.1@gmail.com' },
        ],
        phoneNumbers: [
          { label: 'mobile', country: 'Australia', number: '0411 123 123' },
        ],
        qualifications: [
          { label: 'Masters', description: '', expiry: new Date() },
        ],
      }),
    ];
    return 'staff';
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
  ];

  private getCourseById(id: string): ICourse | null {
    const allCourses: ICourse[] = this.getAllCourses();
    for (const course of allCourses) {
      if (id === course.code) {
        return course;
      }
    }
    return null;
  }

  private getTutorById(id: string): IPerson | null {
    // const allstaff: IPerson[] = this.getStaff();
    // for (const staff of allstaff) {
    //   if (id === staff.miId) {
    //     return staff;
    //   }
    // }
    return null;
  }

  getAllCourses(): ICourse[] {
    const classes: ICourse[] = [
      {
        code: 'BC1',
        name: 'Programming Bootcamp 1',
        description:
          'Learn algorithmic thinkng in the context of object oriented programming',
        baseColour: '#FF8C00',
        teachingSkills: [],
        coordinator: this.getStaff()[0],
      },
      {
        code: 'BC2',
        name: 'Programming Bootcamp 2',
        description: 'Develop your understanding of OO programming through C++',
        baseColour: '#3399FF',
        teachingSkills: [],
        coordinator: this.getStaff()[0],
      },
      {
        code: 'WBC',
        name: 'Web Bootcamp',
        description: 'Learn HTML, CSS and Javascript',
        baseColour: '#3CB371',
        teachingSkills: [],
        coordinator: this.getStaff()[0],
      },
      {
        code: 'PS1',
        name: 'Programming Studio 1',
        description:
          'Learn to develop a technology product for a target market that focusses on solving an aspect of a social challenge.',
        baseColour: '#3CB371',
        teachingSkills: [],
        coordinator: this.getStaff()[0],
      },
    ];
    return classes;
  }

  private getOfferings(): string {
    const offerings: IOffering[] = [
      {
        courseCode: 'BC1',
        startDate: new Date('2024-03-04T08:30:00'),
        finishDate: new Date('2024-06-30T23:59:00'),
        teachStartDate: new Date('2024-03-04T08:30:00'),
        teachFinishDate: new Date('2024-04-30T08:30:00'),
      },
    ];
    return 'offerings';
  }

  private getOfferingGroups(): IOfferingGroup[] {
    const group: IOfferingGroup[] = [
      {
        leadName: this.getStaff()[0],
        group: 1,
        groupCapacity: 120,
        offeringCode: this.getOfferings()[0],
      },
      {
        leadName: this.getStaff()[1],
        group: 2,
        groupCapacity: 150,
        offeringCode: this.getOfferings()[0],
      },
      {
        leadName: this.getStaff()[0],
        group: 3,
        groupCapacity: 120,
        offeringCode: this.getOfferings()[0],
      },
      {
        leadName: this.getStaff()[1],
        group: 4,
        groupCapacity: 150,
        offeringCode: this.getOfferings()[0],
      },
      {
        leadName: this.getStaff()[0],
        group: 5,
        groupCapacity: 120,
        offeringCode: this.getOfferings()[0],
      },
      {
        leadName: this.getStaff()[1],
        group: 6,
        groupCapacity: 150,
        offeringCode: this.getOfferings()[0],
      },
      {
        leadName: this.getStaff()[0],
        group: 7,
        groupCapacity: 120,
        offeringCode: this.getOfferings()[0],
      },
      {
        leadName: this.getStaff()[0],
        group: 1,
        groupCapacity: 120,
        offeringCode: this.getOfferings()[0],
      },
      {
        leadName: this.getStaff()[0],
        group: 2,
        groupCapacity: 120,
        offeringCode: this.getOfferings()[0],
      },
      {
        leadName: this.getStaff()[0],
        group: 1,
        groupCapacity: 120,
        offeringCode: this.getOfferings()[0],
      },
      {
        leadName: this.getStaff()[0],
        group: 2,
        groupCapacity: 60,
        offeringCode: this.getOfferings()[0],
      },
    ];
    return group;
  }

  private getTutors(): any {
    const tutors: IPerson[] = [];
    const staffMembers = this.getStaff();

    return null;
  }

  private getGroupClasses(): IGroupClasses[] {
    const classes: IGroupClasses[] = [
      {
        classNumber: 1,
        day: DayOfWeek.Monday,
        timeslot: this.getTimeSlots()[0],
        roomCode: this.getRooms()[0],
        leadName: this.assignSpecificTutorsToClass(['E07581']),
        staffCodes: this.assignSpecificTutorsToClass([
          'E07600',
          'E07601',
          'E07602',
        ]),
        offeringGroupCode: this.getOfferingGroups()[0],
      },
      {
        classNumber: 1,
        day: DayOfWeek.Monday,
        timeslot: this.getTimeSlots()[0],
        roomCode: this.getRooms()[1],
        leadName: this.assignSpecificTutorsToClass(['E07582']),
        staffCodes: this.assignSpecificTutorsToClass([
          'E07600',
          'E07601',
          'E07602',
          'E07603',
        ]),
        offeringGroupCode: this.getOfferingGroups()[1],
      },
      {
        classNumber: 1,
        day: DayOfWeek.Monday,
        timeslot: this.getTimeSlots()[1],
        roomCode: this.getRooms()[2],
        leadName: this.assignSpecificTutorsToClass(['E07583']),
        staffCodes: this.assignSpecificTutorsToClass(['E07600', 'E07601']),
        offeringGroupCode: this.getOfferingGroups()[10],
      },
      {
        classNumber: 1,
        day: DayOfWeek.Monday,
        timeslot: this.getTimeSlots()[2],
        roomCode: this.getRooms()[0],
        leadName: this.assignSpecificTutorsToClass(['E07584']),
        staffCodes: this.assignSpecificTutorsToClass([
          'E07600',
          'E07601',
          'E07602',
        ]),
        offeringGroupCode: this.getOfferingGroups()[2],
      },
      {
        classNumber: 1,
        day: DayOfWeek.Monday,
        timeslot: this.getTimeSlots()[2],
        roomCode: this.getRooms()[1],
        leadName: this.assignSpecificTutorsToClass(['E07585']),
        staffCodes: this.assignSpecificTutorsToClass([
          'E07600',
          'E07601',
          'E07602',
          'E07603',
        ]),
        offeringGroupCode: this.getOfferingGroups()[3],
      },
      {
        classNumber: 1,
        day: DayOfWeek.Monday,
        timeslot: this.getTimeSlots()[3],
        roomCode: this.getRooms()[0],
        leadName: this.assignSpecificTutorsToClass(['E07586']),
        staffCodes: this.assignSpecificTutorsToClass([
          'E07600',
          'E07601',
          'E07602',
        ]),
        offeringGroupCode: this.getOfferingGroups()[4],
      },
      {
        classNumber: 1,
        day: DayOfWeek.Monday,
        timeslot: this.getTimeSlots()[3],
        roomCode: this.getRooms()[1],
        leadName: this.assignSpecificTutorsToClass(['E07587']),
        staffCodes: this.assignSpecificTutorsToClass([
          'E07600',
          'E07601',
          'E07602',
          'E07603',
        ]),
        offeringGroupCode: this.getOfferingGroups()[5],
      },
      {
        classNumber: 1,
        day: DayOfWeek.Monday,
        timeslot: this.getTimeSlots()[4],
        roomCode: this.getRooms()[0],
        leadName: this.assignSpecificTutorsToClass(['E07588']),
        staffCodes: this.assignSpecificTutorsToClass([
          'E07600',
          'E07601',
          'E07602',
        ]),
        offeringGroupCode: this.getOfferingGroups()[9],
      },
      {
        classNumber: 1,
        day: DayOfWeek.Monday,
        timeslot: this.getTimeSlots()[4],
        roomCode: this.getRooms()[1],
        leadName: this.assignSpecificTutorsToClass(['E07589']),
        staffCodes: this.assignSpecificTutorsToClass([
          'E07600',
          'E07601',
          'E07602',
          'E07603',
        ]),
        offeringGroupCode: this.getOfferingGroups()[7],
      },
      {
        classNumber: 1,
        day: DayOfWeek.Monday,
        timeslot: this.getTimeSlots()[5],
        roomCode: this.getRooms()[0],
        leadName: this.assignSpecificTutorsToClass(['E07590']),
        staffCodes: this.assignSpecificTutorsToClass([
          'E07600',
          'E07601',
          'E07602',
        ]),
        offeringGroupCode: this.getOfferingGroups()[6],
      },
      {
        classNumber: 2,
        day: DayOfWeek.Monday,
        timeslot: this.getTimeSlots()[5],
        roomCode: this.getRooms()[1],
        leadName: this.assignSpecificTutorsToClass(['E07591']),
        staffCodes: this.assignSpecificTutorsToClass([
          'E07600',
          'E07601',
          'E07602',
        ]),
        offeringGroupCode: this.getOfferingGroups()[8],
      },
      {
        classNumber: 2,
        day: DayOfWeek.Tuesday,
        timeslot: this.getTimeSlots()[0],
        roomCode: this.getRooms()[0],
        leadName: this.assignSpecificTutorsToClass(['E07581']),
        staffCodes: this.assignSpecificTutorsToClass([
          'E07600',
          'E07601',
          'E07602',
        ]),
        offeringGroupCode: this.getOfferingGroups()[0],
      },
      {
        classNumber: 2,
        day: DayOfWeek.Tuesday,
        timeslot: this.getTimeSlots()[0],
        roomCode: this.getRooms()[1],
        leadName: this.assignSpecificTutorsToClass(['E07582']),
        staffCodes: this.assignSpecificTutorsToClass([
          'E07600',
          'E07601',
          'E07602',
          'E07603',
        ]),
        offeringGroupCode: this.getOfferingGroups()[1],
      },
      {
        classNumber: 2,
        day: DayOfWeek.Tuesday,
        timeslot: this.getTimeSlots()[2],
        roomCode: this.getRooms()[0],
        leadName: this.assignSpecificTutorsToClass(['E07584']),
        staffCodes: this.assignSpecificTutorsToClass([
          'E07600',
          'E07601',
          'E07602',
        ]),
        offeringGroupCode: this.getOfferingGroups()[2],
      },
      {
        classNumber: 2,
        day: DayOfWeek.Tuesday,
        timeslot: this.getTimeSlots()[2],
        roomCode: this.getRooms()[1],
        leadName: this.assignSpecificTutorsToClass(['E07585']),
        staffCodes: this.assignSpecificTutorsToClass([
          'E07600',
          'E07601',
          'E07602',
          'E07603',
        ]),
        offeringGroupCode: this.getOfferingGroups()[3],
      },
      {
        classNumber: 2,
        day: DayOfWeek.Tuesday,
        timeslot: this.getTimeSlots()[3],
        roomCode: this.getRooms()[0],
        leadName: this.assignSpecificTutorsToClass(['E07586']),
        staffCodes: this.assignSpecificTutorsToClass([
          'E07600',
          'E07601',
          'E07602',
        ]),
        offeringGroupCode: this.getOfferingGroups()[4],
      },
      {
        classNumber: 2,
        day: DayOfWeek.Tuesday,
        timeslot: this.getTimeSlots()[3],
        roomCode: this.getRooms()[1],
        leadName: this.assignSpecificTutorsToClass(['E07587']),
        staffCodes: this.assignSpecificTutorsToClass([
          'E07600',
          'E07601',
          'E07602',
          'E07603',
        ]),
        offeringGroupCode: this.getOfferingGroups()[5],
      },
      {
        classNumber: 2,
        day: DayOfWeek.Tuesday,
        timeslot: this.getTimeSlots()[4],
        roomCode: this.getRooms()[0],
        leadName: this.assignSpecificTutorsToClass(['E07588']),
        staffCodes: this.assignSpecificTutorsToClass([
          'E07600',
          'E07601',
          'E07602',
        ]),
        offeringGroupCode: this.getOfferingGroups()[9],
      },
      {
        classNumber: 2,
        day: DayOfWeek.Tuesday,
        timeslot: this.getTimeSlots()[4],
        roomCode: this.getRooms()[1],
        leadName: this.assignSpecificTutorsToClass(['E07589']),
        staffCodes: this.assignSpecificTutorsToClass([
          'E07600',
          'E07601',
          'E07602',
          'E07603',
        ]),
        offeringGroupCode: this.getOfferingGroups()[7],
      },
      {
        classNumber: 2,
        day: DayOfWeek.Tuesday,
        timeslot: this.getTimeSlots()[4],
        roomCode: this.getRooms()[2],
        leadName: this.assignSpecificTutorsToClass(['E07583']),
        staffCodes: this.assignSpecificTutorsToClass(['']),
        offeringGroupCode: this.getOfferingGroups()[10],
      },
      {
        classNumber: 2,
        day: DayOfWeek.Tuesday,
        timeslot: this.getTimeSlots()[5],
        roomCode: this.getRooms()[0],
        leadName: this.assignSpecificTutorsToClass(['E07590']),
        staffCodes: this.assignSpecificTutorsToClass([
          'E07600',
          'E07601',
          'E07602',
        ]),
        offeringGroupCode: this.getOfferingGroups()[6],
      },
      {
        classNumber: 2,
        day: DayOfWeek.Tuesday,
        timeslot: this.getTimeSlots()[5],
        roomCode: this.getRooms()[1],
        leadName: this.assignSpecificTutorsToClass(['E07591']),
        staffCodes: this.assignSpecificTutorsToClass([
          'E07600',
          'E07601',
          'E07602',
        ]),
        offeringGroupCode: this.getOfferingGroups()[8],
      },
      {
        classNumber: 3,
        day: DayOfWeek.Wednesday,
        timeslot: this.getTimeSlots()[0],
        roomCode: this.getRooms()[0],
        leadName: this.assignSpecificTutorsToClass(['E07581']),
        staffCodes: this.assignSpecificTutorsToClass([
          'E07600',
          'E07601',
          'E07602',
        ]),
        offeringGroupCode: this.getOfferingGroups()[0],
      },
      {
        classNumber: 3,
        day: DayOfWeek.Wednesday,
        timeslot: this.getTimeSlots()[0],
        roomCode: this.getRooms()[1],
        leadName: this.assignSpecificTutorsToClass(['E07582']),
        staffCodes: this.assignSpecificTutorsToClass([
          'E07600',
          'E07601',
          'E07602',
          'E07603',
        ]),
        offeringGroupCode: this.getOfferingGroups()[1],
      },
      {
        classNumber: 3,
        day: DayOfWeek.Wednesday,
        timeslot: this.getTimeSlots()[2],
        roomCode: this.getRooms()[0],
        leadName: this.assignSpecificTutorsToClass(['E07584']),
        staffCodes: this.assignSpecificTutorsToClass([
          'E07600',
          'E07601',
          'E07602',
        ]),
        offeringGroupCode: this.getOfferingGroups()[2],
      },
      {
        classNumber: 3,
        day: DayOfWeek.Wednesday,
        timeslot: this.getTimeSlots()[2],
        roomCode: this.getRooms()[1],
        leadName: this.assignSpecificTutorsToClass(['E07585']),
        staffCodes: this.assignSpecificTutorsToClass([
          'E07600',
          'E07601',
          'E07602',
          'E07603',
        ]),
        offeringGroupCode: this.getOfferingGroups()[3],
      },
      {
        classNumber: 3,
        day: DayOfWeek.Wednesday,
        timeslot: this.getTimeSlots()[3],
        roomCode: this.getRooms()[0],
        leadName: this.assignSpecificTutorsToClass(['E07586']),
        staffCodes: this.assignSpecificTutorsToClass([
          'E07600',
          'E07601',
          'E07602',
        ]),
        offeringGroupCode: this.getOfferingGroups()[4],
      },
      {
        classNumber: 3,
        day: DayOfWeek.Wednesday,
        timeslot: this.getTimeSlots()[3],
        roomCode: this.getRooms()[1],
        leadName: this.assignSpecificTutorsToClass(['E07587']),
        staffCodes: this.assignSpecificTutorsToClass([
          'E07600',
          'E07601',
          'E07602',
          'E07603',
        ]),
        offeringGroupCode: this.getOfferingGroups()[5],
      },
      {
        classNumber: 3,
        day: DayOfWeek.Wednesday,
        timeslot: this.getTimeSlots()[4],
        roomCode: this.getRooms()[0],
        leadName: this.assignSpecificTutorsToClass(['E07589']),
        staffCodes: this.assignSpecificTutorsToClass([
          'E07600',
          'E07601',
          'E07602',
        ]),
        offeringGroupCode: this.getOfferingGroups()[7],
      },
      {
        classNumber: 3,
        day: DayOfWeek.Wednesday,
        timeslot: this.getTimeSlots()[4],
        roomCode: this.getRooms()[1],
        leadName: this.assignSpecificTutorsToClass(['E07590']),
        staffCodes: this.assignSpecificTutorsToClass([
          'E07600',
          'E07601',
          'E07602',
        ]),
        offeringGroupCode: this.getOfferingGroups()[6],
      },
      {
        classNumber: 3,
        day: DayOfWeek.Wednesday,
        timeslot: this.getTimeSlots()[5],
        roomCode: this.getRooms()[0],
        leadName: this.assignSpecificTutorsToClass(['E07591']),
        staffCodes: this.assignSpecificTutorsToClass([
          'E07600',
          'E07601',
          'E07602',
        ]),
        offeringGroupCode: this.getOfferingGroups()[8],
      },
      {
        classNumber: 3,
        day: DayOfWeek.Thursday,
        timeslot: this.getTimeSlots()[1],
        roomCode: this.getRooms()[0],
        leadName: this.assignSpecificTutorsToClass(['E07583']),
        staffCodes: this.assignSpecificTutorsToClass(['E07600']),
        offeringGroupCode: this.getOfferingGroups()[10],
      },
      {
        classNumber: 4,
        day: DayOfWeek.Thursday,
        timeslot: this.getTimeSlots()[4],
        roomCode: this.getRooms()[0],
        leadName: this.assignSpecificTutorsToClass(['E07589']),
        staffCodes: this.assignSpecificTutorsToClass([
          'E07600',
          'E07601',
          'E07602',
        ]),
        offeringGroupCode: this.getOfferingGroups()[7],
      },
      {
        classNumber: 3,
        day: DayOfWeek.Thursday,
        timeslot: this.getTimeSlots()[4],
        roomCode: this.getRooms()[1],
        leadName: this.assignSpecificTutorsToClass(['E07588']),
        staffCodes: this.assignSpecificTutorsToClass([
          'E07600',
          'E07601',
          'E07602',
        ]),
        offeringGroupCode: this.getOfferingGroups()[9],
      },
      {
        classNumber: 4,
        day: DayOfWeek.Thursday,
        timeslot: this.getTimeSlots()[5],
        roomCode: this.getRooms()[0],
        leadName: this.assignSpecificTutorsToClass(['E07591']),
        staffCodes: this.assignSpecificTutorsToClass([
          'E07600',
          'E07601',
          'E07602',
        ]),
        offeringGroupCode: this.getOfferingGroups()[8],
      },
      {
        classNumber: 4,
        day: DayOfWeek.Friday,
        timeslot: this.getTimeSlots()[0],
        roomCode: this.getRooms()[0],
        leadName: this.assignSpecificTutorsToClass(['E07581']),
        staffCodes: this.assignSpecificTutorsToClass([
          'E07600',
          'E07601',
          'E07602',
        ]),
        offeringGroupCode: this.getOfferingGroups()[0],
      },
      {
        classNumber: 4,
        day: DayOfWeek.Friday,
        timeslot: this.getTimeSlots()[0],
        roomCode: this.getRooms()[1],
        leadName: this.assignSpecificTutorsToClass(['E07582']),
        staffCodes: this.assignSpecificTutorsToClass([
          'E07600',
          'E07601',
          'E07602',
          'E07603',
        ]),
        offeringGroupCode: this.getOfferingGroups()[1],
      },
      {
        classNumber: 4,
        day: DayOfWeek.Friday,
        timeslot: this.getTimeSlots()[0],
        roomCode: this.getRooms()[2],
        leadName: this.assignSpecificTutorsToClass(['E07583']),
        staffCodes: this.assignSpecificTutorsToClass(['']),
        offeringGroupCode: this.getOfferingGroups()[10],
      },
      {
        classNumber: 4,
        day: DayOfWeek.Friday,
        timeslot: this.getTimeSlots()[2],
        roomCode: this.getRooms()[0],
        leadName: this.assignSpecificTutorsToClass(['E07584']),
        staffCodes: this.assignSpecificTutorsToClass([
          'E07600',
          'E07601',
          'E07602',
        ]),
        offeringGroupCode: this.getOfferingGroups()[2],
      },
      {
        classNumber: 4,
        day: DayOfWeek.Friday,
        timeslot: this.getTimeSlots()[2],
        roomCode: this.getRooms()[1],
        leadName: this.assignSpecificTutorsToClass(['E07585']),
        staffCodes: this.assignSpecificTutorsToClass([
          'E07600',
          'E07601',
          'E07602',
          'E07603',
        ]),
        offeringGroupCode: this.getOfferingGroups()[3],
      },
      {
        classNumber: 4,
        day: DayOfWeek.Friday,
        timeslot: this.getTimeSlots()[3],
        roomCode: this.getRooms()[0],
        leadName: this.assignSpecificTutorsToClass(['E07586']),
        staffCodes: this.assignSpecificTutorsToClass([
          'E07600',
          'E07601',
          'E07602',
        ]),
        offeringGroupCode: this.getOfferingGroups()[4],
      },
      {
        classNumber: 4,
        day: DayOfWeek.Friday,
        timeslot: this.getTimeSlots()[3],
        roomCode: this.getRooms()[1],
        leadName: this.assignSpecificTutorsToClass(['E07587']),
        staffCodes: this.assignSpecificTutorsToClass([
          'E07600',
          'E07601',
          'E07602',
          'E07603',
        ]),
        offeringGroupCode: this.getOfferingGroups()[5],
      },
      {
        classNumber: 4,
        day: DayOfWeek.Friday,
        timeslot: this.getTimeSlots()[4],
        roomCode: this.getRooms()[0],
        leadName: this.assignSpecificTutorsToClass(['E07590']),
        staffCodes: this.assignSpecificTutorsToClass([
          'E07600',
          'E07601',
          'E07602',
        ]),
        offeringGroupCode: this.getOfferingGroups()[6],
      },
      {
        classNumber: 4,
        day: DayOfWeek.Friday,
        timeslot: this.getTimeSlots()[4],
        roomCode: this.getRooms()[1],
        leadName: this.assignSpecificTutorsToClass(['E07588']),
        staffCodes: this.assignSpecificTutorsToClass([
          'E07600',
          'E07601',
          'E07602',
        ]),
        offeringGroupCode: this.getOfferingGroups()[9],
      },
    ];
    return classes;
  }

  private assignTutorsToClass(capacity: number): IPerson[] {
    // Calculate the number of tutors needed for the given capacity
    const numberOfTutors = this.calculateTutors(capacity);

    // Get all available tutors
    const allTutors = this.getTutors();

    // Select the needed number of tutors from the available tutors
    const assignedTutors = allTutors.slice(7, numberOfTutors);

    return assignedTutors;
  }

  calculateTutors(capacity: number): number {
    // Subtract 30 from the capacity, divide by 30, and round up
    return Math.ceil((capacity - 30) / 30);
  }

  getSchedule() {
    return this.scheduleData;
  }

  private assignSpecificTutorsToClass(specificStaffIds?: string[]): any {
    // If specific staff IDs are provided, use them to assign staff
    // if (specificStaffIds && specificStaffIds.length > 0) {
    //   const allStaff = this.getStaff();
    //   return allStaff.filter((staff) => specificStaffIds.includes(staff.miId));
    // }
    return '';
  }

  public generateColorShades(): Record<string, Record<string, string>> {
    const courses = this.getAllCourses();
    const groupColours: Record<string, Record<string, string>> = {};

    courses.forEach((course) => {
      // Use course's code as key and generate shades for its base color
      groupColours[course.code] = this.colorService.generateShadesForColor(
        course.baseColour
      );
    });

    return groupColours;
  }
}
