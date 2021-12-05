import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { ServersService } from './servers.service';
import { Server } from './server';

@Component({
  selector: 'app-servers',
  templateUrl: './servers.component.html',
  styleUrls: ['./servers.component.css'],
})
export class ServersComponent implements OnInit {
  public servers: Server[] = [];

  constructor(
    private serversService: ServersService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.servers = this.serversService.getServers();
  }

  onReload() {
    // TODO * the Router.navigate() method doesn't know what the current route is, so putting the path that
    // * normally would be acessed relatively (without the '/') still only goes to /servers
    // this.router.navigate(['servers']);
    // TODO ? `relativeTo` specifies a relative path that the router should navigate to
    // this.router.navigate(['servers'], { relativeTo: this.route });
  }
}
