import { Component, OnInit } from '@angular/core';

import { CounterService } from '../services/counter.service';
import { UsersService } from './../services/users.service';

@Component({
  selector: 'app-active-users',
  templateUrl: './active-users.component.html',
  styleUrls: ['./active-users.component.css'],
})
export class ActiveUsersComponent implements OnInit {
  users: string[];
  constructor(
    private usersService: UsersService,
    private counterService: CounterService
  ) {}

  ngOnInit() {
    this.users = this.usersService.activeUsers;

    this.counterService.counterUpdated.subscribe((number) => {
      console.log(`in active-users, counter = ${number}`);
    });
  }

  get count(): number {
    return this.counterService.counter;
  }

  onSetToInactive(id: number) {
    this.usersService.onSetToInactive(id);
  }
}
