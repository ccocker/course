import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatChipsModule } from '@angular/material/chips';
import { MatGridListModule } from '@angular/material/grid-list';

interface CourseBooking {
  timeSlot: string;
  bookings: {
    [key: string]: {
      roomNumber: string;
      class: string;
      lecturer: string;
      capacity: number;
      tutors: string[];
    }[];
  };
}
@Component({
  selector: 'mi-course-schedule',
  standalone: true,
  imports: [CommonModule, MatCardModule, MatChipsModule, MatGridListModule],
  templateUrl: './course-schedule.component.html',
  styleUrl: './course-schedule.component.scss',
})
export class CourseScheduleComponent {
  title = 'course';
  weekDays: string[] = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'];

  timeSlots: string[] = [];
  bookings: CourseBooking[] = [];

  constructor() {
    this.timeSlots = this.generateTimeSlots('08:30', '20:30');
    this.bookings = this.generateBookings();
  }

  generateBookings(): CourseBooking[] {
    const roomData = [
      {
        day: 'Monday',
        roomNumber: '012.10.004',
        timeSlot: '08:30 - 10:30',
        class: 'BC1-G1-1',
        lecturer: 'Henry Cavill',
        capacity: 120,
      },
      {
        day: 'Monday',
        roomNumber: '012.10.005',
        timeSlot: '08:30 - 10:30',
        class: 'BC1-G2-1',
        lecturer: 'Henry Cavill',
        capacity: 120,
      },
      {
        day: 'Monday',
        roomNumber: '012.10.004',
        timeSlot: '10:30 - 12:30',
        class: 'BC1-G3-1',
        lecturer: 'Henry Cavill',
        capacity: 120,
      },
      {
        day: 'Monday',
        roomNumber: '012.10.005',
        timeSlot: '10:30 - 12:30',
        class: 'BC1-G4-1',
        lecturer: 'Henry Cavill',
        capacity: 120,
      },
      {
        day: 'Monday',
        roomNumber: '012.10.005',
        timeSlot: '09:30 - 11:30',
        class: 'WBC-2-1',
        lecturer: 'Henry Cavill',
        capacity: 120,
      },
    ];

    type BookingMap = {
      [timeSlot: string]: {
        timeSlot: string;
        bookings: {
          [day: string]: {
            roomNumber: string;
            class: string;
            lecturer: string;
            capacity: number;
            tutors: string[];
          }[];
        };
      };
    };

    // Create a structure for bookings by time slot
    const bookingsByTimeSlot = roomData.reduce<BookingMap>((acc, room) => {
      const timeSlotKey = room.timeSlot;
      if (!acc[timeSlotKey]) {
        acc[timeSlotKey] = {
          timeSlot: room.timeSlot,
          bookings: this.weekDays.reduce((days, day) => {
            days[day] = [];
            return days;
          }, {} as { [day: string]: any[] }),
        };
      }
      acc[timeSlotKey].bookings[room.day].push({
        roomNumber: room.roomNumber,
        class: room.class,
        lecturer: room.lecturer,
        capacity: room.capacity,
        tutors: this.generateTutors(room.capacity),
      });
      return acc;
    }, {});

    // Generate the CourseBooking array from the bookingsByTimeSlot object
    return Object.values(bookingsByTimeSlot).map(({ timeSlot, bookings }) => ({
      timeSlot,
      bookings,
    }));
  }

  public generateTutors(capacity: number): string[] {
    const numberOfTutors = Math.floor((capacity - 30) / 30);
    return Array.from({ length: numberOfTutors }, (_, i) => `Tutor ${i + 1}`);
  }

  private generateTimeSlots(startTime: string, endTime: string): string[] {
    const timeSlots: string[] = [];
    const startTimeParts = startTime.split(':');
    const endTimeParts = endTime.split(':');

    const startHour = parseInt(startTimeParts[0], 10);
    const startMinute = parseInt(startTimeParts[1], 10);
    const endHour = parseInt(endTimeParts[0], 10);
    const endMinute = parseInt(endTimeParts[1], 10);

    let currentHour = startHour;
    let currentMinute = startMinute;

    while (
      currentHour < endHour ||
      (currentHour === endHour && currentMinute < endMinute)
    ) {
      const formattedHour = currentHour.toString().padStart(2, '0');
      const formattedMinute = currentMinute.toString().padStart(2, '0');
      const nextHour = currentMinute + 30 >= 60 ? currentHour + 1 : currentHour;
      const nextMinute = (currentMinute + 30) % 60;
      const nextFormattedHour = nextHour.toString().padStart(2, '0');
      const nextFormattedMinute = nextMinute.toString().padStart(2, '0');
      const timeSlot = `${formattedHour}:${formattedMinute} - ${nextFormattedHour}:${nextFormattedMinute}`;
      timeSlots.push(timeSlot);

      currentMinute += 30;
      if (currentMinute >= 60) {
        currentMinute = 0;
        currentHour++;
      }
    }

    return timeSlots;
  }

  getBookingsForTimeSlot(timeSlot: string, day: string): any[] {
    const matchingBookings: any[] = [];

    const startTime = timeSlot.split(' - ')[0];

    this.bookings.forEach((booking) => {
      const bookingStartTime = booking.timeSlot.split(' - ')[0];

      if (
        bookingStartTime.trim() === startTime.trim() &&
        booking.bookings[day]?.length > 0
      ) {
        // Add all bookings for the day and time slot
        matchingBookings.push(...booking.bookings[day]);
      }
    });

    console.log(matchingBookings);
    return matchingBookings;
  }
}
