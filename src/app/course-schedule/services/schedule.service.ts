import { Injectable } from '@angular/core'

export interface ScheduleEvent {
  day: string
  roomNumber: string
  timeSlot: string
  class: string
  lecturer: string
  capacity: number
  tutors?: string[]
  color?: string
  gridColumnStart?: number
  gridColumnEnd?: number
  gridRowStart?: number
  gridRowEnd?: number
}

interface TimeSlotEventGroup {
  timeSlot: string
  events: ScheduleEvent[]
}

interface GroupColor {
  [group: string]: string
}

interface CourseGroupColors {
  [course: string]: GroupColor
}

@Injectable({
  providedIn: 'root',
})
export class ScheduleService {
  private scheduleData: ScheduleEvent[] = [
    {
      day: 'Monday',
      roomNumber: '012.10.005',
      timeSlot: '08:30 - 10:30',
      class: 'BC1-G1-1',
      lecturer: 'Lead',
      capacity: 120,
    },
    {
      day: 'Monday',
      roomNumber: '012.10.006',
      timeSlot: '08:30 - 10:30',
      class: 'BC1-G2-1',
      lecturer: 'Lead',
      capacity: 150,
    },
    {
      day: 'Monday',
      roomNumber: '012.10.005',
      timeSlot: '09:30 - 11:30',
      class: 'WBC-G2-1',
      lecturer: 'Lead',
      capacity: 120,
    },
    {
      day: 'Monday',
      roomNumber: '012.10.005',
      timeSlot: '10:30 - 12:30',
      class: 'BC1-G3-1',
      lecturer: 'Lead',
      capacity: 120,
    },
    {
      day: 'Monday',
      roomNumber: '012.10.006',
      timeSlot: '10:30 - 12:30',
      class: 'BC1-G4-1',
      lecturer: 'Lead',
      capacity: 150,
    },
    {
      day: 'Monday',
      roomNumber: '012.10.005',
      timeSlot: '12:30 - 14:30',
      class: 'BC1-G5-1',
      lecturer: 'Lead',
      capacity: 120,
    },
    {
      day: 'Monday',
      roomNumber: '012.10.006',
      timeSlot: '12:30 - 14:30',
      class: 'BC1-G6-1',
      lecturer: 'Lead',
      capacity: 150,
    },
    {
      day: 'Monday',
      roomNumber: '012.10.005',
      timeSlot: '14:30 - 16:30',
      class: 'WBC-G1-1',
      lecturer: 'Lead',
      capacity: 120,
    },
    {
      day: 'Monday',
      roomNumber: '012.10.006',
      timeSlot: '14:30 - 16:30',
      class: 'BC2-G1-1',
      lecturer: 'Lead',
      capacity: 150,
    },
    {
      day: 'Monday',
      roomNumber: '012.10.005',
      timeSlot: '16:30 - 18:30',
      class: 'BC1-G7-1',
      lecturer: 'Lead',
      capacity: 120,
    },
    {
      day: 'Monday',
      roomNumber: '012.10.006',
      timeSlot: '16:30 - 18:30',
      class: 'BC2-G2-1',
      lecturer: 'Lead',
      capacity: 150,
    },
    {
      day: 'Tuesday',
      roomNumber: '012.10.005',
      timeSlot: '08:30 - 10:30',
      class: 'BC1-G1-2',
      lecturer: 'Lead',
      capacity: 120,
    },
    {
      day: 'Tuesday',
      roomNumber: '012.10.006',
      timeSlot: '08:30 - 10:30',
      class: 'BC1-G2-2',
      lecturer: 'Lead',
      capacity: 150,
    },
    {
      day: 'Tuesday',
      roomNumber: '012.10.005',
      timeSlot: '10:30 - 12:30',
      class: 'BC1-G3-2',
      lecturer: 'Lead',
      capacity: 120,
    },
    {
      day: 'Tuesday',
      roomNumber: '012.10.006',
      timeSlot: '10:30 - 12:30',
      class: 'BC1-G4-2',
      lecturer: 'Lead',
      capacity: 150,
    },
    {
      day: 'Tuesday',
      roomNumber: '012.10.005',
      timeSlot: '12:30 - 14:30',
      class: 'BC1-G5-2',
      lecturer: 'Lead',
      capacity: 120,
    },
    {
      day: 'Tuesday',
      roomNumber: '012.10.006',
      timeSlot: '12:30 - 14:30',
      class: 'BC1-G6-2',
      lecturer: 'Lead',
      capacity: 150,
    },
    {
      day: 'Tuesday',
      roomNumber: '012.10.005',
      timeSlot: '14:30 - 16:30',
      class: 'WBC-G1-2',
      lecturer: 'Lead',
      capacity: 120,
    },
    {
      day: 'Tuesday',
      roomNumber: '012.10.006',
      timeSlot: '14:30 - 16:30',
      class: 'BC2-G1-2',
      lecturer: 'Lead',
      capacity: 150,
    },
    {
      day: 'Tuesday',
      roomNumber: '014.09.023',
      timeSlot: '14:30 - 16:30',
      class: 'WBC-G2-2',
      lecturer: 'Lead',
      capacity: 60,
    },
    {
      day: 'Tuesday',
      roomNumber: '012.10.005',
      timeSlot: '16:30 - 18:30',
      class: 'BC1-G7-2',
      lecturer: 'Lead',
      capacity: 120,
    },
    {
      day: 'Tuesday',
      roomNumber: '012.10.006',
      timeSlot: '16:30 - 18:30',
      class: 'BC2-G2-2',
      lecturer: 'Lead',
      capacity: 150,
    },
    {
      day: 'Wednesday',
      roomNumber: '012.10.005',
      timeSlot: '08:30 - 10:30',
      class: 'BC1-G1-A',
      lecturer: 'Lead',
      capacity: 120,
    },
    {
      day: 'Wednesday',
      roomNumber: '012.10.006',
      timeSlot: '08:30 - 10:30',
      class: 'BC1-G2-A',
      lecturer: 'Lead',
      capacity: 150,
    },
    {
      day: 'Wednesday',
      roomNumber: '012.10.005',
      timeSlot: '10:30 - 12:30',
      class: 'BC1-G3-A',
      lecturer: 'Lead',
      capacity: 120,
    },
    {
      day: 'Wednesday',
      roomNumber: '012.10.006',
      timeSlot: '10:30 - 12:30',
      class: 'BC1-G4-A',
      lecturer: 'Lead',
      capacity: 150,
    },
    {
      day: 'Wednesday',
      roomNumber: '012.10.005',
      timeSlot: '12:30 - 14:30',
      class: 'BC1-G5-A',
      lecturer: 'Lead',
      capacity: 120,
    },
    {
      day: 'Wednesday',
      roomNumber: '012.10.006',
      timeSlot: '12:30 - 14:30',
      class: 'BC1-G6-A',
      lecturer: 'Lead',
      capacity: 150,
    },
    {
      day: 'Wednesday',
      roomNumber: '012.10.005',
      timeSlot: '14:30 - 16:30',
      class: 'BC2-G1-3',
      lecturer: 'Lead',
      capacity: 120,
    },
    {
      day: 'Wednesday',
      roomNumber: '012.10.006',
      timeSlot: '14:30 - 16:30',
      class: 'BC1-G7-A',
      lecturer: 'Lead',
      capacity: 150,
    },
    {
      day: 'Wednesday',
      roomNumber: '012.10.005',
      timeSlot: '16:30 - 18:30',
      class: 'BC2-G2-3',
      lecturer: 'Lead',
      capacity: 120,
    },
    {
      day: 'Thursday',
      roomNumber: '012.10.005',
      timeSlot: '09:00 - 11:00',
      class: 'WBC-G2-3',
      lecturer: 'Lead',
      capacity: 120,
    },
    {
      day: 'Thursday',
      roomNumber: '012.10.005',
      timeSlot: '14:30 - 16:30',
      class: 'BC2-G1-A',
      lecturer: 'Lead',
      capacity: 120,
    },
    {
      day: 'Thursday',
      roomNumber: '012.10.006',
      timeSlot: '14:30 - 16:30',
      class: 'WBC-G1-3',
      lecturer: 'Lead',
      capacity: 150,
    },
    {
      day: 'Thursday',
      roomNumber: '012.10.005',
      timeSlot: '16:30 - 18:30',
      class: 'BC2-G2-A',
      lecturer: 'Lead',
      capacity: 120,
    },
    {
      day: 'Friday',
      roomNumber: '012.10.005',
      timeSlot: '08:30 - 10:30',
      class: 'BC1-G1-3',
      lecturer: 'Lead',
      capacity: 120,
    },
    {
      day: 'Friday',
      roomNumber: '012.10.006',
      timeSlot: '08:30 - 10:30',
      class: 'BC1-G2-3',
      lecturer: 'Lead',
      capacity: 150,
    },
    {
      day: 'Friday',
      roomNumber: '014.09.023',
      timeSlot: '08:30 - 10:30',
      class: 'WBC-G2-A',
      lecturer: 'Lead',
      capacity: 60,
    },
    {
      day: 'Friday',
      roomNumber: '012.10.005',
      timeSlot: '10:30 - 12:30',
      class: 'BC1-G1-3',
      lecturer: 'Lead',
      capacity: 120,
    },
    {
      day: 'Friday',
      roomNumber: '012.10.006',
      timeSlot: '10:30 - 12:30',
      class: 'BC1-G4-3',
      lecturer: 'Lead',
      capacity: 150,
    },
    {
      day: 'Friday',
      roomNumber: '012.10.005',
      timeSlot: '12:30 - 14:30',
      class: 'BC1-G5-3',
      lecturer: 'Lead',
      capacity: 120,
    },
    {
      day: 'Friday',
      roomNumber: '012.10.006',
      timeSlot: '12:30 - 14:30',
      class: 'BC1-G6-3',
      lecturer: 'Lead',
      capacity: 150,
    },
    {
      day: 'Friday',
      roomNumber: '012.10.005',
      timeSlot: '14:30 - 16:30',
      class: 'BC1-G7-3',
      lecturer: 'Lead',
      capacity: 120,
    },
    {
      day: 'Friday',
      roomNumber: '014.09.023',
      timeSlot: '14:30 - 16:30',
      class: 'WBC-G1-A',
      lecturer: 'Lead',
      capacity: 60,
    },
  ]

