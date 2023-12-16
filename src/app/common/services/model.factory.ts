import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ModelFactory {
  private customSingularConversions = new Map([['people', 'Person']]);

  private getModelNameFromRoute(route: string): string {
    let modelName = '';

    if (this.customSingularConversions.has(route)) {
      modelName = this.customSingularConversions.get(route) ?? '';
    } else if (route.endsWith('ies')) {
      modelName = route.slice(0, -3) + 'y';
    } else if (route.endsWith('s')) {
      modelName = route.slice(0, -1);
    } else {
      modelName = route;
    }

    return modelName.charAt(0).toUpperCase() + modelName.slice(1);
  }

  async createModel(route: string): Promise<any> {
    let modelName = this.getModelNameFromRoute(route);

    let modelFileName = modelName.toLowerCase() + '.model';

    try {
      const modelModule = await import(
        `../models/${modelName.toLowerCase()}.model.ts`
      );

      const ModelClass = modelModule[modelName];

      return new ModelClass();
    } catch (error) {
      console.error(`Error loading model for route: ${route}`, error);
      throw new Error(`No model found for route: ${route}`);
    }
  }
}
