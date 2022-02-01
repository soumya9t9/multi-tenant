import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DateFnsModule } from 'ngx-date-fns';
import { fr, enIN } from "date-fns/locale";
import { DateFnsConfigurationService } from 'ngx-date-fns';

const enInConfig = new DateFnsConfigurationService();
enInConfig.setLocale(enIN);

@NgModule({
  declarations: [],
  imports: [
    CommonModule,

    DateFnsModule.forRoot()
  ],
  providers: [
    { provide: DateFnsConfigurationService, useValue: enInConfig }
  ]
})
export class CustomDateModule { }
