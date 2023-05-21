import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home.component';
import { AuthComponent } from '../auth/auth.component';
import { AuthGuard } from 'src/app/common/auth.guard';

const routes: Routes = [
  {path:'',component:HomeComponent},
  {path:'auth/:type',component:AuthComponent},
  {path:'drive',redirectTo :"http://drive.localhost:4200/",pathMatch:'full'}
  ];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HomeRoutingModule { }
