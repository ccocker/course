import { createActionGroup, emptyProps, props } from '@ngrx/store';
import { RegisterAccountInterface } from '../interfaces/register-account.interface';
import { CurrentUserInterface } from '@miShared/interfaces/current-user.interface';
import { BackendErrorsInterface } from '@miShared/interfaces/backendErrors.interface';

export const authActions = createActionGroup({
  source: 'Auth',
  events: {
    Register: props<{ request: RegisterAccountInterface }>(),
    'Register success': props<{ currentUser: CurrentUserInterface }>(),
    'Register failure': props<{ errors: BackendErrorsInterface }>(),

    'Get current user': emptyProps(),
    'Get current user success': props<{ currentUser: CurrentUserInterface }>(),
    'Get current user failure': emptyProps(),

    Logout: emptyProps(),
    'Logout success': emptyProps(),
    'Logout failure': emptyProps(),

    'Clear current user': emptyProps(),
  },
});
