import { canActivateReturn } from './../../auth-guard.service';
import { Observable } from 'rxjs';
import {
  ActivatedRouteSnapshot,
  CanDeactivate,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router';
import { Injectable } from '@angular/core';

export interface CanComponentDeactivate {
  canDeactivate: () => canActivateReturn;
}

@Injectable({ providedIn: 'root' })
export class CanDeactivateGuard
  implements CanDeactivate<CanComponentDeactivate>
{
  canDeactivate(
    component: CanComponentDeactivate,
    currentRoute: ActivatedRouteSnapshot,
    currentState: RouterStateSnapshot,
    nextState?: RouterStateSnapshot
  ): canActivateReturn {
    return component.canDeactivate();
  }
}
