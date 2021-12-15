import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-alert',
  templateUrl: './alert.component.html',
})
export class AlertComponent {
  @Input() message = 'An error ocurred';

  canRender = true;

  closeAlert(): void {
    this.canRender = false;
  }
}
