import { NgModule } from '@angular/core';
import { LoginComponent } from './login/login.component';
import { RegisterComponnet } from './register/register.component';
import { AngularMaterialModule } from '../angular.material.module';
import { FormsModule } from '@angular/forms';
import { AuthRouting } from './auth.routing.module';
@NgModule({
  declarations: [LoginComponent, RegisterComponnet],
  imports:[AngularMaterialModule ,FormsModule ,AuthRouting]
})
export class AuthModule {}
