import { Component, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  subscriptions = ['Basic', 'Advanced', 'Pro'];

  defaultSubscription = 'Advanced';

  formSubmitted = false;

  @ViewChild('formRef') form: NgForm;

  onSubmit() {
    console.log(this.form.value);

    this.formSubmitted = true;
  }
}
