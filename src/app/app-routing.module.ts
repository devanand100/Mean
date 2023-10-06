import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {PostComponent} from './post/post-list/post.component'
import { CreatePostComponent } from './post/create-post/create-post.component';
import AuthGuard from './auth/auth.Guard';

const routes: Routes = [
  { path:"" , component:PostComponent },
  { path:"create-post" , component:CreatePostComponent ,canActivate:[AuthGuard] } ,
  {path:"edit/:id" , component:CreatePostComponent ,canActivate:[AuthGuard] } ,
  {path : "auth" , loadChildren:() => import("./auth/auth.module").then((m)=>m.AuthModule)}
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule] ,
  providers:[AuthGuard]
})
export class AppRoutingModule { }
