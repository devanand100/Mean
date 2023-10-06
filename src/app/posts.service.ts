import { Injectable } from '@angular/core';
import { Subject } from 'rxjs'
import { Post } from './post/post-list/post';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators'
import { Router } from '@angular/router';

interface postdata {
   title: string; description: string; _id: string; imagePath: string; creator: string;
}

@Injectable({
  providedIn: 'root'
})
export class PostsService {
  private posts: Post[] = [];
  private subject = new Subject<Post[]>();
  postsUrl = "http://localhost:3000/api/posts/";

  constructor(private http: HttpClient, private router: Router) { }

  getPosts() {
    this.http.get<postdata[]>(this.postsUrl).pipe(map((postsData) => {
      return postsData.map((post) => {
        return { title: post.title, description: post.description, id: post._id, imagePath: post.imagePath, creator: post.creator }
      })
    })).subscribe((data) => {
      this.posts = data; this.subject.next(this.posts)
    })
  }

  getPost(id: string) {
    return this.http.get<Post>(this.postsUrl + id);
  }

  postObservable() {
    return this.subject.asObservable();
  }

  addPost(title: string, description: string, image: File) {
    const formData = new FormData();

    formData.append('title', title)
    formData.append('description', description)
    formData.append("image", image)
    this.http.post(this.postsUrl, formData).subscribe(() => {

      this.router.navigate(['/'])
    })
  }

  updatePost(id: string, title: string, description: string, image: File | string) {

    let post;
    if (typeof image === "object") {
      post = new FormData();
      post.append('title', title)
      post.append('description', description)
      post.append("image", image)
    } else {
      post = {
        title, description, imagePath: image
      }
    }

    this.http.patch(this.postsUrl + id, post).subscribe(() => {
      this.router.navigate(['/'])
    })
  }

  deletePost(id: string) {
    this.http.delete(this.postsUrl + id).subscribe(() => {
      this.posts = this.posts.filter((item) => item.id !== id);
      this.subject.next(this.posts);
    })
  }
}
