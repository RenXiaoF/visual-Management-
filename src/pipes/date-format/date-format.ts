import { Pipe, PipeTransform } from '@angular/core';

/**
 * Generated class for the DefaultImgPipe pipe.
 *
 * See https://angular.io/api/core/Pipe for more info on Angular Pipes.
 */
@Pipe({
  name: 'dateFormat',
})
export class DateFormatPipe implements PipeTransform {
  /**
   * 如日期中包含：T，则把T转换为' '
   */
  transform(value: string) {
    if (value) {
      if(value.includes('T'))
      {
        return value.replace('T',' ');
      }
    } else {
      return value;
    }
  }
}
