import { Pipe, PipeTransform } from '@angular/core';

// TODO ? adding pure: false will make this pipe run in each change detection cycle angular has
// ? also makes it possible to filter in real time instead of only when the 'filterString' input changes
@Pipe({
  name: 'filter',
  pure: false,
})
export class FilterPipe implements PipeTransform {
  transform(value: object[], filterString: string, propName: string): any {
    if (value.length === 0 || !filterString) {
      return value;
    }

    const resultArray = [];

    for (const item of value) {
      if (this.filterStr(item[propName], filterString)) {
        resultArray.push(item);
      }
    }

    return resultArray;
  }

  filterStr(str1: string, str2: string) {
    return this.normalizeStr(str1).includes(this.normalizeStr(str2));
  }

  normalizeStr(str: string): string {
    return str.trim().toLowerCase();
  }
}
