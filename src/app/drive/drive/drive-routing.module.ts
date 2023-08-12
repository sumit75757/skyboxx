import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DriveComponent } from './drive.component';
import { SidebarComponent } from '../navigation/sidebar/sidebar.component';
import { HomeComponent } from './home/home.component';
import { BinComponent } from './bin/bin.component';

const routes: Routes = [
  {
    path: '',
    component:SidebarComponent,
    children:[
      {path:'',component:HomeComponent},
      {path:'bin',component:BinComponent}, 
      // {path:'archive',component:ArchiveComponent} ,
      // {path:'favorite',component:FavoritesComponent}, 
      
    
    ]
  }
    
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DriveRoutingModule { }
