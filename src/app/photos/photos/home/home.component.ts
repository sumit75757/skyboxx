import { Component, OnInit } from '@angular/core';
import { PhotosServiceService } from '../../photosService/photos-service.service';
import { ActivatedRoute } from '@angular/router';
import { HttpHeaders } from '@angular/common/http';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(private photoservice: PhotosServiceService, private activeroute: ActivatedRoute) {
    activeroute.queryParams.subscribe(params => {
      this.userId = params['id']
      this.token = params['token']
      localStorage.setItem('userid',this.userId)
      localStorage.setItem('token',this.token)


    })
  }
  userId: any
  token: any

  imageArray: any
  imageObj: any =[]
  imagePaths:any =[]

  ngOnInit(): void {
    this.imageGet()
  }
  
  imageGet() {
    
    this.imageArray = []
    this.imageObj =[]
    
    let headers = new HttpHeaders();
    headers = headers.set('Authorization', `Bearer ${this.token}`);
    console.log(headers.get('Authorization'));
    
    this.photoservice.getPhotos(this.userId, headers).subscribe((res: any) => {
      
      
      this.imageArray = res.result[0].image
      console.log(this.imageArray);
      
      for (const mainkey in this.imageArray) {
        let flag = true
        this.imageArray[mainkey].forEach((element:any) => {
          if (element.archive == false) {
            this.imageObj.forEach((savedkey:any) => {
              if (mainkey==savedkey) {
                flag = false
              }
            });
            if (flag == true) {
              
              this.imageObj.push(mainkey)
            }
         }
          
        });
      }
      console.log(this.imageObj);
      
      this.imageObj.sort(this.compareDates);
      this.imageObj.reverse()


    },
    (err) => {
      console.log(err);
      
    })
    
  }
  
  compareDates(date1: any, date2: any) {
    var parts1 = date1.split('/');  
    var parts2 = date2.split('/');  
    
    var year1 = parseInt(parts1[1]);  
    var year2 = parseInt(parts2[1]);  
    
    var month1 = parseInt(parts1[0]);  
    var month2 = parseInt(parts2[0]);  
    
    
    if (year1 < year2) {
      return -1;
    } else if (year1 > year2) {
      return 1;
    } else {
      
      if (month1 < month2) {
        return -1;
      } else if (month1 > month2) {
        return 1;
      } else {
        return 0;  
      }
    }
  }

   
  
  
  
  upload(event: any) {
    const files: any = event.target.files;
    const formData = new FormData();
    formData.append('userid', this.userId);
    for (let i = 0; i < files.length; i++) {
      const file: File = files[i];
      const { lastModified, name }: any = files[i];
      formData.append('image', file);
      formData.append('modifiedDates[]', files[i].lastModified);
      console.log(file);
    }
    
    let headers = new HttpHeaders();
    headers = headers.set('Authorization', `Bearer ${this.token}`);
    console.log(headers.get('Authorization'));
    
    this.photoservice.uploadPhotos(formData).subscribe((res: any) => {
      console.log(res.result.image);
      this.imageArray = res.result.image
      console.log(this.imageArray);
      
      this.imageObj = Object.keys(this.imageArray)
      this.imageObj.sort(this.compareDates);
      this.imageObj.reverse()
      
    }, (err) => {
      console.log(err);
      
    })
    
  }
  
  
  archive(){
    if (this.selectAll == true) {
      this.imageObj.forEach((key:any) => {
        this.imageArray[key].forEach((image:any)=>{
               this.imagePaths.push(image.img)
        })
      });
    }
    if (this.imagePaths.length >0) {
      let data={
        userid:this.userId,
        img:this.imagePaths,
        archive:true
      }
      let headers = new HttpHeaders();
      headers = headers.set('Authorization', `Bearer ${this.token}`);
      this.photoservice.archive(data,headers).subscribe(res=>{
        console.log(res);
        this.imageGet()
      
    })
     
     
   }
   
    
  }


  fetcthSelected(path:any,event:any){
   if (event.target.checked) {
    this.imagePaths.push(path)
    console.log(this.imagePaths);
   }else{
     this.imagePaths.forEach((element: any,index: any) => {
       
       if (element == path) {
        console.log(element);
        this.imagePaths.splice(index,1)
        
        console.log(this.imagePaths);
      }
      
    });
   }
  }

selectAll=false
  select(){
this.selectAll=!this.selectAll
  }
}
