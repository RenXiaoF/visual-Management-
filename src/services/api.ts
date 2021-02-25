import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IS_DEBUG, APP_VERSION_SERVE_URL, APP_ONLINE_SERVE_URL } from './Constants';

/**
 * Api is a generic REST Api handler. Set your API url first.
 */
@Injectable()
export class Api {
  url: string;
  imgurl: string;
  constructor(public http: HttpClient) {
    if (IS_DEBUG) {
      this.url = APP_VERSION_SERVE_URL;
      this.imgurl = APP_VERSION_SERVE_URL;
    } else {
      this.url = APP_ONLINE_SERVE_URL;
      this.imgurl = APP_ONLINE_SERVE_URL;
    }
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
  getFullUrl(endpoint: string, params?: any, reqOpts?: any) {
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
    return this.http.get(endpoint, reqOpts);
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

  postFormImgData(endpoint: string, params?: any, reqOpts?: any) {
    let par = {}; // 重新组合参数数组
    if (params) {
      for (let k in params) {
        if (typeof params[k] !== 'undefined') {
          par[k] = params[k];
        }
      }
    }
    return this.http.post(this.imgurl + endpoint, this.buildURLSearchParams(par), reqOpts);
  }

  post(endpoint: string, body: any, reqOpts?: any) {
    return this.http.post(this.url + endpoint, body, reqOpts);
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
