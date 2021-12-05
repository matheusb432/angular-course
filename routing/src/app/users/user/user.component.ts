import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';

import { User } from './../user';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css'],
})
export class UserComponent implements OnInit, OnDestroy {
  user: User;
  paramsSubscription: Subscription;

  constructor(private route: ActivatedRoute) {}

  ngOnInit() {
    this.initUser();

    // TODO * subscribing to the route params so any time the route changes, it can be reacted to
    this.paramsSubscription = this.route.params.subscribe((params: User) => {
      this.user = { id: params.id, name: params.name };
    });
  }

  ngOnDestroy(): void {
    // TODO * unsubscribing to the observable when it's no longer needed
    this.paramsSubscription.unsubscribe();
  }

  initUser() {
    this.user = {
      id: this.route.snapshot.params['id'],
      name: this.route.snapshot.params['name'],
    };
  }
}
