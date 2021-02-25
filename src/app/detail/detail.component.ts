import { Component, OnInit, TemplateRef, Compiler, ChangeDetectorRef } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { Api, Utils } from 'src/services';
import { DomSanitizer } from '@angular/platform-browser';
// 弹框
import { BsModalService } from 'ngx-bootstrap/modal';
import { BsModalRef } from 'ngx-bootstrap/modal/bs-modal-ref.service';
// gotter@163.com video 本地化服务
import { ResLocalizeService } from 'src/services/res-localize.service';


@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.css']
})
export class DetailComponent implements OnInit {

  public url = Utils.getApiUrl(); // api接口url

  public goto; // 从 index-->list-->detail  / category-->list-->detail 产过来的
  public titleName; // list页面 传过来 的 title
  public cat_id; // list页面 传过来 的 cat_id
  public storeId: any; // 商店id 357
  public id; // 不知道什么id

  // 工艺详情
  public technologyDetail = {
    name: '',
    style: '',
    mpscode: '',
    stylecode: '',
    cloth_type: '',
    position: '',
    content: '',
    remark: '',
    image: '',
    video: '',
    pdf: '',
    is_can_download: '',
    is_company_culture: '0' // 是否是企业文化（不显示制单的信息）
  };
  public add_time = 0;  // 返回的日期
  public type = 1; // 类型
  public timeCuo = ''; // 将时间戳 转换成  普通日期格式

  public url2: string;
  public jumpLink: any;  // 视频
  public jumpLink2; // erp


  // search
  public searchname = '';
  // 日期选择
  public selectedMomentsFrom = '';
  public selectedMomentsTo = '';
  public startTime;
  public endTime;
  // 弹框
  public modalRef: BsModalRef;
  public orderIdList = []; // 制单列表
  // loading
  isLoading = false;
  // 背景色
  public backgroundColor = '#0075b8';

  // word 或者 excel 测试
  // public str ; //
  // public houzhui = ''; // 后缀

  constructor(
    public router: Router,
    public api: Api,
    public activatedRoute: ActivatedRoute,
    // 信任 解决跨域
    public sanitizer: DomSanitizer,
    // 弹框
    private modalService: BsModalService,
    // 变化检测
    public changeDetectorRef: ChangeDetectorRef,
    // gotter@163.com video 本地化服务
    public resLocalizer: ResLocalizeService,
  ) {
    this.activatedRoute.queryParams.subscribe((params: Params) => {
      // console.log('工艺列表--详情：', params);
      this.cat_id = params.cat_id;
      this.titleName = params.titleName;
      this.id = params.goods_id;
      this.goto = params.go_to;
      this.url2 = params.url2 ? params.url2 : '';
      this.type = params.type; console.log(this.url2);
      // 信任该url erp报表   和  pdf
      this.jumpLink2 = this.sanitizer.bypassSecurityTrustResourceUrl(this.url2);
      // console.log('构造器', this.jumpLink2);
    });
    this.storeId = Utils.localStorageGetItem('store_id');
  }

  ngOnInit(): void {
    // word 或者 excel 测试
    // const teststr = 'http://view.xdocin.com/xdoc?_xdoc=http%3A%2F%2Fview.xdocin.com%2Fdoc%2Fpreview.docx';
    // const teststr = 'https://view.officeapps.live.com/op/view.aspx?src=http%3a%2f%2fvideo.ch9.ms%2fbuild%2f2011%2fslides%2fTOOL-532T_Sutter.pptx';
    // this.houzhui = teststr.substring(teststr.length - 5);
    // console.log('word 或者 excel 测试', this.houzhui);
    // this.str = this.sanitizer.bypassSecurityTrustResourceUrl(teststr);

    // 获取详情
    this.getTechnologyDetail();
    // 设置背景色
    this.backgroundColor = Utils.localStorageGetItem('backgroundColor');
  }
  /** 获取详情 */
  getTechnologyDetail() {
    let data = {
      store_id: this.storeId,
      id: this.id,
      uuid: Utils.localStorageGetItem('uuid') ? Utils.localStorageGetItem('uuid') : '',
      package_name: Utils.localStorageGetItem('package_name') ? Utils.localStorageGetItem('package_name') : '',
    };
    this.api.get('index/getCraftInfo', data).subscribe(
      (res: any) => {
        if (res.status == 200) {
          this.technologyDetail = res.data; // 全部数据
          this.add_time = res.data.add_time * 1000; // 日期
          this.type = res.data.type; // 类型
          // 将时间戳 转换成  普通日期格式
          this.formatDate(new Date(this.add_time));
          // 视频数据
          if (this.type == 2) {
            let video_url = Utils.transformFileAndVideo(this.technologyDetail.video);
            // if (Utils.getDeviceType().isAndroidTablet) {
            if (this.technologyDetail.is_can_download) {
                // 显示
                this.isLoading = true;
                // 监听本地是否有文件
                this.listenFile();
                // gotter@163.com video数据 本地化
                this.resLocalizer.localizeRes(video_url, this);
            } else {
                this.jumpLink = this.sanitizer.bypassSecurityTrustResourceUrl(video_url);
            }
          }
        }
      },
      (err) => {
        // console.log('获取页面数据的错误信息', JSON.stringify(err));
      }
    );
  }

