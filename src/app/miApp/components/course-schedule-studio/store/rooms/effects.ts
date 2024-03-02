import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { Location } from '@angular/common';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, of, switchMap, tap } from 'rxjs';
import { FirestoreDataService } from '@miCommon/services/firestore.data';
import { roomsActions } from './actions';

export const createCourseScheduleEffect = createEffect(
  (
    actions$ = inject(Actions),
    entityService = inject(FirestoreDataService)
  ) => {
    return actions$.pipe(
      ofType(roomsActions.createRoom),
      switchMap(({ url, room }) => {
        return entityService.createEntity(url, room).pipe(
          map((offering) =>
            roomsActions.createRoomSuccess({
              room,
            })
          ),
          catchError((error) =>
            of(
              roomsActions.createRoomFailure({
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
      ofType(roomsActions.createRoomSuccess),
      tap((action: { room: { url: string; id: string } }) => {
        const { url, id } = action.room; // Assuming these are properties of the course schedule
        router.navigate([url, id]); // Use router.navigate to go to the specified path
      })
    );
  },
  { functional: true, dispatch: false }
);

export const getCourseEffect = createEffect(
  (actions$ = inject(Actions), dataService = inject(FirestoreDataService)) => {
    return actions$.pipe(
      ofType(roomsActions.getRoom),
      switchMap((action) => {
        return dataService.getEntity<any>(action.url, action.id).pipe(
          map((rooms) => {
            return roomsActions.getRoomsSuccess({
              rooms,
            });
          }),
          catchError((error) => {
            return of(roomsActions.getRoomsFailure());
          })
        );
      })
    );
  },
  { functional: true }
);

export const getRoomsEffect = createEffect(
  (actions$ = inject(Actions), dataService = inject(FirestoreDataService)) => {
    return actions$.pipe(
      ofType(roomsActions.getRooms),
      switchMap((action) => {
        return dataService.getEntities<any>(action.url).pipe(
          map((rooms) => {
            return roomsActions.getRoomsSuccess({
              rooms,
            });
          }),
          catchError((error) => {
            return of(roomsActions.getRoomsFailure());
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
      ofType(roomsActions.deleteRooms),
      switchMap(({ url, id }) => {
        return entityService.deleteEntity(url, id).pipe(
          map(() => {
            return roomsActions.deleteRoomsSuccess();
          }),
          catchError(() => {
            return of(roomsActions.deleteRoomsFailure());
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
      ofType(roomsActions.deleteRoomsSuccess),
      tap(() => {
        location.back();
      })
    );
  },
  { functional: true, dispatch: false }
);
