import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {Utils} from '../../services';

@Component({
  selector: 'app-change-pw',
  templateUrl: './change-pw.component.html',
  styleUrls: ['./change-pw.component.css']
})
export class ChangePwComponent implements OnInit {

  //  密码可见
  canSeePass = false;
  passwordType = 'password';

  public backgroundColor = '#0075b8'; // 背景色

  constructor(
    public router: Router,
  ) { }

  ngOnInit(): void {
      // 设置背景色
      this.backgroundColor = Utils.localStorageGetItem('backgroundColor');
  }

  /** 密码可见 */
  seePass() {
    if (this.canSeePass) {
      this.canSeePass = false;
      this.passwordType = 'password';
    } else {
      this.canSeePass = true;
      this.passwordType = 'text';
    }
  }

  /** 返回上一页 */
  goBack(indexs) {
    this.router.navigate(['/homeMain'], { queryParams: { index: indexs } });
  }

}
