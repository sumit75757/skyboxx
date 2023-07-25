import { HttpHeaders } from '@angular/common/http';
import { Component, HostListener, OnInit } from '@angular/core';
import { PhotosServiceService } from '../../photosService/photos-service.service';

@Component({
  selector: 'app-bin',
  templateUrl: './bin.component.html',
  styleUrls: ['./bin.component.css']
})
export class BinComponent implements OnInit {

  token: any
  userId: any
  selectAll = false
  oneSelected = false
  imageArray: any
  image: any = []
  isContent = true
  fullScreenVisiblity = false
  fullScreenImgArray: any


  constructor(private photoservice: PhotosServiceService) {
    this.userId = localStorage.getItem('userid')
    this.token = localStorage.getItem('token')


  }

  ngOnInit(): void {
    this.getImage()
   
  }

  getImage() {

    let headers = new HttpHeaders();
    headers = headers.set('Authorization', `Bearer ${this.token}`);
    console.log(headers.get('Authorization'))

    this.photoservice.getbin(this.userId, headers).subscribe((res: any) => {
      console.log(res);
      
      if (res.result.length !=0) {
        this.imageArray = res.result[0].image
          this.isContent = true
          
        }else{
          
          this.isContent = false
        this.imageArray=[]
      }
      console.log(this.imageArray);


    })

  }

  fetcthSelected(data: any, event: any) {
    if (event.target.checked) {
      this.oneSelected = true
      this.image.push(data)
    }
    else {
      this.image.forEach((element: any, index: any) => {
        if (element._id == data._id) {
          this.image.splice(index, 1)
        }
      });
      if (this.image.length == 0) {
        this.oneSelected = false
      }
      console.log(this.image);
      
    }
  }

  // fetcthSelected(data: any, key: any, event: any) {
  //   // console.log(data);

  //   let allKeys = Object.keys(this.image)
  //   if (event.target.checked) {
  //     let found = false
  //     this.oneSelected = true
      
  //     allKeys.forEach(el => {
  //       if (el == key) {
  //         found = true
  //       }
  //     })
      
  //     if (found == false) {
  //       this.image[key] = []
  //       this.image[key].push(data)
  //     } else {
  //       this.image[key].push(data)
        
  //     }
      
  //   }
  //   else {
  //     this.image[key].forEach((element: any, index: any) => {
  //       if (element._id == data._id) {
  //         this.image[key].splice(index, 1)
  //         if (this.image[key].length == 0) {
  //           delete this.image[key]
  //         }
  //       }
  //     })
  //     if (Object.keys(this.image).length == 0) {
  //       this.oneSelected = false
  //     }
  //   }
  //   // console.log(this.image);
  // }

  restore() {
    if (Object.keys(this.image).length !=0) {
      
      if (confirm("Restore")) {
        let data = {
          "image": this.image
        }
        let headers = new HttpHeaders();
        headers = headers.set('Authorization', `Bearer ${this.token}`);
        this.photoservice.restoreBin(this.userId, data, headers).subscribe(res => {
          console.log(res);
          this.getImage()
          this.image = {}

          this.selectAll=false
          this.oneSelected =false
        })
      }
      
    }else{
      alert("Select Something To Restore")
    }
  }
  
  deleteForever(){
    if (Object.keys(this.image).length !=0) {
      
      if (confirm("Delete Forever")) {
        let data = {
          "image": this.image
        }
        
        let headers = new HttpHeaders();
        headers = headers.set('Authorization', `Bearer ${this.token}`);
        this.photoservice.deleteForever(this.userId, data, headers).subscribe(res => {
          console.log(res);
          this.getImage()
          this.image = {}

          this.selectAll=false
          this.oneSelected =false

        })
      }
    }else{
      alert("Select Something To Delete Forever")
    }
  }
  
  select() {
    this.selectAll = !this.selectAll
    if (this.selectAll == true) {
      console.log(this.imageArray);
      this.imageArray.forEach((img:any) => {
        this.image.push(img)
      });
      this.oneSelected = true
    } else {
      this.image = []
      this.oneSelected=false
    }
    console.log(this.image);
    


    // this.oneSelected = this.selectAll
  }

  index: any
  
  imgFullScreen(url: any) {
    this.fullScreenImgArray = []
    this.photoservice.toggleSidenav(false)
    // this.img=url
   
      this.imageArray.forEach((imgData: any) => {
       
          
          this.fullScreenImgArray.push(imgData.img)
        
      })
  
    this.fullScreenImgArray.forEach((img: any, ind: any) => {
      if (img == url) {
        this.index = ind
      }
    })
    console.log(this.index);
    
    this.fullScreenVisiblity = true
    
  }
  
  @HostListener('document:keydown.arrowright')
  next(): void {
    if (this.fullScreenImgArray.length - 1 != this.index) {
      this.index++
      
    }
  }

  @HostListener('document:keydown.arrowleft')
  prev() {
    if (this.index != 0) {
      this.index--
    }
  }
  
  closeImgFullScreen() {
    
    this.photoservice.toggleSidenav(true)
    
    
    this.fullScreenVisiblity = false
  }

}
