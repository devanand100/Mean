
import { Component } from "@angular/core";
import { NgForm ,FormsModule } from "@angular/forms";
@Component({ 
    templateUrl:'./login.component.html',
    styleUrls:[ './login.component.css'] ,
})
export class LoginComponent {

    onSubmit(form:NgForm){
        if(!form.valid){
            return
        }
        console.log(form.value)
    }
}