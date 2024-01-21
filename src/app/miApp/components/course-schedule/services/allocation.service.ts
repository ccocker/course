import { Injectable } from '@angular/core';

type ScheduledClass = {
  day: string;
  startTime: string; // Format "HH:mm"
  endTime: string; // Format "HH:mm"
  groupNumber: string;
  id: string;
};

type Preference = {
  userId: string;
  classCode: string;
};

type Allocation = {
  userId: string;
  classCode: string;
};

@Injectable({
  providedIn: 'root',
})
export class AllocationService {
  private scheduledClasses: ScheduledClass[] = [
    // ... your scheduled classes data ...
  ];

  constructor() {}

  private isTimeOverlap(
    startTime1: string,
    endTime1: string,
    startTime2: string,
    endTime2: string
  ): boolean {
    return !(endTime1 <= startTime2 || startTime1 >= endTime2);
  }

  private hasTimeConflict(
    classToCheck: ScheduledClass,
    allocatedClasses: ScheduledClass[]
  ): boolean {
    return allocatedClasses.some((allocatedClass) => {
      return (
        allocatedClass.day === classToCheck.day &&
        this.isTimeOverlap(
          allocatedClass.startTime,
          allocatedClass.endTime,
          classToCheck.startTime,
          classToCheck.endTime
        )
      );
    });
  }

  public allocateClasses(preferences: Preference[]): Allocation[] {
    let allocations: Allocation[] = [];
    let allocatedClasses: ScheduledClass[] = [];

    preferences.forEach((pref) => {
      const classToAllocate = this.scheduledClasses.find(
        (sClass) => sClass.id === pref.classCode
      );
      if (
        classToAllocate &&
        !this.hasTimeConflict(classToAllocate, allocatedClasses)
      ) {
        allocations.push({ userId: pref.userId, classCode: pref.classCode });
        allocatedClasses.push(classToAllocate);
      }
    });

    return allocations;
  }

  // Additional method to process and output allocations if needed
  public processAllocations(preferences: Preference[]): void {
    const sortedPreferences = this.sortTutorsPreferences(preferences);
    const allocations = this.allocateClasses(sortedPreferences);
  }

  // Method to sort tutor preferences
  private sortTutorsPreferences(preferences: Preference[]): Preference[] {
    // Implement sorting logic here
    // ...
    return preferences; // Return sorted preferences
  }
}
