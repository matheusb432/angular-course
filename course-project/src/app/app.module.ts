import { AuthComponent } from './components/auth/auth.component';
import { RecipeEditComponent } from './components/recipe/recipe-edit/recipe-edit.component';
import { PlaceholderComponent } from './components/custom/placeholder/placeholder.component';
import { ChevronIconComponent } from './components/custom/chevron-icon/chevron-icon.component';
import { DropdownDirective } from './shared/dropdown.directive';
import { ShoppingEditComponent } from './components/shopping/shopping-list/shopping-edit/shopping-edit.component';
import { ShoppingListComponent } from './components/shopping/shopping-list/shopping-list.component';
import { HeaderComponent } from './components/header/header.component';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { RecipesComponent } from './components/recipe/recipes/recipes.component';
import { RecipeListComponent } from './components/recipe/recipe-list/recipe-list.component';
import { RecipeDetailComponent } from './components/recipe/recipe-detail/recipe-detail.component';
import { RecipeItemComponent } from './components/recipe/recipe-list/recipe-item/recipe-item.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RecipeStartComponent } from './components/recipe/recipe-start/recipe-start.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    RecipesComponent,
    RecipeListComponent,
    RecipeDetailComponent,
    RecipeItemComponent,
    ShoppingListComponent,
    ShoppingEditComponent,
    DropdownDirective,
    ChevronIconComponent,
    RecipeStartComponent,
    PlaceholderComponent,
    RecipeEditComponent,
    AuthComponent,
  ],

  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
