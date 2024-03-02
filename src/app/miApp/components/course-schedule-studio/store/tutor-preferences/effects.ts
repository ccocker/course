import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { Location } from '@angular/common';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, of, switchMap, tap } from 'rxjs';
import { FirestoreDataService } from '@miCommon/services/firestore.data';
import { tutorPreferencesActions } from './actions';

export const getTutorPreferencesEffect = createEffect(
  (actions$ = inject(Actions), dataService = inject(FirestoreDataService)) => {
    return actions$.pipe(
      ofType(tutorPreferencesActions.getTutorPreferences),
      switchMap((action) => {
        return dataService.getEntities<any>(action.url).pipe(
          map((tutorpreferences) => {
            return tutorPreferencesActions.getTutorPreferencesSuccess({
              tutorpreferences,
            });
          }),
          catchError((error) => {
            return of(tutorPreferencesActions.getTutorPreferencesFailure());
          })
        );
      })
    );
  },
  { functional: true }
);

export const createTutorPreferencesEffect = createEffect(
  (
    actions$ = inject(Actions),
    entityService = inject(FirestoreDataService)
  ) => {
    return actions$.pipe(
      ofType(tutorPreferencesActions.createTutorPreferences),
      switchMap(({ url, tutorPreferences }) => {
        return entityService.createEntity(url, tutorPreferences).pipe(
          map((tutorPreferences) =>
            tutorPreferencesActions.createTutorPreferencesSuccess({
              tutorPreferences,
            })
          ),
          catchError((error) =>
            of(
              tutorPreferencesActions.createTutorPreferencesFailure({
                errors: error,
              })
            )
          )
        );
      })
    );
  },
  { functional: true }
);

export const deleteTutorPreferenceEffect = createEffect(
  (
    actions$ = inject(Actions),
    entityService = inject(FirestoreDataService)
  ) => {
    return actions$.pipe(
      ofType(tutorPreferencesActions.deleteTutorPreferences),
      switchMap(({ url, id }) => {
        return entityService.deleteEntity(url, id).pipe(
          map(() => {
            return tutorPreferencesActions.deleteTutorPreferencesSuccess();
          }),
          catchError(() => {
            return of(tutorPreferencesActions.deleteTutorPreferencesFailure());
          })
        );
      })
    );
  },
  { functional: true }
);

export const redirectAfterDeleteEffect = createEffect(
  (actions$ = inject(Actions), location = inject(Location)) => {
    return actions$.pipe(
      ofType(tutorPreferencesActions.deleteTutorPreferencesSuccess),
      tap(() => {
        location.back();
      })
    );
  },
  { functional: true, dispatch: false }
);
