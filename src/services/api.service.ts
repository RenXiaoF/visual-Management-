import { HttpClient, HttpParams } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IS_DEBUG, APP_VERSION_SERVE_URL, APP_ONLINE_SERVE_URL, APP_MES_SERVE_URL, APP_CAFE_SERVE_URL } from './Constants';
import { GlobalData } from 'src/services/GlobalData';
/**
 * Api is a generic REST Api handler. Set your API url first.
 */



@Injectable()
export class ApiService {
  url: string;
  url2: string;

  /**
   * @name: 自定义请求头
   * @msg:
   * @param {type} 
   * @return:
   */
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/x-www-form-urlencoded'
    })
  };

  constructor(public http: HttpClient, public _GlobalData: GlobalData) {
    if (IS_DEBUG) {
      this.url = APP_MES_SERVE_URL;
      this.url2 = APP_CAFE_SERVE_URL;
    } else {
      if (this._GlobalData.user.RestfulIp) {// 有配置
        this.url = this._GlobalData.user.RestfulIp + '/ross/post/cloud/';
        this.url2 = this._GlobalData.user.RestfulIp + '/ross/post/';
      } else {
        this.url = APP_MES_SERVE_URL;
        this.url2 = APP_CAFE_SERVE_URL;
      }
    }

  }

  setUrl() {
    if (IS_DEBUG) {
      this.url = APP_MES_SERVE_URL;
    } else {
      if (this._GlobalData.user.RestfulIp) {// 有配置
        this.url = this._GlobalData.user.RestfulIp + '/ross/post/cloud/';
      } else {
        this.url = APP_MES_SERVE_URL;
      }

    }
    this.url2 = APP_CAFE_SERVE_URL;
  }

  post_wx(endpoint: string, body: any, reqOpts?: any) {

    return this.http.post(this.url2 + endpoint, body, reqOpts);
  }


  posturl_wx(url: any, body: any, reqOpts?: any) {
    return this.http.post(url, body, reqOpts);
  }

  get(endpoint: string, params?: any, reqOpts?: any) {
    if (!reqOpts) {
      reqOpts = {
        params: new HttpParams()
      };
    }
    // Support easy query params for GET requests
    if (params) {
      reqOpts.params = new HttpParams();
      for (let k in params) {
        if (typeof params[k] !== 'undefined') {
          reqOpts.params = reqOpts.params.set(k, params[k]);
        }
      }
    }

    return this.http.get(this.url + endpoint, reqOpts);
  }
  postFormData(endpoint: string, params?: any, reqOpts?: any) {
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
    return this.http.post(this.url + endpoint, this.buildURLSearchParams(par), reqOpts);
  }

  postFormDatabyurl(endpoint: string, params?: any, reqOpts?: any) {
    let par = {}; // 重新组合参数数组
    if (params) {
      for (let k in params) {
        if (typeof params[k] !== 'undefined') {
          par[k] = params[k];
        }
      }
    }
    return this.http.post(endpoint, this.buildURLSearchParams(par), reqOpts);
  }

  post(endpoint: string, body: any, reqOpts?: any) {
    return this.http.post(this.url + endpoint, body, reqOpts);
  }

  /**
   * @name: post方法
   * @msg:
   * @param {type} 
   * @return:
   */
  post2(url, action, parame: string) {
    let data = {};
    data['action'] = action;
    data['params'] = parame;
    let dataStr = [];
    for (var p in data) {
      // dataStr.push(encodeURIComponent(p) + '=' + encodeURIComponent(data[p]));  
      dataStr.push(p + '=' + data[p]);
    }
    let params = dataStr.join('&');
    return this.http.post(url, params, this.httpOptions);
  }

  put(endpoint: string, body: any, reqOpts?: any) {
    return this.http.put(this.url + endpoint, body, reqOpts);
  }

  delete(endpoint: string, reqOpts?: any) {
    return this.http.delete(this.url + endpoint, reqOpts);
  }

  patch(endpoint: string, body: any, reqOpts?: any) {
    return this.http.patch(this.url + endpoint, body, reqOpts);
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
}
