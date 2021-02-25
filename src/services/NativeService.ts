import { Injectable } from '@angular/core';

import {
  CODE_PUSH_DEPLOYMENT_KEY,
  // IMAGE_SIZE,
  IS_DEBUG,
  // QUALITY_SIZE
} from './Constants';


@Injectable()
export class NativeService {
  //   private loading: Loading;
  public loading;

  private loading_: any;
  private debugLoading: any = false;  // 解决hideLoading出现在showLoading方法前导致loading框无法关闭问题

  constructor(
    // private platform: Platform,
    // private toastCtrl: ToastController,
    // private statusBar: StatusBar,
    // private splashScreen: SplashScreen,
    // private loadingCtrl: LoadingController,
  ) {
  }

  /** 热更新同步方法 */
  // sync() {
  //   if (this.isMobile()) {
  //     let deploymentKey = '';
  //     if (this.isAndroid() && IS_DEBUG) {
  //       deploymentKey = CODE_PUSH_DEPLOYMENT_KEY.android.Staging;
  //     }
  //     if (this.isAndroid() && !IS_DEBUG) {
  //       deploymentKey = CODE_PUSH_DEPLOYMENT_KEY.android.Production;
  //     }
  //     if (this.isIos() && IS_DEBUG) {
  //       deploymentKey = CODE_PUSH_DEPLOYMENT_KEY.ios.Staging;
  //     }
  //     if (this.isIos() && !IS_DEBUG) {
  //       deploymentKey = CODE_PUSH_DEPLOYMENT_KEY.ios.Production;
  //     }
  //   }
  // }

  /** 状态栏 */
  // statusBarStyle(): void {
  //   if (this.isMobile()) {
  //     this.statusBar.overlaysWebView(false);
  //     this.statusBar.styleLightContent();
  //     // this.statusBar.styleDefault(); // 使用黑色字体
  //     this.statusBar.backgroundColorByHexString('#488aff'); // 3261b3
  //   }
  // }

  /** 隐藏启动页面 */
  // splashScreenHide(): void {
  //   this.isMobile() && this.splashScreen.hide();
  // }

  /**
   * 获取网络类型 如`unknown`, `ethernet`, `wifi`, `2g`, `3g`, `4g`, `cellular`, `none`
   */
  // getNetworkType(): string {
  //   if (!this.isMobile()) {
  //     return 'wifi';
  //   }
  //   return 'this.network.type';
  // }

  /** 判断是否有网络 */
  // isConnecting(): boolean {
  //   return this.getNetworkType() != 'none';
  // }

  /** 调用最小化app插件 */
  minimize(): void {
    // this.appMinimize.minimize();
  }

  /** 通过浏览器打开url */
  openUrlByBrowser(url: string): void {
    // this.inAppBrowser.create(url, '_system');
  }

  /** 是否真机环境  */
  // isMobile(): boolean {
    // return this.platform.is('mobile') && !this.platform.is('mobileweb');
  // }

  /** 是否android真机环境 */
  // isAndroid(): boolean {
    // return this.isMobile() && this.platform.is('android');
  // }

  /** 是否ios真机环境 */
  // isIos(): boolean {
    // return this.isMobile() && (this.platform.is('ios') || this.platform.is('ipad') || this.platform.is('iphone'));
  // }


  // ionic4
  // async showToast(message = '操作完成', duration: any = 2000) {
  //   const toast = await this.toastCtrl.create({
  //     message,
  //     duration,
  //     position: 'middle',
  //     showCloseButton: false,
  //     color: 'dark',
  //     cssClass: 'toast-style'
  //   });
  //   toast.present();
  // }

  /**
 * 统一调用此方法显示提示信息
 * @param message 信息内容
 * @param duration 显示时长
 */
  // ionic4
  // async showToastTips(message = '提示', duration: any = 2000) {
  //   const toast = await this.toastCtrl.create({
  //     message,
  //     duration,
  //     position: 'middle',
  //     showCloseButton: false,
  //     color: 'dark',
  //     cssClass: 'toast-style'
  //   });
  //   toast.present();
  // }


  // async showLoading(msg = '加载中...', duration = 1200) {
  //   this.debugLoading = false;
  //   this.loading_ = await this.loadingCtrl.create({
  //     message: msg,
  //     duration: duration
  //   });
  //   await this.loading_.present();
  //   if (this.debugLoading) {
  //     this.loading_.dismiss();
  //   }
  // }

  async hideLoading() {
    this.debugLoading = true;
    if (this.loading_) {
      await this.loading_.dismiss();
    }
  }

}
