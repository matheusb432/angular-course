import { Injectable } from '@angular/core';
import { Features } from './features.enum';

@Injectable({
  providedIn: 'root',
})
export class FeatureService {
  private _loadedFeature: Features = Features.Recipe;

  features = Features;

  get loadedFeature() {
    return this._loadedFeature;
  }

  onNavigate(feature: Features): void {
    this._loadedFeature = feature;
  }
}
