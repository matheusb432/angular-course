import { RecipeService } from './../recipe/recipe.service';
import { DataStorageService } from './../../shared/data-storage.service';
import { Features } from './../../shared/features.enum';
import { Component, EventEmitter, Output } from '@angular/core';
import { FeatureService } from 'src/app/shared/feature.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent {
  constructor(
    private featureService: FeatureService,
    private dataStorageService: DataStorageService,
    private recipeService: RecipeService
  ) {}

  get features() {
    return this.featureService.features;
  }

  onSelect(feature: Features): void {
    this.featureService.onNavigate(feature);
  }

  onSaveData(): void {
    this.dataStorageService.storeRecipes();
  }

  onFetchData(): void {
    // this.dataStorageService.fetchRecipes();
    this.dataStorageService.fetchRecipes().subscribe(() => {});
  }
}
