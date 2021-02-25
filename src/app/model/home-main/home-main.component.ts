import { Component, OnInit } from '@angular/core';
import { Api } from 'src/services/api';
import { ActivatedRoute, Params } from '@angular/router';

@Component({
  selector: 'app-home-main',
  templateUrl: './home-main.component.html',
  styleUrls: ['./home-main.component.css']
})
export class HomeMainComponent implements OnInit {

  barTypes = [
    {
      type: '',
      name: '首页',
      firstImg: './assets/img/home1.png',
      secondImg: './assets/img/home2.png',
      checked: true,
    },
    {
      type: 'BARONE',
      name: '分类',
      firstImg: './assets/img/class1.png',
      secondImg: './assets/img/class2.png',
      checked: false,
    },
    {
      type: 'BARTWO',
      name: '看板',
      firstImg: './assets/img/spectaculars1.png',
      secondImg: './assets/img/spectaculars2.png',
      checked: false,
    },
    {
      type: 'BARTHREE',
      name: '我的',
      firstImg: './assets/img/my1.png',
      secondImg: './assets/img/my2.png',
      checked: false,
    },
  ];

  chooseBarType = '';
  index;



  constructor(
    public api: Api,
    public activatedRoute: ActivatedRoute,
  ) {
    // 接收上一页传过来的参数
    this.activatedRoute.queryParams.subscribe((params: Params) => {
      if (params.index){
        this.index = params.index;
      }else{
        this.index = 0;
      }
    });
  }

  ngOnInit() { }



  /** 切换 tap bar */
  changePartType(type) {
    this.barTypes.forEach((val, index) => {
      val.checked = false;
      if (val.type == type) {
        this.index = index;
        val.checked = true;
        this.chooseBarType = type;
      }
    });
  }

}
