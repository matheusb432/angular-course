import { AbstractControl, FormControl } from '@angular/forms';

export class CustomValidators {
  static invalidName(control: FormControl | AbstractControl) {
    const invalidNames = ['Test'];

    if (invalidNames?.find((name) => name === control?.value)) {
      return { invalidName: true };
    }
    return null;
  }

  static invalidNameAsync(control: FormControl | AbstractControl) {
    const invalidNamesFromServer = ['Foo', 'Bar'];

    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (invalidNamesFromServer?.find((name) => name === control?.value)) {
          return resolve({ invalidName: true });
        }
        return resolve(null);
      }, 500);
    });
  }
}
