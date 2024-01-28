import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { Location } from '@angular/common';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, of, switchMap, tap } from 'rxjs';
import { FirestoreDataService } from '@miCommon/services/firestore.data';
import { groupClassesActions } from './actions';

export const createCourseScheduleEffect = createEffect(
  (
    actions$ = inject(Actions),
    entityService = inject(FirestoreDataService)
  ) => {
    return actions$.pipe(
      ofType(groupClassesActions.createGroupClass),
      switchMap(({ url, groupclass }) => {
        return entityService.createEntity(url, groupclass).pipe(
          map((offering) =>
            groupClassesActions.createGroupClassSuccess({
              groupclass,
            })
          ),
          catchError((error) =>
            of(
              groupClassesActions.createGroupClassFailure({
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
      ofType(groupClassesActions.createGroupClassSuccess),
      tap((action: { groupclass: { url: string; id: string } }) => {
        const { url, id } = action.groupclass; // Assuming these are properties of the course schedule
        router.navigate([url, id]); // Use router.navigate to go to the specified path
      })
    );
  },
  { functional: true, dispatch: false }
);

export const getCourseEffect = createEffect(
  (actions$ = inject(Actions), dataService = inject(FirestoreDataService)) => {
    return actions$.pipe(
      ofType(groupClassesActions.getGroupClass),
      switchMap((action) => {
        return dataService.getEntity<any>(action.url, action.id).pipe(
          map((groupclasses) => {
            return groupClassesActions.getGroupClassesSuccess({
              groupclasses,
            });
          }),
          catchError((error) => {
            return of(groupClassesActions.getGroupClassesFailure());
          })
        );
      })
    );
  },
  { functional: true }
);

export const getGroupClasssEffect = createEffect(
  (actions$ = inject(Actions), dataService = inject(FirestoreDataService)) => {
    return actions$.pipe(
      ofType(groupClassesActions.getGroupClasses),
      switchMap((action) => {
        return dataService.getEntities<any>(action.url).pipe(
          map((groupclasses) => {
            return groupClassesActions.getGroupClassesSuccess({
              groupclasses,
            });
          }),
          catchError((error) => {
            return of(groupClassesActions.getGroupClassesFailure());
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
      ofType(groupClassesActions.deleteGroupClasss),
      switchMap(({ url, id }) => {
        return entityService.deleteEntity(url, id).pipe(
          map(() => {
            return groupClassesActions.deleteGroupClasssSuccess();
          }),
          catchError(() => {
            return of(groupClassesActions.deleteGroupClasssFailure());
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
      ofType(groupClassesActions.deleteGroupClasssSuccess),
      tap(() => {
        location.back();
      })
    );
  },
  { functional: true, dispatch: false }
);
