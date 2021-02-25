import { Pipe, PipeTransform } from '@angular/core';
import { DEFAULT_NUM } from 'src/services/Constants';

@Pipe({
  name: 'defaultNum'
})
export class DefaultNumPipe implements PipeTransform {

  transform(value) {
    if (value) {
      return value;
    } else {
      return DEFAULT_NUM;
    }
  }

}
