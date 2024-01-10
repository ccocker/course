import { Component, Input } from '@angular/core';
import { BannerComponent } from '@miCommon/components/banner/banner.component';
import { FeedTogglerComponent } from '@miCommon/components/feed-toggler/feed-toggler.component';
import { PopularTagsComponent } from '@miCommon/components/popular-tags/popular-tags.component';

@Component({
  selector: 'mi-your-feed',
  templateUrl: './your-feed.component.html',
  standalone: true,
  imports: [BannerComponent, PopularTagsComponent, FeedTogglerComponent],
})
export class YourFeedComponent {
  @Input() apiUrl = '/articles/feed';
}
