import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { LoginComponent  } from './auth/login/login.component';
import { RegisterComponnet } from './auth/register/register.component';
import { AuthInterceptor } from './auth/auth.interceptor';
import { HeaderComponent } from './header/header.component';
import { ErrorInterceptor } from './error.interceptor';
import { AngularMaterialModule } from './angular.material.module';
import { PostModule } from './post/post.module';
import { AppRoutingModule } from './app-routing.module';
import { AuthModule } from './auth/auth.module';
@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent 
  ],
  imports: [
    BrowserModule,
   AppRoutingModule ,
    FormsModule,
    BrowserAnimationsModule, 
    HttpClientModule , 
    AngularMaterialModule ,
    PostModule 
  ],
  providers: [
    {provide:HTTP_INTERCEPTORS , useClass:AuthInterceptor  , multi:true} ,
    {provide:HTTP_INTERCEPTORS , useClass:ErrorInterceptor , multi:true}
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
