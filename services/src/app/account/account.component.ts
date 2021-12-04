import { Component, Input } from '@angular/core';

import { AccountsService } from './../services/accounts.service';

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.css'],
  // providers: [LoggingService],
})
export class AccountComponent {
  @Input() account: { name: string; status: string };
  @Input() id: number;

  constructor(private accountsService: AccountsService) {}

  onSetTo(status: string) {
    this.accountsService.updateStatus(this.id, status);

    // TODO ? emitting an event with the service, meaning all components that have injected this same
    // ? singleton instance and are listening to this event emitter will be able to run code when this
    // ? event gets triggered
    this.accountsService.statusUpdated.emit(status);
    // ? not necessary anymore since it's called in the accountsService.updateStatus() method
    // this.loggingService.logStatusChange(status);
  }
}
