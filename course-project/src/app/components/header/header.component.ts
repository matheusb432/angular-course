import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { FeatureService } from 'src/app/shared/feature.service';

import { DataStorageService } from './../../shared/data-storage.service';
import { AuthService } from './../auth/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit, OnDestroy {
  isAuthenticated = false;
  userChangedSub: Subscription;

  constructor(
    private featureService: FeatureService,
    private dataStorageService: DataStorageService,
    private authService: AuthService
  ) {}

  get features() {
    return this.featureService.features;
  }

  ngOnInit(): void {
    this.userChangedSub = this.authService.userChanged.subscribe((user) => {
      // TODO ? if user is truthy, set isAuthenticated to true;
      this.isAuthenticated = !!user;
    });
  }

  ngOnDestroy(): void {
    this.userChangedSub?.unsubscribe();
  }

  onSaveData(): void {
    this.dataStorageService.storeRecipes();
  }

  onFetchData(): void {
    this.dataStorageService.fetchRecipes().subscribe(() => {});
  }

  onLogout(): void {
    this.authService.logout();
  }
}
