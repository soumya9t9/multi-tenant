import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import { StorageService } from '../services/storage.service';
import { URLService } from './url.service';
import {  map } from 'rxjs/operators';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class TenantService {

  constructor(
    private urlService: URLService,
    private router: Router,
    private httpClient: HttpClient,
    private storageService: StorageService,
    private route:ActivatedRoute) { }

  getTenant(): string {
    if (this.router.url.includes(environment.appUrl)) {
      return this.urlService.getDomainName();
    } else {
      return '';
    }
  }

  getTenantId(): string | null {
    return this.storageService.getItem("tenantID");
  }

  fetchTenantId(): Observable<any> {
    return this.httpClient.get('assets/getTenantID?tenant=client1')
    .pipe(map(res => res));
    // .pipe(map(res =>  5 || this.storageService.setItem("tenantID", res));

  }

  getTenantIdFromRoute(): string {
    return this.route.snapshot.params.tenantID;
  }

  addTenantToHeaders(headers: HttpHeaders): HttpHeaders {
    const tenantID = this.getTenantId()
    return tenantID ? headers.append("X-Tenant-ID", tenantID): headers;
  }
}
