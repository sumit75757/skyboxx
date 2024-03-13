import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';

@Injectable({
  providedIn: 'root'
})
export class PhotosServiceService {
  private sidenav!:MatSidenav

  setSidenav(sidenav: MatSidenav) {
    
    this.sidenav = sidenav;
  }

  toggleSidenav(flag:any) {
    if (this.sidenav) {
      this.sidenav.toggle(flag);
    }
  }

  baseURL="https://skyboxx-api-c858.vercel.app/api"

  constructor(private http: HttpClient) { }

  uploadPhotos(formData: any) {
    return this.http.post(this.baseURL+'/img', formData)
  }

  getPhotos(id: any,head:any) {
    return this.http.get(this.baseURL+'/img?userid='+id, {headers:head})
  }
  getInfo(path:any,head:any) {
    return this.http.get(this.baseURL+'/img/info?path='+path, {headers:head})
  }

  archive(id:any,data:any,head:any){
    return this.http.post(this.baseURL+'/archive?userid='+id,data, {headers:head})
  }
  favorite(id:any,data:any,head:any){
    return this.http.post(this.baseURL+'/favorite?userid='+id,data, {headers:head})
  }
  download(id:any,imageid:any,head:any){
    return this.http.post(this.baseURL+'/download?userid='+id,imageid,{headers:head,responseType: 'blob'})
  }
  removearchive(id:any,data:any,head:any){
    return this.http.post(this.baseURL+'/archive/remove?userid='+id,data, {headers:head})
  }
  removeFavorite(id:any,data:any,head:any){
    return this.http.post(this.baseURL+'/favorite/remove?userid='+id,data, {headers:head})
  }

  bin(id:any,data:any,head:any){
    return this.http.post(this.baseURL+'/bin?userid='+id,data, {headers:head})
  }
  
  deleteForever(id:any,data:any,head:any){
    return this.http.post(this.baseURL+'/bin/deleteforever?userid='+id,data, {headers:head})
  }

  restoreBin(id:any,data:any,head:any){
    return this.http.post(this.baseURL+'/bin/restore?userid='+id,data, {headers:head})
  }

  getbin(id:any,head:any){
    return this.http.get(this.baseURL+'/bin?userid='+id, {headers:head})
  }

}
