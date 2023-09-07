import {Property} from "./Property";
import {PropertyResponse} from "./PropertyResponse";

export interface Page {
  content: Property[];
  pageNumber: number,
  pageSize: number,
  totalElements: number,
}
