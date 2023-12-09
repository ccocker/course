import { Component, Input } from '@angular/core';
import { BannerComponent } from '@miShared/components/banner/banner.component';
import { FeedTogglerComponent } from '@miShared/components/feed-toggler/feed-toggler.component';
import { PopularTagsComponent } from '@miShared/components/popular-tags/popular-tags.component';

@Component({
  selector: 'mi-your-feed',
  templateUrl: './your-feed.component.html',
  standalone: true,
  imports: [BannerComponent, PopularTagsComponent, FeedTogglerComponent],
})
export class YourFeedComponent {
  @Input() apiUrl = '/articles/feed';
}
