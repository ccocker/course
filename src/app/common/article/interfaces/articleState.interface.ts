import { ArticleInterface } from '@miShared/interfaces/article.interface';

export interface ArticleStateInterface {
  isLoading: boolean;
  error: string | null;
  data: ArticleInterface | null;
}
