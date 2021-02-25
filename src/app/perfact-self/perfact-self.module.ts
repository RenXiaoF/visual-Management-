import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { PerfactSelfComponent } from './perfact-self.component';
import { ModalModule } from 'ngx-bootstrap/modal';
import { FormsModule } from '@angular/forms';
// import { ModalModule } from 'ngx-bootstrap/modal/modal.module';



const routes: Routes = [
  {path: '', component: PerfactSelfComponent}
];

@NgModule({
  declarations: [
    PerfactSelfComponent,

  ],
  imports: [
    CommonModule,
    FormsModule,
    RouterModule.forChild(routes),
    //  引入  的  弹框 module
    ModalModule.forRoot()
  ]
})
export class PerfactSelfModule { }
