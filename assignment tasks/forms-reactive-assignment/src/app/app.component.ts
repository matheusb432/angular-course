import { Component, OnInit } from '@angular/core';
import {
  AbstractControl,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { CustomValidators } from './custom-validators';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  projectForm: FormGroup;

  serverStatuses = ['Stable', 'Critical', 'Finished'];

  invalidNames = ['Test'];

  submittedForm: object;

  invalidNamesFromServer = ['Foo', 'Bar'];

  ngOnInit(): void {
    this.projectForm = new FormGroup({
      name: new FormControl(
        null,
        [Validators.required, CustomValidators.invalidName],
        [CustomValidators.invalidNameAsync]
      ),
      mail: new FormControl(null, [Validators.required, Validators.email]),
      status: new FormControl(null, [Validators.required]),
    });
  }

  get name() {
    return this.projectForm.get('name');
  }

  get mail() {
    return this.projectForm.get('mail');
  }

  get status() {
    return this.projectForm.get('status');
  }

  onSubmit(): void {
    this.submittedForm = this.projectForm.value;
  }
}
