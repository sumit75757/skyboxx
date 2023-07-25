import { HttpHeaders } from '@angular/common/http';
import { Component, HostListener, OnInit } from '@angular/core';
import { PhotosServiceService } from '../../photosService/photos-service.service';
import { SidebarComponent } from '../../navigation/sidebar/sidebar.component';

@Component({
  selector: 'app-archive',
  templateUrl: './archive.component.html',
  styleUrls: ['./archive.component.css']
})
export class ArchiveComponent implements OnInit {

  token: any
  userId: any
  imageArray: any
  imageObj: any = []
  imagePaths: any = []
  selectAll = false
  oneSelected = false
  isContent:any
  fullScreenVisiblity = false
  fullScreenImgArray: any
  image: { [key: string]: any[] } = {};

  constructor(private photoservice: PhotosServiceService,public sidbar: SidebarComponent) {
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
          if (element.archive == true) {
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
}else{
this.isContent =true
}
console.log(this.isContent);

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

  unArchive() {
if (Object.keys(this.image).length != 0) {
      
  if (confirm("Confirm Restore")) {
    let data = {
      "image": this.image
    }
    let headers = new HttpHeaders();
    headers = headers.set('Authorization', `Bearer ${this.token}`);
    this.photoservice.removearchive(this.userId, data, headers).subscribe(res => {
      console.log(res);
      this.selectAll = false
      this.imageGet()
      this.selectAll=false
      this.oneSelected = false
      
    })
  }
  
  
}else{
  alert("Select Something To UnArchive")
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
        if (imgData.archive == true) {
          
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

