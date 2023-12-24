import { createActionGroup, emptyProps, props } from '@ngrx/store';
import { BackendErrorsInterface } from '@miShared/interfaces/backendErrors.interface';

export const courseScheduleActions = createActionGroup({
  source: 'courseschedule',
  events: {
    'Create course schedule': props<{ url: string; courseSchedule: any }>(),
    'Create course schedule success': props<{ courseSchedule: any }>(),
    'Create course schedule failure': props<{
      errors: BackendErrorsInterface;
    }>(),

    'Get course schedules': props<{ url: string }>(),
    'Get course schedules success': props<{ courseSchedules: any[] }>(),
    'Get course schedules failure': emptyProps(),

    'Get course schedule': props<{ url: string; id: string }>(),
    'Get course schedule success': props<{ courseSchedule: any }>(),
    'Get course schedule failure': emptyProps(),

    'Delete course schedule': props<{ url: string; id: string }>(),
    'Delete course schedule success': emptyProps(),
    'Delete course schedule failure': emptyProps(),
  },
});
