import { Component, EventEmitter, Input, Output, OnInit } from '@angular/core';
import { CounterService } from '../services/counter.service';
import { UsersService } from '../services/users.service';

@Component({
  selector: 'app-inactive-users',
  templateUrl: './inactive-users.component.html',
  styleUrls: ['./inactive-users.component.css'],
})
export class InactiveUsersComponent implements OnInit {
  users: string[];

  constructor(
    private usersService: UsersService,
    private counterService: CounterService
  ) {}

  ngOnInit() {
    this.users = this.usersService.inactiveUsers;

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
