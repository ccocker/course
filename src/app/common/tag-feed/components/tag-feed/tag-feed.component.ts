import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { BannerComponent } from '@miShared/components/banner/banner.component';
import { YourFeedComponent } from '@miCommon/your-feed/components/your-feed/your-feed.component';
import { FeedTogglerComponent } from '@miShared/components/feed-toggler/feed-toggler.component';
import { PopularTagsComponent } from '@miShared/components/popular-tags/popular-tags.component';

@Component({
  selector: 'mc-tag-feed',
  templateUrl: './tag-feed.component.html',
  standalone: true,
  imports: [
    YourFeedComponent,
    BannerComponent,
    PopularTagsComponent,
    FeedTogglerComponent,
  ],
})
export class TagFeedComponent implements OnInit {
  apiUrl: string = '';
  tagName: string = '';

  constructor(private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.route.params.subscribe((params: Params) => {
      this.tagName = params['slug'];
      this.apiUrl = `/articles?tag=${this.tagName}`;
    });
  }
}
