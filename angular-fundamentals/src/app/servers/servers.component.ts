import { Component, OnInit } from '@angular/core';

@Component({
  // TODO ? Element Selector
  selector: 'app-servers',
  // TODO ? Attribute Selector
  // selector: '[app-servers]',
  // TODO ? Class Selector
  // selector: '.app-servers',
  templateUrl: './servers.component.html',
  styleUrls: ['./servers.component.css'],
})
export class ServersComponent implements OnInit {
  allowNewServer = false;
  serverCreationStatus = 'No server was created';
  serverName = '';
  serverNameWithNgModel = '';
  serverCreated = false;
  servers = ['Test Server', 'Test Server 2'];

  addServerText = 'Add Server Element Binding';

  constructor() {
    setTimeout(() => {
      this.allowNewServer = true;
    }, 2000);
  }

  ngOnInit(): void {}

  onCreateServer() {
    this.serverCreationStatus = `Server was created, server is ${this.serverName}`;
    this.servers.push(this.serverName);
    this.serverName = '';
    this.serverCreated = true;
  }

  onHover() {
    console.log('hovered!');
  }

  onUpdateServerName(event: Event) {
    this.serverName = (<HTMLInputElement>event.target).value;
  }
}
