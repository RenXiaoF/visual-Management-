import { Component, OnInit, HostListener } from '@angular/core';
import { EventProxy } from 'eventproxy';
import { Utils } from '../services/Utils';
import { Router } from '@angular/router';

declare var window: any;

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'ad-player';

  // 连续2s内点击2次返回按键，退出app
  public lastTimeBackPress = 0;
  public timePeriodToExit = 2000;
  // 屏保弹框
  public timer: any;   // 定时器

  constructor(
    public router: Router
  ) {  }

  ngOnInit() {
    // 初始化事件代理类
    window['epInstance'] = new EventProxy();
    // 监听普通账号登录
    this.listenNormalLogin();

    // 连续点击退出App
    this.exitTheApp();

    // 监听弹出屏保图
    this.popScreenSaver();

    // 检测屏幕宽高
    // this.testFullScreen();

    // this.testFunction();
  }

  // 监听普通的账号登录
  listenNormalLogin() {
    window['epInstance'].unbind('toLogin').bind('toLogin', async (res) => {
      Utils.localStorageClear();

      // 跳登录页面
      this.router.navigate(['login']);
    });
  }

  // 监听弹出屏保图片
  popScreenSaver() {
      window['epInstance'].unbind('popScreen').bind('popScreen', async (res) => {
          clearTimeout(this.timer);
          let date_time = Utils.localStorageGetItem('time');
          date_time = date_time < 60000 ? 60000 : date_time;
          this.timer = setTimeout(() => {
              this.router.navigate(['screen']);
          }, date_time);
      });
  }

  // 退出App
  exitTheApp() {
        /** 监听 物理返回键 */
        document.addEventListener('deviceready', () => {
            document.addEventListener('backbutton', () => {
                // history.back();
                // if (new Date().getTime() - this.lastTimeBackPress < this.timePeriodToExit) {
                //     navigator['app'].exitApp();
                // } else {
                //     this.lastTimeBackPress = new Date().getTime();
                // }

                if (new Date().getTime() - this.lastTimeBackPress < this.timePeriodToExit) {
                    navigator['app'].exitApp(); // 退出APP
                } else {
                    this.lastTimeBackPress = new Date().getTime();
                }

            }, false);
        }, false);
  }

  // 测试手机app版本
  //   testAppVersion(){
  //     document.addEventListener('deviceready', () => {
  //         // let apk_version;
  //         // cordova.getAppVersion.getVersionNumber((version) => {
  //         //     apk_version = version;
  //         //     alert(version);
  //         // });
  //         alert('appversion object：' + JSON.stringify(window.AppVersion));
  //         alert('AppUpdate object：' + JSON.stringify(window.AppUpdate));
  //         // function allow() { alert('更新App成功3：' + JSON.stringify(arguments)); }
  //         // function disable() { alert('更新App失败4：' + JSON.stringify(arguments)); }
  //       try {
  //           let versionCode = window.AppVersion.version;
  //           alert('本地app版本：' + versionCode);
  //           let updateUrl = 'http://ylyentp.rossai.cn/version.xml';
  //           window.AppUpdate.checkAppUpdate( this.allow, this.disable, updateUrl);
  //
  //       } catch (e) {
  //           alert(e);
  //       }
  //     });
  //   }
  //   allow() { alert('更新App成功3：' + JSON.stringify(arguments)); }
  //   disable() { alert('更新App失败4：' + JSON.stringify(arguments)); }


    // 检测屏幕宽高
    // testFullScreen() {
    //     document.addEventListener('deviceready', () => {
    //         cordova.plugins.AndroidFullScreen.immersiveWidth((value) => {
    //             alert('屏幕的宽度：' + value);
    //         }, (err) => {
    //             alert('获取屏幕的宽度错误：' + err);
    //         });
    //
    //         cordova.plugins.AndroidFullScreen.immersiveHeight((value) => {
    //             alert('屏幕的高度：' + value);
    //         }, (err) => {
    //             alert('获取屏幕的高度错误：' + err);
    //         });
    //     });
    // }

  /** alert 弹出 设备信息 */
  // @HostListener('window:load', ['$event'])
  // onLoad(e?) {
  //   const obj = {
  //     width: window.innerWidth,
  //     height: window.innerHeight,
  //     devicePixelRatio: window.devicePixelRatio,
  //     ua: navigator.userAgent
  //   };
  //   alert(JSON.stringify(obj));
  // }

    // 测试 dom  开始
    // testFunction(){
    //   var div=document.createElement('DIV');
    //   var d=document.createTextNode('不可以截屏');
    //   div.style.cssText = 'background-color: pink; height: 14vh;width: 96%;margin-left: 2%;border-radius: 1rem;color: white;padding-top: 10vh;text-align: center;position: fixed;top: 20vh;z-index: 999;';
    //   div.appendChild(d);
    //   document.body.appendChild(div);
    //  删除节点
    //   setTimeout(() => {
    //     document.body.removeChild(div);
    //   }, 3000);
    // }
    // 测试 dom  结束
}
