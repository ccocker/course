import { createActionGroup, emptyProps, props } from '@ngrx/store';
import { ArticleInterface } from '../../interfaces/article.interface';

export const entityActions = createActionGroup({
  source: 'entity',
  events: {
    'Get entity': props<{ url: string; id: string }>(),
    'Get entity success': props<{ entity: any }>(),
    'Get entity failure': emptyProps(),

    'Delete entity': props<{ url: string; id: string }>(),
    'Delete entity success': emptyProps(),
    'Delete entity failure': emptyProps(),
  },
});
