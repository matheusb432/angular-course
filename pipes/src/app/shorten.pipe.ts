import { Pipe, PipeTransform } from '@angular/core';

// TODO * implementing a custom pipe which can be used with `{{ data | shorten }}`
@Pipe({
  name: 'shorten',
})
export class ShortenPipe implements PipeTransform {
  transform(value: any, limit: number = 10): string {
    if (value.length > limit) {
      return `${value.substr(0, limit)} ...`;
    }
    return value;
  }
}
