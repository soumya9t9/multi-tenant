import { Component } from '@angular/core';
import { ActivatedRoute, ActivatedRouteSnapshot, Route, Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { AppService } from './app.service';
import { DynamicThemeService, ThemeModel } from './services/dynamic-theme.service';
import { URLService } from './tenant/url.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'multi-tenant';

  constructor(
    public translate: TranslateService,
    public appService: AppService, private dynamicTheme: DynamicThemeService,
    private route: ActivatedRoute,
    private router:Router) {
    this.getSelectedTheme();
    this.initializeLang();

    this.route.queryParamMap.subscribe(param => {
      let lang = param.get("lang") || "";
      lang = lang.match(/en|fr|pt|es|de|hi/) ? lang : null
      if (lang && this.translate.getDefaultLang() !== lang) {
        this.translate.use(lang);
        this.translate.setDefaultLang(lang);
      } else if(lang == null) {
        this.translate.use('en');
        // const url = this.router.createUrlTree([], { relativeTo: this.route, queryParams: { lang } }).toString()
        // this.router.navigateByUrl(url, {replaceUrl:true});
      }
    })
    this.appService.themeData$.subscribe((res) => {
      if(res){
        this.getSelectedTheme() 
      } else {
        this.dynamicTheme.setAvailabeThemes([]);
        this.dynamicTheme.setTheme();
      } 
    });
  }

  initializeLang() {
    this.translate.addLangs(['en', 'fr', 'pt', 'es', 'de', 'hi']);
    // this.translate.setDefaultLang('en');
    // const browserLang = this.translate.getBrowserLang();
    // this.translate.use(browserLang.match(/en|fr|pt|es|de|hi/) ? browserLang : 'en');
  }
  getSelectedTheme() {
    this.appService.getSelectedTheme().subscribe((res: any) => {
      if(this.appService.tenantId) {
        const themes = res[this.appService.tenantId];
        let activeTheme = themes ? themes[0] : null;
        if (activeTheme) {
          activeTheme["id"] = activeTheme.id | activeTheme._id;
          const defaultThemeName = (activeTheme.primary && activeTheme.accent) ? "dynamic-theme" : "default-theme";
          activeTheme["theme"] = activeTheme.theme || activeTheme.themeName || defaultThemeName;
          this.dynamicTheme.setAvailabeThemes(<ThemeModel[]>[activeTheme]);
        }
       
        this.dynamicTheme.setTheme(activeTheme);
      }
    })
  }
}
