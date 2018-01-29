/**
 * Created by pratik on 27/11/17.
 */
import { CommonModule } from '@angular/common';
import { NgModule, ModuleWithProviders } from '@angular/core';
import {FormsModule} from '@angular/forms';
import {CommonDataService} from "../services/data/common.data.service";
import {HttpModule} from "@angular/http";
import {DeviceQueryService} from "../services/device/device.query.service";
import {AmexioVideoPlayerComponent} from "./video-player/video.player.component";
import {AmexioImageComponent} from "./image/image.component";
import {IconLoaderService} from "../services/icon/icon.service";

export * from './video-player/video.player.component';


const MEDIA_COMPONENTS = [
  AmexioVideoPlayerComponent,
  AmexioImageComponent
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    HttpModule
  ],
  exports: MEDIA_COMPONENTS,
  declarations: MEDIA_COMPONENTS,
  providers: [CommonDataService,DeviceQueryService,IconLoaderService]
})
export class AmexioMediaModule {
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: AmexioMediaModule,
      providers: [CommonDataService,DeviceQueryService]
    };
  }
}
