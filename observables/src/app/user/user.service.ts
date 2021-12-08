import { Injectable, EventEmitter } from "@angular/core";
import { Subject } from "rxjs";

@Injectable({ providedIn: "root" })
export class UserService {
  // TODO * subjects can be used as more efficient event emitters, should always be used for cross-component communications
  // * in general should be used for emitters that need subscriptions, if a subscribe() isn't needed, just use EventEmitter
  activatedEmitter = new Subject<boolean>();
  // activatedEmitter = new EventEmitter<boolean>();
}
