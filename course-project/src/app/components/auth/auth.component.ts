import { PlaceholderDirective } from './../../shared/placeholder.directive';
import { AlertComponent } from './../../shared/alert/alert.component';
import {
  AfterViewInit,
  ChangeDetectorRef,
  Component,
  ComponentFactoryResolver,
  ViewChild,
} from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { Observable, Subscription } from 'rxjs';

import { AuthResponse } from './auth-response';
import { Auth } from './auth.model';
import { AuthService } from './auth.service';
import { AlertModalComponent } from 'src/app/shared/alert-modal/alert-modal.component';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
})
export class AuthComponent implements AfterViewInit {
  isLoginMode = true;
  isLoading = false;
  error: string = null;

  private closeSub: Subscription;

  @ViewChild('formRef') form: NgForm;

  // TODO * when passing a type to ViewChild, it will attach to the first occurrence of this type (in this case the directive)
  // * that is present in the DOM
  @ViewChild(PlaceholderDirective) alertHost: PlaceholderDirective;

  constructor(
    private cdRef: ChangeDetectorRef,
    private service: AuthService,
    private router: Router,
    private componentFactoryResolver: ComponentFactoryResolver
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

        this.showErrorAlert(errMessage);
        this.isLoading = false;
      },
    });

    this.form.reset();
  }

  onHandleError(): void {
    this.error = null;
  }

  // TODO * programmatically creating a component
  private showErrorAlert(message: string) {
    // ! Deprecated way required to use a factory to create the component
    // const alertComponentFactory =
    //   this.componentFactoryResolver.resolveComponentFactory(AlertComponent);

    // hostViewContainerRef.createComponent(alertComponentFactory)

    // TODO ? this value is essentially a way to interact with a specific place in the DOM
    const hostViewContainerRef = this.alertHost.viewContainerRef;

    hostViewContainerRef.clear();

    // TODO ? creating the component by passing it's type to the ViewContainerRef
    const componentRef =
      hostViewContainerRef.createComponent(AlertModalComponent);

    // ? Manually setting the @Input() property
    componentRef.instance.message = message;
    // ? Manually subscriping to the @Output() EventEmitter
    this.closeSub = componentRef.instance.close.subscribe((_) => {
      this.closeSub.unsubscribe();
      hostViewContainerRef.clear();
    });
  }
}
