import { Component, OnInit } from '@angular/core';
import { PhotosServiceService } from '../../photosService/photos-service.service';
import { ActivatedRoute } from '@angular/router';
import { HttpHeaders } from '@angular/common/http';
import { SidebarComponent } from '../../navigation/sidebar/sidebar.component';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  visible = false;


  constructor(private photoservice: PhotosServiceService, private activeroute: ActivatedRoute,public sidbar:SidebarComponent) {
    activeroute.queryParams.subscribe(params => {
      this.userId = params['id']
      this.token = params['token']
      localStorage.setItem('userid', this.userId)
      localStorage.setItem('token', this.token)


    })
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
    console.log(headers.get('Authorization'));

    this.photoservice.getPhotos(this.userId, headers).subscribe((res: any) => {
      console.log(res);


      this.imageArray = res.result[0].image
      console.log(this.imageArray);
      this.imageObj = Object.keys(this.imageArray)
      // for (const mainkey in this.imageArray) {
      //   let flag = true
      //   this.imageArray[mainkey].forEach((element:any) => {
      //     if (element.archive == false) {
      //       this.imageObj.forEach((savedkey:any) => {
      //         if (mainkey==savedkey) {
      //           flag = false
      //         }
      //       });
      //       if (flag == true) {

      //         this.imageObj.push(mainkey)
      //       }
      //    }

      //   });
      // }
      console.log(this.imageObj);
      console.log(this.imageArray);

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
    let data = {
      "image": this.image
    }
    let headers = new HttpHeaders();
    headers = headers.set('Authorization', `Bearer ${this.token}`);
    this.photoservice.archive(this.userId, data, headers).subscribe(res => {
      console.log(res);
      this.imageGet()

    })


  }

  bin(){
    let data = {
      "image": this.image
    }
    let headers = new HttpHeaders();
    headers = headers.set('Authorization', `Bearer ${this.token}`);
    this.photoservice.bin(this.userId, data, headers).subscribe(res => {
      console.log(res);
      this.imageGet()

    })
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
    else{
      this.image[key].forEach((element: any,index: any)=>{
        console.log(element._id);
        if (element._id==data._id) {
          this.image[key].splice(index,1)
          if (this.image[key].length==0) {
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
if (this.selectAll==true) {
  this.image=this.imageArray    
} else {
  this.image={}
}    


    
    this.oneSelected = this.selectAll
  }
}
