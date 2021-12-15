import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-placeholder',
  template: `
    <div class="flex items-center justify-center w-full h-full">
      <p class="text-3xl font-bold">{{ message }}</p>
    </div>
  `,
})
export class PlaceholderComponent {
  @Input() message: string;
}
