import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { HomeMainComponent } from './home-main.component';
import { ModelModule } from '../model.module';


const routes: Routes = [
  { path: '', component: HomeMainComponent }
];
@NgModule({
  declarations: [HomeMainComponent],
  imports: [
    CommonModule,
    ModelModule,
    RouterModule.forChild(routes)
  ]
})
export class HomeMainModule{ }
