import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { Location } from '@angular/common';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, of, switchMap, tap } from 'rxjs';
import { FirestoreDataService } from '@miCommon/services/firestore.data';
import { offeringsActions } from './actions';

export const createCourseScheduleEffect = createEffect(
  (
    actions$ = inject(Actions),
    entityService = inject(FirestoreDataService)
  ) => {
    return actions$.pipe(
      ofType(offeringsActions.createOffering),
      switchMap(({ url, offering }) => {
        return entityService.createEntity(url, offering).pipe(
          map((offering) =>
            offeringsActions.createOfferingSuccess({
              offering,
            })
          ),
          catchError((error) =>
            of(
              offeringsActions.createOfferingFailure({
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
      ofType(offeringsActions.createOfferingSuccess),
      tap((action: { offering: { url: string; id: string } }) => {
        const { url, id } = action.offering; // Assuming these are properties of the course schedule
        router.navigate([url, id]); // Use router.navigate to go to the specified path
      })
    );
  },
  { functional: true, dispatch: false }
);

export const getCourseEffect = createEffect(
  (actions$ = inject(Actions), dataService = inject(FirestoreDataService)) => {
    return actions$.pipe(
      ofType(offeringsActions.getOffering),
      switchMap((action) => {
        return dataService.getEntity<any>(action.url, action.id).pipe(
          map((offerings) => {
            return offeringsActions.getOfferingsSuccess({
              offerings,
            });
          }),
          catchError((error) => {
            return of(offeringsActions.getOfferingsFailure());
          })
        );
      })
    );
  },
  { functional: true }
);

export const getOfferingsEffect = createEffect(
  (actions$ = inject(Actions), dataService = inject(FirestoreDataService)) => {
    return actions$.pipe(
      ofType(offeringsActions.getOfferings),
      switchMap((action) => {
        return dataService.getEntities<any>(action.url).pipe(
          map((offerings) => {
            return offeringsActions.getOfferingsSuccess({
              offerings,
            });
          }),
          catchError((error) => {
            return of(offeringsActions.getOfferingsFailure());
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
      ofType(offeringsActions.deleteOfferings),
      switchMap(({ url, id }) => {
        return entityService.deleteEntity(url, id).pipe(
          map(() => {
            return offeringsActions.deleteOfferingsSuccess();
          }),
          catchError(() => {
            return of(offeringsActions.deleteOfferingsFailure());
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
      ofType(offeringsActions.deleteOfferingsSuccess),
      tap(() => {
        location.back();
      })
    );
  },
  { functional: true, dispatch: false }
);
