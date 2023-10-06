import {Component} from '@angular/core'
import { NgForm } from '@angular/forms'
import { AuthService } from "../auth.service";

@Component({
    templateUrl:'./register.component.html',
    styleUrls:['./register.component.css']
})
export class RegisterComponnet{
    constructor(private authService:AuthService){}

    onSubmit(form:NgForm){
        if(!form.valid){
            return
        }
        this.authService.register(form.value)
    }
}