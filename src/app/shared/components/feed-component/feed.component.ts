import { Component, Input, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { feedActions } from './store/actions';
import { combineLatest } from 'rxjs';
import { selectIsLoading } from '../../../common/auth/store/reducers';
import { selectError, selectFeedData } from './store/reducers';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'mi-feed',
  templateUrl: './feed.component.html',
  styleUrls: ['./feed.component.scss'],
  standalone: true,
  imports: [CommonModule, RouterModule],
})
export class FeedComponent implements OnInit {
  @Input() apiUrl: string = '';
  @Input() id: string = '';
  @Input() posts: string[];

  data$ = combineLatest({
    isLoading: this.store.select(selectIsLoading),
    error: this.store.select(selectError),
    data: this.store.select(selectFeedData),
  });

  constructor(private store: Store) {}

  ngOnInit(): void {
    console.log('Dispatching feed action', { url: this.apiUrl, id: this.id });
    this.store.dispatch(feedActions.getFeed({ url: this.apiUrl, id: this.id }));
  }
}
