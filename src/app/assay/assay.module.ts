import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { AssayComponent } from './assay.component';
import { FormsModule } from '@angular/forms';

const routes: Routes = [
  { path: '', component: AssayComponent }
];

@NgModule({
  declarations: [AssayComponent],
  imports: [
    CommonModule,
    FormsModule,
    RouterModule.forChild(routes),
  ]
})
export class AssayModule { }
