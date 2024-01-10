import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { Location } from '@angular/common';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, of, switchMap, tap } from 'rxjs';
import { FirestoreDataService } from '@miCommon/services/firestore.data';
import { coursesActions } from './actions';

export const createCourseScheduleEffect = createEffect(
  (
    actions$ = inject(Actions),
    entityService = inject(FirestoreDataService)
  ) => {
    return actions$.pipe(
      ofType(coursesActions.createCourses),
      switchMap(({ url, courses }) => {
        return entityService.createEntity(url, courses).pipe(
          map((courses) =>
            coursesActions.createCoursesSuccess({
              courses,
            })
          ),
          catchError((error) =>
            of(
              coursesActions.createCoursesFailure({
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
      ofType(coursesActions.createCoursesSuccess),
      tap((action: { courses: { url: string; id: string } }) => {
        const { url, id } = action.courses; // Assuming these are properties of the course schedule
        router.navigate([url, id]); // Use router.navigate to go to the specified path
      })
    );
  },
  { functional: true, dispatch: false }
);

export const getCourseEffect = createEffect(
  (actions$ = inject(Actions), dataService = inject(FirestoreDataService)) => {
    return actions$.pipe(
      ofType(coursesActions.getCourse),
      switchMap((action) => {
        return dataService.getEntity<any>(action.url, action.id).pipe(
          map((courses) => {
            return coursesActions.getCoursesSuccess({
              courses,
            });
          }),
          catchError((error) => {
            return of(coursesActions.getCoursesFailure());
          })
        );
      })
    );
  },
  { functional: true }
);

export const getCoursesEffect = createEffect(
  (actions$ = inject(Actions), dataService = inject(FirestoreDataService)) => {
    return actions$.pipe(
      ofType(coursesActions.getCourses),
      switchMap((action) => {
        return dataService.getEntities<any>(action.url).pipe(
          map((courses) => {
            return coursesActions.getCoursesSuccess({
              courses,
            });
          }),
          catchError((error) => {
            return of(coursesActions.getCoursesFailure());
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
      ofType(coursesActions.deleteCourses),
      switchMap(({ url, id }) => {
        return entityService.deleteEntity(url, id).pipe(
          map(() => {
            return coursesActions.deleteCoursesSuccess();
          }),
          catchError(() => {
            return of(coursesActions.deleteCoursesFailure());
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
      ofType(coursesActions.deleteCoursesSuccess),
      tap(() => {
        location.back();
      })
    );
  },
  { functional: true, dispatch: false }
);
