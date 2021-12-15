import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, catchError, Observable, tap, throwError } from 'rxjs';
import { FirebaseAuthErrors } from 'src/app/shared/types/firebase-auth-errors.enum';

import { environment } from './../../../environments/environment';
import { AuthResponse } from './auth-response';
import { Auth } from './auth.model';
import { User } from './user.model';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  signupUrl = `https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${environment.firebaseApiKey}`;

  loginUrl = `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${environment.firebaseApiKey}`;

  // TODO * BehaviorSubject can expose the previous emitted value so the user token can be fetched on demand.
  userChanged = new BehaviorSubject<User>(null);

  constructor(private http: HttpClient, private router: Router) {}

  signup(auth: Auth): Observable<AuthResponse> {
    return (
      this.http
        .post<AuthResponse>(this.signupUrl, auth)
        // TODO * Using RxJS operators to avoid code repetition and business logic in components
        .pipe(catchError(this.handleAuthError), tap(this.handleAuth.bind(this)))
    );
  }

  login(auth: Auth): Observable<AuthResponse> {
    return this.http
      .post<AuthResponse>(this.loginUrl, auth)
      .pipe(catchError(this.handleAuthError), tap(this.handleAuth.bind(this)));
  }

  logout(): void {
    this.userChanged.next(null);

    this.router.navigate(['/auth']);
  }

  // TODO * piping the error so the message error in subscribe() is already the correct one
  private handleAuthError(errorRes: any): Observable<never> {
    let errorMessage = '';
    const errorCode = errorRes?.error?.error?.message;

    switch (errorCode) {
      case FirebaseAuthErrors.EMAIL_EXISTS:
        errorMessage = 'This email already exists!';
        break;

      case FirebaseAuthErrors.TOKEN_EXPIRED:
        errorMessage = 'Token expired!';
        break;

      // TODO ? Informing the user that a email is or isn't registered is a security flaw
      // ? however it will stay here just to practice the application of this error handling
      case FirebaseAuthErrors.INVALID_PASSWORD:
        errorMessage = 'Password is not correct!';
        break;

      case FirebaseAuthErrors.EMAIL_NOT_FOUND:
        errorMessage = 'This email does not exist!';
        break;

      default:
        errorMessage = 'An error ocurred!';
    }

    return throwError(() => errorMessage);
  }

  // TODO ? emitting a new userChanged event through the Subject whenever a login/signup happens
  private handleAuth(response: AuthResponse): void {
    if (response == null) return;

    const expirationDate = new Date(
      new Date().getTime() + +response.expiresIn * 1000
    );

    const user = new User(
      response.email,
      response.localId,
      response.idToken,
      expirationDate
    );

    this.userChanged.next(user);
  }
}
