import { createActionGroup, emptyProps, props } from '@ngrx/store';
import { BackendErrorsInterface } from '@miShared/interfaces/backendErrors.interface';

export const offeringgroupsActions = createActionGroup({
  source: 'offeringgroups',
  events: {
    'Create offering group': props<{ url: string; offering: any }>(),
    'Create offering group success': props<{ offering: any }>(),
    'Create offering group failure': props<{
      errors: BackendErrorsInterface;
    }>(),

    'Get offering group': props<{ url: string; id: string }>(),
    'Get offering group success': props<{ offeringgroup: any }>(),
    'Get offering group failure': emptyProps(),

    'Get offering groups': props<{ url: string }>(),
    'Get offering groups success': props<{ offeringgroups: any[] }>(),
    'Get offering groups failure': emptyProps(),

    'Delete offering groups': props<{ url: string; id: string }>(),
    'Delete offering groups success': emptyProps(),
    'Delete offering groups failure': emptyProps(),
  },
});
