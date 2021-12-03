import {
  HostBinding,
  HostListener,
  Input,
  OnInit,
  Renderer2,
} from "@angular/core";
import { ElementRef } from "@angular/core";
import { Directive } from "@angular/core";

@Directive({
  selector: "[appBetterHighlight]",
})
export class BetterHighlightDirective implements OnInit {
  @Input() defaultColor = "transparent";

  // TODO ? by naming the alias of the @Input() to the directive's name, you can bind to this property on the directive assignment
  @Input("appBetterHighlight") highlightColor = "blue";

  // TODO ? getting the backgroundColor property with HostBinding()
  @HostBinding("style.backgroundColor") backgroundColor: string;

  constructor(
    private elRef: ElementRef<HTMLElement>,
    private renderer: Renderer2
  ) {}

  ngOnInit(): void {
    this.backgroundColor = this.defaultColor;
  }

  // TODO ? @HostListener declares a DOM event to listen to on the element that this directive is applied to
  @HostListener("mouseenter") mouseover(eventData: Event) {
    this.backgroundColor = this.highlightColor;
  }

  @HostListener("mouseleave") mouseleave(eventData: Event) {
    this.backgroundColor = this.defaultColor;
  }
}
