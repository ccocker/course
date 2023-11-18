import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
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
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule,
    RouterOutlet,
    MatCardModule,
    MatChipsModule,
    MatGridListModule,
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
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
        class: 'BC1-G1-1',
        lecturer: 'Dr. Smith',
        capacity: 120,
      },
      {
        day: 'Monday',
        roomNumber: '012.10.005',
        class: 'BC1-G2-1',
        lecturer: 'Dr. Smith',
        capacity: 15,
      },
      {
        day: 'Monday',
        roomNumber: '014.09.023',
        class: 'BC1-G3-1',
        lecturer: 'Dr. Smith',
        capacity: 20,
      },
    ];

    return this.weekDays.map((day) => ({
      timeSlot: '13:30 - 14:30',
      bookings: {
        [day]: roomData
          .filter((room) => room.day === day)
          .map((room) => ({
            roomNumber: room.roomNumber,
            class: room.class,
            lecturer: room.lecturer,
            capacity: room.capacity,
            tutors: this.generateTutors(room.capacity),
          })),
      },
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
        matchingBookings.push(booking.bookings[day][0]);
      }
    });
    console.log(matchingBookings);
    return matchingBookings;
  }
}
