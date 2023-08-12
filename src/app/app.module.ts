import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule } from '@angular/router';
import { MaterialModule } from './material/material.module';
import { HttpClientModule } from '@angular/common/http';
import { HeaderComponent } from './drive/navigation/header/header.component';
import { SidebarComponent } from './drive/navigation/sidebar/sidebar.component';
import { FormsModule } from '@angular/forms';
import {NgxDropzoneModule}from 'ngx-dropzone'
import {NgxDocViewerModule}from 'ngx-doc-viewer'




@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    SidebarComponent,

  ],
  imports: [
    BrowserModule,
    RouterModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialModule,
    HttpClientModule,
    FormsModule,
    NgxDropzoneModule,
    NgxDocViewerModule,
    
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule { }
