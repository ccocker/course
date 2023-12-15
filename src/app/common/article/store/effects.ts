import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, of, switchMap, tap } from 'rxjs';
import { FirestoreDataService } from '../../../shared/services/firestore.data';
import { articleActions } from './actions';

export const getArticleEffect = createEffect(
  (actions$ = inject(Actions), dataService = inject(FirestoreDataService)) => {
    return actions$.pipe(
      ofType(articleActions.getArticle),
      switchMap((action) => {
        return dataService.getEntity<any>(action.url, action.id).pipe(
          map((article) => {
            return articleActions.getArticleSuccess({ article });
          }),
          catchError((error) => {
            return of(articleActions.getArticleFailure());
          })
        );
      })
    );
  },
  { functional: true }
);

export const deleteArticleEffect = createEffect(
  (
    actions$ = inject(Actions),
    articleService = inject(FirestoreDataService)
  ) => {
    return actions$.pipe(
      ofType(articleActions.deleteArticle),
      switchMap(({ url, id }) => {
        return articleService.deleteEntity(url, id).pipe(
          map(() => {
            return articleActions.deleteArticleSuccess();
          }),
          catchError(() => {
            return of(articleActions.deleteArticleFailure());
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
      ofType(articleActions.deleteArticleSuccess),
      tap(() => {
        router.navigateByUrl('/');
      })
    );
  },
  { functional: true, dispatch: false }
);
