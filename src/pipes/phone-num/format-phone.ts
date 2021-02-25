import { Pipe, PipeTransform } from '@angular/core';

/**
 * Generated class for the DefaultImgPipe pipe.
 *
 * See https://angular.io/api/core/Pipe for more info on Angular Pipes.
 */
@Pipe({
  name: 'formatPhone',
})
export class FormatPhonePipe implements PipeTransform {
  /**
   * 把11为电话号转成 转换为 "135 **** 4444"
   * 
   */
  transform(value: string) {
    if (value) {
        let start = value.slice(0,3);
        let end = value.slice(-4);
        return start+"****"+end
    } else {
      return "";
    }
  }
}
