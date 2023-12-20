import { Component } from '@angular/core';
import { FeedComponent } from '@miCommon/components/feed-component/feed.component';
import { BannerComponent } from '@miCommon/components/banner/banner.component';
import { PopularTagsComponent } from '@miCommon/components/popular-tags/popular-tags.component';
import { FeedTogglerComponent } from '@miCommon/components/feed-toggler/feed-toggler.component';

@Component({
  selector: 'mi-global-feed',
  templateUrl: './global-feed.component.html',
  styleUrls: ['./global-feed.component.scss'],
  standalone: true,
  imports: [
    FeedComponent,
    BannerComponent,
    PopularTagsComponent,
    FeedTogglerComponent,
  ],
})
export class GlobalFeedComponent {
  apiUrl = '/articles';
  constructor() {}
}
