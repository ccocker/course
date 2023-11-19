import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ColorService {
  constructor() {}

  public addColorsToObjects(
    objects: any[],
    colorConfig: { [key: string]: string }
  ): any[] {
    return objects.map((obj) => {
      const classValue = obj.class;

      for (const key in colorConfig) {
        if (classValue.includes(key)) {
          obj.color = this.generateRandomShadeOfColor(colorConfig[key]);
          break; // Stop checking after the first match
        }
      }

      return obj;
    });
  }

  private generateRandomShadeOfColor(baseColor: string): string {
    // Generate a random shade of the base color
    const minLightness = 10; // Adjust this value to control the minimum lightness
    const maxLightness = 80; // Adjust this value to control the maximum lightness
    const randomLightness = Math.floor(
      Math.random() * (maxLightness - minLightness + 1) + minLightness
    );

    // Convert the baseColor to HSL format
    const rgb = parseInt(baseColor.slice(1), 16); // Convert hex to decimal
    const r = (rgb >> 16) & 0xff;
    const g = (rgb >> 8) & 0xff;
    const b = (rgb >> 0) & 0xff;

    // Calculate the hue and saturation values
    const hsl = this.rgbToHsl(r, g, b);
    const hue = hsl[0];
    const saturation = hsl[1];

    // Create a new color with the same hue and saturation, but random lightness
    return `hsl(${hue}, ${saturation}%, ${randomLightness}%)`;
  }

  private rgbToHsl(r: number, g: number, b: number): number[] {
    r /= 255;
    g /= 255;
    b /= 255;
    const max = Math.max(r, g, b);
    const min = Math.min(r, g, b);
    let h = 0;
    let s = 0;
    const l = (max + min) / 2;

    if (max !== min) {
      const d = max - min;
      s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
      switch (max) {
        case r:
          h = (g - b) / d + (g < b ? 6 : 0);
          break;
        case g:
          h = (b - r) / d + 2;
          break;
        case b:
          h = (r - g) / d + 4;
          break;
      }
      h /= 6;
    }

    return [Math.round(h * 360), Math.round(s * 100), Math.round(l * 100)];
  }
}
