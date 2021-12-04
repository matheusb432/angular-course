import { Component } from '@angular/core';

import { CounterService } from './services/counter.service';
import { UsersService } from './services/users.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  // Providing UsersService so the AppModule instance get's overwritten for this component and it's children
  providers: [UsersService],
})
export class AppComponent {
  constructor(private counterService: CounterService) {}

  get count(): number {
    return this.counterService.counter;
  }
}
