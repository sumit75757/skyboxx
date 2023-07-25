import { Component, HostListener, OnInit, ViewChild } from '@angular/core';
import { PhotosServiceService } from '../../photosService/photos-service.service';
import { ActivatedRoute } from '@angular/router';
import { HttpHeaders } from '@angular/common/http';
import { SidebarComponent } from '../../navigation/sidebar/sidebar.component';
import { saveAs } from 'file-saver';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  visible = false;
  isContent: any;
  fullScreenVisiblity = false
  fullScreenImgArray: any[] =[]
  infovisiblity:boolean =false


  constructor(private photoservice: PhotosServiceService, private activeroute: ActivatedRoute, public sidbar: SidebarComponent) {
    // activeroute.queryParams.subscribe(params => {
    //   if (params['id'] == undefined) {
        this.userId = localStorage.getItem('userid')
        this.token = localStorage.getItem('token')
    //     // console.log(this.userId);
    //     if (this.userId == undefined) {
    //       location.replace('http://localhost:4200/')
    //     }
    //     if (this.userId == null) {
    //       location.replace('http://localhost:4200/')
    //     }
    //   } else {
    //     this.userId = params['id']
    //     this.token = params['token']
    //     localStorage.setItem('userid', this.userId)
    //     localStorage.setItem('token', this.token)
    //   }
    // })
  }

  userId: any
  token: any

  selectAll = false
  oneSelected = false

  imageArray: any
  imageObj: any = []

  // imagePaths: any = []
  image: { [key: string]: any[] } = {};

  ngOnInit(): void {
    this.imageGet()

  }

  imageGet() {
    this.imageArray = []
    this.imageObj = []

    let headers = new HttpHeaders();
    headers = headers.set('Authorization', `Bearer ${this.token}`);
    this.photoservice.getPhotos(this.userId, headers).subscribe((res: any) => {
      this.imageArray = res.result[0].image
      // this.imageObj = Object.keys(this.imageArray)
      for (const mainkey in this.imageArray) {
        let flag = true
        this.imageArray[mainkey].forEach((element: any) => {
          if (element.archive == false) {
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

  archive() {
    if (Object.keys(this.image).length) {
      if (confirm("Confirm Archive")) {
        let data = {
          "image": this.image
        }
        let headers = new HttpHeaders();
        headers = headers.set('Authorization', `Bearer ${this.token}`);
        this.photoservice.archive(this.userId, data, headers).subscribe(res => {
          this.imageGet()
          this.selectAll = false
          this.oneSelected = false
          this.image = {}

        })
      }
    } else {
      alert("Select Something To Archive")
    }
  }
  
  bin() {
    if (Object.keys(this.image).length != 0) {
      if (confirm("Bin the Image")) {
        let data = {
          "image": this.image
        }
        console.log(data);
        
        let headers = new HttpHeaders();
        headers = headers.set('Authorization', `Bearer ${this.token}`);
        this.photoservice.bin(this.userId, data, headers).subscribe(res => {
          console.log(res);
          this.imageGet()
          this.selectAll = false
          this.oneSelected = false
          this.image = {}
        })
      }
    } else {
      alert("Select Something To Bin")
    }
  }
test(event:any){
console.log(event);

}
  fetcthSelected(data: any, key: any, event: any) {
    // console.log(data);

    let allKeys = Object.keys(this.image)
    if (event.target.checked) {
      let found = false
      this.oneSelected = true
      
      allKeys.forEach(el => {
        if (el == key) {
          found = true
        }
      })
      
      if (found == false) {
        this.image[key] = []
        this.image[key].push(data)
      } else {
        this.image[key].push(data)
        
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
    // console.log(this.image);
  }
  
  select() {
    this.selectAll = !this.selectAll
    if (this.selectAll == true) {
      this.imageObj.forEach((key: any) => {
        this.imageArray[key].forEach((imageData: any) => {
          if (imageData.archive == false) {
            if (Object.keys(this.image).length == 0) {
              this.image[key] = []
              this.image[key].push(imageData)
            } else {
              let flag = false
              Object.keys(this.image).forEach(imgKey => {
                if (imgKey == key) {
                  flag = true
                }
              })
              if (flag) {
                this.image[key].push(imageData)
              } else {
                this.image[key] = []
                this.image[key].push(imageData)
              }
              
            }
          }
        });
      });
      
      // console.log(this.image);
      
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
        if (imgData.archive == false) {
          
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
      this.infovisiblity = false
      
    }
  }

  @HostListener('document:keydown.arrowleft')
  prev() {
    if (this.index != 0) {
      this.index--
      this.infovisiblity = false
    }
  }
  
  closeImgFullScreen() {
    
    this.photoservice.toggleSidenav(true)
    
    
    this.fullScreenVisiblity = false
    this.infovisiblity = false
  }
imgSize:any
imgName:any
  info(){

    this.infovisiblity = !this.infovisiblity
        let name = this.fullScreenImgArray[this.index].split('/').pop();
        let pos = name.indexOf('Z')
         this.imgName = name.substring(pos + 2)

    
    console.log(this.fullScreenImgArray[this.index]);
    let headers = new HttpHeaders();
    headers = headers.set('Authorization', `Bearer ${this.token}`);
    this.photoservice.getInfo(this.fullScreenImgArray[this.index], headers).subscribe((res:any)=>{
this.imgSize = (res.stats.size/(1024*1000)).toFixed(2)      
    })
    
  }

  download() {
    if (Object.keys(this.image).length) {
    let imageId: any[] = []
    let keys = Object.keys(this.image)
    
    keys.forEach(key => {
      this.image[key].forEach(singleImg => {
        imageId.push(singleImg._id)
      });
    });

    let headers = new HttpHeaders();
    headers = headers.set('Authorization', `Bearer ${this.token}`);
    this.photoservice.download(this.userId, imageId, headers).subscribe((res: any) => {
      
      
      if (imageId.length > 1) {
        saveAs(res, 'Photos.zip')
      } else {
        let tempName = this.image[keys[0]][0].img
        let fileType = tempName.split('.').pop();
        let name = tempName.split('/').pop();
        let pos = name.indexOf('Z')
        const imgName = name.substring(pos + 2)
        const blob = new Blob([res], { type: `image/${fileType}` });
        console.log(blob);
        saveAs(blob, imgName);
      }
      
    });
  }else {
      alert("Select Something To Download")
    }
  }

  favorite(){
    if (Object.keys(this.image).length) {
      if (confirm("Confirm Favorite")) {
        let data = {
          "image": this.image
        }
        let headers = new HttpHeaders();
        headers = headers.set('Authorization', `Bearer ${this.token}`);
        this.photoservice.favorite(this.userId, data, headers).subscribe(res => {
          this.imageGet()
          this.selectAll = false
          this.oneSelected = false
          this.image = {}

        })
      }
    } else {
      alert("Select Something To Favorite")
    }
  }
  
}
