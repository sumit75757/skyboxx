import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class HomeserviceService {

  constructor(private http:HttpClient) { }
  
  baseURL='http://localhost:4000/api/auth'

signup(data:any){
 return this.http.post(this.baseURL+'/singup',data)
}
signin(data:any){
 return this.http.post(this.baseURL+'/singin',data)
}

}
