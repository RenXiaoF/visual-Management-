import { Component, OnInit } from '@angular/core';
import { Api, Utils, MsgCode } from 'src/services';
import { Router } from '@angular/router';
import { utils } from 'protractor';

declare var window: any;

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  // 账号信息
  public account = {
    username: '',
    password: '',
    code: '',
    typeAction: 'password',
  };
  //  密码可见
  canSeePass = false;
  passwordType = 'password';
  // 背景色
  public backgroundColor = '#0075b8';
  public qrcode_img = ''; // 微信登录二维码图标 assets/xxl_qrcode.jpg
  public myVar: any; // 定时器
  public cancel_flag = false; // 是否显示扫描二维码
  public cancel_qrcode = 'assets/cancel_qrcode.png';  // 刷新二维码的图片

  constructor(
    public api: Api,
    public router: Router,
    public Msgcode: MsgCode,
  ) { }

  ngOnInit(): void {
    // 设置背景色
    this.backgroundColor = Utils.localStorageGetItem('backgroundColor');
    this.generateQrcode();
  }

  /** 切换  登陆类型 */
  changeLogintype(type) {
    this.account.typeAction = type;
  }

  /** 登录请求 */
  doLogin() {
    this.api.postFormData('user/new_do_login', this.account).subscribe(
      (res: any) => {
        // console.log('登陆成功：', res);
        if (res.status == 200) {
            this.saveUserData(res);
        }else{
          // if(this.passwordType == 'password'){
            alert(res.msg);
          // }else{
          //   alert('验证码错误/已过期');
          // }
        }
      },
      (err) => {
        console.log('账号密码错误', JSON.stringify(err));
      }
    );
  }

  /** 密码可见 */
  seePass() {
    if (this.canSeePass) {
      this.canSeePass = false;
      this.passwordType = 'password';
    } else {
      this.canSeePass = true;
      this.passwordType = 'text';
    }
  }
  /** 返回上一页 */
  goBack() {
    history.go(-1);
  }

  /** 获取设备的 uuid,包名，版本 */
  deviceRegister(store_id){
      document.addEventListener('deviceready', () => {
          let uuid = window.device.uuid;
          let package_name = window.navigator.appInfo.identifier;
          let version_code = window.navigator.appInfo.version;

          if (Utils.getDeviceType().isAndroidTablet) {
              let data = {
                  uuid: uuid,
                  store_id: store_id,
                  package_name: package_name,
                  version_code: version_code,
              };
              this.api.get('user/deviceRegister', data).subscribe((res: any) => { console.log(res); }, (err: any) => { console.log(err); });
          }
      });
  }

    // 清空登录用户信息
    clearLoginInfo() {
        let backgroundColor = Utils.localStorageGetItem('backgroundColor');
        Utils.localStorageClear();
        Utils.localStorageSetItem('backgroundColor', backgroundColor ? backgroundColor : '#0075b8');
    }

    // 请求生成二维码
    generateQrcode() {
        document.addEventListener('deviceready', () => {
            let uuid = window.device.uuid;
            // let package_name = window.navigator.appInfo.identifier;
            // let version_code = window.navigator.appInfo.version;
            // alert('1111uuid:' + uuid);
            if (Utils.getDeviceType().isAndroidTablet) {
                let data = {
                    store_id:  Utils.localStorageGetItem('store_id'),
                    uuid: uuid,
                };
                // alert('2222uuid:' + uuid);
                this.api.postFormData('user/generateQrcode', data).subscribe(
                    (res: any) => {
                        // console.log('登陆成功：', res);
                        if (res.status == 200) {
                            // alert('3333img' + res.data);
                            this.qrcode_img = res.data;
                            clearInterval(this.myVar);
                            this.callAgin(uuid);
                            this.cancel_flag = false;
                        } else {
                            // alert(res.msg);
                        }
                    },
                    (err) => {
                        console.log('账号密码错误', JSON.stringify(err));
                    });
            }
        });
    }

    // 重复调用接口，判断是否有用户扫码登录
    callAgin(uuid){
        this.myVar = setInterval(() => {
            this.api.postFormData('user/callAgain', {uuid: uuid}).subscribe(
                (res: any) => {
                    // console.log('登陆成功：', res);
                    if (res.status == 200) { // 登录成功
                        clearInterval(this.myVar);
                        this.saveUserData(res);
                    } else if (res.status == 59600) { // 二维码已经过期
                        clearInterval(this.myVar);
                        this.cancel_flag = true;
                    }else { // 参数错误
                        // alert(res.msg);
                    }
                },
                (err) => {
                    console.log('账号密码错误', JSON.stringify(err));
                });
        }, 5000);
    }
    // 刷新二维码
    canceImage() {
        console.log(123456);
        this.generateQrcode();
    }

    // 登录接口，保存用户的数据
    saveUserData(res) {
        this.qrcode_img = '';
        clearInterval(this.myVar);
        // 获取设备的uuid
        Utils.testGetDeviceUuid();
        // 获取安装应用的包名
        Utils.testGetAppIdentifier();
        // 登陆成功后  保存的用户信息
        Utils.localStorageSetItem('store_id', res.data.store_id); // 商家 id
        Utils.localStorageSetItem('user_id', res.data.user_id); // 用户 id
        Utils.localStorageSetItem('token', res.data.token); // 用户登录的token
        Utils.localStorageSetItem('store_logo', res.data.store_logo); // 商家 logo
        Utils.localStorageSetItem('taxpayerid', res.data.taxpayerid); // 纳税人识别号
        Utils.localStorageSetItem('bucket_url', res.data.bucket_url); // 七牛上面 bucket_url
        Utils.localStorageSetItem('screen_picture', res.data.screenPicture); // 屏保图片
        Utils.localStorageSetItem('screen_video', res.data.screenVideo);     // 屏保视频
        Utils.localStorageSetItem('time', res.data.screenTime ? res.data.screenTime : 120000);              // 屏保时间
        // 登陆成功后 修改主题颜色
        let backgroundColor = res.data.backgroundColor ? res.data.backgroundColor : '#0075b8'; // 设置全局背景色
        Utils.localStorageSetItem('backgroundColor', backgroundColor);

        // 登录获取注册信息
        this.deviceRegister(res.data.store_id);

        this.router.navigate(['/']);
    }

}
