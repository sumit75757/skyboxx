import { Component, OnInit } from '@angular/core';
import { DriveService } from '../../driveService/drive.service';
import * as saveAs from 'file-saver';
import { NgxDocViewerComponent } from 'ngx-doc-viewer';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  foldersArray: any
  filesArray: any
  selectedFolderArray: any[] = []
  selectedFileArray: any[] = []
  userId = localStorage.getItem("userid")
  path = localStorage.getItem('path') == null ? localStorage.getItem("userid") : localStorage.getItem('path')
  doc = 'https://skyboxx-api-c858.vercel.app/drive/64622e6aa4714b40e3764750/Ews.pdf'

  constructor(private driveService: DriveService,private ngxDocViewer:NgxDocViewerComponent) { }

  ngOnInit(): void {

    this.getFolders(this.path)
  }
  folderClicked(path: any) {
    this.selectedFileArray = []
    this.selectedFolderArray = []
    console.log(this.selectedFileArray,this.selectedFolderArray);
    
    if (localStorage.getItem('path') == null) {
      this.getFolders(this.path)
    } else {
      if (path != undefined) {
        this.getFolders(localStorage.getItem('path') + '/' + path)
      } else {

        this.getFolders(localStorage.getItem('path'))
      }
    }
  }

  multipleSelect(temp: any, fileorfolder: any) {
    temp.click()
    if (temp.checked) {
      let shouldPush = true
      if (fileorfolder.includes(".")) {
        this.selectedFileArray.forEach((fileName: any, index: any) => {
          if (fileName == fileorfolder) {
            shouldPush = false
          }
        })
        if (shouldPush) {
          this.selectedFileArray.push(fileorfolder)

        }
      } else {

        this.selectedFolderArray.forEach((folderName: any, index: any) => {
          if (folderName == fileorfolder) {
            shouldPush = false
          }
        })
        if (shouldPush) {
          this.selectedFolderArray.push(fileorfolder)

        }
      }
    } else {
      if (fileorfolder.includes(".")) {
        this.selectedFileArray.forEach((fileName: any, index: any) => {
          if (fileName == fileorfolder) {
            this.selectedFileArray.splice(index, 1)
          }
        })

      } else {

        this.selectedFolderArray.forEach((folderName: any, index: any) => {
          if (folderName == fileorfolder) {
            this.selectedFolderArray.splice(index, 1)
          }
        })
      }
    }
    // console.log(this.selectedFolderArray);




  }

  goBack() {
    let newPath = localStorage.getItem('path')
    this.getFolders(newPath?.substring(0, newPath?.lastIndexOf('/')));
    this.selectedFileArray = []
    this.selectedFolderArray = []
  }
  download() {
    let data={
      path:localStorage.getItem('path'),
      foldersArray:this.selectedFolderArray,
      filesArray:this.selectedFileArray
    }
    // console.log(data.filesArray[0].split('.').pop());
    
    this.driveService.drivedownload(data).subscribe((res: any) => {
      console.log("res");

      if (data.filesArray.length==1&&data.foldersArray.length==0) {
        const blob = new Blob([res], { type: `application/${data.filesArray[0].split('.').pop()}` });
      saveAs(blob,data.filesArray[0]);
      // console.log(blob);
      }else{
        const blob = new Blob([res], { type: 'application/zip' });
        // console.log(blob);
  
        saveAs(blob, 'data.zip')
      }


      // 


      //     console.log(res);
      // ;
    })
  }
  addToBin() {
    console.log("hello");

    if (this.selectedFileArray.length || this.selectedFolderArray.length) {
      let data = {
        path: localStorage.getItem('path'),
        foldersArray: this.selectedFolderArray,
        filesArray: this.selectedFileArray
      }
      this.driveService.addtobin(data).subscribe((res: any) => {
        alert(res.msg);
        location.reload()
      })
    } else {
      alert('Select file to bin')
    }
  }

  getFolders(path: any) {
    this.driveService.getDirectories(path).subscribe((res: any) => {

      this.foldersArray = res.foldersArray
      this.filesArray = res.filesArray
      localStorage.setItem('path', path)
      this.path = path


    })
  }

}
