import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { FormGroup, NgForm } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements AfterViewInit {
  // TODO * Using ViewChild to access the NgForm instance
  @ViewChild('formRef') signupForm: NgForm;

  defaultQuestion = 'pet';

  submitted = false;

  answer = '';

  genders = ['male', 'female'];

  user = {
    username: '',
    email: '',
    secretQuestion: '',
    answer: '',
    gender: '',
  };

  // TODO * NOTE: the NgForm is only available after the AfterViewInit lifecycle hook has been triggered
  ngAfterViewInit() {
    console.log(this.signupForm);
  }

  suggestUserName() {
    const suggestedName = 'Superuser';

    // TODO ? patchValue to set only parts of a form
    this.signupForm.form.patchValue({
      userData: {
        username: suggestedName,
      },
    });

    // TODO ? setValue to set values of all controls in the form
    // this.signupForm.setValue({
    //   userData: {
    //     username: suggestedName,
    //     email: 'aa@aa',
    //   },
    //   secret: 'pet',
    //   questionAnswer: '',
    //   gender: 'male',
    // });
  }

  onSubmit() {
    this.submitted = true;
    this.user.username = this.signupForm.value.userData.username;
    this.user.email = this.signupForm.value.userData.email;
    this.user.secretQuestion = this.signupForm.value.secret;
    this.user.answer = this.signupForm.value.questionAnswer;
    this.user.gender = this.signupForm.value.gender;

    // TODO ? reset will reset the values and the state (invalid, touched, dirty) of the form
    this.signupForm.form.reset();
  }
}
