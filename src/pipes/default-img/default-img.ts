import { Pipe, PipeTransform } from '@angular/core';
import { DEFAULT_AVATAR } from 'src/services/Constants';

/**
 * Generated class for the DefaultImgPipe pipe.
 *
 * See https://angular.io/api/core/Pipe for more info on Angular Pipes.
 */
@Pipe({
  name: 'defaultImg',
})
export class DefaultImgPipe implements PipeTransform {
  /**
   * Takes a value and makes it lowercase.
   */
  transform(value: string) {
    if (value) {
      return value;
    } else {
      return DEFAULT_AVATAR;
    }
    // return value.toLowerCase();
  }
}
