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
    } else if (route.endsWith('courses')) {
      modelName = 'course';
    } else if (route.endsWith('course-schedules')) {
      modelName = 'courseschedule';
    } else if (route.endsWith('ies')) {
      modelName = route.slice(0, -3) + 'y';
    } else if (route.endsWith('preferences')) {
      modelName = 'tutorpreferences';
    } else if (route.endsWith('es')) {
      modelName = route.slice(0, -2);
    } else if (route.endsWith('s')) {
      modelName = route.slice(0, -1);
    } else {
      modelName = route;
    }
    modelName = modelName.replace(/-/g, '');

    return modelName.charAt(0).toUpperCase() + modelName.slice(1);
  }

  async createModel(route: string): Promise<any> {
    let modelName = this.getModelNameFromRoute(route);

    let modelFileName = modelName.toLowerCase() + '.model.ts';

    try {
      const modelModule = await import(`../models/${modelFileName}`);
      const ModelClass = modelModule[modelName];
      return new ModelClass();
    } catch (error) {
      try {
        const sharedModelModule = await import(
          `../../miShared/models/${modelFileName}`
        );

        const SharedModelClass = sharedModelModule[modelName];
        return new SharedModelClass();
      } catch (sharedError) {
        console.error(
          `Error loading model from shared location for route: ${route}`,
          sharedError
        );
        throw new Error(`No model found for route: ${route}`);
      }
    }
  }
}
