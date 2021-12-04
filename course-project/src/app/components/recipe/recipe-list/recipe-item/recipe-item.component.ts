import { RecipeService } from '../../recipe.service';
import { Recipe } from '../../recipe.model';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-recipe-item',
  templateUrl: './recipe-item.component.html',
  styleUrls: ['./recipe-item.component.scss'],
})
export class RecipeItemComponent implements OnInit {
  @Input() recipe: Recipe;

  constructor(private service: RecipeService) {}

  ngOnInit(): void {}

  // TODO * by using the RecipeComponent's RecipeService instance, there's no need to create a
  // TODO * long chain of @Output events to emit this value to the RecipeDetailComponent
  // *
  // * before :: recipe-item -> recipe-list -> recipes <-> recipe-detail
  // * after  :: recipe-item <-> RecipeService <-> recipe-detail
  onRecipeSelect() {
    this.service.setActiveRecipe(this.recipe);
  }
}
