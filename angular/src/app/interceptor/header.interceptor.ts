
import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { LoginService } from '../service/login.service';


@Injectable()
export class HeaderInterceptor implements HttpInterceptor {


  constructor(private loginService: LoginService) {
  }

  intercept(httpRequest: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    if (httpRequest.url.substring(0, 4) === "/api") {
      console.log("Is Api request")
      let headers: any = {
        'x-requested-with': 'XMLHttpRequest',
        'Content-type': 'application/json',
        'Accept': 'application/json'
      }

    
      headers['Authorization'] = this.loginService.getBasicAuthHeaderValue()
      
      return next.handle(httpRequest.clone({setHeaders: headers}));

    }
    return next.handle(httpRequest);
  }
}

