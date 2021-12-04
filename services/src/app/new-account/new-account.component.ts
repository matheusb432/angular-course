import { Component } from '@angular/core';

import { AccountsService } from './../services/accounts.service';
import { LoggingService } from './../services/logging.service';

@Component({
  selector: 'app-new-account',
  templateUrl: './new-account.component.html',
  styleUrls: ['./new-account.component.css'],
  // TODO ? if AccountsService is provided here, it will overwrite the AppComponent singleton instance
  // providers: [LoggingService, AccountsService],
  // TODO ? but by omitting it and injecting the AccountsService here, we will use the same instance
  // ? that was instantiated there, allowing the accounts array to be modified here and it's changes be reflected
  // ? on the app component without needing to databind it to this component.
  // TODO ? by not providing LoggingService here, the instance used here will be the AppModule one
  // providers: [LoggingService],
})
export class NewAccountComponent {
  // TODO ? by using the AppComponent singleton service instance here, passing the accounts array with @Input()
  // ? or emiting an addAccount event with @Output() becomes unnecessary, so the application state management
  // ? becomes leaner and more simple
  constructor(private accountsService: AccountsService) {
    // TODO ? with this event subscription, cross-component communication has been achieved in a better way.
    this.accountsService.statusUpdated.subscribe((val) => {
      alert(`Got event! status -> ${val}`);
    });
  }

  onCreateAccount(accountName: string, accountStatus: string) {
    this.accountsService.addAccount(accountName, accountStatus);

    // this.service.logStatusChange(accountStatus);
  }
}
