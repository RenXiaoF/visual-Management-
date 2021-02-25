/**
 * Created by Administrator on 2017/5/3 0003.
 */
import { Injectable } from '@angular/core';
import { Api } from '../services/api';
declare var wx: any;
declare var WeixinJSBridge: any;

@Injectable({
  providedIn: 'root',
})
export class WechatConfig {

  _weixin_config = { appid: '' };
  private jsApiParameters = { 'appId': '', 'nonceStr': '', 'package': '', 'paySign': '', 'signType': '', 'timeStamp': '' };
  ShareObj = { title: '', desc: '', link: '', imgUrl: '' };
  public paystate;
  public resolve: any;
  private askurl: string;

  constructor(
    public Api: Api,
  ) {

  }

  set weixin_config(value) {
    this._weixin_config = value;
  }
  get weixin_config() {
    return this._weixin_config;
  }
  public configwx(config) {
    wx.config({
      debug: false,
      appId: config.appId,
      timestamp: config.timestamp,
      nonceStr: config.nonceStr,
      signature: config.signature,
      jsApiList: config.jsApiList
      // jsApiList: ["scanQRCode","updateAppMessageShareData","onMenuShareAppMessage","getLocation"]
    });
    wx.error((res) => {
      //...
      // alert(JSON.stringify(res));
      // console.log(JSON.stringify(res));
      // alert(JSON.stringify(res));
    });
    wx.ready(() => {   //需在用户可能点击分享按钮前就先调用
      wx.updateAppMessageShareData({
        title: this.ShareObj.title, // 分享标题
        desc: this.ShareObj.desc, // 分享描述
        link: this.ShareObj.link, // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
        imgUrl: this.ShareObj.imgUrl, // 分享图标
        success: () => {
          // 设置成功
        }
      });
      wx.onMenuShareAppMessage({
        title: this.ShareObj.title, // 分享标题
        desc: this.ShareObj.desc, // 分享描述
        link: this.ShareObj.link, // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
        imgUrl: this.ShareObj.imgUrl, // 分享图标
        type: '', // 分享类型,music、video或link，不填默认为link
        dataUrl: '', // 如果type是music或video，则要提供数据链接，默认为空
        success: () => {
          // 用户点击了分享后执行的回调函数
        }
      });
    });
  }
  public configwx_new(config) {
    wx.config({
      debug: false,
      appId: config.appId,
      timestamp: config.timestamp,
      nonceStr: config.nonceStr,
      signature: config.signature,
      jsApiList: config.jsApiList
      // jsApiList: ["scanQRCode","updateAppMessageShareData","onMenuShareAppMessage","getLocation"]
    });
    wx.error((res) => {
      console.log(JSON.stringify(res));

    });
    wx.ready(() => {   //需在用户可能点击分享按钮前就先调用
      wx.scanQRCode({
        needResult: 1, // 默认为0，扫描结果由微信处理，1则直接返回扫描结果，
        scanType: ['qrCode', 'barCode'], // 可以指定扫二维码还是一维码，默认二者都有
        success: function (res) {
          // tslint:disable-next-line:prefer-const
          let result = res.resultStr; // 当needResult 为 1 时，扫码返回的结果
          // console.log("result:");
          // console.log(result);
          //callback(result);
          // resolv(result)
        }, error: function (res) {
          // reject(res);
        }
      });
    });
  }
  public scan() {
    console.log(wx);
    return new Promise((resolv, reject) => {
      wx.scanQRCode({
        needResult: 1, // 默认为0，扫描结果由微信处理，1则直接返回扫描结果，
        scanType: ['qrCode', 'barCode'], // 可以指定扫二维码还是一维码，默认二者都有
        success: function (res) {
          // tslint:disable-next-line:prefer-const
          let result = res.resultStr; // 当needResult 为 1 时，扫码返回的结果
          // console.log("result:");
          // console.log(result);
          //callback(result);
          resolv(result)
        }, error: function (res) {
          reject(res);
        }
      });
    });
  }
  // public async scan_conf(askurl) {
  //   console.log("new_askurl:" + askurl);
  //   console.log("old_askurl:" + this.askurl);
  //   if (askurl != this.askurl) {
  //     this.askurl = askurl;
  //     await this.getWXConfig(askurl);
  //   } else {
  //     // console.log(wx);
  //     return new Promise((resolv, reject) => {
  //       wx.scanQRCode({
  //         needResult: 1, // 默认为0，扫描结果由微信处理，1则直接返回扫描结果，
  //         scanType: ['qrCode', 'barCode'], // 可以指定扫二维码还是一维码，默认二者都有
  //         success: function (res) {
  //           // tslint:disable-next-line:prefer-const
  //           let result = res.resultStr; // 当needResult 为 1 时，扫码返回的结果
  //           console.log("result:");
  //           console.log(result);
  //           //callback(result);
  //           resolv(result)
  //         }, error: function (res) {
  //           reject(res);
  //         }
  //       });
  //     });
  //   }
  // }
  public wechatjspay(jsApiParameters) {
    this.jsApiParameters = JSON.parse(jsApiParameters);
    if (typeof WeixinJSBridge === 'undefined') {
      document.addEventListener('WeixinJSBridgeReady', this.jsApiCall, false);
    } else {
      this.jsApiCall();
    }
  }
  public jsApiCall() {
    WeixinJSBridge.invoke(
      'getBrandWCPayRequest', {
        'appId': this.jsApiParameters.appId,
        'nonceStr': this.jsApiParameters.nonceStr,
        'package': this.jsApiParameters.package,
        'paySign': this.jsApiParameters.paySign,
        'signType': this.jsApiParameters.signType,
        'timeStamp': this.jsApiParameters.timeStamp
      },
      (res) => {
        if (res.err_msg === 'get_brand_wcpay_request:ok') {
            this.resolve({paystate: 1, msg: '支付成功'});
        } else {
            this.resolve({ paystate: 0, msg: '支付取消'});
        }
        // } else if(res.err_msg == "get_brand_wcpay_request:cacel"){
        //   this.resolve({ paystate: 0, msg: '支付取消'});
        // }else {
        //   this.resolve({ paystate: 0, msg: '支付失败,错误信息:'+res.err_msg });
        // }
      }
    );
  }
  public isWeiXin() {
    // tslint:disable-next-line:prefer-const
    let ua = window.navigator.userAgent.toLowerCase();
    return ua.indexOf('micromessenger') >= 0;
  }
  /**
 *
 * 构造获取code的url连接
 * @param string $redirectUrl 微信服务器回跳的url，需要url编码
 *
 * @return 返回构造好的url
 */
  CreateOauthUrlForCode(redirectUrl, state?) {
    // console.log('CreateOauthUrlForCode');
    // console.log(this._weixin_config);
    let urlObj = {};
    urlObj["appid"] = this._weixin_config.appid;
    urlObj["redirect_uri"] = redirectUrl;
    urlObj["response_type"] = "code";
    urlObj["scope"] = "snsapi_userinfo";
    urlObj["state"] = state + "#wechat_redirect";
    let bizString = this.ToUrlParams(urlObj);
    // console.log('urlObj');
    // console.log(urlObj);
    // console.log('bizString');
    // console.log(bizString);
    return "https://open.weixin.qq.com/connect/oauth2/authorize?" + bizString;
  }
  /**
   *
   * 拼接签名字符串
   * @param array $urlObj
   *
   * @return 返回已经拼接好的字符串
   */
  ToUrlParams(urlObj) {
    let buff = "";
    for (let k in urlObj) {
      if (k != "sign") {
        buff += k + "=" + urlObj[k] + "&";
      }
    }
    //buff = trim($buff, "&");
    return buff;
  }