  constructor() {}

  private calculateTutors(capacity: number): string[] {
    // Subtract 30 from the capacity, divide by 30, and round up
    const numberOfTutors = Math.ceil((capacity - 30) / 30)
    // Create an array of tutor names based on the number calculated
    return Array.from(
      { length: numberOfTutors },
      (_, index) => `Tutor ${index + 1}`,
    )
  }

  getSchedule() {
    return this.scheduleData
  }

  private extractCourseIdentifiers(): string[] {
    const courseSet = new Set<string>()
    this.scheduleData.forEach((event) => {
      const courseIdentifier = event.class.split('-')[0]
      courseSet.add(courseIdentifier)
    })
    return Array.from(courseSet)
  }

  public generateColorShades(
    baseColors: string[],
  ): Record<string, Record<string, string>> {
    const courseIdentifiers = this.extractCourseIdentifiers()
    const groupColours: Record<string, Record<string, string>> = {}

    baseColors.forEach((color, index) => {
      const colorKey = courseIdentifiers[index] || color.replace('#', '')
      groupColours[colorKey] = this.generateShadesForColor(color)
    })

    return groupColours
  }

  private generateShadesForColor(
    color: string,
    shadesCount: number = 7,
  ): Record<string, string> {
    const hexToRgb = (hex: string): [number, number, number] => {
      const parsedHex = parseInt(hex.slice(1), 16)
      return [(parsedHex >> 16) & 255, (parsedHex >> 8) & 255, parsedHex & 255]
    }

    const rgbToHex = (r: number, g: number, b: number): string => {
      return `#${[r, g, b]
        .map((x) => x.toString(16).padStart(2, '0'))
        .join('')}`
    }

    const adjustShade = (colorComponent: number, factor: number): number => {
      // Ensuring that the color component is between 0 and 255
      return Math.min(
        255,
        Math.max(
          0,
          Math.round(colorComponent + factor * (255 - colorComponent)),
        ),
      )
    }

    const createShade = (
      rgb: [number, number, number],
      factor: number,
    ): string => {
      return rgbToHex(
        adjustShade(rgb[0], factor),
        adjustShade(rgb[1], factor),
        adjustShade(rgb[2], factor),
      )
    }

    const baseRgb = hexToRgb(color)
    let shades: Record<string, string> = {}

    // Calculate the increment for lightening/darkening each shade
    const increment = 1 / (shadesCount + 1)

    // Generate shades
    for (let i = 0; i < shadesCount; i++) {
      // Alternate the factor for lightening and darkening
      const factor =
        i % 2 === 0 ? increment * (i / 2 + 1) : -increment * (i / 2 + 1)
      shades[`G${i + 1}`] = createShade(baseRgb, factor)
    }

    // Sort the shades by their luminance value
    shades = Object.entries(shades)
      .sort((a, b) => {
        const sumLuminance = (rgb: string) =>
          hexToRgb(rgb).reduce((acc, val) => acc + val, 0)
        return sumLuminance(a[1]) - sumLuminance(b[1])
      })
      .reduce((acc, [k, v]) => ({ ...acc, [k]: v }), {})

    return shades
  }

  private hexToRgb(hex: string): [number, number, number] {
    const normalizedHex = hex.replace('#', '')
    const r = parseInt(normalizedHex.slice(0, 2), 16)
    const g = parseInt(normalizedHex.slice(2, 4), 16)
    const b = parseInt(normalizedHex.slice(4, 6), 16)
    return [r, g, b]
  }

  private rgbToHex(r: number, g: number, b: number): string {
    return `#${[r, g, b].map((x) => x.toString(16).padStart(2, '0')).join('')}`
  }

  private lightenColor(
    color: { r: number; g: number; b: number },
    lightness: number,
  ): { r: number; g: number; b: number } {
    const { r, g, b } = color
    return {
      r: Math.round((255 - r) * lightness + r),
      g: Math.round((255 - g) * lightness + g),
      b: Math.round((255 - b) * lightness + b),
    }
  }
}
