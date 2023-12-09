import { createActionGroup, emptyProps, props } from '@ngrx/store';
import { PopularTagType } from '../../../interfaces/popular-tag.type';

export const popularTagsActions = createActionGroup({
  source: 'popular tags',
  events: {
    'Get popular tags': props<{ url: string; id: string }>(),
    'Get popular tags success': props<{ popularTags: PopularTagType[] }>(),
    'Get popular tags failure': emptyProps(),
  },
});
