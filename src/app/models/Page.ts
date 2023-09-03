import {Property} from "./Property";

export interface Page {
  content: Property[],
  pageNumber: number,
  pageSize: number,
  totalElements: number,
}
