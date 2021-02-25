import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { DetailComponent } from './detail.component';
import { OwlDateTimeModule, OwlNativeDateTimeModule } from 'ng-pick-datetime';
import { FormsModule } from '@angular/forms';
import { PipesModule } from 'src/pipes/pipes.module';
import { ModalModule } from 'ngx-bootstrap/modal';

const routes: Routes = [
  { path: '', component: DetailComponent }
];



@NgModule({
  declarations: [DetailComponent],
  imports: [
    CommonModule,
    FormsModule,
    RouterModule.forChild(routes),
    PipesModule,
    // 时间选择
    OwlDateTimeModule,
    OwlNativeDateTimeModule,
    //  引入  的  弹框 module
    ModalModule.forRoot()
  ]
})
export class DetailModule { }
