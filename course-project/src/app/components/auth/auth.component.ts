import {
  AfterViewInit,
  ChangeDetectorRef,
  Component,
  ViewChild,
} from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';

import { AuthResponse } from './auth-response';
import { Auth } from './auth.model';
import { AuthService } from './auth.service';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
})
export class AuthComponent implements AfterViewInit {
  isLoginMode = true;
  isLoading = false;
  error: string = null;

  @ViewChild('formRef') form: NgForm;

  constructor(
    private cdRef: ChangeDetectorRef,
    private service: AuthService,
    private router: Router
  ) {}

  ngAfterViewInit(): void {
    this.cdRef.detectChanges();
  }

  getModeText(isLogin?: boolean): string {
    return isLogin ?? this.isLoginMode ? 'Login' : 'Sign Up';
  }

  onSwitchMode(): void {
    this.isLoginMode = !this.isLoginMode;
  }

  onSubmit(): void {
    if (!this.form?.value || !this.form.valid) return;

    const { email, password } = this.form.value as Auth;

    const authData = new Auth(email, password);

    this.isLoading = true;

    let auth$: Observable<AuthResponse>;

    if (this.isLoginMode) {
      auth$ = this.service.login(authData);
    } else {
      auth$ = this.service.signup(authData);
    }

    auth$.subscribe({
      next: (resData) => {
        this.isLoading = false;

        this.router.navigate(['/recipes']);
      },
      error: (errMessage) => {
        this.error = errMessage;

        this.isLoading = false;
      },
    });

    this.form.reset();
  }
}
