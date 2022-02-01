import { Component, NgModule } from '@angular/core';
import { RouterModule, Routes, ɵEmptyOutletComponent } from '@angular/router';
import { AuthGuard } from './guards/auth.guard';
import { LandingPageGuard } from './guards/landing-page.guard';
import { NotAuthGuard } from './guards/not-auth.guard';
import { DashboardViewComponent } from './modules/dashboard/dashboard-view/dashboard-view.component';
import { CreateFormComponent } from './modules/home/create-form/create-form.component';
import { CurrencyLangComponent } from './modules/main/currency-lang/currency-lang.component';
import { EmptyComponent } from './modules/main/empty/empty.component';
import { LandingPageComponent } from './modules/main/landing-page/landing-page.component';
import { PostLoginLandingPageComponent } from './modules/main/post-login-landing-page/post-login-landing-page.component';
import { SettingsComponent } from './modules/main/settings/settings.component';
import { TenantSubLandingComponent } from './modules/main/tenant-sub-landing/tenant-sub-landing.component';
import { LoginComponent } from './modules/user-management/login/login.component';

const routes: Routes = [

  // {
  //   path: ':tenantId/dashboard',
  //   pathMatch: 'full',
  //   component: DashboardViewComponent
  // },
  // {
  //   path: '',
  //   component: PostLoginLandingPageComponent,
  //   canActivate: [LandingPageGuard],
  //   canActivateChild: [AuthGuard],
  //   children: []
  // },
  // {
  //   path: '',
  //   component: LandingPageComponent,
  //   canActivate: [LandingPageGuard],
  //   canActivateChild: [NotAuthGuard],
  //   children:[
  //     {
  //       path: '',
  //       pathMatch: 'full',
  //       // canActivate:[NotAuthGuard],
  //       redirectTo:'login'
  //       // component: LoginComponent
  //     },
  //     {
  //       path: 'login',
  //       pathMatch: 'full',
  //       canActivate:[NotAuthGuard],
  //       component: LoginComponent
  //     }
  //   ]
  // },
  // {
  //   path: 'login',
  //   pathMatch: 'full',
  //   canActivate: [NotAuthGuard],
  //   component: LoginComponent
  // },
  {
    path: "security",
    pathMatch: 'full',
    canActivate: [AuthGuard],
    loadChildren: () => import('./modules/post-login-user-mgmt/post-login-user-mgmt.module').then(m => m.PostLoginUserMgmtModule)
  },
  {
    path: "dashboard",
    pathMatch: 'full',
    canActivate: [AuthGuard],
    loadChildren: () => import('./modules/dashboard/dashboard.module').then(m => m.DashboardModule)
  },
  {
    path: "theme-selection",
    pathMatch: 'full',
    canActivate: [AuthGuard],
    component: SettingsComponent
  },
  {
    path: "dyn-form",
    pathMatch: "full",
    canActivate: [NotAuthGuard],
    component: CreateFormComponent
  },
  {
    path: "settings",
    pathMatch: "full",
    component: CurrencyLangComponent
  },
  {
    path: "",
    pathMatch: 'full',
    redirectTo: 'login'
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
