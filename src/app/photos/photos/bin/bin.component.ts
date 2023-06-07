import { HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
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
      }else{
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
    }
  }

  restore() {
    if (confirm("Restore")) {
      let data = {
        "image": this.image
      }
      let headers = new HttpHeaders();
      headers = headers.set('Authorization', `Bearer ${this.token}`);
      this.photoservice.restoreBin(this.userId, data, headers).subscribe(res => {
        console.log(res);
        this.getImage()
      })
    }

  }

  deleteForever(){
    if (confirm("Delete Forever")) {
      let data = {
        "image": this.image
      }
      let headers = new HttpHeaders();
      headers = headers.set('Authorization', `Bearer ${this.token}`);
      this.photoservice.deleteForever(this.userId, data, headers).subscribe(res => {
        console.log(res);
        this.getImage()
      })
    }
  }

  select() {
    this.selectAll = !this.selectAll
    if (this.selectAll == true) {
      this.image = this.imageArray
      this.oneSelected = true
    } else {
      this.image = []
      this.oneSelected=false
    }
    console.log(this.image);
    


    // this.oneSelected = this.selectAll
  }

}
