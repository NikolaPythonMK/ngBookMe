import {Property} from "./Property";
import {ReservationDetail} from "./ReservationDetail";

export interface ReservationPage {
  content: ReservationDetail[];
  pageNumber: number,
  pageSize: number,
  totalElements: number,
}
