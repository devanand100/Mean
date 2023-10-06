import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from "@angular/router";
import {Injectable} from "@angular/core"
import { AuthService } from "./auth.service";
import {map} from "rxjs/operators"
@Injectable()
export default class AuthGuard implements CanActivate{
 
    constructor(private authService:AuthService , private router : Router){}
        canActivate( route:ActivatedRouteSnapshot ,state: RouterStateSnapshot){
            
            return this.authService.authStatusListner().pipe(map((authStatus)=>{
                if(authStatus){
                    return true;
                }else{
                     this.router.navigate(['/auth/login'])
                     return false
                }
            }))
        }
    
}