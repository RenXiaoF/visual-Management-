import { Pipe, PipeTransform } from '@angular/core';
import { DEFAULT_GOODS_IMG } from 'src/services/Constants';

@Pipe({
  name: 'defaultGoodsImg'
})
export class DefaultGoodsImgPipe implements PipeTransform {

  transform(value: any, args?: any): any {
    if (value) {
      return value;
    } else {
      return DEFAULT_GOODS_IMG;
    }
  }

}
