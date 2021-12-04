import { ShoppingService } from '../shopping.service';
import { Ingredient } from './../../../shared/ingredient.model';
import { Component, Host, OnInit, SkipSelf } from '@angular/core';

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.scss'],
  // providers: [ShoppingService],
})
export class ShoppingListComponent implements OnInit {
  // TODO * @SkipSelf() here gets the ModuleInjector instance of ShoppingService, so it ignores the
  // * local provided instance, this way it can keep the same state application wide.
  constructor(@SkipSelf() private serviceRoot: ShoppingService) {}

  ngOnInit() {}

  get ingredients(): Ingredient[] {
    return this.serviceRoot.ingredients;
  }
}
