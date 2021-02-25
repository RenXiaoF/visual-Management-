import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { CompanyListComponent } from './company-list.component';
import { FormsModule } from '@angular/forms';

const routes: Routes = [
  {path: '', component: CompanyListComponent}
];

@NgModule({
  declarations: [CompanyListComponent],
  imports: [
    CommonModule,
    FormsModule,
    RouterModule.forChild(routes),
  ]
})
export class CompanyListModule { }
