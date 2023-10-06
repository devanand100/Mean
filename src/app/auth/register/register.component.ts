import {Component , OnInit} from '@angular/core'
import { NgForm } from '@angular/forms'
import { AuthService } from "../auth.service";

@Component({
    templateUrl:'./register.component.html',
    styleUrls:['./register.component.css']
})
export class RegisterComponnet implements OnInit{
    isLoading = false ;
    constructor(private authService:AuthService){}
    ngOnInit(): void {
        this.authService.authStatusListner().subscribe((status)=>{
            if(!status){
                this.isLoading = false ;
            }
        })
    }

    onSubmit(form:NgForm){
        if(!form.valid){
            return
        }
        this.isLoading = true
        this.authService.register(form.value)
    }
}