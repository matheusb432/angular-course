import { RecipeService } from './../recipe.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-recipes',
  templateUrl: './recipes.component.html',
  styleUrls: ['./recipes.component.scss'],
  // TODO * Removing the RecipeService provision here so it becomes a singleton for the whole app
  // providers: [RecipeService],
})
export class RecipesComponent implements OnInit {
  constructor(private service: RecipeService) {}

  async ngOnInit(): Promise<void> {
    // await this.service.fetchRecipes();
  }
}
