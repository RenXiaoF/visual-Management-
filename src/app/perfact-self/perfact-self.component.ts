import { Component, OnInit, TemplateRef, Compiler } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { Api, Utils } from 'src/services';
// 弹框
import { BsModalService } from 'ngx-bootstrap/modal';
import { BsModalRef } from 'ngx-bootstrap/modal/bs-modal-ref.service';


@Component({
  selector: 'app-perfact-self',
  templateUrl: './perfact-self.component.html',
  styleUrls: ['./perfact-self.component.css']
})
export class PerfactSelfComponent implements OnInit {

  public user = {
    username: '',
    password: ''
  };

  public userId: any; // 用户id
  public storeId: any; // 企业
  // 用户信息
  public userInfo = {
    realname: '',
    mobile: '',
    nickname: '',
    store_name: '',
  };

  // 弹框
  public modalRef: BsModalRef;


  public comStoreId; // 切换绑定公司之后 传回来的store_id
  public comName; // 切换绑定公司之后 传回来的 公司名称

  public newDepartmentName; // 绑定部门后 传回来 的 部门名称
  public newDepartmentId; //  绑定部门后 传回来 的 部门id

  public newEmployeeContent; // 绑定工号信息后  传回来的 部门id/部门名称
  public jobnum; // 绑定工号信息后  传回来的 员工id
  public erpusername; // 绑定工号信息后  传回来的 员工名字

  public backgroundColor = '#0075b8'; // 背景色


  constructor(
    public router: Router,
    public api: Api,
    public activatedRoute: ActivatedRoute,
    // 弹框
    private modalService: BsModalService,
    private _compiler: Compiler

  ) {
    this.activatedRoute.queryParams.subscribe((params: Params) => {
      // console.log('个人中心：', params, params.newstoreId, params.newStorename);
      if (params.newstoreId && params.newstoreId !== undefined) {
        this.comStoreId = params.newstoreId;
        Utils.localStorageSetItem('store_id', Number(this.comStoreId));
      }
      // 部门列表 页  返回的 部门名称
      if (params.newDepartmentName && params.newDepartmentName !== undefined) {
        this.newDepartmentName = params.newDepartmentName;
        Utils.localStorageSetItem('newDepartmentName', this.newDepartmentName);
      }
      // // 部门列表 页  返回的 部门id
      if (params.newDepartmentId && params.newDepartmentId !== undefined) {
        this.newDepartmentId = params.newDepartmentId;
        Utils.localStorageSetItem('newDepartmentId', this.newDepartmentId);
      }
      // 工号信息页  传回来的 部门id/部门名称
      if (params.newEmployeeContent && params.newEmployeeContent !== undefined) {
        this.newEmployeeContent = params.newEmployeeContent;
        Utils.localStorageSetItem('newEmployeeContent', this.newEmployeeContent);
      }
      //  工号信息页  传回来的 员工id
      if (params.jobnum && params.jobnum !== undefined) {
        this.jobnum = params.jobnum;
        Utils.localStorageSetItem('jobnum', this.jobnum);
      }
      // 工号信息页  传回来的 员工名字
      if (params.erpusername && params.erpusername !== undefined) {
        this.erpusername = params.erpusername;
        Utils.localStorageSetItem('erpusername', this.erpusername);
      }
      // 正式使用时 删除这行代码
      // if (params.newStorename && params.newStorename !== undefined && params.newStorename !== null) {
      //   this.comName = params.newStorename;
      //   Utils.localStorageSetItem('store_name', String(this.comName));
      // }
    });
    this.userId = Utils.localStorageGetItem('user_id');
    this.storeId = Utils.localStorageGetItem('store_id');

    this.getUserInfo();

  }

  ngOnInit(): void {
    // this.getUserInfo();

    setTimeout(() => {
      // 正式使用时 删除这行代码
      // this.userInfo.store_name = Utils.localStorageGetItem('store_name_kd');
      // 部门列表页  返回的部门名称
      this.newDepartmentName = Utils.localStorageGetItem('newDepartmentName');
      // 工号信息页  返回的 部门id/部门名称
      this.newEmployeeContent = Utils.localStorageGetItem('newEmployeeContent');
    }, 500);

    // 设置背景色
    this.backgroundColor = Utils.localStorageGetItem('backgroundColor');
  }

  /** 获取用户信息 */
  getUserInfo() {
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


  /** 返回上一级 */
  goBack(indexs) {
    this.router.navigate(['/homeMain'], { queryParams: { index: indexs } });
  }
  /** 去到 公司 列表 */
  gotoCompanyList() {
    this.router.navigate(['company-list'], { queryParams: { store_id: this.storeId } });
  }
  /** 去到  工号信息 列表 */
  gotoWorkInfo() {
    this.router.navigate(['assay']);
  }
  /** 去到 部门列表 */
  gotoDepartMentList() {
    this.router.navigate(['department-list'], { queryParams: { store_id: this.storeId } });
  }
  /**  退出 */
  logout() {
    let data = {
      store_id: this.storeId,
      username: this.user.username,
      password: this.user.password,
    };
    this.api.get('user/logout', data).subscribe(
      (res: any) => {
        // 1. 输入 账号 密码 退出
        // if(res.status == 200){
        // Utils.localStorageClear();
        // this.router.navigate(['login']);
        // }else{
        //   alert(res.msg);
        // }
        if (res.status == 200) {
            let backgroundColor = Utils.localStorageGetItem('backgroundColor');
            Utils.localStorageClear();
            Utils.localStorageSetItem('backgroundColor', backgroundColor ? backgroundColor : '#0075b8');
            this._compiler.clearCache(); // 清空缓存
            // location.reload(); // 强制刷新页面
            this.router.navigate(['login']);
        } else {
            alert(res.msg);
        }
      }
    );
  }

  /** 弹框  1. 退出 */
  showSecond(template: TemplateRef<any>) { // 传入的是一个组件
    // console.log('当前的模板是', template);
    this.modalRef = this.modalService.show(template); // 在这里通过BsModalService里面的show方法把它显示出来
  }



}
