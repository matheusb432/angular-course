import { Ingredient } from './../shared/ingredient.model';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ShoppingService {
  private _ingredients: Ingredient[] = [
    new Ingredient('Apples', 5),
    new Ingredient('Pears', 10),
  ];
  startedEditing = new Subject<number>();

  constructor() {}

  get ingredients() {
    return this._ingredients;
  }

  getIngredient(index: number) {
    return this.ingredients[index];
  }

  addIngredient(ingredient: Ingredient) {
    this.ingredients.push(ingredient);
  }

  addIngredients(ingredients: Ingredient[]) {
    this.ingredients.push(...ingredients);
  }

  updateIngredient(ingredient: Ingredient, index: number) {
    this.ingredients[index] = ingredient;
  }

  deleteIngredient(ingredient: Ingredient) {
    this._ingredients = this.ingredients.filter((i) => i !== ingredient);
  }

  setIngredients(ingredients: Ingredient[]) {
    this._ingredients = ingredients;
  }
}
