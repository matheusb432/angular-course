import { LoggingService } from './../../logging.service';
import { Component, OnInit, SkipSelf } from '@angular/core';

import { Ingredient } from '../../shared/ingredient.model';
import { ShoppingService } from '../shopping.service';

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.scss'],
  // providers: [ShoppingService],
})
export class ShoppingListComponent implements OnInit {
  // TODO * @SkipSelf() here gets the ModuleInjector instance of ShoppingService, so it ignores the
  // * local provided instance, this way it can keep the same state application wide.
  constructor(
    @SkipSelf() private serviceRoot: ShoppingService,
    private loggingService: LoggingService
  ) {}

  ngOnInit() {
    this.loggingService.printLog('Hello from ShoppingListComponent!');
  }

  get ingredients(): Ingredient[] {
    return this.serviceRoot.ingredients;
  }

  onEditItem(index: number): void {
    this.serviceRoot.startedEditing.next(index);
  }
}
