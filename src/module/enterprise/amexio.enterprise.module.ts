/**
 * Created by pratik on 27/11/17.
 */
import { CommonModule } from '@angular/common';
import {HttpClientModule} from '@angular/common/http';
import {ModuleWithProviders, NgModule} from '@angular/core';
import {FormsModule} from '@angular/forms';

import {AmexioFormsModule} from '../forms/amexio.forms.module';
import {MultiMediaCarouselComponent} from './ee-carousel/ee.carousel.component';
import {ContentComponent} from './ee-content/ee.content';

import {CommonDataService} from '../services/data/common.data.service';
import {DeviceQueryService} from '../services/device/device.query.service';

import {AmexioYoutubePlayerComponent} from './youtube-player/youtube.player.component';

export * from './ee-carousel/ee.carousel.component';
export * from './ee-content/ee.content';
export * from '../services/data/common.data.service';
export * from '../services/device/device.query.service';
export * from './youtube-player/youtube.player.component';

const ENTERPRISE_COMPONENTS = [
  MultiMediaCarouselComponent,
  ContentComponent,
  AmexioYoutubePlayerComponent,
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    AmexioFormsModule,
    HttpClientModule,
  ],
  exports: ENTERPRISE_COMPONENTS,
  declarations: ENTERPRISE_COMPONENTS,
  providers : [CommonDataService, DeviceQueryService],
})
export class AmexioEnterpriseModule {
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: AmexioEnterpriseModule,
      providers: [CommonDataService, DeviceQueryService],
    };
  }
}
