import { Component, OnInit } from '@angular/core';
import {
  AbstractControl,
  FormArray,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  genders = ['male', 'female'];
  signupForm: FormGroup;
  forbiddenUsernames = ['Chris', 'Anna'];

  ngOnInit(): void {
    this.signupForm = new FormGroup({
      userData: new FormGroup({
        // TODO ? passing a reference to forbiddenNames to add the custom validator
        username: new FormControl(null, [
          Validators.required,
          (c) => this.forbiddenNames(c),
        ]),
        email: new FormControl(
          null,
          [Validators.required, Validators.email],
          [
            // TODO * binding the `this` keyword here so the context in which this method gets called is this component
            this.forbiddenEmails.bind(this),
          ]
        ),
      }),
      gender: new FormControl('male'),
      hobbies: new FormArray([]),
    });

    this.signupForm.statusChanges.subscribe((value) => {
      console.log(value);
    });
  }

  get hobbyControls() {
    return (this.signupForm.get('hobbies') as FormArray).controls;
  }

  onSubmit() {
    console.log(this.signupForm.value);
  }

  onAddHobby(): void {
    const control = new FormControl(null, Validators.required);

    (this.signupForm.get('hobbies') as FormArray).push(control);
  }

  // TODO ? custom validator
  forbiddenNames(control: FormControl | AbstractControl): {
    [s: string]: boolean;
  } {
    if (this.forbiddenUsernames.indexOf(control.value) !== -1) {
      return { nameIsForbidden: true };
    }

    // TODO ? returning null or undefined says that the form control is valid
    return null;
  }

  // TODO ? implementing async validator
  forbiddenEmails(control: FormControl): Promise<any> | Observable<any> {
    const promise = new Promise<any>((resolve, reject) => {
      setTimeout(() => {
        if (control.value === 'test@test.com') {
          resolve({ emailIsForbidden: true });
        }

        resolve(null);
      }, 500);
    });

    return promise;
  }
}
