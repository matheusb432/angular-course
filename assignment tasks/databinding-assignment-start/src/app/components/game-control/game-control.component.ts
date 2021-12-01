import { Component, EventEmitter, OnInit, Output } from "@angular/core";

@Component({
  selector: "app-game-control",
  templateUrl: "./game-control.component.html",
  styleUrls: ["./game-control.component.css"],
})
export class GameControlComponent implements OnInit {
  // odds: number[] = [];
  // evens: number[] = [];
  gameControl: NodeJS.Timeout;

  @Output() newNumber: EventEmitter<number> = new EventEmitter();
  incrementingNumber = 0;

  constructor() {}

  ngOnInit() {}

  startGame() {
    this.gameControl = setInterval(() => {
      const rand = this.getRandInt();

      this.newNumber.emit(rand);
      this.newNumber.emit(++this.incrementingNumber);
    }, 1000);
  }

  stopGame() {
    clearInterval(this.gameControl);
  }

  getRandInt = (min = 0, max = 1000) =>
    Math.floor((min + max) * Math.random() + min);

  // isEven = (n: number) => n % 2 === 0;
}
