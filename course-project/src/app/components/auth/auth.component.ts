import { Observable, Subscription } from 'rxjs';
import { FirebaseAuthErrors } from './../../shared/types/firebase-auth-errors.enum';
import { AuthService } from './auth.service';
import {
  AfterViewInit,
  ChangeDetectorRef,
  Component,
  OnInit,
  ViewChild,
} from '@angular/core';
import { NgForm } from '@angular/forms';
import { Auth } from './auth.model';
import { AuthResponse } from './auth-response';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
})
export class AuthComponent implements OnInit, AfterViewInit {
  isLoginMode = true;
  isLoading = false;
  error: string = null;

  userChangedSub: Subscription;

  @ViewChild('formRef') form: NgForm;

  constructor(private cdRef: ChangeDetectorRef, private service: AuthService) {}

  ngOnInit(): void {
    this.userChangedSub = this.service.userChanged.subscribe((user) => {
      console.log(user);
    });
  }

  ngOnDestroy(): void {
    this.userChangedSub?.unsubscribe();
  }

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
      },
      error: (errMessage) => {
        this.error = errMessage;

        this.isLoading = false;
      },
    });

    this.form.reset();
  }
}
