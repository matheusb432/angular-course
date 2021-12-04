import { Component } from "@angular/core";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"],
})
export class AppComponent {
  odds: number[] = [];
  evens: number[] = [];

  addNumber(n: number) {
    this.isEven(n) ? this.evens.push(n) : this.odds.push(n);
  }

  isEven = (n: number) => n % 2 === 0;
}
