import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { BannerComponent } from '@miCommon/components/banner/banner.component';
import { YourFeedComponent } from '@miCommon/features/your-feed/components/your-feed/your-feed.component';
import { FeedTogglerComponent } from '@miCommon/components/feed-toggler/feed-toggler.component';
import { PopularTagsComponent } from '@miCommon/components/popular-tags/popular-tags.component';
import { FeedComponent } from '@miCommon/components/feed-component/feed.component';

@Component({
  selector: 'mi-tag-feed',
  templateUrl: './tag-feed.component.html',
  standalone: true,
  imports: [
    YourFeedComponent,
    BannerComponent,
    PopularTagsComponent,
    FeedTogglerComponent,
    FeedComponent,
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
