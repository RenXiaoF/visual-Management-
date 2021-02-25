import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { Api } from 'src/services/api';
import { Utils } from 'src/services';

@Component({
  selector: 'app-assay',
  templateUrl: './assay.component.html',
  styleUrls: ['./assay.component.css']
})
export class AssayComponent implements OnInit {

  public storeId: any; // 企业 id
  public userId: any; // 用户id
  public groupId: any; // 部门 id
  public employeeList = []; // 工号列表

  public searchname = ''; // 搜索的 关键字

  public backgroundColor = '#0075b8'; // 背景色

  constructor(
    public router: Router,
    public api: Api,
    public activatedRoute: ActivatedRoute,
  ) {
    this.activatedRoute.queryParams.subscribe((params: Params) => {

    });
    this.storeId = Utils.localStorageGetItem('store_id');
    this.userId = Utils.localStorageGetItem('user_id');
    this.groupId = Utils.localStorageGetItem('newDepartmentId');
  }

  ngOnInit() {
    // 获取员工的 工号信息 列表
    this.getWorkInfo();

    // 设置背景色
    this.backgroundColor = Utils.localStorageGetItem('backgroundColor');
  }

  /** 获取员工的 工号信息 列表 */
  getWorkInfo() {
    let data = {
      store_id: this.storeId,
      user_id: this.userId,
      group_id: this.groupId,
      employee_id: this.searchname,
    };
    this.api.get('user/getErpEmployee', data).subscribe(
      (res: any) => {
        // console.log('获取员工的 工号信息 列表', res);
        if (res.status == 200) {
          this.employeeList = res.data;
        }
      }
    );
  }
  /** 搜索  */
  getItems() {
    this.employeeList = [];
    this.getWorkInfo();
  }
  /** 选中 工号信息 后  修改 工号信息  */
  changeEmployee(jobNum, erpUserName) {
    let data = {
      job_num: jobNum,
      erp_user_name: erpUserName,
      store_id: this.storeId,
      user_id: this.userId
    };
    this.api.get('user/getErpEmployee', data).subscribe(
      (res: any) => {
        if (res.status == 200) {
          alert(res.msg);
        }
        if (res.status !== 200) {
          alert(res.msg);
        }
      }
    );
  }
  /** 选中后 返回上一级 */
  goBackP(newemployeeContent, jobNum, erpUserName, index) {
    this.changeEmployee(jobNum, erpUserName);
    this.router.navigate(['/perfact-self'], {
      queryParams: {
        newEmployeeContent: newemployeeContent,
        jobnum: jobNum,
        erpusername: erpUserName,
        inde: index
      }
    });
  }

  /** 返回上一级 */
  goBack() {
    this.router.navigate(['/perfact-self']);
    // history.go(-1);
  }

}
