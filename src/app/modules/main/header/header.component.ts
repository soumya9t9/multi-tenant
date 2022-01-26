import { DOCUMENT, Location } from '@angular/common';
import { EventEmitter, Inject } from '@angular/core';
import { Component, OnInit, Output } from '@angular/core';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { AppService } from 'src/app/app.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  @Output() toggleSidenav = new EventEmitter<void>();
  lastURLSegment!: string;
  userColor: any = [];
  activeLoginURL = false;
  activeRegisterURL = false;
  isLoggedIn = false;
  langs = [
    {
      label: "English",
      code: 'en'
    },
    {
      label: "French",
      code: 'fr'
    },
    {
      label: "Português",
      code: 'pt'
    },
    {
      label: "Español",
      code: 'es'
    },
    {
      label: "Deutsch",
      code: 'de'
    },
    {
      label: "Hindi",
      code: 'hi'
    },
  ]
  constructor(public app: AppService,
    public translate: TranslateService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private location: Location,
    @Inject(DOCUMENT) private document: Document
    // @Inject(REQUEST) private request: Request,
  ) { }

  ngOnInit(): void {
    this.isLoggedIn = this.app.isLoggedIn();
  }

  logout() {
    this.app.logout();
  }
  lol() {
    this.toggleSidenav.emit();
  }
  changeLang(langSelect) {
    this.translate.use(langSelect);
    this.translate.setDefaultLang(langSelect);
    this.document.documentElement.setAttribute('lang', langSelect);
    const url = this.router.createUrlTree([], { relativeTo: this.activatedRoute, queryParams: { lang: langSelect } }).toString()
    // this.location.go(url);
    this.router.navigateByUrl(url, {replaceUrl:true});
    console.log(this.translate.getBrowserLang());
  }

}
