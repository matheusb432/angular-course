import { Component, EventEmitter, Output } from "@angular/core";

@Component({
  selector: "app-game-control",
  templateUrl: "./game-control.component.html",
  styleUrls: ["./game-control.component.css"],
})
export class GameControlComponent {
  gameControl: any;

  @Output() newNumber: EventEmitter<number> = new EventEmitter();
  incrementingNumber = 0;

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
}
