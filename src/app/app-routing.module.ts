import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    outlet: 'photos',
    children: [
      {
        path: '',
        loadChildren:()=>import("./photos/photos/photos.module").then(module => module.PhotosModule)
      },
    ],
  },
  {
    path: '',
    pathMatch: 'full',
    outlet: 'drive',
    children: [
      {
        path: '',
        loadChildren:()=>import("./drive/drive/drive.module").then(module => module.DriveModule)
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
