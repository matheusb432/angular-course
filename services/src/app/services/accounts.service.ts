import { Injectable, EventEmitter } from '@angular/core';
import { LoggingService } from './logging.service';

// ? using providedIn: 'root' provides an AppModule (meaning, application-wide) singleton instance for this service
// TODO IMPORTANT this enables the service to be loaded lazily, so it's only instantied when needed instead of at startup
// @Injectable({
//   providedIn: 'root',
// })
@Injectable()
export class AccountsService {
  accounts = [
    {
      name: 'Master Account',
      status: 'active',
    },
    {
      name: 'Testaccount',
      status: 'inactive',
    },
    {
      name: 'Hidden Account',
      status: 'unknown',
    },
  ];

  // TODO ? instantiating an observable event emitter in the service so any components that injects this service
  // ? can subscribe to this event emitter and get data from it.
  statusUpdated = new EventEmitter<string>();

  // TODO ? this loggingService instance will only be resolved if AccountsService has a @Injectable decorator metadata
  // ? meaning any `receiving` service must have a @Injectable decorator to be able to inject other services in its constructor.
  constructor(private loggingService: LoggingService) {}

  addAccount(name: string, status: string) {
    this.accounts.push({ name, status });

    this.loggingService.logStatusChange(status);
  }

  updateStatus(id: number, status: string) {
    this.accounts[id].status = status;

    this.loggingService.logStatusChange(status);

    // TODO ? can also emit event on the service itself
    // this.statusUpdated.emit(status);
  }
}
