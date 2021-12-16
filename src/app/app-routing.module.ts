import { Component, NgModule } from '@angular/core';
import { RouterModule, Routes, ɵEmptyOutletComponent } from '@angular/router';
import { AuthGuard } from './guards/auth.guard';
import { LandingPageGuard } from './guards/landing-page.guard';
import { NotAuthGuard } from './guards/not-auth.guard';
import { DashboardViewComponent } from './modules/dashboard/dashboard-view/dashboard-view.component';
import { EmptyComponent } from './modules/main/empty/empty.component';
import { LandingPageComponent } from './modules/main/landing-page/landing-page.component';
import { PostLoginLandingPageComponent } from './modules/main/post-login-landing-page/post-login-landing-page.component';
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
  {
    path: 'login',
    pathMatch: 'full',
    canActivate:[NotAuthGuard],
    component: LoginComponent
  },
  {
      path: '',
      canActivate: [LandingPageGuard],
      component: EmptyComponent,
      // canActivateChild: [AuthGuard],
      // children: []
    },
  {
    path: ":tenantId",
    // canActivateChild: [AuthGuard],
    canActivate: [AuthGuard],
    component: TenantSubLandingComponent,
    // pathMatch: 'full',
    children: [
      {
        path: "security",
        pathMatch: 'full',
        loadChildren: () => import('./modules/post-login-user-mgmt/post-login-user-mgmt.module').then(m => m.PostLoginUserMgmtModule)
      },
      {
        path: "dashboard",
        pathMatch: 'full',
        loadChildren: () => import('./modules/dashboard/dashboard.module').then(m => m.DashboardModule)
      }
    ]
  },
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
