import { createActionGroup, emptyProps, props } from '@ngrx/store';
import { BackendErrorsInterface } from '@miShared/interfaces/backendErrors.interface';

export const coursesActions = createActionGroup({
  source: 'courses',
  events: {
    'Create courses': props<{ url: string; courses: any }>(),
    'Create courses success': props<{ courses: any }>(),
    'Create courses failure': props<{
      errors: BackendErrorsInterface;
    }>(),

    'Get course': props<{ url: string; id: string }>(),
    'Get course success': props<{ courses: any[] }>(),
    'Get course failure': emptyProps(),

    'Get courses': props<{ url: string }>(),
    'Get courses success': props<{ courses: any[] }>(),
    'Get courses failure': emptyProps(),

    'Delete courses': props<{ url: string; id: string }>(),
    'Delete courses success': emptyProps(),
    'Delete courses failure': emptyProps(),
  },
});
