import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { LoginComponent } from 'src/app/login/login.component';

const routes: Routes = [
  { path: '', redirectTo: 'homeMain', pathMatch: 'full' },
  // 主页
  {
    path: 'homeMain',
    loadChildren: () => import('./model/home-main/home-main.module').then(m => m.HomeMainModule)
  },
  //  分类列表
  { path: 'list', loadChildren: () => import('./list/list.module').then(m => m.ListModule) },
  // 详情
  { path: 'detail', loadChildren: () => import('./detail/detail.module').then(m => m.DetailModule) },
  // 看板详情
  { path: 'ad', loadChildren: () => import('./ad/ad.module').then(m => m.AdModule) },
  // 个人中心
  { path: 'perfact-self', loadChildren: () => import('./perfact-self/perfact-self.module').then(m => m.PerfactSelfModule) },
  // 修改密码
  { path: 'change-pw', loadChildren: () => import('./change-pw/change-pw.module').then(m => m.ChangePwModule) },
  // 工号信息 列表
  { path: 'assay', loadChildren: () => import('./assay/assay.module').then(m => m.AssayModule) },
  // 部门  列表
  { path: 'department-list', loadChildren: () => import('./department-list/department-list.module').then(m => m.DepartmentListModule) },
  // 公司 列表
  { path: 'company-list', loadChildren: () => import('./company-list/company-list.module').then(m => m.CompanyListModule) },
  // 计件报表汇总
  { path: 'pricew-sum', loadChildren: () => import('./pricewoik-summary/pricewoik-summary.module').then(m => m.PricewoikSummaryModule) },
  // 登陆
  { path: 'login', component: LoginComponent },
];

@NgModule({
  imports: [
    // CommonModule,
    RouterModule.forRoot(routes)
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
