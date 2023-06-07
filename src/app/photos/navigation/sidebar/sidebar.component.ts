import { HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PhotosServiceService } from '../../photosService/photos-service.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {
  userId: any
  token: any
  constructor(private photoservice: PhotosServiceService, private activeroute: ActivatedRoute) {
    activeroute.queryParams.subscribe(params => {
      if (params['id'] == undefined) {
        this.userId = localStorage.getItem('userid')        
        this.token = localStorage.getItem('token')
        console.log(this.userId);
        if (this.userId == undefined) {
          location.replace('http://localhost:4200/')
        }
        if (this.userId==null) {
          location.replace('http://localhost:4200/')
        }
      } else {
        this.userId = params['id']
        this.token = params['token']
        localStorage.setItem('userid', this.userId)
        localStorage.setItem('token', this.token)
      }
    })
  }

  isDarkEnable: any;
  ngOnInit(): void {
     

  }

  public doSomething(date: any) {
    // console.log('Picked date: ', date);
    this.isDarkEnable = date;
    console.log(this.isDarkEnable);
    
  }
  public togle(side: any) {
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
      location.reload()


    }, (err) => {
      console.log(err);

    })

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
    }
  ]

}
