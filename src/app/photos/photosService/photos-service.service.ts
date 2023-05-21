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
    return this.http.get(this.baseURL+'/img?userid='+id,{ headers:head})
    // return this.http.get('http://localhost:4000/api/img?userid='+id,{ headers:head})
  }

  archive(data:any,head:any){
    return this.http.post(this.baseURL+'/archive',data,{headers:head})
  }

}