  //获取地理位置
  public getlocation() {
    return new Promise((resolve, reject) => {
      wx.getLocation({
        type: 'wgs84', // 默认为wgs84的gps坐标，如果要返回直接给openLocation用的火星坐标，可传入'gcj02'
        success: function (res) {
          // var latitude = res.latitude; // 纬度，浮点数，范围为90 ~ -90
          // var longitude = res.longitude; // 经度，浮点数，范围为180 ~ -180。
          // var speed = res.speed; // 速度，以米/每秒计
          // var accuracy = res.accuracy; // 位置精度
          resolve(res);
        }, error: function (res) {
          reject(res);
        }
      });
    });
  }

  //进入页面初始化配置
  public async init_wx_conf(url){
    // console.log("初始化config");
    let signPackage: any = "";
    // console.log("new_askurl:" + url);
    // console.log("old_askurl:" + this.askurl);
    if (url != this.askurl) {
      this.askurl = url;
      let askurl = { askurl: url };
      this.Api.postFormData('index/getWXconfig', askurl).subscribe(
        async (res: any) => {
          // console.log(res);
          if (res.result != null && res.result != 'null') {
            //存在，则打开上传页面
            if (res.result.signPackage) {
              signPackage = res.result.signPackage;
              this._weixin_config.appid = signPackage.appId;
              await this.configwx(signPackage);
            }
          } else {
            return;
          }
        }, err => {
          console.log(err);
        });
    }
  }
  //进入页面初始化appid
  public async init_wx_appid(url){
    // console.log("初始化appid");
    const askurl_ = { askurl: url };
    await this.Api.postFormData('index/getWXconfig', askurl_).subscribe(
      (res: any) => {
        // console.log(res);
        if (res.result != null && res.result != 'null') {
          //存在，则打开上传页面
          if (res.result.signPackage) {
            this._weixin_config.appid = res.result.signPackage.appId;
          }
        } else {
          return;
        }
      }, err => {
        console.log(err);
      });
  }

