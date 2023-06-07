import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PhotosRoutingModule } from './photos-routing.module';
import { PhotosComponent } from './photos.component';
import { HeaderComponent } from '../navigation/header/header.component';
import { SidebarComponent } from '../navigation/sidebar/sidebar.component';
import { MaterialModule } from 'src/app/material/material.module';

import { DateformetPipe } from '../photosService/dateformet.pipe';
import { HomeComponent } from './home/home.component';
import { ArchiveComponent } from './archive/archive.component';
import { BinComponent } from './bin/bin.component';


@NgModule({
  declarations: [
    PhotosComponent,
    HeaderComponent,
    SidebarComponent,
    DateformetPipe,
    HomeComponent,
    ArchiveComponent,
    BinComponent
  ],
  imports: [
    CommonModule,
    PhotosRoutingModule,
    MaterialModule

  ]
})
export class PhotosModule { }
