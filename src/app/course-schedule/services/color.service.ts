import { Injectable } from '@angular/core'

@Injectable({
  providedIn: 'root',
})
export class ColorService {
  constructor() {}

  generateShadesForColor(
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
