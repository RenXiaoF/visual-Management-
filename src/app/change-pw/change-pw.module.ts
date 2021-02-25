import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { ChangePwComponent } from './change-pw.component';
import { FormsModule } from '@angular/forms';

const routes: Routes = [
  { path: '', component: ChangePwComponent }
];

@NgModule({
  declarations: [ChangePwComponent],
  imports: [
    CommonModule,
    FormsModule,
    RouterModule.forChild(routes),
  ]
})
export class ChangePwModule { }
