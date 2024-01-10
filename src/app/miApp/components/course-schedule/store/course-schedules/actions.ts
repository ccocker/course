import { createActionGroup, emptyProps, props } from '@ngrx/store';
import { BackendErrorsInterface } from '@miShared/interfaces/backendErrors.interface';

export const courseScheduleActions = createActionGroup({
  source: 'course-schedules',
  events: {
    'Create course schedule': props<{ url: string; courseSchedule: any }>(),
    'Create course schedule success': props<{ courseSchedule: any }>(),
    'Create course schedule failure': props<{
      errors: BackendErrorsInterface;
    }>(),

    'Get course schedules': props<{ url: string }>(),
    'Get course schedules success': props<{ courseSchedules: any[] }>(),
    'Get course schedules failure': emptyProps(),

    'Update course schedule': props<{ url: string; courseSchedule: any }>(),
    'Update course schedule success': props<{ courseSchedule: any }>(),
    'Update course schedule failure': props<{
      errors: BackendErrorsInterface;
    }>(),

    'Delete course schedule': props<{ url: string; id: string }>(),
    'Delete course schedule success': emptyProps(),
    'Delete course schedule failure': emptyProps(),
  },
});
