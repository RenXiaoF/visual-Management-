import { Injectable } from '@angular/core';
import { Utils } from './Utils';
import { APP_CONFIG } from './Constants';

@Injectable()
export class GlobalData {

  private _userId: string; // 用户id
  private _username: string; // 用户名
  private _user: any; // 用户详细信息
  private _role: any; // 用户角色
  public _ifentry: boolean = false; // 是否已入驻


  private _token: string; // token

  // 设置http请求是否显示loading,注意:设置为true,接下来的请求会不显示loading,请求执行完成会自动设置为false
  private _showLoading = true;

  // 是否启用文件缓存
  private _enabledFileCache = true;

  private _wsBaseUrl: string; // websokect链接地址
  private _shareUrl = 'http://cloudpf.weunit.cn'; // 分享海报的链接地址

  setIfentry(value){
    this._ifentry = value;
  }

  getRole(): any {
    return this._role;
  }

  setRole(): any {

  }

  get userId(): string {
    if (this.user) {
      this._userId = this.user.userid;
    }
    return this._userId;
  }

  get username(): string {
    if (this.user) {
      this._username = this.user.username;
    }
    return this._username;
  }

  get token(): string {
    this._token = this.user.token;
    return this._token;
  }

  get user() {
    this._user = Utils.localStorageGetItem(APP_CONFIG.USER_KEY);
    if (Utils.isEmpty(this._user)) {
      return {};
    }
    return this._user;
  }

  getAppConfig(key) {
    return Utils.localStorageGetItem(key);
  }

  get showLoading(): boolean {
    return this._showLoading;
  }

  set showLoading(value: boolean) {
    this._showLoading = value;
  }
  get enabledFileCache(): boolean {
    return this._enabledFileCache;
  }

  set enabledFileCache(value: boolean) {
    this._enabledFileCache = value;
  }

  get wsBaseUrl(): any {
    let bu = Utils.localStorageGetItem('_wsBaseUrl');
    if (bu) {
      this._wsBaseUrl = bu;
    }
    return this._wsBaseUrl;
  }

  set wsBaseUrl(value: any) {
    Utils.localStorageSetItem('_wsBaseUrl', value);
    this._wsBaseUrl = value;
  }

    get shareUrl(): any {
        let share_url = Utils.localStorageGetItem('_shareUrl');
        if (share_url) {
            this._shareUrl = share_url;
        }
        return this._shareUrl;
    }

    set shareUrl(value: any) {
        Utils.localStorageSetItem('_shareUrl', value);
        this._shareUrl = value;
    }
}
