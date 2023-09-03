import {PropertyOwnerInfo} from "./PropertyOwnerInfo";

export interface Property{
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
  propertyImages: string[]
}