  public async scan_conf(url) {
    // console.log("初始化config");
    let signPackage: any = "";
    // console.log("new_askurl:" + url);
    // console.log("old_askurl:" + this.askurl);
    //判断该url是否已经授权，如已授权，则可以直接打开，否则获取授权配置
    if (url != this.askurl) {
      this.askurl = url;
      let askurl = { askurl: url };
      this.Api.postFormData('index/getWXconfig', askurl).subscribe(
        (res: any) => {
          // console.log(res);
          if (res.result != null && res.result != 'null') {
            //存在，则打开上传页面
            if (res.result.signPackage) {
              signPackage = res.result.signPackage;
              wx.config({
                debug: false,
                appId: signPackage.appId,
                timestamp: signPackage.timestamp,
                nonceStr: signPackage.nonceStr,
                signature: signPackage.signature,
                jsApiList: signPackage.jsApiList
                // jsApiList: ["scanQRCode","updateAppMessageShareData","onMenuShareAppMessage","getLocation"]
              });
              wx.error((res) => {
                console.log(JSON.stringify(res));

              });
              wx.ready(() => {   //需在用户可能点击分享按钮前就先调用
                return new Promise((resolve, reject) => {
                  wx.scanQRCode({
                    needResult: 1, // 默认为0，扫描结果由微信处理，1则直接返回扫描结果，
                    scanType: ['qrCode', 'barCode'], // 可以指定扫二维码还是一维码，默认二者都有
                    success: function (res) {
                      // tslint:disable-next-line:prefer-const
                      let result = res.resultStr; // 当needResult 为 1 时，扫码返回的结果
                      // console.log("result:");
                      // console.log(result);
                      //callback(result);
                      resolve(result)
                    }, error: function (res) {
                      reject(res);
                    }
                  });
                });
              });
            }
          } else {
            return;
          }
        }, err => {
          console.log(err);
        });
    } else {
      return new Promise((resolve, reject) => {
        wx.scanQRCode({
          needResult: 1, // 默认为0，扫描结果由微信处理，1则直接返回扫描结果，
          scanType: ['qrCode', 'barCode'], // 可以指定扫二维码还是一维码，默认二者都有
          success: function (res) {
            // tslint:disable-next-line:prefer-const
            let result = res.resultStr; // 当needResult 为 1 时，扫码返回的结果
            // console.log("result:");
            // console.log(result);
            //callback(result);
            resolve(result)
          }, error: function (res) {
            reject(res);
          }
        });
      });
    }

  }

}
