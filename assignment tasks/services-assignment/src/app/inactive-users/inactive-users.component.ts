import { Component, OnInit } from '@angular/core';

import { CounterService } from '../services/counter.service';
import { UsersService } from '../services/users.service';

@Component({
  selector: 'app-inactive-users',
  templateUrl: './inactive-users.component.html',
  styleUrls: ['./inactive-users.component.css'],
})
export class InactiveUsersComponent implements OnInit {
  constructor(
    private usersService: UsersService,
    private counterService: CounterService
  ) {}

  // ? since users here is just a subset of the users array, it should be a readonly property.
  get users() {
    return this.usersService.users.filter((u) => !u.active);
  }

  ngOnInit() {
    this.counterService.counterUpdated.subscribe((number) => {
      console.log(`in inactive-users, counter = ${number}`);
    });
  }

  get count(): number {
    return this.counterService.counter;
  }

  onSetToActive(id: number) {
    this.usersService.onSetToActive(id);
  }
}
