import { Features } from './../../shared/features.enum';
import { Component, EventEmitter, Output } from '@angular/core';
import { FeatureService } from 'src/app/shared/feature.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent {
  // @Output() featureSelected = new EventEmitter<string>();

  constructor(private featureService: FeatureService) {}

  get features() {
    return this.featureService.features;
  }

  onSelect(feature: Features): void {
    // this.featureService.loadedFeature = feature;
    this.featureService.onNavigate(feature);
    // this.featureSelected.emit(feature);
  }
}
