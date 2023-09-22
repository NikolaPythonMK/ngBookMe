import {Pipe, PipeTransform} from "@angular/core";
import { backendUrl } from "../constants/AppConstants";

@Pipe({
  name: 'formatImageUrl'
})
export class FormatImageUrlPipe implements PipeTransform {
  transform(imageName: string, propertyId: number): string {
    return `${backendUrl}/api/images/${propertyId}/${imageName}`;
  }

}
