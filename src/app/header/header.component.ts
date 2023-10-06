import { Component, OnInit , OnDestroy } from '@angular/core';
import { AuthService } from '../auth/auth.service';
import {Subscription} from 'rxjs'
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit , OnDestroy {

    private authSubscription:Subscription |undefined
   loginStatus = false ;
  constructor(private authService:AuthService) { }

  ngOnInit(): void {
   this.authSubscription =  this.authService.authStatusListner().subscribe((val)=>this.loginStatus = val)
  }

  logout(){
    this.authService.logout()
  }

  ngOnDestroy(): void {
    this.authSubscription?.unsubscribe()
  }

}
