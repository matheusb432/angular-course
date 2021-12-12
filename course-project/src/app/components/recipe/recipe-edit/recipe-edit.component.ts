import { Component, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { URL_REGEXP } from 'src/app/shared/custom-validators';
import { Mapper } from 'mapper-ts/lib-esm';

import { Recipe } from '../recipe.model';
import { Ingredient } from './../../../shared/ingredient.model';
import { RecipeService } from './../recipe.service';

@Component({
  selector: 'app-recipe-edit',
  templateUrl: './recipe-edit.component.html',
  styleUrls: ['./recipe-edit.component.scss'],
})
export class RecipeEditComponent implements OnInit {
  id: number;
  editMode = false;
  recipeForm: FormGroup;

  constructor(
    private route: ActivatedRoute,
    private service: RecipeService,
    private router: Router
  ) {}

  ngOnInit() {
    this.initSubscriptions();
  }

  get ingredients() {
    return this.recipeForm.get('ingredients') as FormArray;
  }

  get ingredientControls() {
    return (this.recipeForm.get('ingredients') as FormArray).controls;
  }

  get imagePath() {
    return this.recipeForm.get('imagePath');
  }

  initSubscriptions(): void {
    this.route.params.subscribe((p: Params) => {
      this.id = +p.id;

      this.editMode = p.id != null;

      this.initForm();
    });
  }

  onSubmit(): void {
    // TODO ? using mapper-ts to map the form value
    const newRecipe = new Mapper(Recipe).map(this.recipeForm.value);

    if (this.editMode) {
      this.service.updateRecipe(this.id, newRecipe);
    } else {
      this.service.addRecipe(newRecipe);
    }

    this.goToList();
  }

  onCancel(): void {
    this.goToList();
  }

  private initForm() {
    const [recipe, recipeIngredients] = this.getInitialRecipe();

    this.recipeForm = new FormGroup({
      name: new FormControl(recipe.name, [Validators.required]),
      imagePath: new FormControl(recipe.imagePath, [
        Validators.required,
        Validators.pattern(URL_REGEXP),
      ]),
      description: new FormControl(recipe.description, [Validators.required]),
      ingredients: recipeIngredients,
    });
  }

  onAddIngredient(): void {
    this.ingredients.push(this.getIngredientFg());
  }

  removeIngredient(index: number): void {
    this.ingredients.removeAt(index);
  }

  getInitialRecipe(): any {
    const recipe = this.editMode
      ? this.service.getRecipe(this.id) ?? Recipe.empty()
      : Recipe.empty();

    const recipeIngredients = new FormArray([]);

    if (recipe.ingredients) {
      for (let ingredient of recipe.ingredients) {
        recipeIngredients.push(this.getIngredientFg(ingredient));
      }
    }

    return [recipe, recipeIngredients];
  }

  getIngredientFg(ingredient?: Ingredient) {
    return new FormGroup({
      name: new FormControl(ingredient?.name, [Validators.required]),
      amount: new FormControl(ingredient?.amount, [
        Validators.required,
        Validators.min(1),
      ]),
    });
  }

  goToList(): Promise<boolean> {
    return this.router.navigate(['../'], { relativeTo: this.route });
  }
}
