import { PropertyOwnerInfo } from "./PropertyOwnerInfo";

export interface Rating{
    ratedBy: PropertyOwnerInfo,
    userRating: number,
    userComment: string,
    ratingTime: Date
}