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
      {
        day: 'Monday',
        roomNumber: '012.10.004',
        timeSlot: '12:30 - 14:30',
        class: 'BC1-G5-1',
        lecturer: 'Henry Cavill',
        capacity: 120,
      },
      {
        day: 'Monday',
        roomNumber: '012.10.005',
        timeSlot: '12:30 - 14:30',
        class: 'BC2-G1-1',
        lecturer: 'Henry Cavill',
        capacity: 120,
      },
      {
        day: 'Monday',
        roomNumber: '012.10.004',
        timeSlot: '14:30 - 16:30',
        class: 'WBC-1-1',
        lecturer: 'Henry Cavill',
        capacity: 120,
      },
      {
        day: 'Monday',
        roomNumber: '012.10.005',
        timeSlot: '14:30 - 16:30',
        class: 'BC2-G2-1',
        lecturer: 'Henry Cavill',
        capacity: 120,
      },
      {
        day: 'Monday',
        roomNumber: '012.10.004',
        timeSlot: '16:30 - 06:30',
        class: 'WBC-3-1',
        lecturer: 'Henry Cavill',
        capacity: 120,
      },
      {
        day: 'Monday',
        roomNumber: '012.10.005',
        timeSlot: '16:30 - 06:30',
        class: 'BC2-G3-1',
        lecturer: 'Henry Cavill',
        capacity: 120,
      },
      {
        day: 'Tuesday',
        roomNumber: '012.10.004',
        timeSlot: '08:30 - 10:30',
        class: 'BC1-G1-1',
        lecturer: 'Henry Cavill',
        capacity: 120,
      },
      {
        day: 'Tuesday',
        roomNumber: '012.10.005',
        timeSlot: '08:30 - 10:30',
        class: 'BC1-G2-1',
        lecturer: 'Henry Cavill',
        capacity: 120,
      },
      {
        day: 'Tuesday',
        roomNumber: '012.10.004',
        timeSlot: '10:30 - 12:30',
        class: 'BC1-G3-1',
        lecturer: 'Henry Cavill',
        capacity: 120,
      },
      {
        day: 'Tuesday',
        roomNumber: '012.10.005',
        timeSlot: '10:30 - 12:30',
        class: 'BC1-G4-1',
        lecturer: 'Henry Cavill',
        capacity: 120,
      },
      {
        day: 'Tuesday',
        roomNumber: '012.10.005',
        timeSlot: '09:30 - 11:30',
        class: 'WBC-2-1',
        lecturer: 'Henry Cavill',
        capacity: 120,
      },
      {
        day: 'Tuesday',
        roomNumber: '012.10.004',
        timeSlot: '12:30 - 14:30',
        class: 'BC1-G5-1',
        lecturer: 'Henry Cavill',
        capacity: 120,
      },
      {
        day: 'Tuesday',
        roomNumber: '012.10.005',
        timeSlot: '12:30 - 14:30',
        class: 'BC2-G1-1',
        lecturer: 'Henry Cavill',
        capacity: 120,
      },
      {
        day: 'Tuesday',
        roomNumber: '012.10.004',
        timeSlot: '14:30 - 16:30',
        class: 'WBC-1-1',
        lecturer: 'Henry Cavill',
        capacity: 120,
      },
      {
        day: 'Tuesday',
        roomNumber: '012.10.005',
        timeSlot: '14:30 - 16:30',
        class: 'BC2-G2-1',
        lecturer: 'Henry Cavill',
        capacity: 120,
      },
      {
        day: 'Tuesday',
        roomNumber: '012.10.004',
        timeSlot: '16:30 - 06:30',
        class: 'WBC-3-1',
        lecturer: 'Henry Cavill',
        capacity: 120,
      },
      {
        day: 'Tuesday',
        roomNumber: '012.10.005',
        timeSlot: '16:30 - 06:30',
        class: 'BC2-G3-1',
        lecturer: 'Henry Cavill',
        capacity: 120,
      },
      {
        day: 'Wednesday',
        roomNumber: '012.10.004',
        timeSlot: '08:30 - 10:30',
        class: 'BC1 Assessment Dropin',
        lecturer: 'Henry Cavill',
        capacity: 120,
      },
      {
        day: 'Wednesday',
        roomNumber: '012.10.004',
        timeSlot: '10:30 - 12:30',
        class: 'BC1 Assessment Dropin',
        lecturer: 'Henry Cavill',
        capacity: 120,
      },
      {
        day: 'Wednesday',
        roomNumber: '012.10.004',
        timeSlot: '12:30 - 14:30',
        class: 'BC1 Assessment Dropin',
        lecturer: 'Henry Cavill',
        capacity: 120,
      },
      {
        day: 'Wednesday',
        roomNumber: '012.10.004',
        timeSlot: '14:30 - 16:30',
        class: 'WBC-1-1',
        lecturer: 'Henry Cavill',
        capacity: 120,
      },
      {
        day: 'Wednesday',
        roomNumber: '012.10.005',
        timeSlot: '14:30 - 16:30',
        class: 'BC2-G2-1',
        lecturer: 'Henry Cavill',
        capacity: 120,
      },
      {
        day: 'Wednesday',
        roomNumber: '012.10.004',
        timeSlot: '16:30 - 06:30',
        class: 'WBC-3-1',
        lecturer: 'Henry Cavill',
        capacity: 120,
      },
      {
        day: 'Wednesday',
        roomNumber: '012.10.005',
        timeSlot: '16:30 - 06:30',
        class: 'BC2-G3-1',
        lecturer: 'Henry Cavill',
        capacity: 120,
      },
      {
        day: 'Thursday',
        roomNumber: '012.10.004',
        timeSlot: '09:30 - 11:30',
        class: 'WBC-3-1',
        lecturer: 'Henry Cavill',
        capacity: 120,
      },
      {
        day: 'Thursday',
        roomNumber: '012.10.004',
        timeSlot: '14:30 - 16:30',
        class: 'WBC-1-1',
        lecturer: 'Henry Cavill',
        capacity: 120,
      },
      {
        day: 'Thursday',
        roomNumber: '012.10.005',
        timeSlot: '14:30 - 16:30',
        class: 'BC2-G2-1',
        lecturer: 'Henry Cavill',
        capacity: 120,
      },
      {
        day: 'Thursday',
        roomNumber: '012.10.004',
        timeSlot: '16:30 - 06:30',
        class: 'WBC-3-1',
        lecturer: 'Henry Cavill',
        capacity: 120,
      },
      {
        day: 'Thursday',
        roomNumber: '012.10.005',
        timeSlot: '16:30 - 06:30',
        class: 'BC2-G3-1',
        lecturer: 'Henry Cavill',
        capacity: 120,
      },
      {
        day: 'Friday',
        roomNumber: '012.10.004',
        timeSlot: '08:30 - 10:30',
        class: 'BC1-G1-1',
        lecturer: 'Henry Cavill',
        capacity: 120,
      },
      {
        day: 'Friday',
        roomNumber: '012.10.005',
        timeSlot: '08:30 - 10:30',
        class: 'BC1-G2-1',
        lecturer: 'Henry Cavill',
        capacity: 120,
      },
      {
        day: 'Friday',
        roomNumber: '012.10.004',
        timeSlot: '10:30 - 12:30',
        class: 'BC1-G3-1',
        lecturer: 'Henry Cavill',
        capacity: 120,
      },
      {
        day: 'Friday',
        roomNumber: '012.10.005',
        timeSlot: '10:30 - 12:30',
        class: 'BC1-G4-1',
        lecturer: 'Henry Cavill',
        capacity: 120,
      },
      {
        day: 'Friday',
        roomNumber: '012.10.005',
        timeSlot: '09:30 - 11:30',
        class: 'WBC-2-1',
        lecturer: 'Henry Cavill',
        capacity: 120,
      },
      {
        day: 'Friday',
        roomNumber: '012.10.004',
        timeSlot: '12:30 - 14:30',
        class: 'BC1-G5-1',
        lecturer: 'Henry Cavill',
        capacity: 120,
      },
      {
        day: 'Friday',
        roomNumber: '012.10.005',
        timeSlot: '12:30 - 14:30',
        class: 'BC2-G1-1',
        lecturer: 'Henry Cavill',
        capacity: 120,
      },
      {
        day: 'Friday',
        roomNumber: '012.10.004',
        timeSlot: '14:30 - 16:30',
        class: 'WBC-1-1',
        lecturer: 'Henry Cavill',
        capacity: 120,
      },
      {
        day: 'Friday',
        roomNumber: '012.10.005',
        timeSlot: '14:30 - 16:30',
        class: 'BC2-G2-1',
        lecturer: 'Henry Cavill',
        capacity: 120,
      },
      {
        day: 'Friday',
        roomNumber: '012.10.004',
        timeSlot: '16:30 - 06:30',
        class: 'WBC-3-1',
        lecturer: 'Henry Cavill',
        capacity: 120,
      },
      {
        day: 'Friday',
        roomNumber: '012.10.005',
        timeSlot: '16:30 - 06:30',
        class: 'BC2-G3-1',
        lecturer: 'Henry Cavill',
        capacity: 120,
      },
    ];

    const bookingsByDay: { [key: string]: CourseBooking[] } = {};

    // Initialize the bookings for each day of the week
    this.weekDays.forEach((day) => {
      bookingsByDay[day] = [];
    });

    // Go through each roomData item and add it to the corresponding day and time slot
    roomData.forEach((room) => {
      const durationSlots = this.calculateDurationSlots(
        room.timeSlot.split(' - ')[0],
        room.timeSlot.split(' - ')[1]
      );
      const booking: CourseBooking = {
        timeSlot: room.timeSlot,
        bookings: {
          [room.day]: [
            {
              roomNumber: room.roomNumber,
              class: room.class,
              lecturer: room.lecturer,
              capacity: room.capacity,
              tutors: this.generateTutors(room.capacity),
            },
          ],
        },
      };

      // Add the booking to the corresponding day
      if (!bookingsByDay[room.day].some((b) => b.timeSlot === room.timeSlot)) {
        // If no booking at this timeslot exists, add a new one
        bookingsByDay[room.day].push(booking);
      } else {
        // If a booking already exists at this timeslot, add this room to it
        const existingBooking = bookingsByDay[room.day].find(
          (b) => b.timeSlot === room.timeSlot
        );
        existingBooking.bookings[room.day].push({
          roomNumber: room.roomNumber,
          class: room.class,
          lecturer: room.lecturer,
          capacity: room.capacity,
          tutors: this.generateTutors(room.capacity),
        });
      }
    });

    // Flatten the bookings by day into a single array
    const allBookings: CourseBooking[] = [];
    this.weekDays.forEach((day) => {
      allBookings.push(...bookingsByDay[day]);
    });

    return allBookings;
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

    this.bookings.forEach((booking) => {
      const [bookingStartTime, bookingEndTime] = booking.timeSlot.split(' - ');
      if (
        timeSlot.startsWith(bookingStartTime.trim()) &&
        booking.bookings[day]?.length > 0
      ) {
        const durationSlots = this.calculateDurationSlots(
          bookingStartTime,
          bookingEndTime
        );
        const bookingWithColspan = {
          ...booking.bookings[day][0],
          colspan: durationSlots,
        };
        matchingBookings.push(bookingWithColspan);
      }
    });

    return matchingBookings;
  }

  private calculateDurationSlots(startTime: string, endTime: string): number {
    const [startHr, startMin] = startTime.split(':').map(Number);
    const [endHr, endMin] = endTime.split(':').map(Number);
    const duration = endHr * 60 + endMin - (startHr * 60 + startMin);
    return duration / 30; // since each slot is 30 minutes
  }

  private calculateGridRow(timeSlot: string): { start: number; end: number } {
    const [startTime, endTime] = timeSlot.split(' - ').map(this.timeToGridLine);
    return { start: startTime, end: endTime };
  }

  private timeToGridLine(time: string): number {
    const [hours, minutes] = time.split(':').map(Number);
    // Assuming the grid starts at 8:30 am and each row represents 30 minutes
    return (hours - 8) * 2 + (minutes === 30 ? 2 : 1);
  }
}
