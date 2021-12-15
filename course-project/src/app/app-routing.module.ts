import { AuthComponent } from './components/auth/auth.component';
import { RecipesResolverService } from './components/recipe/recipes-resolver.service';
import { RecipeEditComponent } from './components/recipe/recipe-edit/recipe-edit.component';
import { RecipeStartComponent } from './components/recipe/recipe-start/recipe-start.component';
import { ShoppingListComponent } from './components/shopping/shopping-list/shopping-list.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RecipesComponent } from './components/recipe/recipes/recipes.component';
import { RecipeDetailComponent } from './components/recipe/recipe-detail/recipe-detail.component';
import { AuthGuard } from './components/auth/auth.guard';

const routes: Routes = [
  { path: 'auth', component: AuthComponent },
  {
    path: 'recipes',
    component: RecipesComponent,
    canActivate: [AuthGuard],
    children: [
      { path: '', component: RecipeStartComponent },
      { path: 'new', component: RecipeEditComponent },
      // TODO * adding the recipes resolver service to load the recipes when the page loads
      {
        path: ':id',
        component: RecipeDetailComponent,
        resolve: [RecipesResolverService],
      },
      {
        path: ':id/edit',
        component: RecipeEditComponent,
        resolve: [RecipesResolverService],
      },
    ],
  },
  { path: 'shopping-list', component: ShoppingListComponent },
  { path: '**', redirectTo: 'recipes' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
