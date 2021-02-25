import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { DomSanitizer } from '@angular/platform-browser';
import {Utils} from '../../services';

@Component({
  selector: 'app-ad-img',
  templateUrl: './ad-img.component.html',
  styleUrls: ['./ad-img.component.css']
})
export class AdImgComponent implements OnInit {

  public url: string;
  public jumpLink; // 跳转的链接
  public titleName; // 看板的标题

  public backgroundColor = '#0075b8'; // 背景色

  constructor(
      public router: Router,
      public activatedRoute: ActivatedRoute,
      public sanitizer: DomSanitizer,
  ) {
      this.activatedRoute.queryParamMap.subscribe((params: Params) => {
        // console.log('看板详情：', params);
        this.titleName = params.params.titleName ? params.params.titleName : '看板详情';
        this.url = params.params.url ? params.params.url : '';
        // console.log('看板详情', this.url);
        this.jumpLink = this.sanitizer.bypassSecurityTrustResourceUrl(this.url); // 信任该url
      });
  }

  ngOnInit(): void {
      // 设置背景色
      this.backgroundColor = Utils.localStorageGetItem('backgroundColor');
  }

  /** 返回首页 看板 */
  goBack(indexs) {
    this.router.navigate(['/homeMain'], { queryParams: { index: indexs } });
  }

}
