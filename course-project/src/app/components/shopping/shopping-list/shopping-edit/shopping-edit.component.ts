import { Subscription } from 'rxjs';
import { ShoppingService } from '../../shopping.service';
import {
  Component,
  ElementRef,
  EventEmitter,
  Host,
  OnDestroy,
  OnInit,
  Output,
  SkipSelf,
  ViewChild,
} from '@angular/core';
import { Ingredient } from 'src/app/shared/ingredient.model';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.scss'],
})
export class ShoppingEditComponent implements OnInit, OnDestroy {
  @Output() ingredientCreated = new EventEmitter<Ingredient>();

  @ViewChild('formRef') form: NgForm;

  editMode = false;
  editedItemIndex: number;
  editedItem: Ingredient;

  startedEditingSub: Subscription;

  constructor(private service: ShoppingService) {}

  ngOnInit() {
    this.startedEditingSub = this.service.startedEditing.subscribe((index) => {
      this.editedItemIndex = index;
      this.editMode = true;
      this.editedItem = this.service.getIngredient(index);

      this.form.setValue({
        inputName: this.editedItem.name,
        inputAmount: this.editedItem.amount,
      });
    });
  }

  ngOnDestroy() {
    this.startedEditingSub?.unsubscribe();
  }

  onSubmit(form: NgForm) {
    const value = form.value;

    const newIngredient = new Ingredient(value.inputName, +value.inputAmount);

    if (this.editMode) {
      this.service.updateIngredient(newIngredient, this.editedItemIndex);
    } else {
      this.service.addIngredient(newIngredient);
    }

    this.disableEditMode();
    this.resetForm(form);
  }

  onDelete(form: NgForm): void {
    if (this.editedItem == null) {
      alert('Error on delete!');

      return;
    }

    this.service.deleteIngredient(this.editedItem);

    this.disableEditMode();

    this.resetForm(form);
  }

  disableEditMode(): void {
    this.editMode = false;
    this.editedItemIndex = -1;
    this.editedItem = null;
  }

  onClearFields(form: NgForm) {
    this.resetForm(form);
  }

  resetForm(form: NgForm): void {
    form.reset();
  }

  onClearIngredients() {
    this.service.setIngredients([]);
  }
}
