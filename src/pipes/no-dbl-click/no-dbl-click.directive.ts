import { Directive, ElementRef, HostListener,Input  } from '@angular/core';

@Directive({
  selector: '[appNoDblClick]'
})
export class NoDblClickDirective {
  @Input('appNoDblClick') highlightColor: string;
  /**
   * 默认背景颜色
   * @type {string}
   */
  public defaultColor = 'red';
  constructor(public el: ElementRef) {
  }

  /**
   * 监听注解写在某个方法上面，表示下面的方法是该事件处理函数
   * 实现不能重复点击该按钮(设置disabled属性为true,3秒后改为false)
   */
  @HostListener('click')
  click() {
    let ran_num = (3 + Math.floor(Math.random() * 4)) ;
    // console.log('点击按钮延时' + ran_num);
    this.el.nativeElement.disabled = true;
    setTimeout(() => {
      this.el.nativeElement.disabled = false;
    }, ran_num * 1000);
  }

  /**
   * 手指按下去的时候触发该监听事件，设置背景色
   */
  @HostListener('touchstart')
  onTouchStart() {
    this.highlight(this.highlightColor || this.defaultColor || 'red');
  }
  /**
   * 手指离开的时候触发该监听事件，取消背景色
   */
  @HostListener('touchend')
  onTouchsEnd() {
    this.highlight(null);
  }

  private highlight(color: string) {
    // this.el.nativeElement.style.backgroundColor = color;
  }

}
