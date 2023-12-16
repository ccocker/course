import { GetFeedResponseInterface } from '../interfaces/get-feed-response.interface';

export interface FeedStateInterface {
  isLoading: boolean;
  error: string | null;
  data: GetFeedResponseInterface | null;
}
