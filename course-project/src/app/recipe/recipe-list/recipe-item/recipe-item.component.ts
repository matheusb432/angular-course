import { Component, Input } from '@angular/core';

import { Recipe } from '../../recipe.model';

@Component({
  selector: 'app-recipe-item',
  templateUrl: './recipe-item.component.html',
  styleUrls: ['./recipe-item.component.scss'],
})
export class RecipeItemComponent {
  // TODO * by using the RecipeComponent's RecipeService instance, there's no need to create a
  // TODO * long chain of @Output events to emit this value to the RecipeDetailComponent
  // *
  // * before :: recipe-item -> recipe-list -> recipes <-> recipe-detail
  // * after  :: recipe-item <-> RecipeService <-> recipe-detail
  @Input() recipe: Recipe;

  @Input() index: number;
}
