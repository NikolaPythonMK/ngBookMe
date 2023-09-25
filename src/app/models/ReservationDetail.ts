export interface ReservationDetail{
  id: number,
  reservationPropertyId: number,
  reservationPropertyName: string,
  reservationStartDate: Date,
  reservationEndDate: Date,
  reservationNumberOfPeople: number,
  reservationTotalPrice: number
}
