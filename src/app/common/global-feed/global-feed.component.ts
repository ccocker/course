import { Component } from '@angular/core';
import { FeedComponent } from '../../shared/components/feed-component/feed.component';
import { BannerComponent } from '../../shared/components/banner/banner.component';
import { PopularTagsComponent } from '../../shared/components/popular-tags/popular-tags.component';

@Component({
  selector: 'mi-global-feed',
  templateUrl: './global-feed.component.html',
  styleUrls: ['./global-feed.component.scss'],
  standalone: true,
  imports: [FeedComponent, BannerComponent, PopularTagsComponent],
})
export class GlobalFeedComponent {
  apiUrl = '/articles';
  constructor() {}
}
