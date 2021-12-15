import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { Provider } from '@angular/core';

function provideInterceptor<T>(classType: new (...args: any[]) => T): Provider {
  return {
    provide: HTTP_INTERCEPTORS,
    useClass: classType,
    multi: true,
  };
}

export { provideInterceptor };
