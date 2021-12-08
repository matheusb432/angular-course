import { Ingredient } from '../../shared/ingredient.model';
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
  ingredientsChanged = new Subject<Ingredient[]>();

  constructor() {}

  get ingredients() {
    return this._ingredients;
  }

  addIngredient(ingredient: Ingredient) {
    this.ingredients.push(ingredient);

    this.ingredientsChanged.next(this.ingredients.slice());
  }

  addIngredients(ingredients: Ingredient[]) {
    this.ingredients.push(...ingredients);

    this.ingredientsChanged.next(this.ingredients.slice());
  }

  setIngredients(ingredients: Ingredient[]) {
    this._ingredients = ingredients;
  }
}
