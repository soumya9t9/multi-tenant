import { DOCUMENT } from '@angular/common';
import { Injectable, Inject } from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class URLService {

    constructor(@Inject(DOCUMENT) private document: Document) {
    }

    getDomainName() : string{
        return this.document.location.host.split('.')[0];
    }
}