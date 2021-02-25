import { Component, OnInit, TemplateRef } from '@angular/core';
import { Router } from '@angular/router';
import { Api } from 'src/services/api';
import { Utils } from 'src/services/Utils';
// 弹框
// import { BsModalService } from 'ngx-bootstrap/modal';
// import { BsModalRef } from 'ngx-bootstrap/modal/bs-modal-ref.service';

@Component({
  selector: 'app-my',
  templateUrl: './my.component.html',
  styleUrls: ['./my.component.css']
})
export class MyComponent implements OnInit {

  public userId: any; // 用户id
  public storeId: any; // 企业
   // 用户信息
  public userInfo = {
    store_name: '',
    mobile: '',
    nickname: '',
    head_pic: ''
  };
  // comName; // 切换绑定公司之后 传回来的 公司名称

  public backgroundColor = '#0075b8'; // 背景色
  // 弹框
  // public modalRef: BsModalRef;

  constructor(
     public router: Router,
     public api: Api,
     // 弹框
     // private modalService: BsModalService,
  ) {
    this.userId = Utils.localStorageGetItem('user_id');
    this.storeId = Utils.localStorageGetItem('store_id');
    // this.comName = Utils.localStorageGetItem('store_name');
   }

  ngOnInit(): void {
    this.getPerson();
    this.registerDevice();
    // 设置背景色
    this.backgroundColor = Utils.localStorageGetItem('backgroundColor');
  }

  getPerson() {
    let data = {
      user_id: this.userId,
      store_id: this.storeId
    };
    this.api.get('user/information', data).subscribe(
      (res: any) => {
        // console.log('获取用户信息', res);
        if (res.status == 200) {
          this.userInfo = res.data;
        }
      }
    );
  }

  /** 跳转到  个人中心 */
  gotoPerfactSelf(){
    // Utils.localStorageSetItem('store_name_kd', this.comName); // 正式使用时 删除这行代码
    this.router.navigate(['/perfact-self']);
  }

  /** 跳转到 修改密码 */
  gotoChangePW(){
    this.router.navigate(['change-pw']);
  }

  /** 跳转到  计件报表汇总 */
  gotoPriceWorkSummary(){
    // this.router.navigate(['pricew-sum'], { queryParams: { id: this.id } });
    this.router.navigate(['pricew-sum']);
  }

  /** 自动下载更新App */
  updateApp() {
      Utils.testAppVersion();
  }

  /** 获取屏幕的宽高 */
  getScreen() {
    Utils.testFullScreen();
  }

  /** 不能截屏和录屏 */
  getPreventScreenShot() {
      Utils.testPreventScreenShot();
  }

  /** 弹出注册设备表单 */
  // registerDevice(template: TemplateRef<any>) {
  //     // 在这里通过BsModalService里面的show方法把它显示出来
  //     this.modalRef = this.modalService.show(template);
  // }

  /** 出售的大屏设备，注册信息提交 */
  registerDevice() {
    if (Utils.getDeviceType().isAndroidTablet) {
        let data = {
            uuid: Utils.localStorageGetItem('uuid') ? Utils.localStorageGetItem('uuid') : '',
            store_id: Utils.localStorageGetItem('store_id') ? Utils.localStorageGetItem('store_id') : '',
            package_name: Utils.localStorageGetItem('package_name') ? Utils.localStorageGetItem('package_name') : '',
            version_code: Utils.localStorageGetItem('version_code') ? Utils.localStorageGetItem('version_code') : '',
        };
        this.api.get('user/deviceRegister', data).subscribe((res: any) => { console.log(res); }, (err: any) => { console.log(err); });
    }
  }

    /** 注册设备信息，提交uuid */
    // enSure(index) {
    //     var timpdate = new Date();
    //     var year = timpdate.getFullYear() + '-'; // 年
    //     var month = (timpdate.getMonth() + 1 < 10 ? '0' + (timpdate.getMonth() + 1) : timpdate.getMonth() + 1) + '-'; // 月
    //     var date = timpdate.getDate() + ''; // 日
    //     this.startTime = year + month + date;
    //     this.endTime = this.getBeforeDate(15);
    //     this.searchname = this.orderIdList[index].mpsid;
    //     // 信任该url erp报表
    //     this.jumpLink2 = this.sanitizer.bypassSecurityTrustResourceUrl(
    //         this.url +
    //         'index/getCraftInfo?store_id=' + this.storeId +
    //         '&id=' + this.id +
    //         '&order_id=' + this.searchname +
    //         '&start_time=' + this.startTime +
    //         '&end_time=' + this.endTime
    //     );
    // }

}
