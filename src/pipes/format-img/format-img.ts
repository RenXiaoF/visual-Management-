import { Pipe, PipeTransform } from '@angular/core';
import { Utils } from 'src/services/Utils';
import { API_SERVE_URL, DEFAULT_GOODS_IMG } from 'src/services/Constants';

/**
 * Generated class for the DefaultImgPipe pipe.
 *
 * See https://angular.io/api/core/Pipe for more info on Angular Pipes.
 */
@Pipe({
  name: 'formatImg',
})
export class FormatImgPipe implements PipeTransform {
  transform(value: string) {
    if (!value) { // 默认的图片logo
        return DEFAULT_GOODS_IMG;
    }

    let url;
    if (value.slice(0, 4) == 'http') { // http链接的图片
      url = value;
    } else {
        let index = value.indexOf('upload');
        if (index >= 0 && index < 10) { // 服务器上的图片
            url = API_SERVE_URL + value;
        } else { // 七牛云储存图片
            let bucket_url = Utils.localStorageGetItem('bucket_url');
            url = bucket_url + value;
        }
    }

    // 图片或资源缓存到本地，直接本地读取。

    return url;
  }
  // //2.0版本
  // transform(str: string) {
  //   if (Utils.isEmpty(FILE_SERVE_URL) || Utils.isEmpty(str)) {
  //     return str;
  //   }
  //   let subStr1 = /src="(\S*)"/g;
  //   let subStr2 = /src="(\S*)"/;
  //   let back = str.replace(subStr1,($1) => {
  //     let str = $1.match(subStr2)[1];
  //     if ((!str.includes('http') || !str.includes('www')) && !str.includes('assets')) {
  //       str = FILE_SERVE_URL + str;
  //     }
  //     return String.raw`src="${str}"`;
  //   });
  //   return back;
  // }
}
