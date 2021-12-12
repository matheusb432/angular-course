import { Post } from './post.model';
import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { Mapper } from 'mapper-ts/lib-esm';
import { Observable } from 'rxjs';
import { FirebaseData } from './types/firebase-data';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  loadedPosts = [];

  firebaseUrl =
    'https://ng-guide-course-default-rtdb.firebaseio.com/posts.json';

  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.fetchPosts();
  }

  onCreatePost(postData: { title: string; content: string }) {
    const request$ = this.http.post(`${this.firebaseUrl}`, postData);

    request$.subscribe((responseData) => {
      this.fetchPosts();
    });
  }

  onFetchPosts() {
    // Send GET Http request
    this.fetchPosts();
  }

  onClearPosts() {
    // Send DELETE Http request
  }

  private fetchPosts() {
    const request$ = this.http.get<FirebaseData<Post>>(this.firebaseUrl);

    const pipedRequest$ = this.pipeFirebaseData(request$, Post);

    pipedRequest$.subscribe((posts) => {
      this.loadedPosts = posts;

      console.log(this.loadedPosts);
    });
  }

  private pipeFirebaseData<T>(
    request$: Observable<any>,
    type: new (...args: any[]) => T
  ): Observable<T[]> {
    // TODO ? mapping the data from an object of KVPs to an array
    return request$.pipe(
      map((responseData: FirebaseData<T>) => {
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
