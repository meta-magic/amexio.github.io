/**
 * Created by pratik on 27/11/17.
 */
import { CommonModule } from '@angular/common';
import {HttpClientModule} from '@angular/common/http';
import { ModuleWithProviders, NgModule } from '@angular/core';
import {FormsModule} from '@angular/forms';

import {AmexioImageComponent} from './image/image.component';
import {AmexioVideoPlayerComponent} from './video-player/video.player.component';

import {CommonDataService} from '../services/data/common.data.service';
import {DeviceQueryService} from '../services/device/device.query.service';
import {IconLoaderService} from '../services/icon/icon.service';

import { AmexioCommonModule } from '../base/amexio.common.module';

export * from './video-player/video.player.component';
const MEDIA_COMPONENTS = [
  AmexioVideoPlayerComponent,
  AmexioImageComponent,
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    HttpClientModule,
    AmexioCommonModule,
  ],
  exports: MEDIA_COMPONENTS,
  declarations: MEDIA_COMPONENTS,
  providers: [CommonDataService, DeviceQueryService, IconLoaderService],
})
export class AmexioMediaModule {
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: AmexioMediaModule,
      providers: [CommonDataService, DeviceQueryService],
    };
  }
}
