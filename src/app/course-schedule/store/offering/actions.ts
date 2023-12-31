import { createActionGroup, emptyProps, props } from '@ngrx/store';
import { BackendErrorsInterface } from '@miShared/interfaces/backendErrors.interface';

export const offeringsActions = createActionGroup({
  source: 'offerings',
  events: {
    'Create offering': props<{ url: string; offering: any }>(),
    'Create offering success': props<{ offering: any }>(),
    'Create offering failure': props<{
      errors: BackendErrorsInterface;
    }>(),

    'Get offering': props<{ url: string; id: string }>(),
    'Get offering success': props<{ offerings: any[] }>(),
    'Get offering failure': emptyProps(),

    'Get offerings': props<{ url: string }>(),
    'Get offerings success': props<{ offerings: any[] }>(),
    'Get offerings failure': emptyProps(),

    'Delete offerings': props<{ url: string; id: string }>(),
    'Delete offerings success': emptyProps(),
    'Delete offerings failure': emptyProps(),
  },
});
