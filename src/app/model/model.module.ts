import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IndexComponent } from '../components/index/index.component';
import { MyComponent } from '../components/my/my.component';
import { KanbanComponent } from '../components/kanban/kanban.component';
import { CategoryComponent } from '../components/category/category.component';
import { PipesModule } from 'src/pipes/pipes.module';
import { FormsModule } from '@angular/forms';


const routes: Routes = [
  {path: 'index', component: IndexComponent},
  {path: 'category', component: CategoryComponent},
  {path: 'kanban', component: KanbanComponent},
  {path: 'my', component: MyComponent}
];

const COMPONENTS = [
  IndexComponent,
  CategoryComponent,
  KanbanComponent,
  MyComponent
 ];

@NgModule({
  declarations: [
    ...COMPONENTS
  ],
  imports: [
    CommonModule,
    PipesModule,
    FormsModule,
    RouterModule.forChild(routes)
  ],
  exports: [
    RouterModule,
    ...COMPONENTS
  ]
})

export class ModelModule { }
