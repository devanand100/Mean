import { HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { MatSnackBar } from "@angular/material/snack-bar";
import { Observable, throwError } from "rxjs";
import { catchError } from "rxjs/operators";

@Injectable()
export class ErrorInterceptor implements HttpInterceptor{

    constructor(private snackbar:MatSnackBar){}
    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        
        return next.handle(req).pipe(
            catchError((error:HttpErrorResponse)=>{
               let message  = error?.error?.message || "Error occurred"
                this.snackbar.open(message , "Okay" , { duration:4000})
                return throwError(error) ; 
            })
        )
    }
}