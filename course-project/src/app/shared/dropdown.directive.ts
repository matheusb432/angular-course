import {
  AfterViewInit,
  Directive,
  ElementRef,
  HostListener,
  Input,
  OnInit,
  Renderer2,
} from '@angular/core';

// TODO ? custom dropdown directive
@Directive({
  selector: '[appDropdown]',
})
export class DropdownDirective implements OnInit, AfterViewInit {
  @Input() dropdownMenu: HTMLElement;

  constructor(
    private dropdown: ElementRef<HTMLElement>,
    private renderer: Renderer2
  ) {}

  ngOnInit(): void {}

  get menuShown(): boolean {
    return this.dropdownMenu.style.display === 'none' ? false : true;
  }

  ngAfterViewInit(): void {
    this.renderer.setStyle(this.dropdownMenu, 'display', 'none');
  }

  @HostListener('document:click', ['$event'])
  clickout(event: any) {
    if (this.dropdown.nativeElement.contains(event.target)) {
      this.toggleDropdown();
    } else {
      this.toggleDropdown(true);
    }
  }

  toggleDropdown(hide = false) {
    this.renderer.setStyle(
      this.dropdownMenu,
      'display',
      hide || this.menuShown ? 'none' : 'block'
    );
  }

  // TODO ? configuring only click to show or hide menu
  // @HostListener('click') onClick(event: Event) {
  //   this.renderer.setStyle(
  //     this.dropdownMenu,
  //     'display',
  //     this.menuShown ? 'none' : 'block'
  //   );
  // }
}
