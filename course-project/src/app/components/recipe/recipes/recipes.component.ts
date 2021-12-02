import { Recipe } from './../recipe-list/recipe.model';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-recipes',
  templateUrl: './recipes.component.html',
  styleUrls: ['./recipes.component.scss'],
})
export class RecipesComponent implements OnInit {
  activeRecipe: Recipe;

  constructor() {}

  ngOnInit(): void {}

  setActiveRecipe(recipe: Recipe): void {
    this.activeRecipe = recipe;
  }
}
