import { Component, OnInit } from '@angular/core';
import { DriveService } from '../../driveService/drive.service';

@Component({
  selector: 'app-bin',
  templateUrl: './bin.component.html',
  styleUrls: ['./bin.component.css']
})
export class BinComponent implements OnInit {
  foldersArray: any
  filesArray: any
  selectedFolderArray: any[] = []
  selectedFileArray: any[] = []
  userId = localStorage.getItem("userid")

  constructor(private driveService:DriveService) { }

  ngOnInit(): void {
    this.getbinFolders()
  }


  getbinFolders() {
    this.driveService.getbinDirectories(this.userId).subscribe((res: any) => {
// console.log("hello");

      this.foldersArray = res.foldersArray
      this.filesArray = res.filesArray
    })
  }
  restore() {
    console.log("hello");

    if (this.selectedFileArray.length || this.selectedFolderArray.length) {
      let data = {
        userid: localStorage.getItem('userid'),
        foldersArray: this.selectedFolderArray,
        filesArray: this.selectedFileArray
      }
      this.driveService.restorebin(data).subscribe((res:any) => {
        alert(res.msg);
        location.reload()
      })
    } else {
      alert('Select file to bin')
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

}
