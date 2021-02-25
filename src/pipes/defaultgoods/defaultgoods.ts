import { Pipe, PipeTransform } from '@angular/core';
import { DEFAULT_GOODS } from 'src/services/Constants';

/**
 * Generated class for the DefaultImgPipe pipe.
 *
 * See https://angular.io/api/core/Pipe for more info on Angular Pipes.
 */
@Pipe({
  name: 'defaultGoods',
})
export class DefaultgoodsPipe implements PipeTransform {
  /**
   * Takes a value and makes it lowercase.
   */
  transform(value: string) {
    if (value) {
      return value;
    } else {
      return DEFAULT_GOODS;
    }
    // return value.toLowerCase();
  }
}
