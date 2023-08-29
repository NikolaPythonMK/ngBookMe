export interface SavePropertyRequest {
  propertyName: string,
  propertyDescription: string,
  propertyCity: string,
  propertyAddress: string,
  propertyLocation: string,
  propertyType: string,
  propertySize: number,
  propertyPrice: number,
  propertyImage: string | null,
  propertyImages: string | null,
  propertyUser: string
}
