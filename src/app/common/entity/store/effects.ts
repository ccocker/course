import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, of, switchMap, tap } from 'rxjs';
import { FirestoreDataService } from '../../../shared/services/firestore.data';
import { entityActions } from './actions';

export const getEntityEffect = createEffect(
  (actions$ = inject(Actions), dataService = inject(FirestoreDataService)) => {
    return actions$.pipe(
      ofType(entityActions.getEntity),
      switchMap((action) => {
        return dataService.getEntity<any>(action.url, action.id).pipe(
          map((entity) => {
            return entityActions.getEntitySuccess({ entity });
          }),
          catchError((error) => {
            return of(entityActions.getEntityFailure());
          })
        );
      })
    );
  },
  { functional: true }
);

export const deleteEntityEffect = createEffect(
  (
    actions$ = inject(Actions),
    entityService = inject(FirestoreDataService)
  ) => {
    return actions$.pipe(
      ofType(entityActions.deleteEntity),
      switchMap(({ url, id }) => {
        return entityService.deleteEntity(url, id).pipe(
          map(() => {
            return entityActions.deleteEntitySuccess();
          }),
          catchError(() => {
            return of(entityActions.deleteEntityFailure());
          })
        );
      })
    );
  },
  { functional: true }
);

export const redirectAfterDeleteEffect = createEffect(
  (actions$ = inject(Actions), router = inject(Router)) => {
    return actions$.pipe(
      ofType(entityActions.deleteEntitySuccess),
      tap(() => {
        router.navigateByUrl('/');
      })
    );
  },
  { functional: true, dispatch: false }
);
