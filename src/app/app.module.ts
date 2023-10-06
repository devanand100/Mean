import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatToolbarModule } from '@angular/material/toolbar';
import { PostComponent } from './post/post.component';
import { CreatePostComponent } from './create-post/create-post.component';
import {MatExpansionModule} from '@angular/material/expansion';
import {MatCardModule} from '@angular/material/card';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input'
import {MatButtonModule} from '@angular/material/button';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import { ReactiveFormsModule } from '@angular/forms';
import { LoginComponent  } from './auth/login/login.component';
import { RegisterComponnet } from './auth/register/register.component';
import { AuthInterceptor } from './auth/auth.interceptor';
import { HeaderComponent } from './header/header.component';
import {MatSnackBarModule} from '@angular/material/snack-bar';

@NgModule({
  declarations: [
    AppComponent,
    PostComponent,
    CreatePostComponent,
    LoginComponent ,
    RegisterComponnet,
    HeaderComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    BrowserAnimationsModule,
    MatToolbarModule,
    MatExpansionModule ,
    MatCardModule ,
    MatFormFieldModule ,
    MatInputModule ,
    MatButtonModule ,
    HttpClientModule ,
    MatProgressSpinnerModule ,
    ReactiveFormsModule , 
    MatSnackBarModule
  ],
  providers: [{provide:HTTP_INTERCEPTORS , useClass:AuthInterceptor  , multi:true}],
  bootstrap: [AppComponent]
})
export class AppModule {
}
