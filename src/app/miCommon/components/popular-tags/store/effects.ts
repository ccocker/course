import { inject } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, of, switchMap } from 'rxjs';
import { PopularTagType } from '@miShared/interfaces/popular-tag.type';
import { popularTagsActions } from './actions';
import { FirestoreDataService } from '@miCommon/services/firestore.data';

export const getPopularTagsEffect = createEffect(
  (actions$ = inject(Actions), dataService = inject(FirestoreDataService)) => {
    return actions$.pipe(
      ofType(popularTagsActions.getPopularTags),
      switchMap((action) => {
        return dataService.getEntity<any>(action.url, action.id).pipe(
          map((popularTags) => {
            return popularTagsActions.getPopularTagsSuccess({ popularTags });
          }),
          catchError((error) => {
            return of(popularTagsActions.getPopularTagsFailure());
          })
        );
      })
    );
  },
  { functional: true }
);
