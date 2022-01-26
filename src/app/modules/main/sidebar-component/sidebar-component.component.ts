import { Component, OnInit, AfterViewInit } from '@angular/core';
import { Router } from '@angular/router';
import { AppService } from 'src/app/app.service';
import { DynamicThemeService } from 'src/app/services/dynamic-theme.service';

interface ROUTE {
  icon?: string;
  route?: string;
  title?: string;
  children?: any[];
  condition?:any;
  onClick?: any,
  params?:any
}

// declare var $;
@Component({
  selector: 'multi-tenant-sidebar-component',
  templateUrl: './sidebar-component.component.html',
  styleUrls: ['./sidebar-component.component.scss']
})
export class SidebarComponentComponent implements OnInit, AfterViewInit {
  userColor: any = [];
  item!: { title: '', route: '' };
  router: Router;
  menuLists: ROUTE[] = [
    {
      icon: '',
      route: 'home-view',
      title: 'Home',
      condition: ()=> {return true }
    },
    {
      icon: '',
      route: 'login',
      title: 'Login',
      condition: ()=> {return true }
    },
    {
      icon: '',
      route: 'create-form',
      title: 'Create Form',
      condition: ()=> {return true }
    },
    {
      icon: '',
      route: 'theme-selection',
      title: 'Theme Selection',
      condition: ()=> {return true }
    },
    // {
    //   icon: '',
    //   route: '',
    //   onClick : () => {this.fileDownload()},
    //   title: 'DownloadJSON',
    //   params: {
    //     path:"/assets/data/dynform copy.json",
    //   },
    //   condition: ()=> {return true }
    // },
    {
      icon: '',
      route: null,
      onClick : () => {this.logout()},
      title: 'Logout',
      condition: ()=> {return this.app.isLoggedIn() }
    }
   
  ];;
  fontCounter=0;

  toggleControl = this.themeService.currentThemeMode;
 
  constructor(
    router: Router,
    private app: AppService,
    private themeService: DynamicThemeService,
  ) {
    this.router = router;
    this.themeController();
  }

  ngOnInit() {
    
  }
  fileDownload(){
  

}

  ngAfterViewInit(){
    this.setMinHeight();
  }

  logout() {
    this.app.logout();
  }
  setMinHeight() {
    // const headerH = $("#app-header").children().outerHeight();
    // const footerH = $("#app-footer").children().outerHeight();
    // $("#main-router-outlet").css('min-height', `calc( 100vh - ${ footerH + headerH}px)`);

    // $("#main-router-outlet").css('padding-bottom', `calc( ${footerH}px)`);
  }
  resizeFont(){
    let fontItems = [
      {key:"--normal-font", size: 16},
      {key:"--page-heading-font", size: 26},
      {key:"--section-heading-font", size: 22},
      {key:"--toolbar-heading-font", size: 24},
      {key:"--small-font", size: 14},      
      {key:"--xs-font", size: 12},      
    ];
    fontItems.forEach(eachFont => {
      document.body.style.setProperty(eachFont.key, (eachFont.size+this.fontCounter)+"px");
    });
  }

  changeFontSize(changeCount:number){
    this.fontCounter = (changeCount == 0) ?  changeCount: (this.fontCounter + changeCount);
    this.resizeFont();
  }

  themeController() {
    this.themeService.getThemeModeChangedSubject().subscribe((res: any) => {
      this.toggleControl = res;
    }, (error:any) => { });
    // this.themeService.setTheme();
  }
  toggleThemeMode() {
    this.themeService.toggleThemeMode();
  }
  consoleLog() {
    console.log("liolo")
  }
}