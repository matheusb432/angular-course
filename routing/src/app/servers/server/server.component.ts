import { ActivatedRoute, Data, Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { Server } from '../server';

import { ServersService } from '../servers.service';

@Component({
  selector: 'app-server',
  templateUrl: './server.component.html',
  styleUrls: ['./server.component.css'],
})
export class ServerComponent implements OnInit {
  server: Server;

  constructor(
    private serversService: ServersService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  get params() {
    return this.route.snapshot.params;
  }

  ngOnInit() {
    // TODO ? using the resolver service configured in the appRoutes array to get the data
    this.route.data.subscribe((data: Data) => {
      this.server = data['server'];

      console.log(this.server);
    });

    // !
    // const { id } = this.params;

    // this.initServer(+id);

    // this.route.params.subscribe((p) => {
    //   this.initServer(+p.id);
    // });
  }

  initServer(id: number) {
    this.server = this.serversService.getServer(id);
  }

  onEdit() {
    this.router.navigate(['edit'], {
      relativeTo: this.route,
      queryParamsHandling: 'preserve',
    });
  }
}
