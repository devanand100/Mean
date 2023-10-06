import { NgModule } from '@angular/core';
import { PostComponent } from './post-list/post.component';
import { CreatePostComponent } from './create-post/create-post.component';
import { AngularMaterialModule } from '../angular.material.module';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { AppRoutingModule } from '../app-routing.module';

@NgModule({
  declarations: [PostComponent, CreatePostComponent],
  imports: [CommonModule, AngularMaterialModule, ReactiveFormsModule , AppRoutingModule],
})
export class PostModule {}
