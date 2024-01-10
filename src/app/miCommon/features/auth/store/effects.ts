import { inject } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, from, map, of, switchMap, tap } from 'rxjs';

import { authActions } from './actions';
import { Router } from '@angular/router';
import { BackendErrorsInterface } from '@miShared/interfaces/backendErrors.interface';
import { PersistanceService } from '@miShared/services/persistance-service';
import { Store } from '@ngrx/store';

import { FirestoreDataService } from '../../../services/firestore.data';

import { AUTH_SERVICE } from '../services/auth-factory.service';

export const getCurrentUserEffect = createEffect(
  (
    actions$ = inject(Actions),
    authService = inject(AUTH_SERVICE),
    persistanceService = inject(PersistanceService)
  ) => {
    return actions$.pipe(
      ofType(authActions.getCurrentUser),
      switchMap(() => {
        const token = persistanceService.get('accessToken');
        if (!token) {
          return of(authActions.getCurrentUserFailure());
        }
        return authService.getCurrentUser().pipe(
          map((simplifiedUser) => {
            return authActions.getCurrentUserSuccess({
              currentUser: simplifiedUser,
            });
          }),
          catchError(() => {
            return of(authActions.getCurrentUserFailure());
          })
        );
      })
    );
  },
  { functional: true }
);

export const registerEffect = createEffect(
  (
    actions$ = inject(Actions),
    authService = inject(AUTH_SERVICE),
    persistanceService = inject(PersistanceService),
    firestoreDataService = inject(FirestoreDataService)
  ) => {
    return actions$.pipe(
      ofType(authActions.register),
      switchMap(({ request }) => {
        return authService.login(request.user).pipe(
          switchMap((currentUser: any) => {
            return firestoreDataService
              .getEntity<any>('people', currentUser.uid)
              .pipe(
                map((personDetails) => {
                  if (!personDetails) {
                    throw new Error('Person not found');
                  }

                  return {
                    ...currentUser,
                    userDetail: personDetails.userDetail,
                  };
                })
              );
          }),
          tap((mergedUser) => {
            persistanceService.set(
              'accessToken',
              mergedUser['stsTokenManager']['accessToken']
            );
          }),
          map((mergedUser) => {
            return authActions.registerSuccess({ currentUser: mergedUser });
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

export const rehydrateAuthStateEffect = createEffect(
  (actions$ = inject(Actions), authService = inject(AUTH_SERVICE)) => {
    return actions$.pipe(
      ofType(authActions.rehydrateAuthState),
      switchMap(({ accessToken }) =>
        authService.getCurrentUser().pipe(
          switchMap((currentUser) => {
            if (currentUser) {
              return authService.validateToken(accessToken).pipe(
                map((isValidToken) => {
                  if (isValidToken) {
                    return authActions.getCurrentUserSuccess({ currentUser });
                  } else {
                    return authActions.getCurrentUserFailure();
                  }
                }),
                catchError(() => of(authActions.getCurrentUserFailure()))
              );
            } else {
              return of(authActions.getCurrentUserFailure());
            }
          }),
          catchError(() => of(authActions.getCurrentUserFailure()))
        )
      )
    );
  },
  { functional: true }
);

export const logoutEffect = createEffect(
  (
    actions$ = inject(Actions),
    persistanceService = inject(PersistanceService),
    store = inject(Store),
    router = inject(Router)
  ) => {
    return actions$.pipe(
      ofType(authActions.logout),
      switchMap(() => {
        try {
          persistanceService.set('accessToken', '');
          store.dispatch(authActions.clearCurrentUser());
          return of(authActions.logoutSuccess());
        } catch (error) {
          return of(authActions.logoutFailure());
        }
      }),
      tap(() => {
        router.navigate(['/']);
      })
    );
  },
  { functional: true, dispatch: true }
);
