import { Location } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { DashboardModule } from './modules/dashboard/dashboard.module';
import { MainModule } from './modules/main/main.module';
import { UserManagementModule } from './modules/user-management/user-management.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HomeModule } from './modules/home/home.module';
import { TranslateUIModule } from './modules/translate-ui/translate-ui.module';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    AppRoutingModule,
    TranslateUIModule,
    MainModule,
    UserManagementModule,
    HomeModule,
  ],
  providers: [Location],
  bootstrap: [AppComponent]
})
export class AppModule { }
