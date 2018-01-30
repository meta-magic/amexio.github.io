/**
 * Created by pratik on 27/11/17.
 */
import { CommonModule } from '@angular/common';
import { NgModule, ModuleWithProviders } from '@angular/core';
import {FormsModule} from '@angular/forms';
import {CommonDataService} from "../services/data/common.data.service";
import {HttpModule} from "@angular/http";
import {DeviceQueryService} from "../services/device/device.query.service";
import {MultiMediaCarousel} from "./ee-carousel/ee.carousel.component";
import {ContentComponent} from "./ee-content/ee.content";
import {AmexioYoutubePlayerComponent} from "./youtube-player/youtube.player.component";
import {AmexioFormsModule} from "../forms/amexio.forms.module";

export * from '../services/data/common.data.service';
export * from '../services/device/device.query.service';
export * from './ee-carousel/ee.carousel.component';
export * from './ee-content/ee.content';
export * from './youtube-player/youtube.player.component';


const ENTERPRISE_COMPONENTS = [
  MultiMediaCarousel,
  ContentComponent,
  AmexioYoutubePlayerComponent
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    HttpModule,
    AmexioFormsModule
  ],
  exports: ENTERPRISE_COMPONENTS,
  declarations: ENTERPRISE_COMPONENTS,
  providers : [CommonDataService,DeviceQueryService]
})
export class AmexioEnterpriseModule {
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: AmexioEnterpriseModule,
      providers: [CommonDataService,DeviceQueryService]
    };
  }
}
