import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { HomeserviceService } from '../homeservice.service';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class AuthComponent implements OnInit {
  constructor(private router:ActivatedRoute,private route:Router, private fb:FormBuilder, private homeservice:HomeserviceService) { }
  fr_type:any
  isDarkEnable:any
 
  
  signup=this.fb.group({
    username:new FormControl('',Validators.required),
    email:new FormControl('',[Validators.required, Validators.email]),
    password:new FormControl('',Validators.required),
  })
  signin=this.fb.group({
    email:new FormControl('',[Validators.required, Validators.email]),
    password:new FormControl('',Validators.required),
  })

  ngOnInit(): void {
    this.isDarkEnable= JSON.parse(localStorage.getItem('theme')+'')

    this.router.paramMap.subscribe(res=>{
      this.fr_type=res.get('type')      
    })
  }

  register(){
    if (this.signup.valid) {
     this.homeservice.signup(this.signup.value).subscribe((res:any)=>{
      delete res.useData.password
       delete res.response
       localStorage.setItem("user",JSON.stringify(res))
       this.route.navigate([''])
       
       
      })
    }
    
  }
  login(){
    if (this.signin.valid) {
      this.homeservice.signin(this.signin.value).subscribe((res:any)=>{
        delete res.useData.password
        delete res.response
        
        localStorage.setItem("user",JSON.stringify(res))
        this.route.navigate([''])
       console.log(res);
      
     })
    }
    
  }

}
