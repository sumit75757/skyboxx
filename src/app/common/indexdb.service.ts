import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class IndexdbService {
  private db: IDBDatabase|any; 

  constructor() {
    this.initDB();
  }

  private initDB(): void {
    const request = indexedDB.open('userDetails', 1);

    request.onupgradeneeded = (event: any) => {
      this.db = event.target.result;
      this.db.createObjectStore('user', { keyPath: 'id', autoIncrement: true });
    };

    request.onsuccess = (event: any) => {
      this.db = event.target.result;
    };
  }

  public addItem(item: any): void {
    const transaction = this.db.transaction('user', 'readwrite');
    const store = transaction.objectStore('user');
    store.add(item);
  }

  public getAllItems(): Promise<any[]> {
    return new Promise((resolve, reject) => {
      const transaction = this.db.transaction('user', 'readonly');
      const store = transaction.objectStore('user');
      const request = store.getAll();

      request.onsuccess = (event: any) => {
        resolve(event.target.result);
      };

      request.onerror = (event: any) => {
        reject(event.target.error);
      };
    });
  }
}
