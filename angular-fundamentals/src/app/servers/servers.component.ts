import { Component, OnInit } from '@angular/core';

@Component({
  // TODO ? Element Selector
  selector: 'app-servers',
  // TODO ? Attribute Selector
  // selector: '[app-servers]',
  // TODO ? Class Selector
  // selector: '.app-servers',
  template: `
    <app-server></app-server>
    <app-server></app-server>
  `,
  styleUrls: ['./servers.component.css'],
})
export class ServersComponent implements OnInit {
  constructor() {}

  ngOnInit(): void {}
}
