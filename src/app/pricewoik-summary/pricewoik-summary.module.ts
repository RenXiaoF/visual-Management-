import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { PricewoikSummaryComponent } from './pricewoik-summary.component';
import { FormsModule } from '@angular/forms';
import { OwlDateTimeModule, OwlNativeDateTimeModule } from 'ng-pick-datetime';
import { ModalModule } from 'ngx-bootstrap/modal';

const routes: Routes = [
  { path: '', component: PricewoikSummaryComponent }
]

@NgModule({
  declarations: [PricewoikSummaryComponent],
  imports: [
    CommonModule,
    FormsModule,
    RouterModule.forChild(routes),
    // 时间选择
    OwlDateTimeModule,
    OwlNativeDateTimeModule,
    //  引入  的  弹框 module
    ModalModule.forRoot()
  ]
})
export class PricewoikSummaryModule { }
