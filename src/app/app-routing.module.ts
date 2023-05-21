import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RouteGuard } from './common/route.guard';

const routes: Routes = [];
let host =  location.host.split('.')[0];

if (host == "drive") {
  routes.push({
    path: '',
    canActivate:[RouteGuard],
    children: [
      {
        path: '',
        loadChildren:()=>import("./drive/drive/drive.module").then(module => module.DriveModule)
      },
    ],
  })
} else if(host == "photos") {
  routes.push({
    path: '',
    canActivate:[RouteGuard],
    children: [
      {
        path: '',
        loadChildren:()=>import("./photos/photos/photos.module").then(module => module.PhotosModule)
      },
    ],
  })
}else{
routes.push({
  path: '',
  children: [
    {
      path: '',
      loadChildren:()=>import("./home/home/home.module").then(module => module.HomeModule)
    },
  ],
})
}

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
