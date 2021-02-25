import { Pipe, PipeTransform } from '@angular/core';
import { DOWNLOAD_URL } from 'src/services/Constants';

@Pipe({
  name: 'defaultDownloadUrl'
})
export class DefaultDownloadUrlPipe implements PipeTransform {

  transform(value: any, args?: any): any {
    if (value) {
      return value;
    } else {
      return DOWNLOAD_URL;
    }
  }

}
