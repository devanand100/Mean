
import { Component ,OnInit } from "@angular/core";
import { NgForm ,FormsModule } from "@angular/forms";
import { AuthService } from "../auth.service";
@Component({ 
    templateUrl:'./login.component.html',
    styleUrls:[ './login.component.css'] ,
})
export class LoginComponent  implements OnInit{

    isLoading = false ;
    constructor(private authService:AuthService){}
    ngOnInit(): void {
        this.authService.authStatusListner().subscribe((val)=>{
            console.log("val", val)
            if(!val){
                this.isLoading = false ;
                console.log("loading" , this.isLoading)
            }
        })
    }
    onSubmit(form:NgForm){
        if(!form.valid){
            return
        }
        this.isLoading = true ;
        this.authService.login(form.value)
    }
}