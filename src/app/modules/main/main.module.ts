import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PostLoginLandingPageComponent } from './post-login-landing-page/post-login-landing-page.component';
import { RouterModule } from '@angular/router';
import { LandingPageComponent } from './landing-page/landing-page.component';
import { HeaderComponent } from './header/header.component';
import { TenantSubLandingComponent } from './tenant-sub-landing/tenant-sub-landing.component';
import { EmptyComponent } from './empty/empty.component';
import { SidebarComponentComponent } from './sidebar-component/sidebar-component.component';
import { FooterComponent } from './footer/footer.component';
import { SettingsComponent } from './settings/settings.component';
import { MaterialsModule } from '../material/material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { TranslateUIModule } from '../translate-ui/translate-ui.module';

const COMPONENTS = [
  PostLoginLandingPageComponent,
  LandingPageComponent,
  HeaderComponent,
  TenantSubLandingComponent,
  EmptyComponent,
  SidebarComponentComponent,
  FooterComponent,
  SettingsComponent
];

@NgModule({
  declarations: [
    ...COMPONENTS
  ],
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule,
    MaterialsModule,
    MatIconModule,
    TranslateUIModule

  ],
  exports: [ COMPONENTS]
})
export class MainModule { }
