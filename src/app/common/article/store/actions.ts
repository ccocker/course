import { createActionGroup, emptyProps, props } from '@ngrx/store';
import { ArticleInterface } from '../../interfaces/article.interface';

export const articleActions = createActionGroup({
  source: 'article',
  events: {
    'Get article': props<{ url: string; id: string }>(),
    'Get article success': props<{ article: ArticleInterface }>(),
    'Get article failure': emptyProps(),

    'Delete article': props<{ url: string; id: string }>(),
    'Delete article success': emptyProps(),
    'Delete article failure': emptyProps(),
  },
});
