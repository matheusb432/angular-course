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
  private tokenExpirationTimer: any;

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

  autoLogin() {
    const userData: {
      email: string;
      id: string;
      _token: string;
      _tokenExpirationDate: string;
    } = JSON.parse(localStorage.getItem('userData'));

    if (!userData) return;

    const loadedUser = new User(
      userData.email,
      userData.id,
      userData._token,
      new Date(userData._tokenExpirationDate)
    );

    if (loadedUser.token) {
      this.userChanged.next(loadedUser);

      const expirationDuration =
        new Date(userData._tokenExpirationDate).getTime() -
        new Date().getTime();

      this.autoLogout(expirationDuration);
    }
  }

  logout(): void {
    this.userChanged.next(null);

    this.router.navigate(['/auth']);

    localStorage.removeItem('userData');

    if (this.tokenExpirationTimer) {
      clearTimeout(this.tokenExpirationTimer);
    }
    this.tokenExpirationTimer = null;
  }

  autoLogout(expirationNumber: number): void {
    this.tokenExpirationTimer = setTimeout(() => {
      this.logout();
    }, expirationNumber);
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

    this.autoLogout(+response.expiresIn * 1000);

    localStorage.setItem('userData', JSON.stringify(user));
  }
}
