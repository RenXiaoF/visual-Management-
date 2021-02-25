// import 'rxjs/add/operator/share';
// import { fromPromise }from 'rxjs';
// import 'rxjs-compat/operator/share';

import { Injectable } from '@angular/core';
import { Api } from './api';
import { Utils } from './Utils';
import { APP_CONFIG } from './Constants';

/**
 * 大多数应用程序都有用户的概念。这是一个简单的提供程序
 * 关于  登陆  / 注册 / 退出登陆
 */
@Injectable()
export class User {
  _user: any;
  private USER_KEY: string = APP_CONFIG.USER_KEY;

  constructor(public api: Api) { }

  /* 登陆 */
  login(accountInfo: any) {
    // let seq = this.api.postFormData('user/do_login', accountInfo).share();
    // seq.subscribe((res: any) => {
    //   if (res.status == 200) {
    //     this._loggedIn(res.data);
    //   } else {

    //   }
    // }, err => {
    //   console.error('ERROR', err);
    // });

    // return seq;
  }

  /**  注册 */
  signup(accountInfo: any) {
    // let seq = this.api.postFormData('user/do_register', accountInfo).share();

    // seq.subscribe((res: any) => {
    //   // 如果API返回了成功的响应，则将用户标记为已登录
    //   if (res.status > 0) {
    //     this._loggedIn(res.data);
    //   }
    // }, err => {
    //   console.error('ERROR', err);
    // });

    // return seq;
  }
  /** 判断是否 有 登陆 */
  isnologin() {
    // let islogin = Utils.localStorageGetItem(this.USER_KEY) ? true : false;
    // console.log(this.USER_KEY);
    // console.log(Utils.localStorageGetItem(this.USER_KEY));
    // console.log('islogin__________' + islogin);
    // return islogin;
  }

  /** 退出登陆 */
  logout() {
    // this.api.get('user/logout').subscribe((res: any) => {

    // });
    // this._user = null;
    // Utils.localStorageRemoveItem(this.USER_KEY);
    // let islogin = Utils.localStorageGetItem(this.USER_KEY) ? true : false;
    // console.log(this.USER_KEY);
    // console.log(Utils.localStorageGetItem(this.USER_KEY));
    // console.log('islogin_' + islogin);
  }

  /** 处理登录/注册响应以存储用户数据 */
  _loggedIn(resp) {
    // console.log(resp);
    // Utils.localStorageSetItem(this.USER_KEY, resp);
    // // this.storage.set(this.USER_KEY, resp);
    // this._user = resp;
  }
  /**  更新用户的信息 */
  updateUser() {
    // this.api.get('user/getMyContent').subscribe(
    //   (res: any) => {
    //     if (res.status == 200) {
    //       // 更新本地user信息
    //       this._loggedIn(res.data);
    //     }
    //   },
    //   err => {
    //   }
    // );
  }
}
