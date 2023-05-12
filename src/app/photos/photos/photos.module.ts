import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PhotosRoutingModule } from './photos-routing.module';
import { PhotosComponent } from './photos.component';
import { HeaderComponent } from '../navigation/header/header.component';
import { SidebarComponent } from '../navigation/sidebar/sidebar.component';
import { MaterialModule } from 'src/app/material/material.module';



@NgModule({
  declarations: [
    PhotosComponent,
    HeaderComponent,
    SidebarComponent,
  ],
  imports: [
    CommonModule,
    PhotosRoutingModule,
    MaterialModule

  ]
})
export class PhotosModule { }
