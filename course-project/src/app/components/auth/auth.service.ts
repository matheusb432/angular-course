import { Observable } from 'rxjs';
import { environment } from './../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Auth } from './auth.model';
import { AuthResponse } from './auth-response';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  firebaseAuthUrl = `https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${environment.firebaseApiKey}`;

  constructor(private http: HttpClient) {}

  signup(auth: Auth): Observable<AuthResponse> {
    return this.http.post<AuthResponse>(this.firebaseAuthUrl, auth);
  }
}
