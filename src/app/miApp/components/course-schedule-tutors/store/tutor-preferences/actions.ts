import { createActionGroup, emptyProps, props } from '@ngrx/store';
import { BackendErrorsInterface } from '@miShared/interfaces/backendErrors.interface';

export const tutorPreferencesActions = createActionGroup({
  source: 'tutorpreferences',
  events: {
    'Create tutor preferences': props<{ url: string; tutorPreferences: any }>(),
    'Create tutor preferences success': props<{ tutorPreferences: any }>(),
    'Create tutor preferences failure': props<{
      errors: BackendErrorsInterface;
    }>(),

    'Get tutor preferences': props<{ url: string }>(),
    'Get tutor preferences success': props<{ tutorpreferences: any[] }>(),
    'Get tutor preferences failure': emptyProps(),

    'Delete tutor preferences': props<{ url: string; id: string }>(),
    'Delete tutor preferences success': emptyProps(),
    'Delete tutor preferences failure': emptyProps(),
  },
});
