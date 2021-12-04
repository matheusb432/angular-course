import { ShoppingService } from '../../shopping.service';
import {
  Component,
  ElementRef,
  EventEmitter,
  Host,
  OnInit,
  Output,
  SkipSelf,
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

  constructor(private service: ShoppingService) {}

  ngOnInit() {}

  get name() {
    return this.nameInput.nativeElement;
  }

  // set name(value: string) {
  //   this.nameInput.nativeElement.value = value;
  // }

  get amount() {
    return this.amountInput.nativeElement;
  }

  // set amount(value: string) {
  //   this.amountInput.nativeElement.value = value;
  // }

  addIngredient() {
    if (!this.name || !this.amount) {
      alert('fill input fields!');

      return;
    }

    this.service.addIngredient({
      name: this.name.value,
      amount: +this.amount.value,
    });
  }

  clearFields() {
    this.name.value = '';
    this.amount.value = '';
  }

  clearIngredients() {
    this.service.setIngredients([]);
  }
}
