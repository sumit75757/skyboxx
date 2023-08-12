import { HttpHeaders } from '@angular/common/http';
import { Component, HostListener, OnInit } from '@angular/core';
import { PhotosServiceService } from '../../photosService/photos-service.service';

@Component({
  selector: 'app-favorites',
  templateUrl: './favorites.component.html',
  styleUrls: ['./favorites.component.css']
})
export class FavoritesComponent implements OnInit {

  token: any
  userId: any
  imageArray: any
  imageObj: any = []
  imagePaths: any = []
  selectAll = false
  oneSelected = false
  isContent: any
  image: { [key: string]: any[] } = {};
  fullScreenVisiblity = false
  fullScreenImgArray: any[]=[]

  constructor(private photoservice: PhotosServiceService) {
    this.token = localStorage.getItem("token")
    this.userId = localStorage.getItem("userid")

  }

  ngOnInit(): void {
    this.imageGet()
  }
  imageGet() {
    this.imageArray = []
    this.imageObj = []


    let headers = new HttpHeaders();
    headers = headers.set('Authorization', `Bearer ${this.token}`);
    console.log(headers.get('Authorization'));

    this.photoservice.getPhotos(this.userId, headers).subscribe((res: any) => {


      this.imageArray = res.result[0].image
      console.log(this.imageArray);

      for (const mainkey in this.imageArray) {
        let flag = true
        this.imageArray[mainkey].forEach((element: any) => {
          if (element.favorite == true) {
            this.imageObj.forEach((savedkey: any) => {
              if (mainkey == savedkey) {
                flag = false
              }
            });
            if (flag == true) {

              this.imageObj.push(mainkey)
            }
          }

        });
      }
      if (this.imageObj.length == 0) {
        this.isContent = false
      } else {
        this.isContent = true
      }
      console.log(this.isContent);

      // this.imageObj.sort(this.compareDates); 
      this.imageObj.reverse()


    },
      (err: any) => {
        console.log(err);

      })

  }
 

  unFavorite() {
    if (Object.keys(this.image).length != 0) {
      console.log(this.image);
          
      if (confirm("Confirm UnFavorite")) {
        let data = {
          "image": this.image
        }
        let headers = new HttpHeaders();
        headers = headers.set('Authorization', `Bearer ${this.token}`);
        this.photoservice.removeFavorite(this.userId, data, headers).subscribe(res => {
          console.log(res);
          this.selectAll = false
          this.imageGet()
          this.selectAll=false
          this.oneSelected = false
          
        })
      }
      
      
    }else{
      alert("Select Something To remove from Favorite")
    }
    }
    
    
    fetcthSelected(data: any, key: any, event: any) {
      let allKeys = Object.keys(this.image)
      if (event.target.checked) {
        this.oneSelected = true
        if (allKeys.length == 0) {
          this.image[key] = []
          this.image[key].push(data)
        } else {
          allKeys.forEach(k => {
            if (k == key) {
              this.image[key].push(data)
            } else {
              this.image[key] = []
              this.image[key].push(data)
            }
          })
        }
      }
        else {
          this.image[key].forEach((element: any, index: any) => {
            if (element._id == data._id) {
              this.image[key].splice(index, 1)
              if (this.image[key].length == 0) {
                delete this.image[key]
              }
            }
          })
          if (Object.keys(this.image).length == 0) {
            this.oneSelected = false
          }
        }
        console.log(this.image);
    
    
    
      }
    
      select() {
        this.selectAll = !this.selectAll
        if (this.selectAll == true) {
          this.imageObj.forEach((key:any) => {
            this.imageArray[key].forEach((imageData:any) => {
             if (imageData.archive == true) {
              if( Object.keys(this.image).length ==0){
                this.image[key] = []
                this.image[key].push(imageData)
                          }else{
                            let flag =false
                            Object.keys(this.image).forEach(imgKey =>{
                              if(imgKey == key){
                                flag = true
                              }
                            })
                            if (flag) {
                              this.image[key].push(imageData)
                          }else{
                            this.image[key]=[]
                            this.image[key].push(imageData)
                          }
                            
                          }
             }
            });
          });
        } else {
          this.image = {}
        }
    
    
    
        this.oneSelected = this.selectAll
      }

      index: any
  
      imgFullScreen(url: any) {
        this.fullScreenImgArray = []
        this.photoservice.toggleSidenav(false)
        // this.img=url
        this.imageObj.forEach((key: any) => {
          this.imageArray[key].forEach((imgData: any) => {
            if (imgData.favorite == true) {
              
              this.fullScreenImgArray.push(imgData.img)
            }
          })
        });
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
