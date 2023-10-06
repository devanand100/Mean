import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import jwtDecode from "jwt-decode"
export interface authModel {
    id? : string
  email: string;
  password: string;
}
@Injectable({ providedIn: 'root' })
export class AuthService {
  constructor(private http: HttpClient, private router: Router) {}
  url = 'http://localhost:3000/api/user/';


  authStatus = new BehaviorSubject<boolean>(this.getLocalLoginStatus());
  timer: any;

  getToken() {
    const token = localStorage.getItem('token');
    if (token) {
      return token;
    }
    return null;
  }

  authStatusListner() {
    return this.authStatus.asObservable();
  }

  login(body: authModel) {
    this.http
      .post<{ token: string; expiresIn: number }>(this.url + 'login', body)
      .subscribe((data) => {
        this.authStatus.next(true);
        this.router.navigate(['/']);
        this.timer = setTimeout(() => {
          this.logout();
        }, data.expiresIn * 1000);
        this.saveAuthData(
          data.token,
          new Date(new Date().getTime() + data.expiresIn * 1000)
        );
      });
  }

  register(body: authModel) {
    this.http.post<authModel>(this.url + 'register', body).subscribe(() => {
      this.router.navigate(['/login'])
    });
  }

  logout() {
    this.authStatus.next(false);
    this.router.navigate(['/']);
    this.clearAuthData();
    clearTimeout(this.timer);
  }

  saveAuthData(token: string, expirationDate: Date) {
    localStorage.setItem('token', token);
    localStorage.setItem('expiration', expirationDate.toISOString());
  }

  clearAuthData() {
    localStorage.removeItem('token');
    localStorage.removeItem('expiration');
  }

  getUserId(){
    const token = localStorage.getItem("token");
    if(!token){
        return undefined;
    }
    const userData = jwtDecode(token) as authModel
    return userData?.id
  }
  getLocalLoginStatus() {
    const now = new Date().valueOf();
    const expiration = new Date(
      localStorage.getItem('expiration') ?? ''
    ).valueOf();
    if (now < expiration) {
      this.timer = setTimeout(() => {
        this.logout();
      }, expiration - now);
    }

    return now < expiration;
  }
}
