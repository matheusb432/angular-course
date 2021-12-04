import { UserActions } from '.././model/user-actions.enum';
import { CounterService } from './counter.service';
import { Injectable } from '@angular/core';
import { User } from '../model/user';

@Injectable({ providedIn: 'root' })
export class UsersService {
  users: User[] = [
    new User(1, 'Max', true),
    new User(2, 'Anna', true),
    new User(3, 'Chris', true),
    new User(4, 'Manu', true),
  ];

  constructor(private counterService: CounterService) {}

  onSetToInactive(id: number) {
    const user = this.getUser(id);

    user.active = false;

    this.onAction(user, UserActions.SetActive);
  }

  onSetToActive(id: number) {
    const user = this.getUser(id);

    user.active = true;

    this.onAction(user, UserActions.SetInactive);
  }

  onAction(user: User, action: UserActions) {
    user.statusChangeCount++;

    this.counterService.userAction.emit(action);
  }

  getUser = (id: number) => this.users.find((u) => u.id === id);
}
