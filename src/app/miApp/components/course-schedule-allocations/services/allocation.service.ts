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
  private scheduledClasses: ScheduledClass[]

  private allocations: Allocation[]
  constructor() {}

  public getScheduleData(schedule: ScheduledClass[]): any {
    this.scheduledClasses = schedule
    console.log('schedule', this.scheduledClasses)
    debugger
  }

  // Additional method to process and output allocations if needed
  public processAllocations(preferences: Preference[], scheduleData: any): any {
    preferences = this.filterPreferences(preferences)
    const excludedTutors = [
      'artemis.rosman@rmit.edu.au',
      'tomaghan@gmail.com',
      'myeonghoon18@gmail.com',
      'sakshamjain2552@gmail.com',
    ]

    preferences = this.filterOutTutors(preferences, excludedTutors)
    const sortedPreferences = this.sortTutorsPreferences(preferences)
    preferences = this.sortTutorPreferencesByPriority(sortedPreferences)
    debugger
    const allocations: Allocation[] = this.allocateClasses(
      preferences,
      scheduleData,
    )
    console.log('Preferences', preferences)
    console.log('Allocations', allocations)

    return allocations
  }

  filterPreferences(preferences: Preference[]): Preference[] {
    return preferences.filter((pref) => pref['priority'] !== 'X')
  }

  public allocateClasses(
    preferences: Preference[],
    scheduledClasses: ScheduledClass[],
  ): Allocation[] {
    let allocations: Allocation[] = []
    let remainingPreferences = [...preferences]
    let tutorClassTimes: Map<string, ScheduledClass[]> = new Map()
    let classTutorCount: Map<string, number> = new Map() // Track number of tutors per class
    let tutorAllocationCount: Map<string, number> = new Map() // Track number of allocations per tutor

    while (remainingPreferences.length > 0) {
      let tutorsAllocatedThisRound: Set<string> = new Set()
      let nextRoundPreferences: Preference[] = [] // Preferences for the next round

      for (const pref of remainingPreferences) {
        const classToAllocate = scheduledClasses.find(
          (sc) => sc.id === pref.classCode,
        )

        // Check if the tutor has already been allocated this class
        if (
          allocations.some(
            (a) => a.userId === pref.userId && a.classCode === pref.classCode,
          )
        ) {
          continue // Skip if this preference is already allocated
        }

        // Check for time conflict, tutor allocation this round, and class tutor count limit
        if (
          classToAllocate &&
          !tutorsAllocatedThisRound.has(pref.userId) &&
          !this.hasTimeConflict(
            classToAllocate,
            tutorClassTimes.get(pref.userId) || [],
          ) &&
          (classTutorCount.get(pref.classCode) || 0) < 4
        ) {
          allocations.push({
            userId: pref.userId,
            classCode: pref.classCode,
            priority: pref.priority,
          })

          tutorsAllocatedThisRound.add(pref.userId)
          classTutorCount.set(
            pref.classCode,
            (classTutorCount.get(pref.classCode) || 0) + 1,
          )
          tutorAllocationCount.set(
            pref.userId,
            (tutorAllocationCount.get(pref.userId) || 0) + 1,
          )

          // Update tutor's class times
          if (!tutorClassTimes.has(pref.userId)) {
            tutorClassTimes.set(pref.userId, [])
          }
          tutorClassTimes.get(pref.userId)!.push(classToAllocate)
        } else {
          // Check if it's possible for this preference to be allocated in the future
          if (
            !this.hasTimeConflict(
              classToAllocate,
              tutorClassTimes.get(pref.userId) || [],
            )
          ) {
            nextRoundPreferences.push(pref)
          }
        }
      }

      // If no new allocations were made and no preferences are carried over, break the loop
      if (nextRoundPreferences.length === remainingPreferences.length) {
        break
      }

      // Prepare for the next round
      remainingPreferences = nextRoundPreferences
    }

    // Convert tutorAllocationCount to an array
    let tutorAllocationArray = Array.from(
      tutorAllocationCount,
      ([userId, count]) => ({ userId, count }),
    )
    console.log(tutorAllocationArray)
    debugger
    return allocations
  }

  /*
  public allocateClasses(preferences: Preference[]): Allocation[] {
    let allocations: Allocation[] = []
    let remainingPreferences = [...preferences]
    let tutorsAllocatedThisRound: Set<string> = new Set() // Track tutors allocated in this round
    let classAllocationCount: Map<string, number> = new Map() // Track number of tutors per class

    while (remainingPreferences.length > 0) {
      for (let i = 0; i < remainingPreferences.length; i++) {
        const pref = remainingPreferences[i]

        // Check if the class already has 4 tutors allocated
        const currentCount = classAllocationCount.get(pref.classCode) || 0
        if (currentCount >= 4) {
          remainingPreferences.splice(i, 1) // Remove the allocated preference
          continue // Skip if 4 tutors are already allocated to this class
        }

        // Allocate only if the tutor hasn't been allocated a preference in this round
        if (!tutorsAllocatedThisRound.has(pref.userId)) {
          allocations.push({
            userId: pref.userId,
            classCode: pref.classCode,
            priority: pref.priority,
          })

          tutorsAllocatedThisRound.add(pref.userId) // Mark tutor as allocated this round
          classAllocationCount.set(pref.classCode, currentCount + 1) // Update class allocation count

          remainingPreferences.splice(i, 1) // Remove the allocated preference
          i-- // Adjust the index since we've modified the array
        }
      }

      tutorsAllocatedThisRound.clear() // Clear for the next iteration
    }

    return allocations
  }
*/
  /*
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
*/
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
