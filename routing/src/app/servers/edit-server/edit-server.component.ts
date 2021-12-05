import { CanComponentDeactivate } from './can-deactivate-guard.service';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';

import { ServersService } from '../servers.service';
import { canActivateReturn } from 'src/app/auth-guard.service';

@Component({
  selector: 'app-edit-server',
  templateUrl: './edit-server.component.html',
  styleUrls: ['./edit-server.component.css'],
})
export class EditServerComponent implements OnInit, CanComponentDeactivate {
  server: { id: number; name: string; status: string };
  serverName = '';
  serverStatus = '';
  allowEdit = false;
  changesSaved = false;

  constructor(
    private serversService: ServersService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit() {
    // TODO ? getting current route's query parameters or fragment
    // console.log(this.route.snapshot.queryParams);
    // console.log(this.route.snapshot.fragment);

    // TODO ? subscribing to changes in queryParams, not needed to unsubscribe since that's handled by Angular
    // this.route.queryParams.subscribe();
    // this.route.fragment.subscribe()

    const { id } = this.route.snapshot.params;

    this.initServerEdit(+id);

    this.route.params.subscribe((p) => {
      this.initServerEdit(+p.id);
    });

    this.route.queryParams.subscribe((qp: Params) => {
      this.allowEdit = qp['allowEdit'] === '1' ? true : false;
    });
  }

  canDeactivate(): canActivateReturn {
    if (!this.allowEdit) return true;

    if (
      (this.serverName !== this.server.name ||
        this.serverStatus !== this.server.status) &&
      !this.changesSaved
    ) {
      return confirm('Do you want to discard the changes?');
    } else {
      return true;
    }
  }

  initServerEdit(id: number) {
    this.server = this.serversService.getServer(id);
    this.serverName = this.server.name;
    this.serverStatus = this.server.status;
  }

  onUpdateServer() {
    this.serversService.updateServer(this.server.id, {
      name: this.serverName,
      status: this.serverStatus,
    });

    this.changesSaved = true;
    this.router.navigate(['../'], { relativeTo: this.route });
  }
}
