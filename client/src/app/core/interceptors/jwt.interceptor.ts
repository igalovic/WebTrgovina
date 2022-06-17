import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";

@Injectable()
export class JwtInterceptor implements HttpInterceptor{
    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        const token = localStorage.getItem('token');

        if (token){
            /* take request and clone it but in clone with set headres and that is going to be the request we send up with authorization token */
            req = req.clone({
                setHeaders:{
                    Authorization: `Bearer ${token}`
                }
            });
        }

        return next.handle(req);
    }

}