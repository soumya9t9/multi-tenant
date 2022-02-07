import { DEFAULT_CURRENCY_CODE, NgModule } from '@angular/core';
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
import { CurrencyLangComponent } from './currency-lang/currency-lang.component';
import { CustomDateModule } from 'src/app/shared/custom-date/custom-date.module';
import { CurrencyProxyPipe } from 'src/app/currency-proxy.pipe';
import { LangSettingsService } from 'src/app/lang-settings.service';
import { TranslateCompiler, TranslateLoader, TranslateModule, TranslateService } from '@ngx-translate/core';
import { DateFnsConfigurationService, DateFnsModule } from 'ngx-date-fns';
import { enIN } from 'date-fns/locale';
import { CustomDatePipe } from 'src/app/custom-date.pipe';
import { MESSAGE_FORMAT_CONFIG, TranslateMessageFormatCompiler } from 'ngx-translate-messageformat-compiler';
import { HttpClient } from '@angular/common/http';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';

export function HttpLoaderFactory(httpClient: HttpClient) {
  return new TranslateHttpLoader(httpClient);
}
const frenchConfig = new DateFnsConfigurationService();
frenchConfig.setLocale(enIN);

const COMPONENTS = [
  PostLoginLandingPageComponent,
  LandingPageComponent,
  HeaderComponent,
  TenantSubLandingComponent,
  EmptyComponent,
  SidebarComponentComponent,
  FooterComponent,
  SettingsComponent,
  CurrencyLangComponent,
  CustomDatePipe
];

@NgModule({
  declarations: [
    ...COMPONENTS,
    CurrencyProxyPipe
  ],
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule,
    MaterialsModule,
    MatIconModule,
    // TranslateUIModule,
    CustomDateModule,
    DateFnsModule,

    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient]
      },
      compiler: {
        provide: TranslateCompiler,
        useClass: TranslateMessageFormatCompiler
      }
    })
  ],
  providers: [
    { provide: DEFAULT_CURRENCY_CODE,
      deps: [LangSettingsService, TranslateService],      //some service handling global settings
      // useFactory: (langSettingsService:LangSettingsService) => langSettingsService.getCurrencyObj()?.code || "INR"   //returns locale string
      useValue: 'INR' 
    },
    { provide: "CURRENCY_ID",
      deps: [LangSettingsService, TranslateService],      //some service handling global settings
      useFactory: (langSettingsService:LangSettingsService) => langSettingsService.selectedCurrency || "INR"   //returns locale string
      // useValue: 'INR' 
    },
    { provide: DateFnsConfigurationService, useValue: frenchConfig },
    { provide: MESSAGE_FORMAT_CONFIG, useValue: { 
      locales: ['en', 'fr', 'hi', 'es', 'pt', 'de'],
      disablePluralKeyChecks:false,
      multi:true
    }}
  ],
  exports: [ COMPONENTS]
})
export class MainModule { }
