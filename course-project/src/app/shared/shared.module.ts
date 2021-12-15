import { CommonModule } from '@angular/common';
import { LoadingSpinnerComponent } from './loading-spinner/loading-spinner.component';
import { DropdownBootstrapDirective } from './dropdown-bootstrap.directive';
import { DropdownDirective } from './dropdown.directive';
import { AlertModalComponent } from './alert-modal/alert-modal.component';
import { AlertComponent } from './alert/alert.component';
import { PlaceholderDirective } from './placeholder.directive';
import { NgModule } from '@angular/core';
import { ChevronIconComponent } from '../components/custom/chevron-icon/chevron-icon.component';

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
