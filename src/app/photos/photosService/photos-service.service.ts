import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class PhotosServiceService {

  baseURL="http://localhost:4000/api"

  constructor(private http: HttpClient) { }

  uploadPhotos(formData: any) {
    return this.http.post(this.baseURL+'/img', formData)
  }

  getPhotos(id: any,head:any) {
    return this.http.get(this.baseURL+'/img?userid='+id, {headers:head})
  }

  archive(id:any,data:any,head:any){
    return this.http.post(this.baseURL+'/archive?userid='+id,data, {headers:head})
  }
  bin(id:any,data:any,head:any){
    return this.http.post(this.baseURL+'/bin?userid='+id,data, {headers:head})
  }

}
