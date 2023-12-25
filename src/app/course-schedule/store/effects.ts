import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { Location } from '@angular/common';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, of, switchMap, tap } from 'rxjs';
import { FirestoreDataService } from '@miCommon/services/firestore.data';
import { courseScheduleActions } from './actions';

export const createCourseScheduleEffect = createEffect(
  (
    actions$ = inject(Actions),
    entityService = inject(FirestoreDataService)
  ) => {
    return actions$.pipe(
      ofType(courseScheduleActions.createCourseSchedule),
      switchMap(({ url, courseSchedule }) => {
        return entityService.createEntity(url, courseSchedule).pipe(
          map((courseSchedule) =>
            courseScheduleActions.createCourseScheduleSuccess({
              courseSchedule,
            })
          ),
          catchError((error) =>
            of(
              courseScheduleActions.createCourseScheduleFailure({
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

export const createTutorPreferencesEffect = createEffect(
  (
    actions$ = inject(Actions),
    entityService = inject(FirestoreDataService)
  ) => {
    return actions$.pipe(
      ofType(courseScheduleActions.createTutorPreferences),
      switchMap(({ url, tutorPreferences }) => {
        return entityService.createEntity(url, tutorPreferences).pipe(
          map((tutorPreferences) =>
            courseScheduleActions.createTutorPreferencesSuccess({
              tutorPreferences,
            })
          ),
          catchError((error) =>
            of(
              courseScheduleActions.createTutorPreferencesFailure({
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

export const redirectAfterCreateEffect = createEffect(
  (actions$ = inject(Actions), router = inject(Router)) => {
    return actions$.pipe(
      ofType(courseScheduleActions.createCourseScheduleSuccess),
      tap((action: { courseSchedule: { url: string; id: string } }) => {
        const { url, id } = action.courseSchedule; // Assuming these are properties of the course schedule
        router.navigate([url, id]); // Use router.navigate to go to the specified path
      })
    );
  },
  { functional: true, dispatch: false }
);

export const getCourseScheduleEffect = createEffect(
  (actions$ = inject(Actions), dataService = inject(FirestoreDataService)) => {
    return actions$.pipe(
      ofType(courseScheduleActions.getCourseSchedule),
      switchMap((action) => {
        return dataService.getEntity<any>(action.url, action.id).pipe(
          map((courseSchedule) => {
            return courseScheduleActions.getCourseScheduleSuccess({
              courseSchedule,
            });
          }),
          catchError((error) => {
            return of(courseScheduleActions.getCourseScheduleFailure());
          })
        );
      })
    );
  },
  { functional: true }
);

export const getEntitiesEffect = createEffect(
  (actions$ = inject(Actions), dataService = inject(FirestoreDataService)) => {
    return actions$.pipe(
      ofType(courseScheduleActions.getCourseSchedules),
      switchMap((action) => {
        return dataService.getEntities<any>(action.url).pipe(
          map((courseSchedules) => {
            return courseScheduleActions.getCourseSchedulesSuccess({
              courseSchedules,
            });
          }),
          catchError((error) => {
            return of(courseScheduleActions.getCourseSchedulesFailure());
          })
        );
      })
    );
  },
  { functional: true }
);

export const deleteCourseScheduleEffect = createEffect(
  (
    actions$ = inject(Actions),
    entityService = inject(FirestoreDataService)
  ) => {
    return actions$.pipe(
      ofType(courseScheduleActions.deleteCourseSchedule),
      switchMap(({ url, id }) => {
        return entityService.deleteEntity(url, id).pipe(
          map(() => {
            return courseScheduleActions.deleteCourseScheduleSuccess();
          }),
          catchError(() => {
            return of(courseScheduleActions.deleteCourseScheduleFailure());
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
      ofType(courseScheduleActions.deleteCourseScheduleSuccess),
      tap(() => {
        location.back();
      })
    );
  },
  { functional: true, dispatch: false }
);
