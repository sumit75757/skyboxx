import { HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { PhotosServiceService } from '../../photosService/photos-service.service';

@Component({
  selector: 'app-archive',
  templateUrl: './archive.component.html',
  styleUrls: ['./archive.component.css']
})
export class ArchiveComponent implements OnInit {

  token:any
  userId:any
  imageArray: any
  imageObj: any =[]
  imagePaths:any =[]

  constructor( private photoservice:PhotosServiceService ) {
this.token =localStorage.getItem("token")
this.userId =localStorage.getItem("userid")

   }

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
          if (element.archive == true) {
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
        archive:false
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
