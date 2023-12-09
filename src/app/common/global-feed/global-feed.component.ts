import { Component } from '@angular/core';
import { FeedComponent } from '../../shared/components/feed-component/feed.component';

@Component({
  selector: 'mi-global-feed',
  templateUrl: './global-feed.component.html',
  styleUrls: ['./global-feed.component.scss'],
  standalone: true,
  imports: [FeedComponent],
})
export class GlobalFeedComponent {
  apiUrl = '/articles';
  constructor() {}
}
