import { PopularTagType } from '@miShared/interfaces/popular-tag.type';
// import {ProfileInterface} from './profile.interface'

export interface ArticleInterface {
  id: string;
  body: string;
  createdAt: string;
  description: string;
  favorited: boolean;
  favoritesCount: number;
  tagList: PopularTagType[];
  title: string;
  updatedAt: string;
  author: any;
}
