import { ArticleInterface } from '@miShared/interfaces/article.interface';

export interface EntityStateInterface {
  isLoading: boolean;
  error: string | null;
  data: ArticleInterface | null;
}
