import { createActionGroup, emptyProps, props } from '@ngrx/store';
import { BackendErrorsInterface } from '@miShared/interfaces/backendErrors.interface';

export const roomsActions = createActionGroup({
  source: 'rooms',
  events: {
    'Create room': props<{ url: string; room: any }>(),
    'Create room success': props<{ room: any }>(),
    'Create room failure': props<{
      errors: BackendErrorsInterface;
    }>(),

    'Get room': props<{ url: string; id: string }>(),
    'Get room success': props<{ rooms: any[] }>(),
    'Get room failure': emptyProps(),

    'Get rooms': props<{ url: string }>(),
    'Get rooms success': props<{ rooms: any[] }>(),
    'Get rooms failure': emptyProps(),

    'Delete rooms': props<{ url: string; id: string }>(),
    'Delete rooms success': emptyProps(),
    'Delete rooms failure': emptyProps(),
  },
});
