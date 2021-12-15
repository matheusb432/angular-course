import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-alert-modal',
  templateUrl: './alert-modal.component.html',
  styleUrls: ['./alert-modal.component.scss'],
})
export class AlertModalComponent {
  @Input() message = 'An error ocurred';

  @Output() close = new EventEmitter<void>();

  onClose(): void {
    this.close.emit();
  }
}
