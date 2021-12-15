import { PlaceholderDirective } from './placeholder.directive';
import { LoadingSpinnerComponent } from './components/loading-spinner/loading-spinner.component';
import { DropdownBootstrapDirective } from './dropdown-bootstrap.directive';
import { DropdownDirective } from './dropdown.directive';
import { ChevronIconComponent } from './components/chevron-icon/chevron-icon.component';
import { AlertModalComponent } from './components/alert-modal/alert-modal.component';
import { AlertComponent } from './components/alert/alert.component';
import { CommonModule } from '@angular/common';

import { NgModule } from '@angular/core';

// TODO * shared modules import and export features that will get used across various different modules in the app
@NgModule({
  declarations: [
    PlaceholderDirective,
    AlertComponent,
    AlertModalComponent,
    ChevronIconComponent,
    DropdownDirective,
    DropdownBootstrapDirective,
    LoadingSpinnerComponent,
  ],
  imports: [CommonModule],
  exports: [
    CommonModule,
    ChevronIconComponent,
    PlaceholderDirective,
    AlertComponent,
    AlertModalComponent,
    DropdownDirective,
    DropdownBootstrapDirective,
    LoadingSpinnerComponent,
  ],
})
export class SharedModule {}
