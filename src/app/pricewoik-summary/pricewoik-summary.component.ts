import { Component, OnInit, TemplateRef } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { Api, Utils } from 'src/services';
// 弹框
import { BsModalService } from 'ngx-bootstrap/modal';
import { BsModalRef } from 'ngx-bootstrap/modal/bs-modal-ref.service';

@Component({
  selector: 'app-pricewoik-summary',
  templateUrl: './pricewoik-summary.component.html',
  styleUrls: ['./pricewoik-summary.component.css']
})
export class PricewoikSummaryComponent implements OnInit {

  public storeId: any; // 商店id 357
  public userId: any; // 用户id
  // =================search==============
  public searchname = '';
  public ordernum = '';
  public stylenum = '';

  // 日期选择
  public selectedMomentsFrom = '';
  public selectedMomentsTo = '';
  public startTime; // 开始日期
  public endTime; // 结束日期
  public startTimeJQ; // 开始日期
  public endTimeJQ; // 结束日期

  public conList = [ ];

  // 弹框
  public modalRef: BsModalRef;

  public backgroundColor = '#0075b8'; // 背景色

  constructor(
    public router: Router,
    public api: Api,
    public activatedRoute: ActivatedRoute,
    // 弹框
    private modalService: BsModalService,
  ) {
    this.activatedRoute.queryParams.subscribe((params: Params) => {

    });
    this.storeId = Utils.localStorageGetItem('store_id');
    this.userId = Utils.localStorageGetItem('user_id');
  }

  ngOnInit() {
    var timpdate = new Date();
    var year = timpdate.getFullYear() + '-'; // 年
    var month = (timpdate.getMonth() + 1 < 10 ? '0' + (timpdate.getMonth() + 1) : timpdate.getMonth() + 1) + '-'; // 月
    var date = timpdate.getDate() + ''; // 日
    this.endTime = year + month + date;
    this.startTime = this.getBeforeDate(30);

    // 获取  员工计件工资列表
    this.getEmployeeSalaryList();

    // 设置背景色
    this.backgroundColor = Utils.localStorageGetItem('backgroundColor');
  }

  /** 获取  员工计件工资列表 */
  getEmployeeSalaryList(){
    let data = {
      store_id: this.storeId,
      user_id: this.userId,
      EmployeeID: this.searchname, // 搜索的关键字  员工工号/员工id
      start_time: this.startTime,
      end_time: this.endTime,
    };
    this.api.get('user/getUserSalary', data).subscribe(
      (res: any) => {
        // console.log('获取员工的 工号信息 列表', res);
        if (res.status == 200) {
          this.conList = res.data;
          // for (let i = 0; i < this.conList.length; i++){
          //   if (i % 2 == 1 ){

          //   }
          // }
        }
        if (res.status !== 200) {
          alert(res.msg);
        }
      }
    );
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
      "-" +
      (mon < 10 ? "0" + mon : mon) +
      "-" +
      (day < 10 ? "0" + day : day);
    return s;
  }

  /** 返回上一级 */
  goBack(indexs) {
    this.router.navigate(['/homeMain'], { queryParams: { index: indexs } });
  }
  /** 搜索按钮 弹出  弹框  */
  showModal(template) {
    this.showSecond(template);
  }
  /** 弹框  弹出搜索条件 和 日期 选择 */
  showSecond(template: TemplateRef<any>) { // 传入的是一个组件
    // console.log('当前的模板是', template);
    this.modalRef = this.modalService.show(template); // 在这里通过BsModalService里面的show方法把它显示出来
  }


  /**  搜索 事件 */
  entrueSearch() {
    if (this.selectedMomentsFrom && this.selectedMomentsTo) {
      var stf = new Date(this.selectedMomentsFrom);
      this.startTimeJQ = stf.getFullYear() + '-' + (stf.getMonth() + 1) + '-' + stf.getDate();
      var etf = new Date(this.selectedMomentsTo);
      this.endTimeJQ = etf.getFullYear() + '-' + (etf.getMonth() + 1) + '-' + etf.getDate();
    }else{
      this.startTimeJQ = this.startTime;
      this.endTimeJQ =  this.endTime;
    }
    let data = {
      store_id: this.storeId,
      user_id: this.userId,
      EmployeeID: this.searchname, // 搜索的关键字  员工工号/员工id
      start_time: this.startTimeJQ,
      end_time: this.endTimeJQ,
    };
    this.api.get('user/getUserSalary', data).subscribe(
      (res: any) => {
        console.log('获取员工的 工号信息 列表', res);
        if (res.status == 200) {
          this.conList = res.data;
        }
        if (res.status !== 200) {
          alert(res.msg);
        }
      }
    );

  }

}
