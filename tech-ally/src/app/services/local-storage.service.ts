import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LocalStorageService {
  localStorage: Storage;

  constructor() {
    this.localStorage = window.localStorage;
  }

  get(key: string): any {
    if (this.isLocalStorageSupported) {
      let res: string = this.localStorage.getItem(key) ?? "";
      return JSON.parse(res)
    }
    return null;
  }

  set(key: string, value: any): boolean {
    if (this.isLocalStorageSupported) {
      this.localStorage.setItem(key, JSON.stringify(value));
      return true;
    }
    return false;
  }

  remove(key: string): boolean {
    if (this.isLocalStorageSupported) {
      this.localStorage.removeItem(key);
      return true;
    }
    return false;
  }

  flush() {
    this.localStorage.clear();
  }

  get isLocalStorageSupported(): boolean {
    return !!this.localStorage
  }

  isEmpty(key: string): boolean {
    if (this.isLocalStorageSupported) {
       return !this.localStorage.getItem(key)
    }
    return false
  }
}