import { Pipe, PipeTransform } from '@angular/core';
import { DOWNLOAD_QRCODE } from 'src/services/Constants';

@Pipe({
  name: 'defaultDownloadQrcode'
})
export class DefaultDownloadQrcodePipe implements PipeTransform {

  transform(value: any, args?: any): any {
    if (value) {
      return value;
    } else {
      return DOWNLOAD_QRCODE;
    }
  }

}
