import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {PostComponent} from './post/post.component'
import { CreatePostComponent } from './create-post/create-post.component';
const routes: Routes = [
  { path:"" , component:PostComponent },
  { path:"create-post" , component:CreatePostComponent } ,
  {path:"edit/:id" , component:CreatePostComponent}
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
