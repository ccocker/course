import { Component, Input, OnInit, SimpleChanges } from '@angular/core';
import { Store } from '@ngrx/store';
import { feedActions } from './store/actions';
import { combineLatest } from 'rxjs';
import { selectIsLoading } from '../../../common/auth/store/reducers';
import { selectError, selectFeedData } from './store/reducers';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { ErrorMessageComponent } from '../errorMessage/errorMessage.component';
import { LoadingComponent } from '../loading/loading.component';
import { TagListComponent } from '../tag-list/tag-list.component';

@Component({
  selector: 'mi-feed',
  templateUrl: './feed.component.html',
  styleUrls: ['./feed.component.scss'],
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    ErrorMessageComponent,
    LoadingComponent,
    TagListComponent,
  ],
})
export class FeedComponent implements OnInit {
  @Input() apiUrl: string = '';
  @Input() id: string = '';
  @Input() posts: string[];
  limit = 20;
  baseUrl = this.router.url.split('?')[0];
  currentPage: number = 0;

  data$ = combineLatest({
    isLoading: this.store.select(selectIsLoading),
    error: this.store.select(selectError),
    data: this.store.select(selectFeedData),
  });

  constructor(private store: Store, private router: Router) {}

  ngOnInit(): void {
    this.store.dispatch(feedActions.getFeed({ url: this.apiUrl, id: this.id }));
  }

  ngOnChanges(changes: SimpleChanges): void {
    const isApiUrlChanged =
      !changes['apiUrl'].firstChange &&
      changes['apiUrl'].currentValue !== changes['apiUrl'].previousValue;

    if (isApiUrlChanged) {
      this.fetchFeed();
    }
  }

  fetchFeed(): void {
    const offset = this.currentPage * this.limit - this.limit;
    // const parsedUrl = queryString.parseUrl(this.apiUrl)
    // const stringifiedParams = queryString.stringify({
    //   limit: this.limit,
    //   offset,
    //   ...parsedUrl.query,
    // })
    // const apiUrlWithParams = `${parsedUrl.url}?${stringifiedParams}`
    // this.store.dispatch(feedActions.getFeed({url: apiUrlWithParams}))
  }
}
