import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PostLoginLandingPageComponent } from './post-login-landing-page/post-login-landing-page.component';
import { RouterModule } from '@angular/router';
import { LandingPageComponent } from './landing-page/landing-page.component';
import { HeaderComponent } from './header/header.component';
import { TenantSubLandingComponent } from './tenant-sub-landing/tenant-sub-landing.component';
import { EmptyComponent } from './empty/empty.component';


const COMPONENTS = [
  PostLoginLandingPageComponent,
  LandingPageComponent,
  HeaderComponent,
  TenantSubLandingComponent,
  EmptyComponent
];

@NgModule({
  declarations: [
    ...COMPONENTS
  ],
  imports: [
    CommonModule,
    RouterModule
  ],
  exports: [ COMPONENTS]
})
export class MainModule { }
