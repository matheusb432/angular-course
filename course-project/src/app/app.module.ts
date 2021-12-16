import { LoggingService } from './logging.service';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CoreModule } from './core.module';
import { HeaderComponent } from './header/header.component';
import { SharedModule } from './shared/shared.module';

@NgModule({
  declarations: [AppComponent, HeaderComponent],
  imports: [
    BrowserModule,
    HttpClientModule,
    // TODO ? lazy loaded modules should not be eagerly imported
    // RecipesModule,
    // AuthModule,
    // ShoppingModule,
    SharedModule,
    CoreModule,
    // TODO * important to import this last since it has a wildcard ('**') route that redirects any nonexistant routes
    AppRoutingModule,
  ],
  bootstrap: [AppComponent],
  providers: [LoggingService],
})
export class AppModule {}
