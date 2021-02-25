import { Pipe, PipeTransform } from '@angular/core';

/**
 * Generated class for the DefaultImgPipe pipe.
 *
 * See https://angular.io/api/core/Pipe for more info on Angular Pipes.
 */
@Pipe({
  name: 'formatCardNo',
})
export class FormatCardNoPipe implements PipeTransform {
  /**
   * 把65251254875578925145484 转换为 "6525 **** **** **** *** 5484"
   * 
   */
  transform(value: string) {
    if (value) {
        let start = value.slice(0,4);
        let end = value.slice(-4);
        return start+" **** **** **** *** "+end
    } else {
      return "无";
    }
  }
}
