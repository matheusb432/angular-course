import { Component } from "@angular/core";

@Component({
  selector: "[app-warning-alert]",
  template: `<p>Warning!</p>`,
  styles: [
    `
      p {
        display: flex;
        justify-content: center;
        align-items: center;
        padding: 12px;
        width: 25%;
        font-size: 28px;
        color: yellow;
        font-weight: bold;
        border: 1px solid lightyellow;
      }
    `,
  ],
})
export class WarningAlertComponent {}
