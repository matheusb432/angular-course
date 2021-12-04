import { RecipeService } from '../recipe.service';
import { Recipe } from '../recipe.model';
import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-recipe-detail',
  templateUrl: './recipe-detail.component.html',
  styleUrls: ['./recipe-detail.component.scss'],
})
export class RecipeDetailComponent implements OnInit {
  constructor(private service: RecipeService) {}

  ngOnInit(): void {}

  get recipe() {
    return this.service.activeRecipe;
  }

  navigateWithIngredients(): void {
    this.service.goToShoppingList();
  }
}
