import {RecentlyViewed} from "./RecentlyViewed";

export interface RecentlyViewedPage {
  content: RecentlyViewed[],
  pageNumber: number,
  pageSize: number,
  totalElements: number,
}
