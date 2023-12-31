import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { Location } from '@angular/common';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, of, switchMap, tap } from 'rxjs';
import { FirestoreDataService } from '@miCommon/services/firestore.data';
import { offeringgroupsActions } from './actions';

export const createOfferingGroupEffect = createEffect(
  (
    actions$ = inject(Actions),
    entityService = inject(FirestoreDataService)
  ) => {
    return actions$.pipe(
      ofType(offeringgroupsActions.createOfferingGroup),
      switchMap(({ url, offering }) => {
        return entityService.createEntity(url, offering).pipe(
          map((offering) =>
            offeringgroupsActions.createOfferingGroupSuccess({
              offering,
            })
          ),
          catchError((error) =>
            of(
              offeringgroupsActions.createOfferingGroupFailure({
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
      ofType(offeringgroupsActions.createOfferingGroupSuccess),
      tap((action: { offering: { url: string; id: string } }) => {
        const { url, id } = action.offering; // Assuming these are properties of the course schedule
        router.navigate([url, id]); // Use router.navigate to go to the specified path
      })
    );
  },
  { functional: true, dispatch: false }
);

export const getOfferingGroupEffect = createEffect(
  (actions$ = inject(Actions), dataService = inject(FirestoreDataService)) => {
    return actions$.pipe(
      ofType(offeringgroupsActions.getOfferingGroup),
      switchMap((action) => {
        return dataService.getEntity<any>(action.url, action.id).pipe(
          map((offeringgroups) => {
            return offeringgroupsActions.getOfferingGroupsSuccess({
              offeringgroups,
            });
          }),
          catchError((error) => {
            return of(offeringgroupsActions.getOfferingGroupsFailure());
          })
        );
      })
    );
  },
  { functional: true }
);

export const getOfferingGroupsTestEffect = createEffect(
  (actions$ = inject(Actions), dataService = inject(FirestoreDataService)) => {
    return actions$.pipe(
      ofType(offeringgroupsActions.getOfferingGroups),
      tap(() => console.log('Test Effect Triggered')),
      map(() =>
        offeringgroupsActions.getOfferingGroupsSuccess({ offeringgroups: [] })
      )
    );
  },
  { functional: true }
);

export const getOfferingGroupsEffect = createEffect(
  (actions$ = inject(Actions), dataService = inject(FirestoreDataService)) => {
    return actions$.pipe(
      ofType(offeringgroupsActions.getOfferingGroups),
      tap((action) => console.log('Offering Groups Effect:', action)),
      switchMap((action) => {
        console.log('Get Offering Group Action:', action);
        return dataService.getEntities<any>(action.url).pipe(
          map((offeringgroups) => {
            console.log('Get Offering Group Action:', offeringgroups);
            return offeringgroupsActions.getOfferingGroupsSuccess({
              offeringgroups,
            });
          }),
          catchError((error) => {
            return of(offeringgroupsActions.getOfferingGroupsFailure());
          })
        );
      })
    );
  },
  { functional: true }
);

export const deleteOfferingGroupEffect = createEffect(
  (
    actions$ = inject(Actions),
    entityService = inject(FirestoreDataService)
  ) => {
    return actions$.pipe(
      ofType(offeringgroupsActions.deleteOfferingGroups),
      switchMap(({ url, id }) => {
        return entityService.deleteEntity(url, id).pipe(
          map(() => {
            return offeringgroupsActions.deleteOfferingGroupsSuccess();
          }),
          catchError(() => {
            return of(offeringgroupsActions.deleteOfferingGroupsFailure());
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
      ofType(offeringgroupsActions.deleteOfferingGroupsSuccess),
      tap(() => {
        location.back();
      })
    );
  },
  { functional: true, dispatch: false }
);
