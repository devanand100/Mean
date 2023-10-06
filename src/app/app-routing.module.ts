import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {PostComponent} from './post/post.component'
import { CreatePostComponent } from './create-post/create-post.component';
import { RegisterComponnet } from './auth/register/register.component';
import { LoginComponent } from './auth/login/login.component';
import AuthGuard from './auth/auth.Guard';

const routes: Routes = [
  { path:"" , component:PostComponent },
  { path:"create-post" , component:CreatePostComponent ,canActivate:[AuthGuard] } ,
  {path:"edit/:id" , component:CreatePostComponent ,canActivate:[AuthGuard] } ,
  {path:"register" , component:RegisterComponnet} ,
  {path:"login" , component:LoginComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule] ,
  providers:[AuthGuard]
})
export class AppRoutingModule { }
