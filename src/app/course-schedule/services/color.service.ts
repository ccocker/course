import { Injectable } from '@angular/core'

@Injectable({
  providedIn: 'root',
})
export class ColorService {
  constructor() {}

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
