import { Injectable } from '@angular/core';
import { Mapper } from 'mapper-ts/lib-esm';
import { catchError, map, Observable, throwError } from 'rxjs';
import { FirebaseData } from './types/firebase-data';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  static pipeFirebaseData<T>(
    request$: Observable<any>,
    type: new (...args: any[]) => T
  ): Observable<T[]> {
    return request$.pipe(
      map((responseData: FirebaseData<T>): T[] => {
        if (!responseData) {
          return [];
        }

        const items: T[] = [];

        Object.keys(responseData).forEach((key) => {
          const item = new Mapper(type).map({ key, ...responseData[key] });

          items.push(item);
        });

        return items;
      })
    );
  }
}
