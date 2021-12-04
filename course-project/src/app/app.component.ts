import { Component } from '@angular/core';
import { FeatureService } from './shared/feature.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  // loadedFeature = 'recipe';

  constructor(private featureService: FeatureService) {}

  get loadedFeature() {
    return this.featureService.loadedFeature;
  }

  get features() {
    return this.featureService.features;
  }
  // onNavigate(feature: string): void {
  //   this.loadedFeature = feature;
  // }
}
