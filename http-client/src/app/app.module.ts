import { LoggingInterceptorService } from './logging-interceptor.service';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule, Provider } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { AppComponent } from './app.component';
import { AuthInterceptorService } from './auth-interceptor.service';

@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule, FormsModule, HttpClientModule],
  providers: [
    // TODO ? The order in which the interceptors are provided will be the order in which they execute
    // TODO ? providing a Http Interceptor service
    provideInterceptor(AuthInterceptorService),
    provideInterceptor(LoggingInterceptorService),
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}

// TODO ? completely optional but is just a utility function to shorthand the interceptor object provision
function provideInterceptor<T>(classType: new (...args: any[]) => T): Provider {
  return {
    provide: HTTP_INTERCEPTORS,
    useClass: classType,
    multi: true,
  };
}
