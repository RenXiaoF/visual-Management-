import { Pipe, PipeTransform } from '@angular/core';
import { DEFAULT_VAL } from 'src/services/Constants';

@Pipe({
  name: 'defaultVal'
})
export class DefaultValPipe implements PipeTransform {
  transform(value: string) {
    if (value) {
      return value;
    } else {
      return DEFAULT_VAL;
    }
  }

}
