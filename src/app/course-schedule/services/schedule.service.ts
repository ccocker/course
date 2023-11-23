import { Injectable } from '@angular/core';

export interface ScheduleEvent {
	day: string;
	roomNumber: string;
	timeSlot: string;
	class: string;
	lecturer: string;
	capacity: number;
	tutors?: string[];
	color?: string;
	gridColumnStart?: number;
	gridColumnEnd?: number;
	gridRowStart?: number;
	gridRowEnd?: number;
}

interface TimeSlotEventGroup {
	timeSlot: string;
	events: ScheduleEvent[];
}

@Injectable({
	providedIn: 'root'
})
export class ScheduleService {
    private scheduleData: ScheduleEvent[] = [
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
      capacity: 150,
    },
    {
      day: 'Monday',
      roomNumber: '012.10.004',
      timeSlot: '09:30 - 11:30',
      class: 'WBC-G1-1',
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
      capacity: 150,
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
      class: 'BC1-G6-1',
      lecturer: 'Henry Cavill',
      capacity: 150,
    },
    {
      day: 'Monday',
      roomNumber: '012.10.004',
      timeSlot: '14:30 - 16:30',
      class: 'WBC-G1-1',
      lecturer: 'Henry Cavill',
      capacity: 120,
    },
    {
      day: 'Monday',
      roomNumber: '012.10.005',
      timeSlot: '14:30 - 16:30',
      class: 'BC2-G2-1',
      lecturer: 'Henry Cavill',
      capacity: 150,
    },
    {
      day: 'Monday',
      roomNumber: '012.10.004',
      timeSlot: '16:30 - 18:30',
      class: 'BC1-7-1',
      lecturer: 'Henry Cavill',
      capacity: 120,
    },
    {
      day: 'Monday',
      roomNumber: '012.10.005',
      timeSlot: '16:30 - 18:30',
      class: 'BC2-G2-1',
      lecturer: 'Henry Cavill',
      capacity: 150,
    },
    {
      day: 'Tuesday',
      roomNumber: '012.10.004',
      timeSlot: '08:30 - 10:30',
      class: 'BC1-G1-2',
      lecturer: 'Henry Cavill',
      capacity: 120,
    },
  ];


	constructor() {}

	getEventsByTimeSlot(): TimeSlotEventGroup[] {
		const groups = new Map<string, ScheduleEvent[]>();

		this.scheduleData.forEach((event) => {
			const group = groups.get(event.timeSlot) || [];
			group.push(event);
			groups.set(event.timeSlot, group);
		});

		return Array.from(groups, ([timeSlot, events]) => ({ timeSlot, events }));
	}

	calculateGridPosition(event: ScheduleEvent): ScheduleEvent {
		const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'];
		const [startTime, endTime] = event.timeSlot.split(' - ');

		const dayIndex = days.indexOf(event.day) + 2; // +2 because of the header and the first column for times
		const startRow = this.calculateRow(startTime);
		const endRow = this.calculateRow(endTime);

		return {
			...event,
			gridColumnStart: dayIndex,
			gridColumnEnd: dayIndex + 1,
			gridRowStart: startRow,
			gridRowEnd: endRow
		};
	}

	private calculateRow(time: string): number {
		const [hours, minutes] = time.split(':').map(Number);
		// This calculates the correct row, starting at 2 for the first time slot (8:00 AM)
		return (hours - 8) * 2 + (minutes === 30 ? 1 : 0) + 2;
	}

	private calculateTutors(capacity: number): string[] {
		// Subtract 30 from the capacity, divide by 30, and round up
		const numberOfTutors = Math.ceil((capacity - 30) / 30);
		// Create an array of tutor names based on the number calculated
		return Array.from({ length: numberOfTutors }, (_, index) => `Tutor ${index + 1}`);
	}

	getSchedule() {
    return this.scheduleData;
	}

	getTimeSlots() {
		const slots = [];
		for (let hour = 8; hour <= 18; hour++) {
			slots.push(`${hour.toString().padStart(2, '0')}:00`);
			slots.push(`${hour.toString().padStart(2, '0')}:30`);
		}
		return slots;
	}
}
