import { inject } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { FirestoreDataService } from '../../../services/firestore.data';
import { catchError, map, of, switchMap } from 'rxjs';
import { feedActions } from './actions';
import { GetFeedResponseInterface } from '../interfaces/get-feed-response.interface';

export const getFeedEffect = createEffect(
  (actions$ = inject(Actions), dataService = inject(FirestoreDataService)) => {
    return actions$.pipe(
      ofType(feedActions.getFeed),
      switchMap((action) => {
        console.log('Effect received action', action);
        return dataService.getEntity<any>(action.url, action.id).pipe(
          map((feed) => {
            console.log('Data received', feed);
            return feedActions.getFeedSuccess({ feed });
          }),
          catchError((error) => {
            console.error('Error in fetching data', error);
            return of(feedActions.getFeedFailure());
          })
        );
      })
    );
  },
  { functional: true }
);
