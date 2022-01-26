import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';
import { StorageService } from './services/storage.service';
import { TenantService } from './tenant/tenant.service';

@Injectable({
  providedIn: 'root'
})
export class AppService {

  public loggedout$ = new Subject<any>();
  public themeData$ = new Subject<any>();
  private _tenantId!: string | null;
  public get tenantId() : string | null {
    return this._tenantId;
  }
  
  private _clientAuth!: any;
  public get clientAuth() : any {
    return this._clientAuth;
  }
  constructor(private storageService: StorageService, 
    private router:Router, 
    private http: HttpClient,
    private tenantService: TenantService
    ) {
    this._tenantId = this.storageService.getItem('tenantId') as string;
    this._clientAuth = this.storageService.getParsedObject('clientAuth') as any;

    if(!this._tenantId) {
      this._tenantId = this.tenantService.getTenant();
      this.storageService.setItem('tenantId', this.tenantId);
    }
  }
  
  login(clientData:any) {
    this._tenantId  = clientData.tenantId;
    this.storageService.setItem('tenantId', this.tenantId);
    this._clientAuth = clientData;
    this.storageService.setItem('clientAuth', this.clientAuth);
    this.themeData$.next(true);
    this.router.navigate(['dashboard']);
  }

  isLoggedIn() { return !!(this.clientAuth && this.tenantId) }

  logout() {
    this._clientAuth = null;
    this._tenantId = null;
    this.storageService.clear();
    this.themeData$.next(false);
    this.router.navigateByUrl('/');
  }

  getSelectedTheme(){
    return this.http.get(`assets/data/getAllThemes.json`);
  }

  getAllThemes(){
    return this.http.get(`assets/data/getAllThemes.json`)
  }

  applyTheme(data:any){
    return this.http.post(`/applyTheme`, data, {params:data ,responseType:"text"});
  }

  saveTheme(theme:any){
    return this.http.post(`/saveTheme`, theme, {responseType:"text"});
  }
}
