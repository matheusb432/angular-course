import { AccountsService } from './services/accounts.service';
import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  // providers: [AccountsService],
})
export class AppComponent {
  accounts: { name: string; status: string }[] = [];

  constructor(private accountsService: AccountsService) {}

  ngOnInit() {
    // TODO ? passing service's accounts array reference to component prop.
    this.accounts = this.accountsService.accounts;
  }
}
