import { Injectable } from '@angular/core'

type ScheduledClass = {
  day: string
  startTime: string // Format "HH:mm"
  endTime: string // Format "HH:mm"
  groupNumber: string
  id: string
}

const priorityOrder = { H: 1, M: 2, L: 3 }

type Preference = {
  userId: string
  classCode: string
}

type Allocation = {
  userId: string
  classCode: string
}

@Injectable({
  providedIn: 'root',
})
export class AllocationService {
  private scheduledClasses: ScheduledClass[] = [
    // ... your scheduled classes data ...
  ]

  constructor() {}

  // Additional method to process and output allocations if needed
  public processAllocations(preferences: Preference[]): any {
    preferences = this.filterPreferences(preferences)
    const sortedPreferences = this.sortTutorsPreferences(preferences)
    preferences = this.sortTutorPreferencesByPriority(sortedPreferences)
    const allocations = this.allocateClasses(preferences)
    console.log('Preferences', preferences)
    console.log('Allocations', allocations)
    debugger

    return allocations
  }

  private isTimeOverlap(
    startTime1: string,
    endTime1: string,
    startTime2: string,
    endTime2: string,
  ): boolean {
    return !(endTime1 <= startTime2 || startTime1 >= endTime2)
  }

  private hasTimeConflict(
    classToCheck: ScheduledClass,
    allocatedClasses: ScheduledClass[],
  ): boolean {
    return allocatedClasses.some((allocatedClass) => {
      return (
        allocatedClass.day === classToCheck.day &&
        this.isTimeOverlap(
          allocatedClass.startTime,
          allocatedClass.endTime,
          classToCheck.startTime,
          classToCheck.endTime,
        )
      )
    })
  }

  filterPreferences(preferences: Preference[]): Preference[] {
    return preferences.filter((pref) => pref['priority'] !== 'X')
  }

  public allocateClasses(preferences: Preference[]): Allocation[] {
    let allocations: Allocation[] = []
    let allocatedClasses: ScheduledClass[] = []
    let remainingPreferences = [...preferences] // Create a copy of preferences
    let allocationMade: boolean

    do {
      allocationMade = false // Reset for each iteration

      // Iterate through remaining preferences
      for (let i = 0; i < remainingPreferences.length; i++) {
        const pref = remainingPreferences[i]

        allocations.push({ userId: pref.userId, classCode: pref.classCode })
        allocationMade = true

        // Remove the allocated preference
        remainingPreferences.splice(i, 1)
        i-- // Adjust the index since we've modified the array
      }
    } while (allocationMade && remainingPreferences.length > 0)

    return allocations
  }

  private sortTutorsPreferences(preferences: Preference[]): Preference[] {
    // Create a shallow copy of the array
    const preferencesCopy = [...preferences]

    const preferenceCount = preferencesCopy.reduce((count, pref) => {
      count[pref.userId] = (count[pref.userId] || 0) + 1
      return count
    }, {})

    return preferencesCopy.sort((a, b) => {
      const countDiff = preferenceCount[a.userId] - preferenceCount[b.userId]
      if (countDiff !== 0) return countDiff
      return a.userId.localeCompare(b.userId)
    })
  }

  sortTutorPreferencesByPriority(preferences: Preference[]): Preference[] {
    return preferences.sort((a, b) => {
      // Check if same tutor
      if (a.userId === b.userId) {
        // Sort by priority within the same tutor
        return priorityOrder[a['priority']] - priorityOrder[b['priority']]
      }

      // If different tutors, maintain their current order
      return 0
    })
  }
}
