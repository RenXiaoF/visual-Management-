import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { Router } from '@angular/router';
import {Utils, Api} from '../../../services';
import {ResLocalizeService} from '../../../services/res-localize.service';

@Component({
  selector: 'app-screen',
  templateUrl: './screen.component.html',
  styleUrls: ['./screen.component.css']
})
export class ScreenComponent implements OnInit {

  public url = 'assets/screen.png'; // 默认屏保图
  public video = '';                // 屏保视频
  public backgroundColor = '';      // 背景颜色

  public storeId: any; // 商店id
    // 轮播图 列表
    public isSwiper = false;
    public swiperLength;
    public swiperList1 = [
      { image: '' }
    ];
    public swiperList2 = [
      { image: '' },
      { image: '' },
    ];
    public swiperList3 = [
      { image: '' },
      { image: '' },
      { image: '' },
    ];
    public swiperList4 = [
      { image: '' },
      { image: '' },
      { image: '' },
      { image: '' },
    ];
    public swiperList5 = [
      { image: '' },
      { image: '' },
      { image: '' },
      { image: '' },
      { image: '' },
      { image: '' },
    ];
    public swiperList6 = [
      { image: '' },
      { image: '' },
      { image: '' },
      { image: '' },
      { image: '' },
      { image: '' },
    ];
    public swiperList7 = [
      { image: '' },
      { image: '' },
      { image: '' },
      { image: '' },
      { image: '' },
      { image: '' },
      { image: '' },
    ];
    public swiperList8 = [
      { image: '' },
      { image: '' },
      { image: '' },
      { image: '' },
      { image: '' },
      { image: '' },
      { image: '' },
      { image: '' },
    ];
    public swiperList9 = [
      { image: '' },
      { image: '' },
      { image: '' },
      { image: '' },
      { image: '' },
      { image: '' },
      { image: '' },
      { image: '' },
      { image: '' },
    ];
    public swiperList10 = [
      { image: '' },
      { image: '' },
      { image: '' },
      { image: '' },
      { image: '' },
      { image: '' },
      { image: '' },
      { image: '' },
      { image: '' },
      { image: '' },
    ];

  constructor(
    public router: Router,
    public api: Api,
    // 本地化服务
    public localService: ResLocalizeService,
    public changeDetectorRef: ChangeDetectorRef,
  ) {
      // 商店 id
      this.storeId = Utils.localStorageGetItem('store_id');
      // 默认屏保 图片
      this.url = Utils.localStorageGetItem('screen_picture') ? Utils.localStorageGetItem('screen_picture') : this.url;
      // 默认屏保 视频
      this.video = Utils.localStorageGetItem('screen_video');
      // 主题的颜色 /  背景色
      this.backgroundColor = Utils.localStorageGetItem('backgroundColor');

      // 轮播图
      // this.getSwiperImg();
  }

  ngOnInit(): void {
      // 获取本地视频
      this.getLocalVideo();

  }

  // 获取本地视频
  getLocalVideo() {
      if (this.video && Utils.getDeviceType().isAndroidTablet) {
          this.localService.localizeResFunc(this.video, (result, data) => {
              // alert(result);
              // alert(data);
              if (result) {
                  // 如果本地化成功，则用本地视频资源
                  this.video = data;
              }
              // 手动变化检测
              this.changeDetectorRef.markForCheck();
              this.changeDetectorRef.detectChanges();
          });
      }
  }
  /** 获取 轮播图 */
  // getSwiperImg() {
  //   this.api.get('index/get_ad_carousel_list?store_id=' + this.storeId).subscribe(
  //     (res: any) => {
  //       if (res.status == 200) {
  //         this.isSwiper = true;
  //         this.swiperLength = res.data.length;
  //         if (res.data.length == 1) {
  //           this.swiperList1 = res.data;
  //         }
  //         if (res.data.length == 2) {
  //           this.swiperList2 = res.data;
  //         }
  //         if (res.data.length == 3) {
  //           this.swiperList3 = res.data;
  //         }
  //         if (res.data.length == 4) {
  //           this.swiperList4 = res.data;
  //         }
  //         if (res.data.length == 5) {
  //           this.swiperList5 = res.data;
  //         }
  //         if (res.data.length == 6) {
  //           this.swiperList6 = res.data;
  //         }
  //         if (res.data.length == 7) {
  //           this.swiperList7 = res.data;
  //         }
  //         if (res.data.length == 8) {
  //           this.swiperList8 = res.data;
  //         }
  //         if (res.data.length == 9) {
  //           this.swiperList9 = res.data;
  //         }
  //         if (res.data.length >= 10) {
  //           this.swiperList10 = res.data.slice(0, 10);
  //         }
  //       }
  //     },
  //     (err) => {
  //       console.log('获取页面数据的错误信息', JSON.stringify(err));
  //     }
  //   );
  // }

  // 关闭屏保，跳到首页
  closeScreenSaver() {
      this.router.navigate(['/']);
  }
}