  /** gotter@163.com  回调函数  video数据 本地化 */
  localizeResCallback(result: boolean, data: string) {
    // alert(data);
    if (result) {
      // 如果本地化成功，则用本地视频资源
      this.jumpLink = this.sanitizer.bypassSecurityTrustResourceUrl(data);
    } else {
      // 否则仍然用服务器资源播放。
      this.jumpLink = this.sanitizer.bypassSecurityTrustResourceUrl(this.technologyDetail.video);
    }
    // loading 隐藏
    this.isLoading = false;
    // 手动变化检测
    this.changeDetectorRef.markForCheck();
    this.changeDetectorRef.detectChanges();


  }

  /** 监听本地是否有文件 变化检测 */
  listenFile() {
    window['epInstance'].unbind('getFile').bind('getFile', async (res) => {
      // alert(res);
      this.jumpLink = this.sanitizer.bypassSecurityTrustResourceUrl(res);
      // loading 隐藏
      this.isLoading = false;
      // 手动变化检测
      this.changeDetectorRef.markForCheck();
      this.changeDetectorRef.detectChanges();
    });
  }

  /** 将时间戳 转换成  普通日期格式 */
  formatDate(now) {
    const year = now.getFullYear();  // 取得4位数的年份
    const month = now.getMonth() + 1;  // 取得日期中的月份，其中0表示1月，11表示12月
    const date = now.getDate();      // 返回日期月份中的天数（1到31）
    // const hour = now.getHours();     // 返回日期中的小时数（0到23）
    // const minute = now.getMinutes(); // 返回日期中的分钟数（0到59）
    // const second = now.getSeconds(); // 返回日期中的秒数（0到59）
    // this.timeCuo =  year + '-' + month + '-' + date + ' ' + hour + ':' + minute + ':' + second;
    this.timeCuo = year + '-' + month + '-' + date;
  }
  /**  搜索 事件 ==== 01 */
  getItems01() {
    // 1. this.selectedMomentsFrom && this.selectedMomentsTo && this.searchname 同时存在
    if (this.selectedMomentsFrom && this.selectedMomentsTo && this.searchname) {
      // 标准时间  转换成 年-月-日
      var stf = new Date(this.selectedMomentsFrom);
      this.startTime = stf.getFullYear() + '-' + (stf.getMonth() + 1) + '-' + stf.getDate();
      var etf = new Date(this.selectedMomentsTo);
      this.endTime = etf.getFullYear() + '-' + (etf.getMonth() + 1) + '-' + etf.getDate();
      // 信任该url erp报表
      this.jumpLink2 = this.sanitizer.bypassSecurityTrustResourceUrl(
        this.url +
        'index/getCraftInfo?store_id=' + this.storeId +
        '&id=' + this.id +
        '&order_id=' + this.searchname +
        '&start_time=' + this.startTime +
        '&end_time=' + this.endTime
      );
      // console.log('搜索 事件 ==== 01',this.jumpLink2);
    }

  }
  /** 搜索 事件 ==== 第二种情况 */
  getItems02(template) {
    // 2. 只有 this.searchname 存在
    if (this.searchname) {
      let data = {
        id: this.id,
        store_id: this.storeId,
        order_id: this.searchname,
      };
      if (this.selectedMomentsFrom && this.selectedMomentsTo) {
        data['start_time'] = Utils.dateFormat(new Date(this.selectedMomentsFrom));
        data['end_time'] = Utils.dateFormat(new Date(this.selectedMomentsTo));
      }
      this.api.get('index/getCraftInfoOrder', data).subscribe(
        (res: any) => {
          // console.log('获取oeder_id_list', res);
          if (res.status == 200) {
            this.orderIdList = res.data;
          }
        }
      );
      this.showSecond(template);
    }
  }
  /** 获取当前时间的 前 N 天 */
  getBeforeDate(n) {
    var n = n;
    var d = new Date();
    var year = d.getFullYear();
    var mon = d.getMonth() + 1;
    var day = d.getDate();
    if (day <= n) {
      if (mon > 1) {
        mon = mon - 1;
      } else {
        year = year - 1;
        mon = 12;
      }
    }
    d.setDate(d.getDate() - n);
    year = d.getFullYear();
    mon = d.getMonth() + 1;
    day = d.getDate();
    let s =
      year +
      '-' +
      (mon < 10 ? '0' + mon : mon) +
      '-' +
      (day < 10 ? '0' + day : day);
    return s;
  }
  /** 返回上一级 */
  goBack(goto, catId) {

    this.router.navigate(['/list'], { queryParams: { go_to: goto, cat_id: catId } });
    // history.go(-1);
  }
  /** 弹框  弹出一个order_id 的列表 */
  showSecond(template: TemplateRef<any>) { // 传入的是一个组件
    // 在这里通过BsModalService里面的show方法把它显示出来
    this.modalRef = this.modalService.show(template);
  }

  /** 弹框  确定 */
  enSure(index) {
    var timpdate = new Date();
    var year = timpdate.getFullYear() + '-'; // 年
    var month = (timpdate.getMonth() + 1 < 10 ? '0' + (timpdate.getMonth() + 1) : timpdate.getMonth() + 1) + '-'; // 月
    var date = timpdate.getDate() + ''; // 日
    this.startTime = year + month + date;
    this.endTime = this.getBeforeDate(15);
    this.searchname = this.orderIdList[index].mpsid;
    // 信任该url erp报表
    this.jumpLink2 = this.sanitizer.bypassSecurityTrustResourceUrl(
      this.url +
      'index/getCraftInfo?store_id=' + this.storeId +
      '&id=' + this.id +
      '&order_id=' + this.searchname +
      '&start_time=' + this.startTime +
      '&end_time=' + this.endTime
    );
  }




}
