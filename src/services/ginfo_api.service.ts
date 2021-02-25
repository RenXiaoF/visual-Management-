import {
  HttpClient, HttpHeaders,
  HttpErrorResponse, HttpParams
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { Utils } from './Utils';
import { IS_DEBUG, APP_CAFE_SERVE_URL } from './Constants';
import { GlobalData } from 'src/services/GlobalData';
@Injectable()
export class GinfoApi {
  loading: any;
  isLoadData = false;
  // 咖啡吧地址，具体调用需要在后面添加路径明细：/cloud/operation/，如：http://59.41.187.99:6790/ross/post/cloud/operation/
  public apiUrlGetMpsInfo = APP_CAFE_SERVE_URL;
  myHttpHead = { headers: new HttpHeaders({ 'Content-Type': 'application/x-www-form-urlencoded;charset=utf8' }) };

  constructor(
    public http: HttpClient,
    public _GlobalData: GlobalData
  ) {
    // console.log('Hello RestProvider Provider');
  }
  setUrl() {
    if (IS_DEBUG) {
      this.apiUrlGetMpsInfo = APP_CAFE_SERVE_URL;
    } else {
      if (this._GlobalData.user.RestfulIp) {// 有配置
        this.apiUrlGetMpsInfo = this._GlobalData.user.RestfulIp + '/ross/post/';
      } else {
        this.apiUrlGetMpsInfo = APP_CAFE_SERVE_URL;
      }
    }
  }

  /**
   * 提取数据
   * @param res 返回结果
   */
  private extractData(res: Response) {
    let body = res;
    return body || {};
  }

  /**
   * 全局获取HTTP请求 - GET
   * @private
   * @param {string} url
   * @returns {Observable<string[]>}
   * @memberof RestProvider
   */
  private getUrlReturn(url: string): Observable<Object> {
    return this.http.get(url);
  }

  /**
   * 全局获取HTTP请求 - POST
   * @private
   * @param {string} url
   * @returns {Observable<string[]>}
   * @memberof RestProvider
   */
  private postUrlReturn(subUrl, params: any, url?): Observable<Object> {
    if (url == null || url == undefined || url == '')
      url = this.apiUrlGetMpsInfo + subUrl;

    // this.http.post(this.url + endpoint,this.buildURLSearchParams(par),reqOpts);
    return this.http.post(url, params, this.myHttpHead).pipe(
      map(this.extractData),
      catchError(this.handleError)
    );
  }

  private postFormData(subUrl: string, params?: any, reqOpts?: any) {
    let par = {}; // 重新组合参数数组
    if (params) {
      for (let k in params) {
        if (typeof params[k] !== 'undefined') {
          par[k] = params[k];
        }
      }
    }
    // console.log('postFormData');
    // console.log(this.url);
    return this.http.post(this.apiUrlGetMpsInfo + subUrl, this.buildURLSearchParams(par), reqOpts);
  }

  private buildURLSearchParams(paramMap) {
    if (!paramMap) {
      return new HttpParams({ fromString: '' });
    }
    // tslint:disable-next-line:prefer-const
    let formstr = Object.keys(paramMap).map(function (key) {
      return encodeURIComponent(key) + '=' + encodeURIComponent(paramMap[key]);
    }).join('&');
    return new HttpParams({ fromString: formstr });
  }

  /**
   * 错误消息类
   * @param error
   */
  private handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      console.log('An error occurred:', error.error.message);
    } else {
      console.log(
        `Backend returned code ${error.status}, ` + `body was: ${error.error}`
      );
    }
    this.dismissLoading();
    return throwError('Something bad happened; please try again later.');
  }

  // /**
  //  * wx 扫描
  //  **/
  // public getWxScanConfig(link :string): Observable<Object>{
  //   return this.postUrlReturn('link='+link, globals.wxScanUrl);
  // }

  // 通用接口 调用 url:cloud/operation
  public queryCommon(url, action, sendMsg, callback: (res: any) => void) {
    sendMsg = Utils.base64encoder(sendMsg);
    this.getAction(url, action, sendMsg).pipe(catchError(() => {
      return throwError('Something bad happened; please try again later.');
    }))
      .subscribe(data => {
        try {
          const code = data['code'];
          if (code == '200') {
            data = data['result'];
            callback(data);
          } else {
          }
        } catch (e) {
        }
      }, error => { }
      );
  }

  // 通用接口 调用
  public queryCommon1(url, action, sendMsg, callback: (res: any) => void) {
    this.presentLoading();
    this.getAction(url, action, sendMsg).pipe(catchError(() => {
      this.dismissLoading();
      return throwError('Something bad happened; please try again later.');
    }))
      .subscribe(data => {
        try {
          const code = data['code'];
          if (code == '200') {
            callback(data);
          } else {
          }
          this.dismissLoading();
        } catch (e) {
          this.dismissLoading();
        }
      }, error =>
        this.dismissLoading()
      );
  }

  // 加载提示框
  private presentLoading() {

  }

  // 关闭加载框
  private dismissLoading() {

  }

  /**
   *
   * 获取 固定 接口名字 信息
   */
  public getAction(url, action, params: string): Observable<Object> {
    // return this.postUrlReturn(url,'action='+action+'&params='+params);
    let params_ = { action: action, paramet: params };
    return this.postFormData(url, params_);
  }
}
