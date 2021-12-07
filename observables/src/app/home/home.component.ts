import { Component, OnDestroy, OnInit } from "@angular/core";

import { Observable, interval, Subscription } from "rxjs";

@Component({
  selector: "app-home",
  templateUrl: "./home.component.html",
  styleUrls: ["./home.component.css"],
})
export class HomeComponent implements OnInit, OnDestroy {
  private counter: Subscription;

  constructor() {}

  ngOnInit() {
    // TODO * this observable subscription will keep running until it's unsubscribed from
    this.counter = interval(1000).subscribe((count) => {
      console.log(count);
    });
  }

  // TODO * to prevent a memory leak, it's necessary to unsubscribe to the observable after destroying this component
  ngOnDestroy(): void {
    this.counter.unsubscribe();
  }
}
