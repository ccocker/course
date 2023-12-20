import { createActionGroup, emptyProps, props } from '@ngrx/store';
import { GetFeedResponseInterface } from '../interfaces/get-feed-response.interface';

export const feedActions = createActionGroup({
  source: 'feed',
  events: {
    'Get Feed': props<{ url: string; id: string }>(),
    'Get Feed Success': props<{ feed: GetFeedResponseInterface }>(),
    'Get Feed Failure': emptyProps(),
  },
});
