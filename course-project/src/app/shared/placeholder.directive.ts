import { Directive, ViewContainerRef } from '@angular/core';

@Directive({
  selector: '[appPlaceholder]',
})
export class PlaceholderDirective {
  // TODO * gives access to a pointer to where this directive is used
  constructor(public viewContainerRef: ViewContainerRef) {}
}
