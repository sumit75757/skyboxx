import { Component, OnInit } from '@angular/core';
import {  Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {  
  constructor(private route:Router) { }
isLogedin:any
userID:any
token:any
  isDarkEnable:any=false
   host =  location.host+''
  ngOnInit(): void {
    // console.log(this.host);
    
    this.isDarkEnable= JSON.parse(localStorage.getItem('theme')+'')
    this.isLogedin=localStorage.getItem('user')
    this.isLogedin = JSON.parse(this.isLogedin)
    console.log(this.isLogedin);
    
    this.userID=this.isLogedin.useData._id
        this.token = this.isLogedin.token  
  }

  changeTheme(){
    this.isDarkEnable = this.isDarkEnable ? false : true;
    localStorage.setItem('theme', this.isDarkEnable)
    
  }

  redirect(path:any){
    window.open('http://'+path+'.localhost:4200?id='+this.userID+'&token='+this.token, '_self')
  }
  
 
}
