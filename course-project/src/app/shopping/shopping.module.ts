import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { LoggingService } from '../logging.service';
import { SharedModule } from '../shared/shared.module';

import { ShoppingEditComponent } from './shopping-list/shopping-edit/shopping-edit.component';
import { ShoppingListComponent } from './shopping-list/shopping-list.component';
import { ShoppingRoutingModule } from './shopping-routing.module';

@NgModule({
  declarations: [ShoppingListComponent, ShoppingEditComponent],
  imports: [SharedModule, ShoppingRoutingModule, FormsModule],
  // TODO * by providing LoggingService here, it will create another instance of this service, so now there
  // * will be two instances of this service running, one application-wide and another module-wide
  providers: [LoggingService],
})
export class ShoppingModule {}
