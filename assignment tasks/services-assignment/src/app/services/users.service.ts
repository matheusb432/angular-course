import { UserActions } from '.././model/user-actions.enum';
import { CounterService } from './counter.service';
import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class UsersService {
  activeUsers = ['Max', 'Anna'];
  inactiveUsers = ['Chris', 'Manu'];

  constructor(private counterService: CounterService) {}

  onSetToInactive(id: number) {
    this.inactiveUsers.push(this.activeUsers[id]);

    this.activeUsers.splice(id, 1);

    this.onAction(UserActions.SetActive);
  }

  onSetToActive(id: number) {
    this.activeUsers.push(this.inactiveUsers[id]);

    this.inactiveUsers.splice(id, 1);

    this.onAction(UserActions.SetInactive);
  }

  onAction(action: UserActions) {
    this.counterService.userAction.emit(action);
  }
}
