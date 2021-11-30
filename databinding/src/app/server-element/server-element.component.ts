import { Component, Input, OnInit, ViewEncapsulation } from "@angular/core";

@Component({
  selector: "app-server-element",
  templateUrl: "./server-element.component.html",
  styleUrls: ["./server-element.component.css"],
  // ? None, Native
  encapsulation: ViewEncapsulation.Emulated, // ? Without view encapsulation, component styles get applied globally
})
export class ServerElementComponent implements OnInit {
  // TODO ? [server] will be exposed in this component instead of [element]
  // ! This is usually bad practice so use with caution
  @Input("server") element: any;

  constructor() {}

  ngOnInit(): void {}
}
