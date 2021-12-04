import { Component, Input } from "@angular/core";

@Component({
  selector: "app-even",
  template: `<div class="even">Even - {{ number }}</div>`,
  styles: [
    `
      .even {
        color: green;
        padding: 12px;
        border: 1px solid black;
        border-radius: 5px;
        font-size: 20px;
        margin-right: 8px;
      }
    `,
  ],
})
export class EvenComponent {
  @Input() number;
}
