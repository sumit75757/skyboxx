import { HttpHeaders } from '@angular/common/http';
import { Component, OnInit, AfterViewInit, ViewChild } from '@angular/core';

import { ActivatedRoute } from '@angular/router';
import { MatSidenav } from '@angular/material/sidenav';
import { DriveService } from '../../driveService/drive.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit, AfterViewInit {
  @ViewChild('sidenav', { static: false }) sidenav!: MatSidenav

  userId: any
  token: any
  isDropdownVisible = false
  newFolder = false
  fileCountObject: any
  folderName: any
  type: any
  fileToUpload: any[] = []
  folderToUpload: any[] = []
  selectedOption: any
  isReadyToUpload = true

  constructor(private activeroute: ActivatedRoute, private driveService: DriveService) {


    if (window.location.href === `http://drive.localhost:4200/?id=${localStorage.getItem('userid')}&token=${localStorage.getItem('token')}&theme=${localStorage.getItem('theme')}`) {


      localStorage.removeItem('path')
    }


    activeroute.queryParams.subscribe(params => {
      if (params['id'] == undefined) {

        this.userId = localStorage.getItem('userid')
        this.token = localStorage.getItem('token')
        this.isDarkEnable = localStorage.getItem('theme')
        if (this.userId == null || this.token == null || this.isDarkEnable == null) {

          location.replace('http://localhost:4200/')
        }

      } else {


        this.userId = params['id']
        this.token = params['token']
        this.isDarkEnable = params['theme']
        localStorage.setItem('userid', this.userId)
        localStorage.setItem('token', this.token)
        localStorage.setItem('theme', this.isDarkEnable)
        location.replace('http://drive.localhost:4200/')

      }
    })

  }

  isDarkEnable: any;
  ngOnInit(): void {
    console.log();

    // this.photoservice.setSidenav()
  }
  ngAfterViewInit(): void {
  }

  public doSomething(date: any) {
    // console.log('Picked date: ', date);
    this.isDarkEnable = date;
    // console.log(this.isDarkEnable);

  }
  public togle(side: any) {
    side.toggle()
  }


  togggle() {

    this.isDropdownVisible = !this.isDropdownVisible

  }

  createNewFolder() {
    this.type = 'createFolder'
    this.newFolder = !this.newFolder
  }
  uploadNewFile() {
    this.type = 'uploadFile'
    this.newFolder = !this.newFolder
  }
  uploadNewFolder() {
    this.type = 'uploadFolder'
    this.newFolder = !this.newFolder
  }
  uploadFolder(event?: any) {

    const inputElement = event.target as HTMLInputElement;
    if (inputElement.files && inputElement.files.length > 0) {
      const selectedFolder = inputElement.files; // Get the selected folder
      // Process the selected folder here (e.g., read folder contents, prepare for upload, etc.)
      console.log(selectedFolder.length);

      for (let index = 0; index < selectedFolder.length; index++) {
        const element = selectedFolder[index];
        this.fileToUpload.push(element)

      }
      console.log(this.fileToUpload);


    }


  }
  uploadFile(toRun: any, event?: any) {
    this.driveService.getDirectories(localStorage.getItem('path')).subscribe((res: any) => {
      if (toRun) {
        if (this.fileToUpload.length) {

          if (this.isReadyToUpload) {
            let path = localStorage.getItem('path') == null ? this.userId : localStorage.getItem('path')
            let formData = new FormData()
            let folderCount :any[]=[]
            formData.append('path', path)

            // console.log(this.fileToUpload[0].webkitRelativePath.split("/")[0]);
            if (res.msg == 'Found') {
              res.foldersArray.forEach((item: any, index: any) => {
                // console.log(item.lastIndexOf('('));
                let tempitem = item.substring(0, item.lastIndexOf('(')) + item.substring(item.lastIndexOf(')') + 1)
                if (tempitem == this.fileToUpload[0].webkitRelativePath.split("/")[0]) {
                  folderCount.push(Number(item.substring(item.lastIndexOf('(') + 1, item.lastIndexOf(')'))))

                  // this.isReadyToUpload = false
                  // this.fileCount++
                }
              })
            }

            this.fileToUpload.forEach(file => {

              if (file.webkitRelativePath) {
                let folderpath = file.webkitRelativePath.replaceAll('/', '~^')
                // console.log(folderCount);
                
                let number = 0
                for (let i = 0; i > -1; i++) {
                  let isAvailable = true
                 folderCount.forEach((e: any) => {
                    if (e==i) {
                      isAvailable = false
                    }
                  });
                  if (isAvailable == true) {
                    number = i
                    break
                  }
                }
                console.log(number);
                
                if (number==0) {
                  
                  // formData.append('file', file)
                  formData.append('file', file, folderpath)
                }else{
                  let splitPath = folderpath.split('~^')

                  splitPath[0] = `${folderpath.split('~^')[0]}(${number})`
                  folderpath = splitPath.join("~^")
                  formData.append('file', file, folderpath)
                }
                console.log(folderpath);

              } else {

                formData.append('file', file)
              }

            })

            console.log(formData);

            this.driveService.fileUpload(formData).subscribe((res: any) => {
              alert(res.msg);
              location.reload() 

            })
          } else {

            this.type = 'replaceFile'

          }


        } else {
          alert('upload File First')
        }
      } else {
        console.log(event);
        this.fileToUpload = event.addedFiles

        console.log(this.fileToUpload);
        if (res.msg == 'Found') {

          this.fileToUpload.forEach((uploadItem: any, index: any) => {
            let temp: any[] = []
            res.filesArray.forEach((item: any) => {
              // console.log()
              let tempitem = item.substring(0, item.lastIndexOf('(')) + item.substring(item.lastIndexOf(')') + 1)

              if (tempitem == uploadItem.name) {
                this.isReadyToUpload = false
                temp.push(Number(item.substring(item.lastIndexOf('(') + 1, item.lastIndexOf(')'))))
                // this.fileCount++
              }
            })
            console.log("hello");

            // this.fileCountObject.push(this.fileCount)
            // console.log(temp);

            this.fileCountObject = {
              ...this.fileCountObject,
              [index]: temp.length?temp:'nothing'
            }


          });
        }

        console.log(this.fileToUpload);


      }
    })
  }

  uploadExistedFile() {
    console.log(this.fileToUpload);
    console.log(this.fileCountObject);
    
    
    if (this.selectedOption == "keepBoth") {

      let createNewFiles = this.fileToUpload
      this.fileToUpload = []


      createNewFiles.forEach((file: any, index: any) => {
        if (this.fileCountObject[index] === 'nothing') {
          this.fileToUpload.push(file)
        } else {
              let number = 0
              for (let i = 0; i > -1; i++) {
                let isAvailable = true
                this.fileCountObject[index].forEach((e: any) => {
                  if (e==i) {
                    isAvailable = false
                  }
                });
                if (isAvailable == true) {
                  number = i
                  break
                }
              }
              if (number==0) {
                this.fileToUpload.push(file)

              }else{

                let newFileName = `${file.name.substring(0, file.name.lastIndexOf('.'))}(${number})${file.name.substring(file.name.lastIndexOf('.'))}`
                let newFile = new File([file], newFileName, { type: file.type })
                this.fileToUpload.push(newFile)
              }
          

        }
      });
      // console.log();


      console.log(this.fileToUpload);

    }

    let path = localStorage.getItem('path') == null ? this.userId : localStorage.getItem('path')
    let formData = new FormData()
    formData.append('path', path)
    this.fileToUpload.forEach(file => {

      formData.append('file', file)
    })

    console.log(formData);

    this.driveService.fileUpload(formData).subscribe((res: any) => {
      alert(res.msg);
      location.reload()

    })


  }

  cancelNewFolder() {
    this.newFolder = false
    this.isDropdownVisible = false
    this.fileToUpload = []
  }

  createFolder() {
    if (this.folderName.trim() != '') {
      let data = {
        userid: this.userId,
        path: localStorage.getItem('path') == null ? localStorage.getItem('userid') : localStorage.getItem('path') + '/' + this.folderName
      }


      this.driveService.makeDirectory(data).subscribe((res: any) => {
        alert(res.msg)
        location.reload()
        // this.newFolder=false
        //   this.isDropdownVisible = false

      })

    } else {
      alert('Type the name of Folder')
    }
  }
  cleanup() {
    localStorage.setItem('path', this.userId)
    location.reload()
  }

  navigation: any = [
    {
      title: "Home",
      path: "/",
      icon: "fa fa-home"

    },
    {
      title: "Bin",
      path: "/bin",
      icon: "fa fa-trash"

    },

  ]

}
