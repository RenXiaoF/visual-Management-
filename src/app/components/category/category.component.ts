import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { Api, Utils } from 'src/services';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.css']
})
export class CategoryComponent implements OnInit {

  public categoryList = [];     // 商品分类的列表
  public categoryListItem = []; // 商品分类的内容
  public isCheckedCategory = 0; // 选中的一级分类
  public categoryId = 0;        // 商品分类的category_id

  public storeId: any; // 商店id 357

  public firstImage = ''; // 第一级分类的图片
  public index = 0; // 功能的index

  public backgroundColor = '#0075b8'; // 背景色


  constructor(
    private router: Router,
    private api: Api,
    public activatedRoute: ActivatedRoute,
  ) {
    // 获取页面数据
    // this.activatedRoute.queryParams.subscribe((params: Params) => {
    //   this.categoryId = params.category_id;
    //   console.log(this.categoryId);
    // });
    this.storeId = Utils.localStorageGetItem('store_id');
  }

  ngOnInit() {
    // 初始化数据
    this.isCheckedCategory = 0;
    this.getGoodList();
    // 设置背景色
    this.backgroundColor = Utils.localStorageGetItem('backgroundColor');
  }

  /**  获取商品分类列表 */
  getGoodList() {
    this.api.get('index/getCraftCategory?store_id=' + this.storeId).subscribe(
      (res: any) => {
        if (res.status == 200) {
          this.categoryList = res.data;
          this.categoryListItem = res.data[0].all_child_category;
          this.firstImage = this.categoryList[0].image;
        }
      },
      (err) => {
        console.log(JSON.stringify(err));
      }
    );
  }
  /** 切换一级商品分类 */
  selectCategory(index) {
    this.isCheckedCategory = index;
    this.firstImage = this.categoryList[index].image;
    this.index = index;
    this.categoryListItem = this.categoryList[index].all_child_category;
  }
  /**  跳转到商品列表页面 */
  goProductList(id, goto) {
    this.router.navigate(['/list'], { queryParams: { cat_id: id, go_to: goto } });
  }

  /** 点击搜索去到 list */
  gotoList(goto) {
    this.router.navigate(['/list'], { queryParams: { go_to: goto } });
  }


}
