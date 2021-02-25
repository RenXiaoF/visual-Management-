import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Api, Utils } from 'src/services';
// 信任 解决跨域
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-kanban',
  templateUrl: './kanban.component.html',
  styleUrls: ['./kanban.component.css']
})
export class KanbanComponent implements OnInit {

  public kanbanList: any;
  public storeId: any; // 商店id

  public backgroundColor = '#0075b8'; // 背景色

  constructor(
    public router: Router,
    public api: Api,
    // 信任 解决跨域
    public sanitizer: DomSanitizer,
  ) {
    this.storeId = Utils.localStorageGetItem('store_id');
  }

  ngOnInit(): void {
    this.getKanbanList();
    // 设置背景色
    this.backgroundColor = Utils.localStorageGetItem('backgroundColor');
  }
  /** 获取企业看板列表 */
  getKanbanList() {
    let taxpayerId = Utils.localStorageGetItem('taxpayerid');
    this.api.getFullUrl('http://ylyentp.rossai.cn/Advertisingmachine/Dashboard/indexList?taxpayerid=' + taxpayerId + '&store_id=' + this.storeId).subscribe(
      (res: any) => {
        // console.log('获取企业看板列表', res);
        if (res.status == 200) {
          this.kanbanList = res.data;
        }
      },
      (err) => {
        // console.log('获取企业看板错误', JSON.stringify(err));
      }
    );
  }

  /** 跳转到  ad */
  gotoKanban(index, title) {
    let url = this.kanbanList[index]['url'];
    url = url ? url : 'http://cloudpf.weunit.cn/assistant/Workshop/smartFactoryData';
    // window.location.href = url;
    this.router.navigate(['/ad'], { queryParams: { url: url, titleName: title } });
  }

}
