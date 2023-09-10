import {Pipe, PipeTransform} from "@angular/core";

@Pipe({
  name: 'formatImageUrl'
})
export class FormatImageUrlPipe implements PipeTransform {
  transform(imageName: string, propertyId: number): string {
    return `http://localhost:9090/api/images/${propertyId}/${imageName}`;
    // return `http://192.168.0.15:9090/api/images/${propertyId}/${imageName}`;
  }

}
