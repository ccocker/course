import { createActionGroup, emptyProps, props } from '@ngrx/store';
import { BackendErrorsInterface } from '@miShared/interfaces/backendErrors.interface';

export const entityActions = createActionGroup({
  source: 'entities',
  events: {
    'Create entity': props<{ url: string; entity: any }>(),
    'Create entity success': props<{ entity: any }>(),
    'Create entity failure': props<{ errors: BackendErrorsInterface }>(),

    'Get entities': props<{ url: string }>(),
    'Get entities success': props<{ entities: any[] }>(),
    'Get entities failure': emptyProps(),

    'Get entity': props<{ url: string; id: string }>(),
    'Get entity success': props<{ entity: any }>(),
    'Get entity failure': emptyProps(),

    'Delete entity': props<{ url: string; id: string }>(),
    'Delete entity success': emptyProps(),
    'Delete entity failure': emptyProps(),
  },
});
