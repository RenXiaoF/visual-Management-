import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RouterModule, Routes } from '@angular/router';
import { AdImgComponent } from './ad-img.component';

const routes: Routes = [
  { path: '', component: AdImgComponent }
];

const COMPONENTS = [
  AdImgComponent
];


@NgModule({
  declarations: [...COMPONENTS],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
  ]
})
export class AdModule { }
