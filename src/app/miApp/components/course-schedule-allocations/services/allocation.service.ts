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
  }

  private getPreAllocations(): Allocation[] {
    // Include all pre-allocated classes here
    // Example:
    let allocations: Allocation[] = []
    allocations.push(
      {
        userId: 'yiwei.zhong@rmit.edu.au',
        classCode: 'WBC-G1-1',
        priority: 'H',
      },
      {
        userId: 'man.hou@rmit.edu.au',
        classCode: 'WBC-G1-1',
        priority: 'H',
      },
      {
        userId: 'ghazia.qaiser@rmit.edu.au',
        classCode: 'WBC-G1-1',
        priority: 'H',
      },
      {
        userId: 'man.hou@rmit.edu.au',
        classCode: 'WBC-G1-2',
        priority: 'H',
      },
      {
        userId: 'ghazia.qaiser@rmit.edu.au',
        classCode: 'WBC-G1-2',
        priority: 'H',
      },
      {
        userId: 's3465651@student.rmit.edu.au',
        classCode: 'WBC-G1-2',
        priority: 'H',
      },
      {
        userId: 'mailtojyotikundu@gmail.com',
        classCode: 'WBC-G1-3',
        priority: 'H',
      },
      {
        userId: 's3465651@student.rmit.edu.au',
        classCode: 'WBC-G1-3',
        priority: 'H',
      },
      {
        userId: 'ghazia.qaiser@rmit.edu.au',
        classCode: 'WBC-G1-3',
        priority: 'H',
      },
      {
        userId: 'mailtojyotikundu@gmail.com',
        classCode: 'WBC-G1-4',
        priority: 'H',
      },
      {
        userId: 'ghazia.qaiser@rmit.edu.au',
        classCode: 'WBC-G1-4',
        priority: 'H',
      },
      {
        userId: 's3465651@student.rmit.edu.au',
        classCode: 'WBC-G1-4',
        priority: 'H',
      },
      {
        userId: 'yiwei.zhong@rmit.edu.au',
        classCode: 'WBC-G2-1',
        priority: 'H',
      },
      {
        userId: 'mailtojyotikundu@gmail.com',
        classCode: 'WBC-G2-2',
        priority: 'H',
      },
      {
        userId: 'ghazia.qaiser@rmit.edu.au',
        classCode: 'WBC-G2-3',
        priority: 'H',
      },
      {
        userId: 'man.hou@rmit.edu.au',
        classCode: 'WBC-G2-4',
        priority: 'H',
      },
      {
        userId: 'sohamm973@gmail.com',
        classCode: 'BC1-G1-1',
        priority: 'H',
      },
      {
        userId: 'waqaralikhan_aus@hotmail.com',
        classCode: 'BC1-G1-1',
        priority: 'H',
      },
      {
        userId: 'shua0043@gmail.com',
        classCode: 'BC1-G1-1',
        priority: 'H',
      },
      {
        userId: 'chaminda.bulumulla2@rmit.edu.au',
        classCode: 'BC1-G1-2',
        priority: 'H',
      },
      {
        userId: 'trevor.reynolds@rmit.edu.au',
        classCode: 'BC1-G1-2',
        priority: 'H',
      },
      {
        userId: 'hiruni.kegalle@rmit.edu.au',
        classCode: 'BC1-G1-2',
        priority: 'H',
      },
      {
        userId: 'chaminda.bulumulla2@rmit.edu.au',
        classCode: 'BC1-G1-3',
        priority: 'H',
      },
      {
        userId: 'david.tedjopurnomo2@rmit.edu.au',
        classCode: 'BC1-G1-3',
        priority: 'H',
      },
      {
        userId: 'yediya.juan@rmit.edu.au',
        classCode: 'BC1-G1-3',
        priority: 'H',
      },
      {
        userId: 'chaminda.bulumulla2@rmit.edu.au',
        classCode: 'BC1-G1-4',
        priority: 'H',
      },
      {
        userId: 'renan.guarese@rmit.edu.au',
        classCode: 'BC1-G1-4',
        priority: 'H',
      },
      {
        userId: 's379180@student.rmit.edu.au',
        classCode: 'BC1-G1-4',
        priority: 'H',
      },
      {
        userId: 'chaminda.bulumulla2@rmit.edu.au',
        classCode: 'BC1-G2-1',
        priority: 'H',
      },
      {
        userId: 'david.tedjopurnomo2@rmit.edu.au',
        classCode: 'BC1-G2-1',
        priority: 'H',
      },
      {
        userId: 'ghazia.qaiser@rmit.edu.au',
        classCode: 'BC1-G2-1',
        priority: 'H',
      },
      {
        userId: 'yujin.jinx.huang@rmit.edu',
        classCode: 'BC1-G2-2',
        priority: 'H',
      },
      {
        userId: 'david.tedjopurnomo2@rmit.edu.au',
        classCode: 'BC1-G2-2',
        priority: 'H',
      },
      {
        userId: 'justin.perrie@rmit.edu.au',
        classCode: 'BC1-G2-2',
        priority: 'H',
      },
      {
        userId: 'mailtojyotikundu@gmail.com',
        classCode: 'BC1-G2-3',
        priority: 'H',
      },
      {
        userId: 'justin.perrie@rmit.edu.au',
        classCode: 'BC1-G2-3',
        priority: 'H',
      },
      {
        userId: 'renan.guarese@rmit.edu.au',
        classCode: 'BC1-G2-3',
        priority: 'H',
      },
      {
        userId: 'david.tedjopurnomo2@rmit.edu.au',
        classCode: 'BC1-G2-4',
        priority: 'H',
      },
      {
        userId: 'justin.perrie@rmit.edu.au',
        classCode: 'BC1-G2-4',
        priority: 'H',
      },
      {
        userId: 'mailtojyotikundu@gmail.com',
        classCode: 'BC1-G2-4',
        priority: 'H',
      },
      {
        userId: 'robert.mcquillan@rmit.edu.au',
        classCode: 'BC1-G3-1',
        priority: 'H',
      },
      {
        userId: 'dale@stanbrough.com.au',
        classCode: 'BC1-G3-1',
        priority: 'H',
      },
      {
        userId: 'mailtojyotikundu@gmail.com',
        classCode: 'BC1-G3-1',
        priority: 'H',
      },
      {
        userId: 'amina.hossain@rmit.edu.au',
        classCode: 'BC1-G3-2',
        priority: 'H',
      },
      {
        userId: 'renan.guarese@rmit.edu.au',
        classCode: 'BC1-G3-2',
        priority: 'H',
      },
      {
        userId: 'justin.perrie@rmit.edu.au',
        classCode: 'BC1-G3-2',
        priority: 'H',
      },
      {
        userId: 'man.hou@rmit.edu.au',
        classCode: 'BC1-G3-3',
        priority: 'H',
      },
      {
        userId: 'trevor.reynolds@rmit.edu.au',
        classCode: 'BC1-G3-3',
        priority: 'H',
      },
      {
        userId: 'shua0043@gmail.com',
        classCode: 'BC1-G3-3',
        priority: 'H',
      },
      {
        userId: 's379180@student.rmit.edu.au',
        classCode: 'BC1-G3-4',
        priority: 'H',
      },
      {
        userId: 'yiwei.zhong@rmit.edu.au',
        classCode: 'BC1-G3-4',
        priority: 'H',
      },
      {
        userId: 'yujin.jinx.huang@rmit.edu',
        classCode: 'BC1-G3-4',
        priority: 'H',
      },
      {
        userId: 'david.tedjopurnomo2@rmit.edu.au',
        classCode: 'BC1-G4-1',
        priority: 'H',
      },
      {
        userId: 'yujin.jinx.huang@rmit.edu',
        classCode: 'BC1-G4-1',
        priority: 'H',
      },
      {
        userId: 'yediya.juan@rmit.edu.au',
        classCode: 'BC1-G4-1',
        priority: 'H',
      },
      {
        userId: 'renan.guarese@rmit.edu.au',
        classCode: 'BC1-G4-2',
        priority: 'H',
      },
      {
        userId: 'mohsin.ali@rmit.edu.au',
        classCode: 'BC1-G4-2',
        priority: 'H',
      },
      {
        userId: 'shay.zheng@rmit.edu.au',
        classCode: 'BC1-G4-2',
        priority: 'H',
      },
      {
        userId: 'trevor.reynolds@rmit.edu.au',
        classCode: 'BC1-G4-3',
        priority: 'H',
      },
      {
        userId: 'justin.perrie@rmit.edu.au',
        classCode: 'BC1-G4-3',
        priority: 'H',
      },
      {
        userId: 'shay.zheng@rmit.edu.au',
        classCode: 'BC1-G4-3',
        priority: 'H',
      },
      {
        userId: 'yiwei.zhong@rmit.edu.au',
        classCode: 'BC1-G4-4',
        priority: 'H',
      },
      {
        userId: 'chaminda.bulumulla2@rmit.edu.au',
        classCode: 'BC1-G4-4',
        priority: 'H',
      },
      {
        userId: 's379180@student.rmit.edu.au',
        classCode: 'BC1-G4-4',
        priority: 'H',
      },
      {
        userId: 'ghazia.qaiser@rmit.edu.au',
        classCode: 'BC1-G5-1',
        priority: 'H',
      },
      {
        userId: 'dale@stanbrough.com.au',
        classCode: 'BC1-G5-1',
        priority: 'H',
      },
      {
        userId: 'waqaralikhan_aus@hotmail.com',
        classCode: 'BC1-G5-1',
        priority: 'H',
      },
      {
        userId: 'hiruni.kegalle@rmit.edu.au',
        classCode: 'BC1-G5-2',
        priority: 'H',
      },
      {
        userId: 'shua0043@gmail.com',
        classCode: 'BC1-G5-2',
        priority: 'H',
      },
      {
        userId: 'shay.zheng@rmit.edu.au',
        classCode: 'BC1-G5-3',
        priority: 'H',
      },
      {
        userId: 'yediya.juan@rmit.edu.au',
        classCode: 'BC1-G5-3',
        priority: 'H',
      },
      {
        userId: 'joy.chen@rmit.edu.au',
        classCode: 'BC1-G5-4',
        priority: 'H',
      },
      {
        userId: 'yiwei.zhong@rmit.edu.au',
        classCode: 'BC1-G5-4',
        priority: 'H',
      },
      {
        userId: 'man.hou@rmit.edu.au',
        classCode: 'BC1-G5-4',
        priority: 'H',
      },
      {
        userId: 'chaminda.bulumulla2@rmit.edu.au',
        classCode: 'BC1-G6-1',
        priority: 'H',
      },
      {
        userId: 'david.tedjopurnomo2@rmit.edu.au',
        classCode: 'BC1-G6-1',
        priority: 'H',
      },
      {
        userId: 'chaminda.bulumulla2@rmit.edu.au',
        classCode: 'BC1-G6-2',
        priority: 'H',
      },
      {
        userId: 'renan.guarese@rmit.edu.au',
        classCode: 'BC1-G6-2',
        priority: 'H',
      },
      {
        userId: 'mailtojyotikundu@gmail.com',
        classCode: 'BC1-G6-2',
        priority: 'H',
      },
      {
        userId: 'david.tedjopurnomo2@rmit.edu.au',
        classCode: 'BC1-G6-3',
        priority: 'H',
      },
      {
        userId: 'chaminda.bulumulla2@rmit.edu.au',
        classCode: 'BC1-G6-3',
        priority: 'H',
      },
      {
        userId: 'mailtojyotikundu@gmail.com',
        classCode: 'BC1-G6-3',
        priority: 'H',
      },
      {
        userId: 'yediya.juan@rmit.edu.au',
        classCode: 'BC1-G6-4',
        priority: 'H',
      },
      {
        userId: 'david.tedjopurnomo2@rmit.edu.au',
        classCode: 'BC1-G6-4',
        priority: 'H',
      },
      {
        userId: 'shay.zheng@rmit.edu.au',
        classCode: 'BC1-G6-4',
        priority: 'H',
      },
      {
        userId: 'dipto.pratyaksa@rmit.edu.au',
        classCode: 'BC1-G7-1',
        priority: 'H',
      },
      {
        userId: 'joy.chen@rmit.edu.au',
        classCode: 'BC1-G7-1',
        priority: 'H',
      },
      {
        userId: 'xiang.li2@rmit.edu.au',
        classCode: 'BC1-G7-1',
        priority: 'H',
      },
      {
        userId: 'shay.zheng@rmit.edu.au',
        classCode: 'BC1-G7-2',
        priority: 'H',
      },
      {
        userId: 'hiruni.kegalle@rmit.edu.au',
        classCode: 'BC1-G7-2',
        priority: 'H',
      },
      {
        userId: 'chaminda.bulumulla2@rmit.edu.au',
        classCode: 'BC1-G7-2',
        priority: 'H',
      },
      {
        userId: 'ghazia.qaiser@rmit.edu.au',
        classCode: 'BC1-G7-3',
        priority: 'H',
      },
      {
        userId: 'renan.guarese@rmit.edu.au',
        classCode: 'BC1-G7-3',
        priority: 'H',
      },
      {
        userId: 'david.tedjopurnomo2@rmit.edu.au',
        classCode: 'BC1-G7-3',
        priority: 'H',
      },
      {
        userId: 'mailtojyotikundu@gmail.com',
        classCode: 'BC1-G7-4',
        priority: 'H',
      },
      {
        userId: 'hiruni.kegalle@rmit.edu.au',
        classCode: 'BC1-G7-4',
        priority: 'H',
      },
      {
        userId: 'shua0043@gmail.com',
        classCode: 'BC1-G7-4',
        priority: 'H',
      },
      {
        userId: 'md.palash.uddin@rmit.edu.au',
        classCode: 'BC2-G1-1',
        priority: 'H',
      },
      {
        userId: 'sheryl.hanna.mantik@rmit.edu.au',
        classCode: 'BC2-G1-1',
        priority: 'H',
      },
      {
        userId: 'sohamm973@gmail.com',
        classCode: 'BC2-G1-1',
        priority: 'H',
      },
      {
        userId: 'yediya.juan@rmit.edu.au',
        classCode: 'BC2-G1-2',
        priority: 'H',
      },
      {
        userId: 'david.tedjopurnomo2@rmit.edu.au',
        classCode: 'BC2-G1-2',
        priority: 'H',
      },
      {
        userId: 'shay.zheng@rmit.edu.au',
        classCode: 'BC2-G1-2',
        priority: 'H',
      },
      {
        userId: 'sheryl.hanna.mantik@rmit.edu.au',
        classCode: 'BC2-G1-3',
        priority: 'H',
      },
      {
        userId: 'yediya.juan@rmit.edu.au',
        classCode: 'BC2-G1-3',
        priority: 'H',
      },
      {
        userId: 'chaminda.bulumulla2@rmit.edu.au',
        classCode: 'BC2-G1-3',
        priority: 'H',
      },
      {
        userId: 'sheryl.hanna.mantik@rmit.edu.au',
        classCode: 'BC2-G1-4',
        priority: 'H',
      },
      {
        userId: 'waqaralikhan_aus@hotmail.com',
        classCode: 'BC2-G1-4',
        priority: 'H',
      },
      {
        userId: 'yediya.juan@rmit.edu.au',
        classCode: 'BC2-G1-4',
        priority: 'H',
      },
      {
        userId: 'mohsin.ali@rmit.edu.au',
        classCode: 'BC2-G2-1',
        priority: 'H',
      },
      {
        userId: 'man.hou@rmit.edu.au',
        classCode: 'BC2-G2-1',
        priority: 'H',
      },
      {
        userId: 'yediya.juan@rmit.edu.au',
        classCode: 'BC2-G2-1',
        priority: 'H',
      },
      {
        userId: 'mailtojyotikundu@gmail.com',
        classCode: 'BC2-G2-2',
        priority: 'H',
      },
      {
        userId: 'justin.perrie@rmit.edu.au',
        classCode: 'BC2-G2-2',
        priority: 'H',
      },
      {
        userId: 'ghazia.qaiser@rmit.edu.au',
        classCode: 'BC2-G2-2',
        priority: 'H',
      },
      {
        userId: 'ghazia.qaiser@rmit.edu.au',
        classCode: 'BC2-G2-3',
        priority: 'H',
      },
      {
        userId: 'xiang.li2@rmit.edu.au',
        classCode: 'BC2-G2-3',
        priority: 'H',
      },
      {
        userId: 'yediya.juan@rmit.edu.au',
        classCode: 'BC2-G2-3',
        priority: 'H',
      },
      {
        userId: 'md.palash.uddin@rmit.edu.au',
        classCode: 'BC2-G2-4',
        priority: 'H',
      },
      {
        userId: 'waqaralikhan_aus@hotmail.com',
        classCode: 'BC2-G2-4',
        priority: 'H',
      },
      {
        userId: 'yujin.jinx.huang@rmit.edu',
        classCode: 'BC2-G2-4',
        priority: 'H',
      },
    )

    return allocations
  }

  // Additional method to process and output allocations if needed
  public processAllocations(preferences: Preference[], scheduleData: any): any {
    preferences = this.filterPreferences(preferences)
    const excludedTutors = [
      'artemis.rosman@rmit.edu.au',
      'tomaghan@gmail.com',
      'mitchell.simmons@rmit.edu.au',
      'myeonghoon18@gmail.com',
      'sakshamjain2552@gmail.com',
      's3465651@student.rmit.edu.au',
      'jakemelb87@gmail.com',
      's3870682@student.rmit.edu.au',
      'lucas2@live.com.au',
      'lucas.rodiadis@rmit.edu.au',
      'h.porter23@icloud.com',
      'harry.porter@rmit.edu.au',
      'mathursuhavni06@gmail.com',
      's3874834@student.rmit.edu.au',
      'myeonghoon.sun.coder@gmail.com',
      'hoonie.sun@rmit.edu.au',
      'josipwarren@gmail.com',
      'joseph.warren@rmit.edu.au',
      'arjk626@gmail.com',
      'arjun.kumar@rmit.edu.au',
      'tomaghan@gmail.com',
      'tom.monaghan@rmit.edu.au',
      'akshitaagr1509@gmail.com',
      'akshita.agrawal2@rmit.edu.au',
      'mitchellrichardsimmons@gmail.com',
      'mitchell.simmons@rmit.edu.au',
      'Ibrahim.ashhab@gmail.com',
      's3953973@student.rmit.edu.au',
      'aksharamin0501@gmail.com',
      'aksharkumar.amin@rmit.edu.au',
      'duyiqi1717@gmail.com',
      'gilbert.du@rmit.edu.au',
      'rosmanartemis@gmail.com',
      'S3918741@student.rmit.edu.au',
      'sakshamjain2552@gmail.com',
      'S3923854@student.rmit.edu.au',
      'workkuls@gmail.com',
      'S3976304@student.rmit.edu.au',
    ]

    preferences = this.filterOutTutors(preferences, excludedTutors)
    const sortedPreferences = this.sortTutorsPreferences(preferences)
    preferences = this.sortTutorPreferencesByPriority(sortedPreferences)
    const allocations: Allocation[] = this.allocateClasses(
      preferences,
      scheduleData,
    )

    return allocations
  }

  filterPreferences(preferences: Preference[]): Preference[] {
    return preferences.filter(
      (pref) => pref['priority'] !== 'X' && !pref['classCode'].includes('WBC'),
    )
  }

  public allocateClasses(
    preferences: Preference[],
    scheduledClasses: ScheduledClass[],
  ): Allocation[] {
    let allocations: Allocation[] = this.getPreAllocations() // Get pre-allocations

    let tutorAllocationCount: Map<string, number> = new Map() // Track number of allocations per tutor
    let tutorClassTimes: Map<string, ScheduledClass[]> = new Map()
    let classTutorCount: Map<string, number> = new Map() // Track number of tutors per class

    // Update tutor allocation count for pre-allocations and incorporate into tutorClassTimes
    for (const alloc of allocations) {
      const classInfo = scheduledClasses.find((sc) => sc.id === alloc.classCode)
      if (classInfo) {
        if (!tutorClassTimes.has(alloc.userId)) {
          tutorClassTimes.set(alloc.userId, [])
        }
        tutorClassTimes.get(alloc.userId)!.push(classInfo)

        tutorAllocationCount.set(
          alloc.userId,
          (tutorAllocationCount.get(alloc.userId) || 0) + 1,
        )
      }
    }

    let remainingPreferences = [...preferences]
    while (remainingPreferences.length > 0) {
      let tutorsAllocatedThisRound: Set<string> = new Set()
      let nextRoundPreferences: Preference[] = []

      for (const pref of remainingPreferences) {
        const classToAllocate = scheduledClasses.find(
          (sc) => sc.id === pref.classCode,
        )

        // Skip if this preference is already allocated
        if (
          allocations.some(
            (a) => a.userId === pref.userId && a.classCode === pref.classCode,
          )
        ) {
          continue
        }

        // Allocation checks
        if (
          classToAllocate &&
          !tutorsAllocatedThisRound.has(pref.userId) &&
          !this.hasTimeConflict(
            classToAllocate,
            tutorClassTimes.get(pref.userId) || [],
          ) &&
          (classTutorCount.get(pref.classCode) || 0) < 3
        ) {
          allocations.push({
            userId: pref.userId,
            classCode: pref.classCode,
            priority: pref.priority,
          })

          tutorsAllocatedThisRound.add(pref.userId)
          tutorClassTimes.get(pref.userId)!.push(classToAllocate)
          tutorAllocationCount.set(
            pref.userId,
            (tutorAllocationCount.get(pref.userId) || 0) + 1,
          )
          classTutorCount.set(
            pref.classCode,
            (classTutorCount.get(pref.classCode) || 0) + 1,
          )
        } else {
          // Future allocation possibility check
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

      if (nextRoundPreferences.length === remainingPreferences.length) {
        break
      }
      remainingPreferences = nextRoundPreferences
    }

    // Convert tutorAllocationCount to an array
    let tutorAllocationArray = Array.from(
      tutorAllocationCount,
      ([userId, numberOfClasses]) => {
        // Calculate hours based on the provided formula
        let hours = numberOfClasses * 2 + numberOfClasses * 0.66
        return { userId, numberOfClasses, hours }
      },
    )
    console.log('Tutor count', tutorAllocationArray)

    return allocations
  }

  /*
public allocateClasses(
    preferences: Preference[],
    scheduledClasses: ScheduledClass[],
  ): Allocation[] {
    let allocations: Allocation[] = []
    allocations = this.getPreAllocations()
    let remainingPreferences = [...preferences]
    let tutorClassTimes: Map<string, ScheduledClass[]> = new Map()
    let classTutorCount: Map<string, number> = new Map() // Track number of tutors per class
    let tutorAllocationCount: Map<string, number> = new Map() // Track number of allocations per tutor

    let initialclassToAllocate = scheduledClasses.find(
      (sc) => sc.id === 'WBC-G1-1',
    )
    // Update tutor's class times
    tutorClassTimes.set('yiwei.zhong@rmit.edu.au', [])
    tutorClassTimes.get('yiwei.zhong@rmit.edu.au')!.push(initialclassToAllocate)
    initialclassToAllocate = scheduledClasses.find((sc) => sc.id === 'WBC-G2-1')
    tutorClassTimes.get('yiwei.zhong@rmit.edu.au')!.push(initialclassToAllocate)
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
          (classTutorCount.get(pref.classCode) || 0) < 3
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
    return allocations
  }
*/
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

  public reportTimeConflicts(
    allocations: Allocation[],
    scheduledClasses: ScheduledClass[],
  ): string[] {
    let tutorClassTimes: Map<string, ScheduledClass[]> = new Map()
    let conflictReports: string[] = []

    // Group class times by tutor
    allocations.forEach((alloc) => {
      const classInfo = scheduledClasses.find((sc) => sc.id === alloc.classCode)
      if (classInfo) {
        if (!tutorClassTimes.has(alloc.userId)) {
          tutorClassTimes.set(alloc.userId, [])
        }
        tutorClassTimes.get(alloc.userId)!.push(classInfo)
      }
    })

    // Check for time conflicts
    tutorClassTimes.forEach((classes, tutor) => {
      for (let i = 0; i < classes.length; i++) {
        for (let j = i + 1; j < classes.length; j++) {
          if (
            classes[i].day === classes[j].day &&
            this.isTimeOverlap(
              classes[i].startTime,
              classes[i].endTime,
              classes[j].startTime,
              classes[j].endTime,
            )
          ) {
            conflictReports.push(
              `Time conflict for tutor ${tutor} between classes ${classes[i].id} and ${classes[j].id} on ${classes[i].day}`,
            )
          }
        }
      }
    })
    console.log('report', conflictReports)
    return conflictReports
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
