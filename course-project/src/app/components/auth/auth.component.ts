import { AuthService } from './auth.service';
import {
  AfterViewInit,
  ChangeDetectorRef,
  Component,
  ViewChild,
} from '@angular/core';
import { NgForm } from '@angular/forms';
import { Auth } from './auth.model';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
})
export class AuthComponent implements AfterViewInit {
  isLoginMode = true;
  isLoading = false;
  error: string = null;

  @ViewChild('formRef') form: NgForm;

  constructor(private cdRef: ChangeDetectorRef, private service: AuthService) {}

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

    this.isLoading = true;

    if (this.isLoginMode) {
      // ...
      this.isLoading = false;
    } else {
      const request$ = this.service.signup(new Auth(email, password));

      request$.subscribe({
        next: (resData) => {
          console.log(resData);
          this.isLoading = false;
        },
        error: (err) => {
          this.error = 'An error ocurred!';
          console.log(err);
          this.isLoading = false;
        },
      });
    }

    this.form.reset();
  }
}
