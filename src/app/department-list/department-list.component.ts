import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Api, Utils } from 'src/services';

@Component({
  selector: 'app-department-list',
  templateUrl: './department-list.component.html',
  styleUrls: ['./department-list.component.css']
})
export class DepartmentListComponent implements OnInit {

  public storeId: any; // 企业 id
  public userId: any; // 用户id
  public departmentList = []; // 部门列表
  public searchname = ''; // 搜索的 关键字

  public backgroundColor = '#0075b8'; // 背景色

  constructor(
    public router: Router,
    public api: Api
  ) {
    this.storeId = Utils.localStorageGetItem('store_id');
    this.userId = Utils.localStorageGetItem('user_id');
  }

  ngOnInit(): void {
    // 获取 部门列表
    this.getDepartmentList();
    // 设置背景色
    this.backgroundColor = Utils.localStorageGetItem('backgroundColor');
  }

  /** 获取 部门列表 */
  getDepartmentList() {
    let data = {
      keyword: this.searchname,
      store_id: this.storeId
    };
    this.api.get('user/getGroupList', data).subscribe(
      (res: any) => {
        // console.log('获取 部门列表', res);
        if (res.status == 200) {
          this.departmentList = res.data;
        }
      }
    );
  }
  /** 搜索 事件 */
  searchItem() {
    this.departmentList = [];
    this.getDepartmentList();
  }
  /** 返回上一级 */
  goBack() {
    this.router.navigate(['/perfact-self']);
  }
  /** 选中 部门 后  修改 所属部门  */
  changeDepartment(groupId) {
    let data = {
      store_id: this.storeId,
      group_id: groupId,
      user_id: this.userId
    };
    this.api.get('user/changegroup', data).subscribe(
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
  goBackP(newdepartmentname, newdepartmentid, index) {
    this.changeDepartment(newdepartmentid);
    this.router.navigate(['/perfact-self'], {
      queryParams: {
        newDepartmentName: newdepartmentname, newDepartmentId: newdepartmentid, inde: index
      }
    });
  }

}
