import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-server',
  templateUrl: './server.component.html',
  styles: [
    `
      .online {
        color: white;
      }
    `,
  ],
})
export class ServerComponent {
  serverId = 10;
  serverStatus: string;
  @Input() serverName: string;

  constructor() {
    this.serverStatus = Math.random() > 0.5 ? 'online' : 'offline';
  }

  getServerStatus = () => this.serverStatus;

  getColor = () => (this.serverStatus === 'online' ? '#66bb6a' : '#ff7f7f');
}
