import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { mergeMap, catchError } from 'rxjs/operators';
import { GlobalData, WechatConfig } from './index';
import { TimeoutError } from 'rxjs';
import { Api } from '../services/api';
import { User } from '../services/User';
import { Utils } from './Utils';
@Injectable()
export class InterceptorService implements HttpInterceptor {

  public store_id;
  constructor(
    public globalData: GlobalData,
    public Api: Api,
    public wconf: WechatConfig,
    public user: User,
  ) {
    this.store_id = window.localStorage.getItem('store_id');
  }

  /** 拦截 */
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    let authReq;
    if (req.url.indexOf('/assets') > -1) { // 不存在 返回 -1
      authReq = req.clone({
        url: (req.url)
      });
    } else {
      authReq = req.clone({
        url: (req.url),
        setHeaders: {
          'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
          IsApi: 'true',
          Token: Utils.localStorageGetItem('token') ? Utils.localStorageGetItem('token') : '0',
          // Uuid:  Utils.localStorageGetItem('uuid') ? Utils.localStorageGetItem('uuid') : '0',
          UserId: Utils.localStorageGetItem('user_id') ? Utils.localStorageGetItem('user_id').toString() : '0',
        }
      });
    }

    if (authReq.method != 'GET') {
      this.showLoading();
    }
    // return <any>next.handle(authReq).pipe(mergeMap((event: any) => {
    return (next.handle(authReq) as any).pipe(mergeMap((event: any) => {
      if (event instanceof HttpResponse && event.status !== 200) {
        return throwError(event);
      }
      // console.log(event);
      return Observable.create(observer => {
        if (event.body) {
          console.log(event.body.status);
          if (event.body.status == -99) { // 账号重新登录
            window['epInstance']['emit']('toLogin', 0);
          }
          observer.next(event);
        } else {
          observer.next(event);
        }
        if (event.type > 0) {
          this.hideLoading();
        }
        // 触发弹出屏保图片
        window['epInstance']['emit']('popScreen', 0);
      }); // 请求成功返回响应
    }),
      catchError((res: HttpResponse<any>) => {
        // 请求失败处理
        this.hideLoading();
        if (res instanceof TimeoutError) {
        } else {
          let msg = '请求发生异常';
          switch (res.status) {
            case 0:
              //console.log('未知的Api');
              msg = '未知的Api';
              break;
            case 401:
              break;
            case 404:
              //console.log('Api请求地址不存在');
              msg = 'Api请求地址不存在';
              //this.events.publish('toLogin');
              break;
            case 403:
              //console.log('业务错误');
              break;
            case 500:
              //console.log('服务器出错');
              msg = 'Api请求地址不存在';
              break;
          }
          // this.nativeService.showToastTips(msg);
        }

        return throwError(event);
      }));
  }

  private count = 0; //  记录未完成的请求数量,当请求数为0关闭loading,当不为0显示loading

  private async showLoading() {
    if (++this.count > 0) {// 一旦有请求就弹出loading
      this.globalData.showLoading;
    }
  }

  private hideLoading() {
    if (this.globalData.showLoading) {
      // 延迟处理可以避免嵌套请求关闭了第一个loading,突然后弹出第二个loading情况(结合nativeService.showLoading())
      setTimeout(() => {
        if (--this.count === 0) {// 当正在请求数为0,关闭loading
          // this.nativeService.hideLoading();
        }
      }, 200);
    } else {
      this.globalData.showLoading = true;
    }
  }
}

