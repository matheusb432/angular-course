import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

import { ShoppingService } from './../shopping/shopping.service';
import { Recipe } from './recipe.model';

@Injectable({
  providedIn: 'root',
})
export class RecipeService {
  private _recipes: Recipe[] = [];

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

  setRecipes(recipes: Recipe[]) {
    this._recipes = recipes;
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
