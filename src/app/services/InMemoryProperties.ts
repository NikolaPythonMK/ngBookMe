import {Injectable} from "@angular/core";
import {Property} from "../models/Property";
import {PropertyOwnerInfo} from "../models/PropertyOwnerInfo";
import {Observable, of} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class InMemoryProperties{

  properties: Property[] = [];
  propertyOwners: PropertyOwnerInfo[] = [];

  constructor() {
    this.init();
  }

  getAll(): Observable<Property[]>{
    return of(this.properties);
  }

  private init(){
    this.propertyOwners.push(this.generateUser(1, "Jack", "Morgan", '070123321', 'JackMorgan@gmail.com'));
    this.propertyOwners.push(this.generateUser(2, "Anna", "Velasquez", '070124223', 'AnnaVelas@gmail.com'));
    this.propertyOwners.push(this.generateUser(3, "Rick", "Gregor", '077123123', 'Gregor@gmail.com'));
    this.propertyOwners.push(this.generateUser(4, "Jack", "Morgan", '070123321', 'JackMorgan@gmail.com'));
    this.propertyOwners.push(this.generateUser(5, "Anna", "Velasquez", '070124223', 'AnnaVelas@gmail.com'));
    this.propertyOwners.push(this.generateUser(6, "Rick", "Gregor", '077123123', 'Gregor@gmail.com'));

    this.properties.push(this.generateProperty(1, 'GoldenHotel', 'Skopje',
      'street name x, street number x', 'Hotel', 10, 30, '', this.propertyOwners[0]))

    this.properties.push(this.generateProperty(1, 'CapitolHotel', 'Skopje',
      'street name x, street number x', 'Hotel', 10, 30, '', this.propertyOwners[0]))

    this.properties.push(this.generateProperty(1, 'name123', 'Skopje',
      'street name x, street number x', 'Hotel', 10, 30, '', this.propertyOwners[0]))

    this.properties.push(this.generateProperty(1, 'GoldenHotel', 'Skopje',
      'street name x, street number x', 'Hotel', 10, 30, '', this.propertyOwners[0]))

    this.properties.push(this.generateProperty(1, 'GoldenHotel', 'Skopje',
      'street name x, street number x', 'Hotel', 10, 30, '', this.propertyOwners[0]))

    this.properties.push(this.generateProperty(1, 'GoldenHotel', 'Skopje',
      'street name x, street number x', 'Hotel', 10, 30, '', this.propertyOwners[0]))

    this.properties.push(this.generateProperty(1, 'GoldenHotel', 'Skopje',
      'street name x, street number x', 'Hotel', 10, 30, '', this.propertyOwners[0]))
  }

  private generateUser(id: number, firstName: string, lastName: string, mobilePhone: string, email: string): PropertyOwnerInfo{
      return {
        id: id,
        firstName: firstName,
        lastName: lastName,
        mobilePhone: mobilePhone,
        email: email
      } as PropertyOwnerInfo;
  }

  private generateProperty(id: number, name: string, city: string, location: string, type: string, size: number,
                           price: number, image: string, user: PropertyOwnerInfo): Property{
    return {
      id: id,
      propertyName: name,
      propertyDescription: 'Some description goes here...',
      propertyCity: city,
      propertyAddress: 'Street x, number y',
      propertyLocation: location,
      propertyType: type,
      propertySize: size,
      propertyPrice: price,
      propertyImage: image,
      propertyUser: user,
      propertyImages: [],
    } as Property;
  }
}
