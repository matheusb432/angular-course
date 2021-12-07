import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Ingredient } from 'src/app/shared/ingredient.model';

import { ShoppingService } from './../shopping/shopping.service';
import { Recipe } from './recipe.model';

@Injectable({
  providedIn: 'root',
})
export class RecipeService {
  private _recipes: Recipe[] = [
    new Recipe(
      1,
      'Beef Recipe',
      'recipe description',
      'https://cdn.pixabay.com/photo/2016/06/15/19/09/food-1459693_960_720.jpg',
      [new Ingredient('beef ing 1', 10), new Ingredient('beef ing 2', 15)]
    ),
    new Recipe(
      2,
      'Shrimp Recipe',
      'recipe desc',
      'https://upload.wikimedia.org/wikipedia/commons/3/39/Recipe.jpg',
      [
        new Ingredient('shrimp ing 1', 20),
        new Ingredient('shrimp ing 2', 12),
        new Ingredient('shrimp ing 3', 530),
        new Ingredient('shrimp ing 4', 5),
      ]
    ),
    new Recipe(
      3,
      'Dish Recipe',
      'recipe ---',
      'https://cdn.pixabay.com/photo/2014/12/21/23/28/recipe-575434_960_720.png',
      [
        new Ingredient('dish ing 1', 9),
        new Ingredient('dish ing 2', 2),
        new Ingredient('dish ing 3', 6),
      ]
    ),
  ];

  private _activeRecipe: Recipe;

  constructor(
    private shoppingService: ShoppingService,
    private router: Router
  ) {}

  get recipes() {
    return this._recipes;
  }

  get activeRecipe() {
    return this._activeRecipe;
  }

  setActiveRecipe(recipe: Recipe): void {
    this._activeRecipe = recipe;
  }

  setActiveRecipeById(id: number): void {
    this._activeRecipe = this.recipes.find((r) => r.id === id);
  }

  goToShoppingList(): void {
    this.shoppingService.addIngredients(this.activeRecipe.ingredients);

    this.router.navigate(['/shopping-list']);

    // TODO ? navigating without routing
    // this.featureService.onNavigate(Features.ShoppingList);
  }
}
