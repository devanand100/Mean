import { Component, Output, EventEmitter, OnInit } from '@angular/core';
import { Post } from '../post/post';
import { FormControl, FormGroup, NgForm, Validators } from '@angular/forms';
import { PostsService } from '../posts.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-create-post',
  templateUrl: './create-post.component.html',
  styleUrls: ['./create-post.component.css']
})
export class CreatePostComponent implements OnInit {
  isLoading = false;
  private mode = "create" ;
  imageUrl:string  | undefined ;
  public post:Post | undefined ; 

  constructor(private postService: PostsService, private router: ActivatedRoute) { }

  form = new FormGroup({
      title:new FormControl('',{validators:[Validators.required , Validators.minLength(3)]}) , 
      description : new FormControl('' , {validators:Validators.required}) ,
      image : new FormControl( null ,{validators:Validators.required} )
  })
  
  ngOnInit(): void {
    this.router.paramMap.subscribe((paramMap)=>{

      if(paramMap.has("id")){
          this.mode = "edit" ;
          this.isLoading = true ;
           this.postService.getPost(paramMap.get("id")!).subscribe((postData)=>{
              this.post = {id:postData._id! , title:postData.title , description:postData.description} ;

              this.form.setValue({title:this.post.title , description:this.post.description})
              this.isLoading = false ;
           }); 
      }else{
          this.mode = "create" ; 
      }
    })


  }

  imageChange(event:Event){
      const file = (event.target as HTMLInputElement).files![0] ;

      if(!file.type.startsWith('image')){
        this.form.get('image')?.setErrors({inValiFormate : true})
        return
      }
      this.form.get('image')?.setErrors(null);

      this.form.patchValue({image:file})
     
      const reader = new FileReader();

      reader.onload = ()=> {
        console.log(reader.result)
        this.imageUrl = reader.result as string;
      }
      reader.readAsDataURL(file)
      this.form.get('image')?.updateValueAndValidity();
  }

  onAddPost() {

    this.form.markAllAsTouched();

    if (!this.form.valid) {
      return
    }

    this.isLoading = true ;

    const {title , description , image} = this.form.value


    if(this.mode === "edit" && this.post){
      this.postService.updatePost( this.post.id,title , description , image)
      this.form.reset();
      return;
    }
    
    this.postService.addPost(title , description , image);
    
    this.form.reset();
    ; 
  }
}
