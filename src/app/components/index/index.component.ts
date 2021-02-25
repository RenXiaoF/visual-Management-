import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Api, Utils } from 'src/services';

declare var window: any;

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.css']
})
export class IndexComponent implements OnInit {

  // 功能分类
  public categoryList = [];     // 商品分类的列表
  public categoryListItem = []; // 商品分类的内容
  public isCheckedCategory = 0; // 选中的一级分类
  public categoryId = 0;        // 商品分类的category_id

  public choosePartType = ''; // 选中的 功能
  public index = 0; // 功能的index

  // 轮播图 列表
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

  public storeId: any; // 商店id
  public articleList = ''; // 轮播文章
  public store_logo: any; // 自定义的logo

  public items = []; // 魔法首页全部数据
  public page = 1; // 页数

  public backgroundColor = '#0075b8'; // 背景色

  public app_version: any; // 线上最新的版本
  public showModal = false; // 是否显示更新的弹框

  constructor(
    public router: Router,
    public api: Api,
  ) {
    this.storeId = Utils.localStorageGetItem('store_id');
    this.store_logo = Utils.localStorageGetItem('store_logo');

    // swiper 轮播图
    this.getSwiperImg();

    // 获取选中的一级分类
    let category_first_index = Utils.localStorageGetItem('cate_index');
    this.isCheckedCategory = category_first_index ? category_first_index : 0;
    this.index = this.isCheckedCategory;
  }

  ngOnInit() {
    // 分类
    this.isCheckedCategory = 0;
    this.getGoodList();
    // 魔法首页
    this.getMagicHmepage();
    // 滚动的文章列表
    this.getArticleList();
    // 获取最新的App版本
    this.getVersion();

    // 设置背景色
    this.backgroundColor = Utils.localStorageGetItem('backgroundColor');

  }

  /** 分类 */
  getGoodList() {
    this.api.get('index/getCraftCategory?store_id=' + this.storeId).subscribe(
      (res: any) => {
        if (res.status == 200) {
          this.categoryList = res.data;
          if (res.data.length > 0) {
            this.categoryListItem = res.data[0].all_child_category;
            if (this.index > 0) {
              this.selectCategory(this.index);
            }
          }
        }
      },
      (err) => {
        console.log(JSON.stringify(err));
      }
    );
  }
  /** 切换选项卡 */
  selectCategory(index) {
    this.isCheckedCategory = index;
    this.index = index;
    this.categoryListItem = this.categoryList[index].all_child_category;
  }
  /** 获取 轮播图 */
  getSwiperImg() {
    // let tempSwiperList = [];
    this.api.get('index/get_ad_carousel_list?store_id=' + this.storeId).subscribe(
      (res: any) => {
        // console.log('获取轮播图', res);
        if (res.status == 200) {
          this.swiperLength = res.data.length;
          if (res.data.length == 1) {
            this.swiperList1 = res.data;
          }
          if (res.data.length == 2) {
            this.swiperList2 = res.data;
          }
          if (res.data.length == 3) {
            this.swiperList3 = res.data;
          }
          if (res.data.length == 4) {
            this.swiperList4 = res.data;
          }
          if (res.data.length == 5) {
            this.swiperList5 = res.data;
          }
          if (res.data.length == 6) {
            this.swiperList6 = res.data;
          }
          if (res.data.length == 7) {
            this.swiperList7 = res.data;
          }
          if (res.data.length == 8) {
            this.swiperList8 = res.data;
          }
          if (res.data.length == 9) {
            this.swiperList9 = res.data;
          }
          // if (res.data.length == 10) {
          //   this.swiperList10 = res.data;
          // }
          if (res.data.length >= 10) {
            // tempSwiperList = res.data.slice(0, 10);
            // this.swiperList10 = tempSwiperList;
            this.swiperList10 = res.data.slice(0, 10);
            // console.log('截取前10个：', this.swiperList10);
          }
        }
      },
      (err) => {
        console.log('获取页面数据的错误信息', JSON.stringify(err));
      }
    );

  }

  /** 魔法首页 */
  getMagicHmepage() {
    let tempItems = []; // 临时的存储数组
    let data = {
      store_id: this.storeId,
      page: this.page,
    };
    this.api.get('index/ajaxGetMagicMore', data).subscribe(
      (res: any) => {
        if (res.status == 200) {
          tempItems = res.data.data;
          this.items.push(...tempItems);
        }
      },
      (err) => {
        // console.log(JSON.stringify(err));
      }
    );
  }
  /** 打开外部链接 */
  openLink(url){
    window.open (url, 'left=200,top=200,width=200,height=100');
  }

  /**  首页轮播文章列表 */
  getArticleList() {
    let data = {
      store_id: this.storeId,
      type: 4
    };
    this.api.get('index/searchCraft', data).subscribe(
      (res: any) => {
        if (res.status == 200) {
          res.data.forEach((element, index) => {
            this.articleList += element.name + '\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0';
          });
        }
      }
    );
  }

  /** 跳转详情页 */
  goDetail(goodsId, goto) {
    this.router.navigate(['/detail'], { queryParams: { goods_id: goodsId, go_to: goto } });
  }


  /**  跳转列表页 */
  goList(id, goto) {
    Utils.localStorageSetItem('cate_index', this.index);
    this.router.navigate(['/list'], { queryParams: { cat_id: id, go_to: goto } });
  }
  /**  跳转列表页 */
  goListSearch(goto) {
    this.router.navigate(['/list'], { queryParams: { go_to: goto } });
  }

  /** 检测是否有新的版本可更新 */
  getVersion() {
      this.api.get('index/getAppVersion?store_id=' + this.storeId).subscribe(
          (res: any) => {
              if (res.status == 200) {
                this.app_version = res.data;
                document.addEventListener('deviceready', () => {
                    let localAppVersion = window.AppVersion.build;
                    if (this.app_version != localAppVersion) {
                        this.showModal = true;
                    }
                });
              }
          },
          (err) => {
              console.log(JSON.stringify(err));
          }
      );
  }

  // 取消更新App
  cancel() {
      this.showModal = false;
  }

  // 更新App
  update() {
      this.showModal = false;
      Utils.testAppVersion();
  }

}
