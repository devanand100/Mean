import { Component, OnInit , Input, OnDestroy } from '@angular/core';
import { Post } from './post';
import { PostsService } from '../posts.service';
import { Subscription} from "rxjs" 


@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.css']
})
export class PostComponent implements OnInit ,OnDestroy {

   posts:Post[] = [];
   isLoading = false;
  private subscription?:Subscription ;
  constructor( private postService:PostsService) { }

  ngOnInit(): void {
    this.postService.getPosts();
    this.isLoading = true;
    this.subscription  = this.postService.postObservable().subscribe((data )=>{this.posts = data ; this.isLoading = false})
  }

  ngOnDestroy(): void {
    this.subscription?.unsubscribe()
  }

  onDelete(id:string){
      this.postService.deletePost(id)
  }

}
