import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';

const AUTH_PREFIX = 'Bearer';

@Injectable()
export class JwtInterceptor implements HttpInterceptor {
  constructor(private authService: AuthService) { }
  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

  const token=this.authService.getToken();
  if (this.authService.getToken()) {
    request = request.clone({
      setHeaders: {
        Authorization : `${AUTH_PREFIX} ${token}`
      }
    });
  }
    return next.handle(request);
}
}