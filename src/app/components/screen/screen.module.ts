import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PipesModule } from 'src/pipes/pipes.module';
import {ScreenComponent} from './screen.component';


const routes: Routes = [
  {path: 'screen', component: ScreenComponent},
];

const COMPONENTS = [
    ScreenComponent
 ];

@NgModule({
  declarations: [
    ...COMPONENTS
  ],
  imports: [
    CommonModule,
    PipesModule,
    RouterModule.forChild(routes)
  ],
  exports: [
    RouterModule,
    ...COMPONENTS
  ]
})

export class ScreenModule { }
