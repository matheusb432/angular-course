import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { RecipesModule } from './recipe/recipes.module';

const routes: Routes = [
  // TODO ? implementing lazy loading
  {
    path: 'recipes',
    loadChildren: () =>
      import('./recipe/recipes.module').then((m) => m.RecipesModule),
  },
  {
    path: 'auth',
    loadChildren: () => import('./auth/auth.module').then((m) => m.AuthModule),
  },
  {
    path: 'shopping-list',
    loadChildren: () =>
      import('./shopping/shopping.module').then((m) => m.ShoppingModule),
  },
  { path: '**', redirectTo: 'recipes' },
];

@NgModule({
  imports: [
    // TODO ? this preloading strategy will preload all lazy loaded modules as soon as the initial module is loaded
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules }),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
