import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { ListComponent } from './list.component';
import { FormsModule } from '@angular/forms';
import { PipesModule } from 'src/pipes/pipes.module';

const routes: Routes = [
  { path: '', component: ListComponent }
];

const COMPONENTS = [
  ListComponent
];


@NgModule({
  declarations: [...COMPONENTS],
  imports: [
    CommonModule,
    FormsModule,
    RouterModule.forChild(routes),
    PipesModule
  ]
})
export class ListModule { }
