import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DriveService {
  baseURL="http://localhost:4000/api"
  constructor(private http:HttpClient) { }

  makeDirectory(data:any){
    return this.http.post(this.baseURL+'/drive',data)
  }
  drivedownload(data:any){
    return this.http.post(this.baseURL+'/drive/download',data,{ responseType: 'blob' })
  }
  fileUpload(data:any){
    return this.http.post(this.baseURL+'/drive/fileupload',data)
  }
  getDirectories(path:any){
    return this.http.get(this.baseURL+'/drive?path='+path)
  }
  addtobin(data:any){
    return this.http.post(this.baseURL+'/drive/bin',data)
  }
  restorebin(data:any){
    return this.http.post(this.baseURL+'/drive/bin/restore',data)
  }
  getbinDirectories(userid:any){
    return this.http.get(this.baseURL+'/drive/bin?userid='+userid)
  }
}
