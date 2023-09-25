import {PropertyOwnerInfo} from "./PropertyOwnerInfo";
import { Rating } from "./Rating";
import { ReservationResponse } from "./ReservationResponse";

export interface PropertyDetails{
  id: number,
  propertyName: string,
  propertyDescription: string,
  propertyCity: string,
  propertyAddress: string,
  propertyLocation: string,
  propertyType: string,
  propertySize: number,
  propertyPrice: number,
  propertyImage: string,
  propertyUser: PropertyOwnerInfo,
  propertyImages: string[],
  bookmarked: boolean,
  reservationList: ReservationResponse[],
  propertyRating: Rating[],
  propertyAmenities: string,
  averageRating: number
}
