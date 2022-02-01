import { DOCUMENT, FormatWidth, getLocaleCurrencyCode, getLocaleDateFormat } from '@angular/common';
import { ApplicationRef, Inject, Injectable, LOCALE_ID } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { Locale } from 'date-fns';
import { de, enGB, enIN, enUS, es, fr, pt } from 'date-fns/locale';
import { DateFnsConfigurationService } from 'ngx-date-fns';
import { Subject } from 'rxjs';

export enum CURRENCY_CODE  {
  USD = "USD",
  EUR = "EUR",
  GBP = "GBP",
  INR = "INR"
} 

export interface LocaleModel {
    id:string,
    label: string,
    code: string,
    currency?: CURRENCY_CODE,
    date: Locale,
}

@Injectable({
  providedIn: 'root'
})
export class LangSettingsService {

  private selectedLocal:LocaleModel = LOCALE_LIST[0];
  public currencyObj= CURRENCY_LIST[0];
  public selectedCurrency: CURRENCY_CODE = CURRENCY_CODE.INR;
  public $currencySub:Subject<any> = new Subject();
  constructor(
    private translateService:TranslateService,
    @Inject(DOCUMENT) private document: Document,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private applicationRef: ApplicationRef,
    private config: DateFnsConfigurationService
    ) { }


  getLanguage() :string {
    return this.selectedLocal.code || this.translateService.currentLang || "en";
  }

  getLocale() {
    return this.selectedLocal;
  }
  getDateF() : Locale {
    return this.selectedLocal.date || enIN ;// getLocaleDateFormat(this.getLanguage(), FormatWidth.Short)
  }

  getCurrency(): CURRENCY_CODE | string {
    return this.selectedCurrency || this.selectedLocal.currency  || getLocaleCurrencyCode(this.getLanguage()) || CURRENCY_CODE.INR;
  }

  getCurrencyObj() {
    return this.currencyObj;
  }
  setLocale(localeItem:LocaleModel) {
    this.selectedLocal = localeItem;
    this.changeLanguage(localeItem.code);
    // this.setCurrency(localeItem.currency || CURRENCY_CODE.INR);
    this.config.setLocale(localeItem.date);
    this.applicationRef.tick();
  }

  setCurrency(cCode:CURRENCY_CODE) {
    this.currencyObj = CURRENCY_LIST.find(e => e.code === cCode);
    this.selectedCurrency = cCode;
    // this.$currencySub.next(cCode);
    this.applicationRef.tick()
  }

  private changeLanguage(langSelect:string) {
    this.translateService.use(langSelect);
    this.translateService.setDefaultLang(langSelect);
    this.document.documentElement.setAttribute('lang', langSelect);
    const url = this.router.createUrlTree([], { relativeTo: this.activatedRoute, queryParams: { lang: langSelect } }).toString()
    // this.location.go(url);
    this.router.navigateByUrl(url, {replaceUrl:true});
  }


}

export const CURRENCY_LIST = [
  {
    label:CURRENCY_CODE.USD,
    symbol: "$",
    code:CURRENCY_CODE.USD,
  },
  {
    label:CURRENCY_CODE.INR,
    symbol: "$",
    code:CURRENCY_CODE.INR
  },
  {
    label:CURRENCY_CODE.EUR,
    symbol: "$",
    code:CURRENCY_CODE.EUR
  },
  {
    label:CURRENCY_CODE.GBP,
    symbol: "$",
    code:CURRENCY_CODE.GBP
  }
]
export const LOCALE_LIST : LocaleModel[]= [
  {
    id:"enIn",
    label: "English - India",
    code: 'en',
    currency: CURRENCY_CODE.INR,
    date: enIN,
  },
  {
    id:"enUS",
    label: "English - USA",
    code: 'en',
    currency: CURRENCY_CODE.USD,
    date: enUS,
  },
  
  {
    id:"enGB",
    label: "English - UK",
    code: 'en', 
    currency:  CURRENCY_CODE.GBP,
    date: enGB,
  },
  {
    id: 'fr',
    label: "French",
    code: 'fr',
    date: fr,
  },
  {
    id: 'pt',
    label: "Português",
    code: 'pt',
    date: pt
  },
  {
    id: 'es',
    label: "Español",
    code: 'es',
    date: es
  },
  {
    id: 'de',
    label: "Deutsch",
    code: 'de',
    date:de
  },
  {
    id: 'hi',
    label: "Hindi",
    code: 'hi',
    date: enIN,
    currency: CURRENCY_CODE.INR
  },
]
