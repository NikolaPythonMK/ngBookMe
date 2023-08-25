import {PropertyOwnerInfo} from "./PropertyOwnerInfo";

export interface Property{
  id: number,
  propertyName: string,
  propertyCity: string,
  propertyLocation: string,
  propertyType: string,
  propertySize: number,
  propertyPrice: number,
  propertyImage: string,
  propertyOwnerInfo: PropertyOwnerInfo,
}
