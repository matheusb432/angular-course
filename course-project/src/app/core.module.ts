import { LoggingService } from './logging.service';
import { AuthInterceptorService } from './auth/auth-interceptor.service';
import { NgModule } from '@angular/core';
import { provideInterceptor } from './shared/utils';

@NgModule({
  providers: [provideInterceptor(AuthInterceptorService)],
})
export class CoreModule {}
