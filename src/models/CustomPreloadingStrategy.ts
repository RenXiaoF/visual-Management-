import { Route, PreloadingStrategy } from '@angular/router';
import { Observable } from 'rxjs';
import 'rxjs/add/observable/of';
// import 'rxjs/internal/observable';
/**
 * 自定义的路由加载策略，在定义中定义data其中的属性preload为真的时候这个模块蔡需要被预先加载
 */
export class CustomPreloadingStrategy implements PreloadingStrategy {
  preload(route: Route, fn: () => Observable<any>): Observable<any> {
    return route.data && route.data.preload ? fn() : Observable.of(null);
  }
}
