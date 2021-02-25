import { Pipe, PipeTransform } from '@angular/core';
import { FILE_SERVE_URL } from 'src/services/Constants';
import { Utils } from 'src/services';

/**
 * Generated class for the UrlImgPipe pipe.
 *
 * See https://angular.io/api/core/Pipe for more info on Angular Pipes.
 */
@Pipe({
  name: 'urlImg',
})
export class UrlImgPipe implements PipeTransform {
  /**
   * Takes a value and makes it lowercase.
   */
  transform(value: string) {
    if(Utils.isEmpty(value))
    {
      value = "assets/default.png";
    }
    if (Utils.isNotEmpty(FILE_SERVE_URL) && Utils.isNotEmpty(value) && typeof(value) == 'string') {
      if ((!value.includes('http') || !value.includes('www')) && !value.includes('assets')&& !value.includes('data:image')) {
        value = FILE_SERVE_URL + value;
      }
    }

    // if (Utils.isNotEmpty(FILE_SERVE_URL)) {
    //   if (!value.includes('http') || !value.includes('www')) {
    //     value = FILE_SERVE_URL + value;
    //     // console.log('url-img.ts');
    //     // console.log(value);
    //   }
    // }
    // console.log(value);
    return value;
  }
}
