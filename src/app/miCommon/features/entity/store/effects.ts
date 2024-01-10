import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { Location } from '@angular/common';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, of, switchMap, tap } from 'rxjs';
import { FirestoreDataService } from '@miCommon/services/firestore.data';
import { entityActions } from './actions';

export const createEntityEffect = createEffect(
  (
    actions$ = inject(Actions),
    entityService = inject(FirestoreDataService)
  ) => {
    return actions$.pipe(
      ofType(entityActions.createEntity),
      switchMap(({ url, entity }) => {
        return entityService.createEntity(url, entity).pipe(
          map((entity) => entityActions.createEntitySuccess({ entity })),
          catchError((error) =>
            of(entityActions.createEntityFailure({ errors: error }))
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
      ofType(entityActions.createEntitySuccess),
      tap((action: { entity: { url: string; id: string } }) => {
        const { url, id } = action.entity; // Assuming these are properties of the entity
        router.navigate([url, id]); // Use router.navigate to go to the specified path
      })
    );
  },
  { functional: true, dispatch: false }
);

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

export const getEntitiesEffect = createEffect(
  (actions$ = inject(Actions), dataService = inject(FirestoreDataService)) => {
    return actions$.pipe(
      ofType(entityActions.getEntities),
      switchMap((action) => {
        return dataService.getEntities<any>(action.url).pipe(
          map((entities) => {
            return entityActions.getEntitiesSuccess({ entities });
          }),
          catchError((error) => {
            return of(entityActions.getEntitiesFailure());
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
  (actions$ = inject(Actions), location = inject(Location)) => {
    return actions$.pipe(
      ofType(entityActions.deleteEntitySuccess),
      tap(() => {
        location.back();
      })
    );
  },
  { functional: true, dispatch: false }
);
