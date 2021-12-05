import { ServersService } from './../servers.service';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  Resolve,
  RouterStateSnapshot,
} from '@angular/router';
import { Server } from '../server';

type ResolveReturn<T> = Observable<T> | Promise<T> | T;

@Injectable({
  providedIn: 'root',
})
export class ServerResolver implements Resolve<Server> {
  constructor(private serversService: ServersService) {}

  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): ResolveReturn<Server> {
    return this.serversService.getServer(+route.params['id']);
  }
}
