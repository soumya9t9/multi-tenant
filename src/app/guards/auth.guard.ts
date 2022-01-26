import { Location } from '@angular/common';
import { Injectable } from '@angular/core';
import { ActivatedRoute, ActivatedRouteSnapshot, CanActivate, CanActivateChild, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AppService } from '../app.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate, CanActivateChild {
   constructor(private app: AppService, private router:Router,
     private activeRoute: ActivatedRoute, private location:Location) {}

    canActivate(
      route: ActivatedRouteSnapshot,
      state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
        const isLoggedIn = this.app.isLoggedIn();
        const urlArray = state.url.split('/');
        if(isLoggedIn && route.url.toString().includes('login')) {
          // this.router.navigateByUrl('/');
        }
        else if(this.app.tenantId === route.params.tenantId && urlArray.filter(e => e).length == 1) {
          this.router.navigate(['dashboard']);
        }
        else if(isLoggedIn && this.app.tenantId && this.app.tenantId !== route.params.tenantId) {
          // this.updateUrl(route, state);
        }
        return isLoggedIn;
    }

    canActivateChild(
      route: ActivatedRouteSnapshot,
      state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
        const isLoggedIn = this.app.isLoggedIn();
        if(isLoggedIn && this.app.tenantId && this.app.tenantId !== route.params.tenantId) {
          // this.updateUrl(route, state);
        }
        return this.app.isLoggedIn();
    }
  
    updateUrl(route:ActivatedRouteSnapshot, state: RouterStateSnapshot) {
      const urlArray = state.url.split('/');
      const [firsturl, ...urlsAfterTenantId] = urlArray[1].split('/');
      if(urlArray.filter(e => e).length === 1) {
        const urlTree = this.router.createUrlTree([this.app.tenantId, state.url], {
          queryParams: route.queryParams,
          preserveFragment:true
        });
        this.router.navigateByUrl(this.app.tenantId + state.url)
        // this.location.replaceState(urlTree.toString());
      }
      else if (urlArray.length === 2 && urlArray[0]) {
        const urlTree = this.router.createUrlTree([{segmentPath: `/${this.app.tenantId}/${urlsAfterTenantId.join('/')}`}], {
          queryParams: route.queryParams,
          preserveFragment:true
        });
        this.location.replaceState(urlTree.toString());
      } else {
        this.router.navigateByUrl('/')
      }
    }
}
