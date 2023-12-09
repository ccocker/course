import { CommonModule } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Store } from '@ngrx/store';
import { combineLatest } from 'rxjs';
import { ErrorMessageComponent } from '../errorMessage/errorMessage.component';
import { LoadingComponent } from '../loading/loading.component';
import { popularTagsActions } from './store/actions';
import {
  selectError,
  selectIsLoading,
  selectPopularTagsData,
} from './store/reducers';

@Component({
  selector: 'mi-popular-tags',
  templateUrl: './popular-tags.component.html',
  standalone: true,
  imports: [CommonModule, LoadingComponent, ErrorMessageComponent, RouterLink],
})
export class PopularTagsComponent implements OnInit {
  @Input() apiUrl: string = 'popular-tags';
  @Input() id: string = 'SI75qUBX2Ma8JZNL4W8u';

  data$ = combineLatest({
    popularTags: this.store.select(selectPopularTagsData),
    isLoading: this.store.select(selectIsLoading),
    error: this.store.select(selectError),
  });
  constructor(private store: Store) {}

  ngOnInit(): void {
    this.store.dispatch(
      popularTagsActions.getPopularTags({ url: this.apiUrl, id: this.id })
    );
  }
}
