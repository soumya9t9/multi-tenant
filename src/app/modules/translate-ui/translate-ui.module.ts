import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { TranslateCompiler, TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { MESSAGE_FORMAT_CONFIG, TranslateMessageFormatCompiler } from 'ngx-translate-messageformat-compiler';


export function createTranslateLoader(http: HttpClient) {
  return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}

// AoT requires an exported function for factories
export function HttpLoaderFactory(httpClient: HttpClient) {
  return new TranslateHttpLoader(httpClient);
}
const IM_EX :any= [
    TranslateModule.forRoot({
        loader: {
          provide: TranslateLoader,
          useFactory: HttpLoaderFactory,
          deps: [HttpClient]
        },
        // defaultLanguage:"en",
        compiler: {
          provide: TranslateCompiler,
          useClass: TranslateMessageFormatCompiler
        }
      }),
]
@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    ...IM_EX
  ],
  exports: IM_EX,
  providers: [
    { provide: MESSAGE_FORMAT_CONFIG, useValue: { locales: ['en', 'fr', 'hi', 'es', 'pt', 'de'] }}
  ]
})
export class TranslateUIModule { }
