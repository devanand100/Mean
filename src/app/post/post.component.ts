import { Component, OnInit , Input, OnDestroy } from '@angular/core';
import { Post } from './post';
import { PostsService } from '../posts.service';
import { Subscription} from "rxjs" 
import { AuthService } from '../auth/auth.service';


@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.css']
})
export class PostComponent implements OnInit ,OnDestroy {

   posts:Post[] = [];
   userId : string | undefined ;
   isLoading = false;
  private subscription?:Subscription ;
  private authsubscription?:Subscription
  loginStatus = false ;

  constructor( private postService:PostsService , private authService:AuthService) { }

  ngOnInit(): void {
    console.log("ONinit runs")
    this.postService.getPosts();
    this.isLoading = true;
    this.subscription  = this.postService.postObservable().subscribe((data )=>{this.posts = data ; this.isLoading = false}) 
    this.authsubscription = this.authService.authStatusListner().subscribe((val)=> { this.loginStatus = val ; this.userId = this.authService.getUserId()} )
   

  }

  ngOnDestroy(): void {
    this.subscription?.unsubscribe()
    this.authsubscription?.unsubscribe()
  }

  onDelete(id:string){
      this.postService.deletePost(id)
  }

}
