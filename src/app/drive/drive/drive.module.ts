import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';


import { DriveRoutingModule } from './drive-routing.module';
import { DriveComponent } from './drive.component';
import { HomeComponent } from './home/home.component';
import { NgxDropzoneModule } from 'ngx-dropzone';
import { BinComponent } from './bin/bin.component';
import { NgxDocViewerModule } from 'ngx-doc-viewer';


@NgModule({
  declarations: [
    DriveComponent,
    HomeComponent,
    BinComponent
  ],
  imports: [
    CommonModule,
    DriveRoutingModule,
    FormsModule,
    NgxDropzoneModule,
    NgxDocViewerModule
  ]
})
export class DriveModule { }
