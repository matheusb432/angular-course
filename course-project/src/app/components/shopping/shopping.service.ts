import { Ingredient } from '../../shared/ingredient.model';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ShoppingService {
  private _ingredients: Ingredient[] = [
    new Ingredient('Apples', 5),
    new Ingredient('Pears', 10),
  ];

  constructor() {}

  get ingredients() {
    return this._ingredients;
  }

  addIngredient(ingredient: Ingredient) {
    this.ingredients.push(ingredient);
  }

  addIngredients(ingredients: Ingredient[]) {
    this.ingredients.push(...ingredients);
  }

  setIngredients(ingredients: Ingredient[]) {
    this._ingredients = ingredients;
  }
}
