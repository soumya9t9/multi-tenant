import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { StorageService } from './services/storage.service';

@Injectable({
  providedIn: 'root'
})
export class AppService {

  private _tenantId!: string | null;
  public get tenantId() : string | null {
    return this._tenantId;
  }
  
  private _clientAuth!: any;
  public get clientAuth() : any {
    return this._clientAuth;
  }
  constructor(private storageService: StorageService, private router:Router) {
    this._tenantId = this.storageService.getItem('tenantId') as string;
    this._clientAuth = this.storageService.getParsedObject('clientAuth') as any;
  }
  
  login(clientData:any) {
    this._clientAuth = clientData;
    this._tenantId  = clientData.tenantId;
    this.storageService.setItem('clientAuth', this.clientAuth);
    this.storageService.setItem('tenantId', this.tenantId);
    this.router.navigate(['', this.tenantId, 'dashboard']);
  }

  isLoggedIn() { return !!(this.clientAuth && this.tenantId) }

  logout() {
    this._clientAuth = null;
    this._tenantId = null;
    this.storageService.clear();
    this.router.navigateByUrl('/');
  }
}
