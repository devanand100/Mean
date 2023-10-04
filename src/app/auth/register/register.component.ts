import {Component} from '@angular/core'
import { NgForm } from '@angular/forms'
@Component({
    templateUrl:'./register.component.html',
    styleUrls:['./register.component.css']
})
export class RegisterComponnet{

    onSubmit(form:NgForm){
        if(!form.valid){
            return
        }
        console.log(form.value)
    }
}