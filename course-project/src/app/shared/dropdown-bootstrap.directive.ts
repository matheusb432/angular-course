import {
  Directive,
  ElementRef,
  HostBinding,
  HostListener,
} from '@angular/core';

// TODO ? directive to work with bootstrap css
@Directive({
  selector: '[appDropdownBootstrap]',
})
export class DropdownBootstrapDirective {
  // TODO ? if isOpen is true, this class will be attached to the element, else it will be removed
  @HostBinding('class.open') isOpen = false;

  constructor(private elRef: ElementRef) {}

  @HostListener('document:click', ['$event']) toggleOpen(event: Event) {
    this.isOpen = this.elRef.nativeElement.contains(event.target)
      ? !this.isOpen
      : false;
  }

  // TODO ? toggling only on click
  // @HostListener('click') toggleOpen() {
  //   this.isOpen = !this.isOpen;
  // }
}
