import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DepartmentListComponent } from './department-list.component';
import { Routes, RouterModule } from '@angular/router';


const routes: Routes = [
  {path: '', component: DepartmentListComponent}
];

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
  ]
})
export class DepartmentListModule { }
