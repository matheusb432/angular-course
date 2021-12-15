import { AuthModule } from './auth/auth.module';
import { HeaderComponent } from './header/header.component';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { CoreModule } from './core.module';
import { SharedModule } from './shared/shared.module';
import { RecipesModule } from './recipe/recipes.module';
import { ShoppingModule } from './shopping/shopping.module';

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
