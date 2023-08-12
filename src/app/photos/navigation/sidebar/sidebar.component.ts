import { HttpHeaders } from '@angular/common/http';
import { Component, OnInit, AfterViewInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PhotosServiceService } from '../../photosService/photos-service.service';
import { MatSidenav } from '@angular/material/sidenav';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit, AfterViewInit {
  @ViewChild('sidenav', { static: false }) sidenav!: MatSidenav

  userId: any
  token: any
  imageType = [
    "AVIF",
    "JPEG", 
    "JPG",
    "PNG",
    "GIF",
    "BMP",
    "TIFF",
    "SVG",
    "MP4",
    "AVI",
    "MOV",
    "WMV",
    "FLV",
    "WebM",
    "MPEG",
    "MKV",
    "WEBP",
  ]
  constructor(private photoservice: PhotosServiceService, private activeroute: ActivatedRoute) {

    this.userId = localStorage.getItem('userid')
    this.token = localStorage.getItem('token')
    this.isDarkEnable = localStorage.getItem('theme')

    if (this.userId == null || this.token == null || this.isDarkEnable == null) {
      activeroute.queryParams.subscribe(params => {
        if (params['id'] == undefined) {
  
          
            location.replace('http://localhost:4200/')
          
        } else {
          this.userId = params['id']
          this.token = params['token']
          this.isDarkEnable = params['theme']
          localStorage.setItem('userid', this.userId)
          localStorage.setItem('token', this.token)
          localStorage.setItem('theme', this.isDarkEnable)
        }
      })

    }
  }

  isDarkEnable: any;
  ngOnInit(): void {

    // this.photoservice.setSidenav()
  }
  ngAfterViewInit(): void {
    this.photoservice.setSidenav(this.sidenav)
  }

  public doSomething(date: any) {
    // console.log('Picked date: ', date);
    this.isDarkEnable = date;
    // console.log(this.isDarkEnable);

  }
  public togle(side: any) {
    console.log(side);
    side.toggle()
  }


  imageArray: any
  imageObj: any

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
   let flag

    const files: any = event.target.files;
    const formData = new FormData();
    formData.append('userid', this.userId);
    for (let i = 0; i < files.length; i++) {
      flag = false
     let fileType= files[i].type.split('/').pop()
      this.imageType.forEach(type => {
        if (fileType.toLowerCase() == type.toLowerCase()) {
          
          const file: File = files[i];
          const { lastModified, name }: any = files[i];
          formData.append('image', file);
          formData.append('modifiedDates[]', files[i].lastModified);
          console.log(file);
          
          flag = true
        }
        });
        if (!flag) {
          alert(`File named ${files[i].name} with type ${fileType.toUpperCase()} is not Allowed`)
          break
        }
    }

   if (flag) {
    let headers = new HttpHeaders();
    headers = headers.set('Authorization', `Bearer ${this.token}`);
    console.log(headers.get('Authorization'));
    this.photoservice.uploadPhotos(formData).subscribe((res: any) => {
      // location.reload()


    }, (err) => {
      console.log(err);

    })
   }

  }


  navigation: any = [
    {
      title: "Photos",
      path: "/",
      icon: "fa fa-home"

    },
    {
      title: "Archive",
      path: "/archive",
      icon: "fa fa-archive"
    },
    {
      title: "Bin",
      path: "/bin",
      icon: "fa fa-trash"
    },
    {
      title: "Favorites",
      path: "/favorite",
      icon: "fa fa-star"
    }
  ]

}
