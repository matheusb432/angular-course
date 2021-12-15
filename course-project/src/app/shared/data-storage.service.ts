import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable, tap } from 'rxjs';
import { Recipe } from '../recipe/recipe.model';
import { RecipeService } from '../recipe/recipe.service';

import { environment } from './../../environments/environment';
import { ApiService } from './api.service';
import { FirebaseData } from './types/firebase-data';

@Injectable({
  providedIn: 'root',
})
export class DataStorageService {
  recipesUrl = `${environment.firebaseApiUrl}/recipes.json`;

  constructor(private http: HttpClient, private recipeService: RecipeService) {}

  storeRecipes(): void {
    const recipes = this.recipeService.recipes;

    // TODO * overwrites the saved recipes
    const request$ = this.http.put(this.recipesUrl, recipes);

    request$.subscribe((res) => {});
  }

  fetchRecipes(): Observable<Recipe[]> {
    return this.http.get<FirebaseData<Recipe>>(this.recipesUrl).pipe(
      map((responseData) => ApiService.mapToArray(responseData, Recipe)),
      tap((recipes) => {
        this.recipeService.setRecipes(recipes);
      })
    );
  }
}
