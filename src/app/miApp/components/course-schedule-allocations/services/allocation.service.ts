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
  priority: string
}

type Allocation = {
  userId: string
  classCode: string
  priority: string
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
    debugger
    const excludedTutors = [
      'artemis.rosman@rmit.edu.au',
      'tomaghan@gmail.com',
      'myeonghoon18@gmail.com',
      'sakshamjain2552@gmail.com',
    ]

    preferences = this.filterOutTutors(preferences, excludedTutors)
    const sortedPreferences = this.sortTutorsPreferences(preferences)
    preferences = this.sortTutorPreferencesByPriority(sortedPreferences)
    const allocations: Allocation[] = this.allocateClasses(preferences)
    console.log('Preferences', preferences)
    console.log('Allocations', allocations)

    return allocations
  }

  filterPreferences(preferences: Preference[]): Preference[] {
    return preferences.filter((pref) => pref['priority'] !== 'X')
  }

  public allocateClasses(preferences: Preference[]): Allocation[] {
    let allocations: Allocation[] = []
    let allocatedPreferences: Set<string> = new Set() // Track allocated preferences
    let remainingPreferences = [...preferences]

    while (remainingPreferences.length > 0) {
      let tutorsAllocatedThisRound: Set<string> = new Set() // Track tutors allocated in this round

      for (let i = 0; i < remainingPreferences.length; i++) {
        const pref = remainingPreferences[i]

        // Allocate only if the tutor hasn't been allocated a preference in this round
        if (!tutorsAllocatedThisRound.has(pref.userId)) {
          allocations.push({
            userId: pref.userId,
            classCode: pref.classCode,
            priority: pref.priority,
          })

          tutorsAllocatedThisRound.add(pref.userId) // Mark tutor as allocated this round
          allocatedPreferences.add(pref['id']) // Mark preference as allocated
          remainingPreferences.splice(i, 1) // Remove the allocated preference
          i-- // Adjust the index since we've modified the array
        }
      }
    }

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

  filterOutTutors(
    preferences: Preference[],
    excludedEmails: string[],
  ): Preference[] {
    return preferences.filter((pref) => !excludedEmails.includes(pref.userId))
  }

  private hasTimeConflict(
    classToCheck: ScheduledClass,
    allocatedClasses: ScheduledClass[],
  ): boolean {
    for (const allocatedClass of allocatedClasses) {
      if (
        this.isTimeOverlap(
          classToCheck.startTime,
          classToCheck.endTime,
          allocatedClass.startTime,
          allocatedClass.endTime,
        )
      ) {
        return true // Time conflict found
      }
    }
    return false
  }

  private isTimeOverlap(
    startTime1: string,
    endTime1: string,
    startTime2: string,
    endTime2: string,
  ): boolean {
    return !(endTime1 <= startTime2 || startTime1 >= endTime2)
  }
}
