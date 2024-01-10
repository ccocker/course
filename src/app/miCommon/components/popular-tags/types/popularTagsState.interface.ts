import { PopularTagType } from '@miShared/interfaces/popular-tag.type';

export interface PopularTagsStateInterface {
  isLoading: boolean;
  error: string | null;
  data: PopularTagType[] | null;
}
