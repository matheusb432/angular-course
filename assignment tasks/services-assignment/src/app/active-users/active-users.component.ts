import { Component, OnInit } from '@angular/core';
import { User } from '../model/user';

import { CounterService } from '../services/counter.service';
import { UsersService } from './../services/users.service';

@Component({
  selector: 'app-active-users',
  templateUrl: './active-users.component.html',
  styleUrls: ['./active-users.component.css'],
})
export class ActiveUsersComponent implements OnInit {
  constructor(
    private usersService: UsersService,
    private counterService: CounterService
  ) {}

  get users(): User[] {
    return this.usersService.users.filter((u) => u.active);
  }

  ngOnInit() {
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
