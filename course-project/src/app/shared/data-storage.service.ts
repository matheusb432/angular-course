import { environment } from './../../environments/environment';
import { RecipeService } from './../components/recipe/recipe.service';
import { Recipe } from './../components/recipe/recipe.model';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ApiService } from './api.service';
import { FirebaseData } from './types/firebase-data';
import { lastValueFrom, Observable, tap } from 'rxjs';

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

  fetchRecipes(): Observable<any> {
    const pipedRequest$ = ApiService.pipeFirebaseData(
      this.http.get<FirebaseData<Recipe>>(this.recipesUrl),
      Recipe
    ).pipe(
      tap((recipes) => {
        this.recipeService.setRecipes(recipes);
      })
    );

    return pipedRequest$;
    // this.recipeService.setRecipes(await lastValueFrom(pipedRequest$));
  }
}
