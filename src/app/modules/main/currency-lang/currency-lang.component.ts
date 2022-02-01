import { Component, DEFAULT_CURRENCY_CODE, Inject, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { CURRENCY_LIST, LangSettingsService, LOCALE_LIST } from 'src/app/lang-settings.service';

@Component({
  selector: 'esspl-currency-lang',
  templateUrl: './currency-lang.component.html',
  styleUrls: ['./currency-lang.component.scss']
})
export class CurrencyLangComponent implements OnInit {

  langList = LOCALE_LIST;
  currencies = CURRENCY_LIST;

  selectedC;
  selectedL;

  money = 456.78;
  constructor(
    public translateService:TranslateService,
    public langService: LangSettingsService,
    @Inject(DEFAULT_CURRENCY_CODE) public cCode
    ) {
      this.selectedC = this.langService.getCurrency();
      this.selectedL = this.langService.getLocale().id;
     }

  ngOnInit(): void {
  }

  changeCurrency(selectedCurrency) {
    this.langService.setCurrency(selectedCurrency);
  }

  
  changeLanguage(selectedlang) {
    const locale = this.langList.find(e => e.id == selectedlang);
    if(locale) {
      this.langService.setLocale(locale);
    }
  }
}
