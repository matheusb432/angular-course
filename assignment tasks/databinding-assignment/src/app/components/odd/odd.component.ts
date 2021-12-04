import { Component, Input } from "@angular/core";

@Component({
  selector: "app-odd",
  template: `<div class="odd">Odd - {{ number }}</div> `,
  styles: [
    `
      .odd {
        color: rebeccapurple;
        padding: 12px;
        border: 1px solid black;
        border-radius: 5px;
        font-size: 20px;
        margin-right: 8px;
      }
    `,
  ],
})
export class OddComponent {
  @Input() number;
}
