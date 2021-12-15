import { AuthService } from './auth.service';
import {
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpParams,
  HttpRequest,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { exhaustMap, Observable, take } from 'rxjs';

@Injectable()
export class AuthInterceptorService implements HttpInterceptor {
  constructor(private service: AuthService) {}

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    return this.service.userChanged.pipe(
      // TODO ? take(1) will unsubscribe from the userChanged observable after 1 value has been emitted
      take(1),
      // TODO ? exhaustMap switches the observable from the userChanged to the http.get after userChanged is done
      exhaustMap((user) => {
        const modifiedReq$ = req.clone({
          params: new HttpParams().set('auth', user?.token),
        });

        return next.handle(modifiedReq$);
      })
    );
  }
}
