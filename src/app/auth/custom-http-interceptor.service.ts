import {Injectable} from '@angular/core';
import {HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from '@angular/common/http';
import {Observable, throwError} from 'rxjs';
import {catchError} from 'rxjs/operators';
import {Router} from '@angular/router';
import {AuthserviceService} from './authservice.service';

@Injectable({
  providedIn: 'root'
})
export class CustomHttpInterceptorService implements HttpInterceptor {

  constructor(private auth: AuthserviceService,
              private router: Router) {
  }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    if (this.auth.islogin) {
      request = request.clone({
        setHeaders: {
          Authorization: `Bearer_${this.auth.getToken()}`
        }
      });
      return next.handle(request).pipe(
        catchError(
          err => {
            if (err instanceof HttpErrorResponse) {
              if (err.status === 401 || err.status === 403) {
                this.auth.logout();
                this.router.navigate(['/login']);
              }
            }
            return throwError(err);
          }
        )
      );
    }
    return next.handle(request);
  }
}
