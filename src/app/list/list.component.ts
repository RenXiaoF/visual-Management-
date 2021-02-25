import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { Api, Utils } from 'src/services';
import { DomSanitizer } from '@angular/platform-browser';


@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit {

  public storeId: any; // 商店id 357
  public id = 22; // 分类中  第三级分类的id
  public goto; // 从 tabbar 的 第几个 bar 产过来的

  // =================search==============
  public searchname = '';
  public items = [];     // search 搜索 的 数组 用来存储 商品列表

  // 列表信息
  public pageList = [

  ];

  public backgroundColor = '#0075b8'; // 背景色


  // 构造器
  constructor(
    public router: Router,
    private api: Api,
    public activatedRoute: ActivatedRoute,
    public sanitizer: DomSanitizer,
  ) {
    // 接收上一页传过来的参数
    this.activatedRoute.queryParams.subscribe((params: Params) => {
      // console.log('工艺列表：', params);
      this.id = params.cat_id;
      this.goto = params.go_to;
    });
    this.storeId = Utils.localStorageGetItem('store_id');
  }
  // 初始化
  ngOnInit(): void {
    this.getList();
    // 设置背景色
    this.backgroundColor = Utils.localStorageGetItem('backgroundColor');
  }

  /** 获取列表 */
  getList() {
    let data = {
      store_id: this.storeId,
      cat_id: this.id,
      keyword: this.searchname,
    };
    this.api.get('index/searchCraft', data).subscribe(
      (res: any) => {
        if (res.status == 200) {
          this.pageList = res.data;
        }
      }
    );
  }

  /** 1. 搜索 事件 */
  getItems() {
    // this.items = this.pageList;
    this.pageList = [];
    // this.id = 0;
    this.getList();
  }

  /**
   * 跳转详情页
   * @param goodsId 列表中 单个item里包含的  id===>id: 242
   * @param index  索引
   * @param goto number : 从哪个页面进入的； 0：首页；1：列表页list
   * @param title 列表中 单个item里包含的 title
   * @param catId  craft_category_id: 118
   */
  goDetail(goodsId, index, goto, title, catId) {
    if (!this.pageList[index].can_read) {
      alert('没有权限');
      return true;
    }
    goto = this.goto;
    let craft_type = this.pageList[index].type;
    let url = '';
    if (craft_type == 5) { // erp工艺数据
        url = Utils.getApiUrl() + '/index/getCraftInfo?store_id=' + this.storeId + '&id=' + goodsId;
    } else if (craft_type == 3) { // pdf文件预览
        let pdfUrl = this.pageList[index].pdf;
        pdfUrl = Utils.transformFileAndVideo(pdfUrl);
        url = './assets/web/viewer.html?DEFAULT_URL=' + pdfUrl + '*toolbarIsShow';
    }
    this.router.navigate(
      ['/detail'],
       { queryParams:
         { goods_id: goodsId , url2: url, type: craft_type, go_to: goto, titleName: title, cat_id: catId}
      });
  }

  /** 返回首页 */
  goBack(indexs) {
    this.router.navigate(['/homeMain'], { queryParams: { index: indexs } });
  }
}
