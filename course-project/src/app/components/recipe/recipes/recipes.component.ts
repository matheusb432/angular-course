import { Component, OnInit } from '@angular/core';
import { RecipeService } from 'src/app/components/recipe/recipe.service';

@Component({
  selector: 'app-recipes',
  templateUrl: './recipes.component.html',
  styleUrls: ['./recipes.component.scss'],
  providers: [RecipeService],
})
export class RecipesComponent implements OnInit {
  constructor() {}

  ngOnInit(): void {}
}
