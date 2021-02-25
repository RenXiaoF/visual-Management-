import { Pipe, PipeTransform } from '@angular/core';
import { Utils } from '../../services/index';

/**
 * Generated class for the DefaultImgPipe pipe.
 *
 * See https://angular.io/api/core/Pipe for more info on Angular Pipes.
 */
@Pipe({
    name: 'base64Img',
})
export class Base64ImgPipe implements PipeTransform {
    /**
     * Takes a value and makes it lowercase.
     */
    transform(value: string) {
        if (typeof (value) == "string" && Utils.isNotEmpty(value) && value != 'null') {
            if (value.includes('?')) {
                value = value.replace("?", 'data:image/jpeg;base64,');
            }
            return value;
        } else if (typeof (value) == "object") {
            return value;
        }
        else {
            return 'assets/img/default.jpg';
        }
        // return value.toLowerCase();
    }
}
