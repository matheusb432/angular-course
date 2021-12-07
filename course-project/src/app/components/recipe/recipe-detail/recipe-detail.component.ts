import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';

import { RecipeService } from '../recipe.service';

@Component({
  selector: 'app-recipe-detail',
  templateUrl: './recipe-detail.component.html',
  styleUrls: ['./recipe-detail.component.scss'],
})
export class RecipeDetailComponent implements OnInit {
  constructor(
    private service: RecipeService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe((p: Params) => {
      this.service.setActiveRecipeById(+p.id);
    });
  }

  get recipe() {
    return this.service.activeRecipe;
  }

  navigateWithIngredients(): void {
    this.service.goToShoppingList();
  }

  onEditRecipe(): void {
    this.router.navigate(['edit'], { relativeTo: this.route });

    // ? alternate way
    // this.router.navigate(['../', this.recipe.id, 'edit'], {
    //   relativeTo: this.route,
    // });
  }
}
