import { inject } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, of, switchMap, tap } from 'rxjs';
import { CurrentUserInterface } from '../../shared/interfaces/current-user.interface';
import { AUTH_SERVICE_TOKEN } from '../services/auth.service';
import { authActions } from './actions';
import { HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';
import { BackendErrorsInterface } from '../../shared/interfaces/backendErrors.interface';
import { PersistanceService } from '../../shared/services/persistance-service';

export const registerEffect = createEffect(
  (
    actions$ = inject(Actions),
    authService = inject(AUTH_SERVICE_TOKEN),
    persistanceService = inject(PersistanceService)
  ) => {
    return actions$.pipe(
      ofType(authActions.register),
      switchMap(({ request }) => {
        return authService.login(request.user).pipe(
          map((currentUser: CurrentUserInterface) => {
            // persistanceService.set(
            //   'accessToken',
            //   currentUser['user']['stsTokenManager']['accessToken']
            // );
            return authActions.registerSuccess({ currentUser });
          }),
          catchError((errorResponse: BackendErrorsInterface) => {
            console.log(errorResponse);
            const errors: BackendErrorsInterface =
              typeof errorResponse === 'string'
                ? { code: errorResponse }
                : errorResponse;
            return of(
              authActions.registerFailure({
                errors: errors,
              })
            );
          })
        );
      })
    );
  },
  { functional: true }
);

export const redirectAfterRegisterEffect = createEffect(
  (actions$ = inject(Actions), router = inject(Router)) => {
    return actions$.pipe(
      ofType(authActions.registerSuccess),
      tap(() => {
        router.navigateByUrl('/course-schedule');
      })
    );
  },
  { functional: true, dispatch: false }
);
