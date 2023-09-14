import {PropertyOwnerInfo} from "./PropertyOwnerInfo";
import { Reservation } from "./Reservation";

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
  reservationList: Reservation[]
}