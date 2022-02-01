import { getLocaleCurrencyCode, Location } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { DEFAULT_CURRENCY_CODE, LOCALE_ID, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { DashboardModule } from './modules/dashboard/dashboard.module';
import { MainModule } from './modules/main/main.module';
import { UserManagementModule } from './modules/user-management/user-management.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HomeModule } from './modules/home/home.module';
import { TranslateUIModule } from './modules/translate-ui/translate-ui.module';
import { CurrencyProxyPipe } from './currency-proxy.pipe';
import { CustomDateModule } from './shared/custom-date/custom-date.module';
import { LangSettingsService } from './lang-settings.service';
import { TranslateService } from '@ngx-translate/core';
import { DateFnsConfigurationService } from 'ngx-date-fns';
import { enIN } from 'date-fns/locale';

const frenchConfig = new DateFnsConfigurationService();
frenchConfig.setLocale(enIN);


@NgModule({
  declarations: [
    AppComponent,
    // CurrencyProxyPipe

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
    CustomDateModule
  ],
  providers: [
    Location,
    // { provide: LOCALE_ID, useValue: 'en' },
    {
      provide: LOCALE_ID,
      deps: [LangSettingsService, TranslateService],      //some service handling global settings
      useFactory: (langSettingsService) => langSettingsService.getLanguage()  //returns locale string
    },
    // { provide: DEFAULT_CURRENCY_CODE,
    //   deps: [LangSettingsService, TranslateService],      //some service handling global settings
    //   // useFactory: (langSettingsService:LangSettingsService) => langSettingsService.getCurrencyObj()?.code || "INR"   //returns locale string
    //   useValue: 'INR' 
    // },
    // { provide: "CURRENCY_ID",
    //   deps: [LangSettingsService, TranslateService],      //some service handling global settings
    //   useFactory: (langSettingsService:LangSettingsService) => langSettingsService.selectedCurrency || "INR"   //returns locale string
    //   // useValue: 'INR' 
    // },
    { provide: DateFnsConfigurationService, useValue: frenchConfig }
  ],

  bootstrap: [AppComponent]
})
export class AppModule { }
