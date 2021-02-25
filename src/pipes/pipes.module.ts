import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OrderPipe } from './order/order';
import { FormatCardNoPipe } from './card/format-cardNo';
import { FormatPhonePipe } from './phone-num/format-phone';
import { DefaultImgPipe } from './default-img/default-img';
import { HtmlPipe } from './html/html';
import { UrlImgPipe } from './url-img/url-img';
import { Base64ImgPipe } from './base64-img/base64-img';
import { DefaultgoodsPipe } from './defaultgoods/defaultgoods';
import { DateFormatPipe } from './date-format/date-format';
import { DefaultGoodsImgPipe } from './default-goods-img/default-goods-img';
import { DefaultValPipe } from './default-val/default-val';
import { DefaultNumPipe } from './default-num/default-num';
import { FormatImgPipe } from './format-img/format-img';
import { DefaultDownloadQrcodePipe } from './default-download-qrcode/default-download-qrcode';
import { DefaultDownloadUrlPipe } from './default-download-url/default-download-url';
import { NoDblClickDirective } from './no-dbl-click/no-dbl-click.directive';
@NgModule({
  declarations: [
    DefaultDownloadUrlPipe,
    DefaultDownloadQrcodePipe,
    FormatImgPipe,
    OrderPipe,
    FormatCardNoPipe,
    FormatPhonePipe,
    DefaultImgPipe,
    HtmlPipe,
    UrlImgPipe,
    Base64ImgPipe,
    DefaultgoodsPipe,
    DateFormatPipe,
    DefaultGoodsImgPipe,
    DefaultValPipe,
    DefaultNumPipe,
    NoDblClickDirective
  ],
  imports: [
    CommonModule,
  ],
  exports: [
    DefaultDownloadUrlPipe,
    DefaultDownloadQrcodePipe,
    FormatImgPipe,
    OrderPipe,
    FormatCardNoPipe,
    FormatPhonePipe,
    DefaultImgPipe,
    HtmlPipe,
    UrlImgPipe,
    Base64ImgPipe,
    DefaultgoodsPipe,
    DateFormatPipe,
    DefaultGoodsImgPipe,
    DefaultValPipe,
    DefaultNumPipe,
    NoDblClickDirective
  ]
})
export class PipesModule { }
