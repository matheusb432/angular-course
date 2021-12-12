import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'reverse',
})
export class ReversePipe implements PipeTransform {
  transform(word: string): string {
    // ? alternate way
    // word.split('').reverse().join('')

    let reversedWord = '';

    for (const char of word) {
      reversedWord = `${char}${reversedWord}`;
    }

    return reversedWord;
  }
}
