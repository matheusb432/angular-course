import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';
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
      'Long Recipe description hmmm yes this is indeed a recipe',
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

  getRecipe(index: number): Recipe {
    return this.recipes[index];
  }

  addRecipe(recipe: Recipe): void {
    this._recipes.push(recipe);
  }

  updateRecipe(index: number, newRecipe: Recipe) {
    this._recipes[index] = newRecipe;
  }

  setActiveRecipe(recipe: Recipe): void {
    this._activeRecipe = recipe;
  }

  setActiveRecipeById(index: number): void {
    this._activeRecipe = this.recipes[index];
  }

  goToShoppingList(): void {
    this.shoppingService.addIngredients(this.activeRecipe.ingredients);

    this.router.navigate(['/shopping-list']);
  }

  deleteRecipe(recipe: Recipe): void {
    this._recipes = this._recipes.filter((r) => r !== recipe);
  }
}
