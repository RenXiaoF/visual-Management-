import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Api, Utils } from 'src/services';

@Component({
  selector: 'app-company-list',
  templateUrl: './company-list.component.html',
  styleUrls: ['./company-list.component.css']
})
export class CompanyListComponent implements OnInit {

  public storeId: any; // 企业 id
  public companyList = []; // 公司列表
  // 背景色
  public backgroundColor = '#0075b8';
  // =================search==============
  public searchname = '';

  constructor(
    public router: Router,
    public api: Api
  ) {
    this.storeId = Utils.localStorageGetItem('store_id');
  }

  ngOnInit(): void {
    // 设置背景色
    this.backgroundColor = Utils.localStorageGetItem('backgroundColor');
    this.getCompanyList();
  }

  /** 获取 公司 列表 */
  getCompanyList() {
    let data = {
      keyword: this.searchname,
      store_id: this.storeId
    };
    this.api.get('user/getStoreList', data).subscribe(
      (res: any) => {
        // console.log('获取 公司 列表', res);
        if (res.status == 1) {
          this.companyList = res.result;
        }
      }
    );
  }

  /** 搜索 事件 */
  getItems() {
    this.companyList = [];
    this.getCompanyList();
  }


  /** 返回上一级 */
  goBack() {
    this.router.navigate(['/perfact-self']);
  }

  /** 选中 公司 后  修改 所属公司  */
  changeOfCompany() {
    let data = {
      store_id: this.storeId
    };
    this.api.get('user/alterStore', data).subscribe(
      (res: any) => {
        // console.log('选中 公司 后  修改 所属公司', res);
        if (res.status == 200) {
          // console.log('选中 公司 后  修改 所属公司', 'ok');
        }
      }
    );
  }
  /** 选中后 返回上一级 */
  goBackP(newstorename, newstoreid, index) {
    this.changeOfCompany();
    this.router.navigate(['/perfact-self'], { queryParams: { newStorename: newstorename, newstoreId: newstoreid, inde: index } });
  }

}
