import {
  Component,
  ElementRef,
  EventEmitter,
  OnInit,
  Output,
  ViewChild,
} from '@angular/core';
import { Ingredient } from 'src/app/shared/ingredient.model';

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.scss'],
})
export class ShoppingEditComponent implements OnInit {
  @ViewChild('nameInput') nameInput: ElementRef<HTMLInputElement>;
  @ViewChild('amountInput') amountInput: ElementRef<HTMLInputElement>;

  @Output() ingredientCreated = new EventEmitter<Ingredient>();

  constructor() {}

  ngOnInit() {}

  addIngredient() {
    const name = this.nameInput.nativeElement.value;
    const amount = +this.amountInput.nativeElement.value;

    if (!name || !amount) {
      alert('fill input fields!');

      return;
    }

    this.ingredientCreated.emit({ name, amount });
  }

  clearFields() {
    this.nameInput.nativeElement.value = '';
    this.amountInput.nativeElement.value = '';
  }
}
