import { createActionGroup, emptyProps, props } from '@ngrx/store';

export const entityActions = createActionGroup({
  source: 'entities',
  events: {
    'Get entity': props<{ url: string; id: string }>(),
    'Get entity success': props<{ entity: any }>(),
    'Get entity failure': emptyProps(),

    'Get entities': props<{ url: string }>(),
    'Get entities success': props<{ entities: any[] }>(),
    'Get entities failure': emptyProps(),

    'Delete entity': props<{ url: string; id: string }>(),
    'Delete entity success': emptyProps(),
    'Delete entity failure': emptyProps(),
  },
});
