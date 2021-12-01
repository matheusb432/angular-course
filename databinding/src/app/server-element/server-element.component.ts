import {
  AfterContentChecked,
  AfterContentInit,
  AfterViewChecked,
  AfterViewInit,
  Component,
  ContentChild,
  DoCheck,
  ElementRef,
  Input,
  OnChanges,
  OnDestroy,
  OnInit,
  SimpleChanges,
  ViewChild,
  ViewEncapsulation,
} from "@angular/core";

@Component({
  selector: "app-server-element",
  templateUrl: "./server-element.component.html",
  styleUrls: ["./server-element.component.css"],
  // ? None, Native
  encapsulation: ViewEncapsulation.Emulated, // ? Without view encapsulation, component styles get applied globally
})
export class ServerElementComponent
  implements
    OnInit,
    OnChanges,
    DoCheck,
    AfterContentInit,
    AfterContentChecked,
    AfterViewInit,
    AfterViewChecked,
    OnDestroy
{
  // TODO ? [server] will be exposed in this component instead of [element]
  // ! This is usually bad practice so use with caution
  // @Input("server") element: any;
  @Input() name: string;

  @ViewChild("heading", { static: true })
  header: ElementRef;

  // ? ContentChild() allows to get a local reference element outside of this component
  @ContentChild("contentParagraph", { static: true })
  paragraph: ElementRef;

  // TODO ? the constructor is called before ngOnInit()
  constructor() {
    console.log("constructor called!");
  }

  ngOnInit(): void {
    console.log("ngOnInit called!");
    console.log(
      `header text in ngOnInit -> ${this.header.nativeElement.textContent}`
    );
    console.log(
      `paragraph text in ngOnInit -> ${this.paragraph.nativeElement.textContent}`
    );
  }

  ngOnChanges(changes: SimpleChanges): void {
    console.log(changes);
    console.log("ngOnChanges called!");
  }

  ngDoCheck(): void {
    console.log("ngDoCheck called!");
  }

  ngAfterContentInit(): void {
    console.log("ngAfterContentInit called");
    console.log(
      `paragraph text in ngAfterContentInit -> ${this.paragraph.nativeElement.textContent}`
    );
  }

  ngAfterContentChecked(): void {
    console.log("ngAfterContentChecked called");
  }

  // TODO ? the local reference text content is only acessible after this lifecycle hook is triggered
  ngAfterViewInit(): void {
    console.log("ngAfterViewInit called");
    console.log(
      `header text in ngAfterViewInit -> ${this.header.nativeElement.textContent}`
    );
  }

  ngAfterViewChecked(): void {
    console.log("ngAfterViewChecked called");
  }

  ngOnDestroy(): void {
    console.log("ngOnDestroy called");
  }
}
