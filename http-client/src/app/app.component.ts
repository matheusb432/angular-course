import { HttpClient } from '@angular/common/http';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';

import { Post } from './post.model';
import { PostService } from './post.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit, OnDestroy {
  posts: Post[] = [];

  isFetching = false;

  error = null;

  private errorSub: Subscription;

  firebaseUrl =
    'https://ng-guide-course-default-rtdb.firebaseio.com/posts.json';

  constructor(private http: HttpClient, public service: PostService) {}

  ngOnInit() {
    this.onFetchPosts();

    this.initSubscriptions();
  }

  ngOnDestroy(): void {
    this.errorSub?.unsubscribe();
  }

  initSubscriptions() {
    this.errorSub = this.service.error.subscribe((err) => {
      this.isFetching = false;
      this.error = err;
    });
  }

  async onCreatePost(postData: Post) {
    await this.service.createPost(postData);

    this.onFetchPosts();
  }

  onHandleError() {
    this.error = null;
  }

  async onFetchPosts() {
    this.isFetching = true;
    this.error = null;

    this.posts = await this.service.fetchPosts();

    this.isFetching = false;
  }

  onClearPosts() {
    this.service.deletePosts().subscribe(() => {
      this.posts = [];
    });
  }
}
