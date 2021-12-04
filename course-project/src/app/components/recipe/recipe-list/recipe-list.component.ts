import { RecipeService } from '../recipe.service';
import { Recipe } from '../recipe.model';
import { Component, OnInit, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.scss'],
})
export class RecipeListComponent {
  constructor(private service: RecipeService) {}

  get recipes() {
    return this.service.recipes;
  }
}
