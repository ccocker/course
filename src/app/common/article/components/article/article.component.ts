import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { Store } from '@ngrx/store';
import { combineLatest, filter, map } from 'rxjs';
import { selectCurrentUser } from '../../../auth/store/reducers';
import { ErrorMessageComponent } from 'src/app/shared/components/errorMessage/errorMessage.component';
import { LoadingComponent } from 'src/app/shared/components/loading/loading.component';
import { TagListComponent } from '@miShared/components/tag-list/tag-list.component';
import { CurrentUserInterface } from '@miShared/interfaces/current-user.interface';
import { articleActions } from '../../store/actions';
import {
  selectArticleData,
  selectError,
  selectIsLoading,
} from '../../store/reducers';

@Component({
  selector: 'mi-article',
  templateUrl: './article.component.html',
  standalone: true,
  imports: [
    CommonModule,
    TagListComponent,
    ErrorMessageComponent,
    LoadingComponent,
    RouterLink,
  ],
})
export class ArticleComponent implements OnInit {
  slug = this.route.snapshot.paramMap.get('slug') ?? '';
  isAuthor$ = combineLatest({
    article: this.store.select(selectArticleData),
    currentUser: this.store
      .select(selectCurrentUser)
      .pipe(
        filter(
          (currentUser): currentUser is CurrentUserInterface | null =>
            currentUser !== undefined
        )
      ),
  }).pipe(
    map(({ article, currentUser }) => {
      if (!article || !currentUser) {
        return false;
      }
      return article.author.username === currentUser.username;
    })
  );
  data$ = combineLatest({
    isLoading: this.store.select(selectIsLoading),
    error: this.store.select(selectError),
    article: this.store.select(selectArticleData),
    isAuthor: this.isAuthor$,
  });

  constructor(private store: Store, private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.store.dispatch(articleActions.getArticle({ url: '', id: '' }));
  }

  deleteArticle(): void {
    this.store.dispatch(articleActions.deleteArticle({ url: '', id: '' }));
  }
}
