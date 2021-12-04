import { Injectable, EventEmitter } from '@angular/core';
import { UserActions } from '../model/user-actions.enum';

@Injectable({ providedIn: 'root' })
export class CounterService {
  counter = 0;

  userAction = new EventEmitter<UserActions>();

  counterUpdated = new EventEmitter<number>();

  // TODO ? Essentially a dictionary that can run specific code for different actions, of course
  // ? that for a counter this is not very necessary but if there were a handful or
  // ? a dozen different actions that needed different handling in this service's event, then
  // ? this technique can centralize all handling in one place and be reusable in a more loosely coupled way.
  counterReducer = {
    [UserActions.SetActive]: () => {
      this.counter += 1;
    },
    [UserActions.SetInactive]: () => {
      this.counter -= 1;
    },
  };

  constructor() {
    this.userAction.subscribe((action) => {
      console.log(`userAction event triggered with action ${action}!`);

      this.incrementCounter(action);
    });
  }

  incrementCounter(action: UserActions) {
    this.counterReducer[action]?.();

    this.counterUpdated.emit(this.counter);
  }
}
