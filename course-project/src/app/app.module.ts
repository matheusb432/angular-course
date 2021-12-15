import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AuthModule } from './components/auth/auth.module';
import { HeaderComponent } from './components/header/header.component';
import { RecipesModule } from './components/recipe/recipes.module';
import { ShoppingModule } from './components/shopping/shopping.module';
import { CoreModule } from './core.module';
import { SharedModule } from './shared/shared.module';

@NgModule({
  declarations: [AppComponent, HeaderComponent],
  imports: [
    BrowserModule,
    HttpClientModule,
    RecipesModule,
    ShoppingModule,
    AuthModule,
    SharedModule,
    CoreModule,
    // TODO * important to import this last since it has a wildcard ('**') route that redirects any nonexistant routes
    AppRoutingModule,
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
