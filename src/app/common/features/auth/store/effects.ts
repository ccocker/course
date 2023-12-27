import { inject } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, from, map, of, switchMap, tap } from 'rxjs';
import { CurrentUserInterface } from '@miShared/interfaces/current-user.interface';
import { AUTH_SERVICE_TOKEN } from '../services/auth.service';
import { authActions } from './actions';
import { Router } from '@angular/router';
import { BackendErrorsInterface } from '@miShared/interfaces/backendErrors.interface';
import { PersistanceService } from '@miShared/services/persistance-service';
import { Store } from '@ngrx/store';
import { Firestore, doc, getDoc } from 'firebase/firestore';
import { FirestoreDataService } from '../../../services/firestore.data';
import { Person } from '../../../models';

export const getCurrentUserEffect = createEffect(
  (
    actions$ = inject(Actions),
    authService = inject(AUTH_SERVICE_TOKEN),
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
    authService = inject(AUTH_SERVICE_TOKEN),
    persistanceService = inject(PersistanceService),
    firestoreDataService = inject(FirestoreDataService) // Inject your Firestore data service
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
            console.log('Merged User:', mergedUser);
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

// Add this effect to your existing auth effects
export const rehydrateAuthStateEffect = createEffect(
  (actions$ = inject(Actions), authService = inject(AUTH_SERVICE_TOKEN)) => {
    return actions$.pipe(
      ofType(authActions.rehydrateAuthState),
      switchMap(({ accessToken }) => {
        // You might need to modify this part based on how your authService works
        return authService.getCurrentUser().pipe(
          map((currentUser) => {
            return authActions.getCurrentUserSuccess({ currentUser });
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

export const redirectAfterRegisterEffect = createEffect(
  (actions$ = inject(Actions), router = inject(Router)) => {
    return actions$.pipe(
      ofType(authActions.registerSuccess),
      tap(() => {
        router.navigateByUrl('/auth/people');
      })
    );
  },
  { functional: true, dispatch: false }
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
