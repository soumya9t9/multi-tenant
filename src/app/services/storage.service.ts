import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class StorageService {
  constructor() { }
  getKeyName(key:string) {
    return `${environment.storageKey}|${key}`;
  }
  getItem(key:string) :string | null{
    return localStorage.getItem(this.getKeyName(key));
  }

  setItem(key:string, value:string|any) {
    typeof value === 'object' ? value = JSON.stringify(value) : value;
    localStorage.setItem(this.getKeyName(key), value);
  }

  getParsedObject(key:string): object | null {
    try{
      const data = this.getItem(key);
      return data? JSON.parse(data) : null;
    } catch {
      return null;
    }
  }
  clear() {
    localStorage.clear();
  }



}
