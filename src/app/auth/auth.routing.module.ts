import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { RegisterComponnet } from './register/register.component';
import { LoginComponent } from './login/login.component';

const routes: Routes = [
  { path: 'register', component: RegisterComponnet ,  },
  { path: 'login', component: LoginComponent },
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports:[RouterModule]
})
export class AuthRouting {}
