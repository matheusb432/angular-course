import { Post } from './post.model';
import {
  HttpClient,
  HttpEventType,
  HttpHeaders,
  HttpParams,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { FirebaseData } from './types/firebase-data';
import { Observable } from 'rxjs/internal/Observable';
import { Mapper } from 'mapper-ts/lib-esm';
import { map, catchError, tap } from 'rxjs/operators';
import { Subject, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class PostService {
  firebaseUrl =
    'https://ng-guide-course-default-rtdb.firebaseio.com/posts.json';

  error = new Subject<string>();

  constructor(private http: HttpClient) {}

  async createPost(postData: Post) {
    const request$ = this.http.post(`${this.firebaseUrl}`, postData, {
      observe: 'response',
    });

    const res = await request$.toPromise();

    return res;
  }

  async fetchPosts(): Promise<Post[]> {
    let searchParams = new HttpParams();

    // TODO ? adding query parameters to the request with HttpParams
    searchParams = searchParams.append('print', 'pretty');
    searchParams = searchParams.append('custom', 'key');

    const request$ = this.http.get<FirebaseData<Post>>(this.firebaseUrl, {
      // TODO ? adding a custom header
      headers: new HttpHeaders({ 'Custom-Header': 'Hello' }),
      params: searchParams,
      // TODO ? the default response type is json, but can be changed to 'text' or 'blob' for example
      responseType: 'json',
    });

    const pipedRequest$ = this.pipeFirebaseData(request$, Post);

    // ? Handling errors on the service and emitting an event to the Subject when an error occurs
    return pipedRequest$
      .toPromise()
      .then((posts) => posts)
      .catch((err) => {
        this.error.next(err.message);

        return [];
      });
  }

  deletePosts() {
    return this.http
      .delete(this.firebaseUrl, {
        observe: 'events',
        responseType: 'json',
      })
      .pipe(
        tap((event) => {
          console.log(event);
          if (event.type === HttpEventType.Sent) {
            /// ...
          } else if (event.type === HttpEventType.Response) {
            console.log(event.body);
          }
        })
      );
  }

  // TODO ? mapping the data from an object of KVPs to an array
  private pipeFirebaseData<T>(
    request$: Observable<any>,
    type: new (...args: any[]) => T
  ): Observable<T[]> {
    return request$.pipe(
      map((responseData: FirebaseData<T>) => {
        if (!responseData) {
          return [];
        }

        const items: T[] = [];

        Object.keys(responseData).forEach((key) => {
          const item = new Mapper(type).map({ key, ...responseData[key] });

          items.push(item);
        });

        return items;
      }),
      // TODO ? using the catchError operator to do some additional error handling before throwing it
      catchError((errorRes) => {
        // Do something with the error
        return throwError(errorRes);
      })
    );
  }
}
