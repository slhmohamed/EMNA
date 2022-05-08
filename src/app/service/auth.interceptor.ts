import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HTTP_INTERCEPTORS } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { LoginService } from "./login.service";

 
@Injectable()
export class authInterceptor implements HttpInterceptor{
    constructor(private _loginService:LoginService){
        
    }
    intercept(
        req: HttpRequest<any>, 
        next: HttpHandler): Observable<HttpEvent<any>> {
       //add the jwt token(localStorage) requests
            let authReq=req
       const token=this._loginService.getToken();
       console.log('====================================');
       console.log(token);
       console.log('====================================');
       if(token != null){
           authReq=authReq.clone(
               {
                   setHeaders:{Authorization : `Bearer ${token}`},
           });
        }
        return next.handle(authReq)
       }

    }
 

    export const authInterceptorProviders=[{
        provide:HTTP_INTERCEPTORS,
        useClass:authInterceptor,
        multi:true
    }]