import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent } from '@angular/common/http';
import { Router } from '@angular/router';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

@Injectable()
// @Injectable({
//   providedIn: 'root'
// })
export class GlobalHttpInterceptorService implements HttpInterceptor {

  constructor(public router: Router) { }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(req).pipe(
      catchError((error) => {
        console.log('error is intercepted');
        console.error(error);
        this.router.navigate(['errors'], {state: {error: JSON.stringify(error)}})
        return throwError(error.message);
      })
    )
  }
}
