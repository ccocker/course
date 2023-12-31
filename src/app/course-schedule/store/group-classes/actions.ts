import { createActionGroup, emptyProps, props } from '@ngrx/store';
import { BackendErrorsInterface } from '@miShared/interfaces/backendErrors.interface';

export const groupClassesActions = createActionGroup({
  source: 'groupclasses',
  events: {
    'Create group class': props<{ url: string; groupclass: any }>(),
    'Create group class success': props<{ groupclass: any }>(),
    'Create group class failure': props<{
      errors: BackendErrorsInterface;
    }>(),

    'Get group class': props<{ url: string; id: string }>(),
    'Get group class success': props<{ groupclasses: any[] }>(),
    'Get group class failure': emptyProps(),

    'Get group classes': props<{ url: string }>(),
    'Get group classes success': props<{ groupclasses: any[] }>(),
    'Get group classes failure': emptyProps(),

    'Delete group classs': props<{ url: string; id: string }>(),
    'Delete group classs success': emptyProps(),
    'Delete group classs failure': emptyProps(),
  },
});
