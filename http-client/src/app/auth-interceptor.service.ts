import { map, tap } from 'rxjs/operators';
import {
  HttpEvent,
  HttpEventType,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

export class AuthInterceptorService implements HttpInterceptor {
  // TODO * Http interceptors can run code right before a request is made
  intercept(request: HttpRequest<any>, forwardRequest: HttpHandler) {
    console.log('in auth interceptor');

    // TODO ? Cloning the request to add the auth header
    const modifiedRequest = request.clone({
      headers: request.headers.append('Auth', 'xyz'),
    });

    // TODO ? passing the modified request
    return forwardRequest.handle(modifiedRequest);
  }
}
