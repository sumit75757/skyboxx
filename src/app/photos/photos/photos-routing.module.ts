import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SidebarComponent } from '../navigation/sidebar/sidebar.component';
import { HomeComponent } from './home/home.component';
import { ArchiveComponent } from './archive/archive.component';
import { BinComponent } from './bin/bin.component';
import { FavoritesComponent } from './favorites/favorites.component';

const routes: Routes = [
  {
    path: '',
    component:SidebarComponent,
    children:[
      {path:'',component:HomeComponent},
      {path:'archive',component:ArchiveComponent} ,
      {path:'bin',component:BinComponent}, 
      {path:'favorite',component:FavoritesComponent}, 
      
    
    ]
  }
    
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PhotosRoutingModule { }
