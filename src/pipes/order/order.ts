import { Pipe, PipeTransform } from '@angular/core';

/**
 * Generated class for the OrderPipe pipe.
 *
 * See https://angular.io/api/core/Pipe for more info on Angular Pipes.
 */
@Pipe({
  name: 'orderPipe',
  pure: false
})
export class OrderPipe implements PipeTransform {
  /**
   * Takes a value and makes it lowercase.
   */
  transform(Contacts: any, prefix: string) {
    let str = '';
　　for(var key in Contacts){
  　　　//alert(key+':'+json[i][key]);
      if(key == prefix) {
        str = Contacts[key];
      }
  　}
    return str;
  }
}
