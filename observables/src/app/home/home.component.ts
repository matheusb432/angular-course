import { Component, OnDestroy, OnInit } from "@angular/core";

import { Observable, interval, Subscription } from "rxjs";

import { map, filter } from "rxjs/operators";

@Component({
  selector: "app-home",
  templateUrl: "./home.component.html",
  styleUrls: ["./home.component.css"],
})
export class HomeComponent implements OnInit, OnDestroy {
  private intervalSub: Subscription;

  constructor() {}

  ngOnInit() {
    // TODO ? building a custom observable
    const interval$ = new Observable((observer) => {
      let count = 0;
      setInterval(() => {
        observer.next(count);

        if (count === 5) {
          observer.complete();
        }

        if (count > 3) {
          observer.error(new Error("Count > 3!"));
        }

        count++;
      }, 1000);
    });

    // TODO ? applying RxJS operators to map the observable data to this new format
    // ? RxJS operators essentially allow you to build a chain of steps to handle observable data.
    const pipedInterval$ = interval$.pipe(
      filter((data: number): boolean => {
        return data > 0;
      }),
      map((data: number) => {
        return `Round ${data + 1}`;
      })
    );

    // TODO * An observable will not trigger the 'complete' event if an error is triggered,
    // * an error means the observable is interrupted, not finished
    this.intervalSub = pipedInterval$.subscribe(
      (data: string) => {
        console.log(data);
      },
      (err) => {
        alert(err.message);
      },
      () => {
        console.log("Completed");
      }
    );

    // TODO * this observable subscription will keep running until it's unsubscribed from
    // this.intervalSub = interval(1000).subscribe((count) => {
    //   console.log(count);
    // });
  }

  // TODO * to prevent a memory leak, it's necessary to unsubscribe to the observable after destroying this component
  ngOnDestroy(): void {
    this.intervalSub?.unsubscribe();
  }
}
