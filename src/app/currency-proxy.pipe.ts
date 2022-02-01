import { CurrencyPipe } from '@angular/common';
import { DEFAULT_CURRENCY_CODE, Inject, Pipe, PipeTransform } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { LangSettingsService } from './lang-settings.service';


@Pipe({
  name: 'currencyProxy',
  pure: false
})
export class CurrencyProxyPipe implements PipeTransform {

  constructor(private trans: TranslateService, 
    @Inject(DEFAULT_CURRENCY_CODE) private cCode,
    private LangService: LangSettingsService) {}
  currencyPipe = new CurrencyPipe('en')
 
  transform(value,code = null ,display = 'symbol',digites = '0.3-5',local ='en') {
    if(!local) local = this.trans.currentLang;
    if(!code) code = this.LangService.selectedCurrency || "INR";
     return this.currencyPipe.transform(value,code,display,digites,local)
  }
  
}