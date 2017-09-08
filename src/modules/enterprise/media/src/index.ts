import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';
import {ContentComponent} from './mediacontents/content.component';
import {HttpModule} from '@angular/http';
import {FormsModule} from '@angular/forms';
import {ButtonMediaComponent} from './button/button.component';
import {RatingMediaComponent} from './ratingmedia/ratingmedia.component';

import {AmexioYoutubePlayerComponent} from './video-player/youtube.player.component';
import {MultiMediaCarousel} from "./multi-item-carousel/media.ee.carousel.component";



export * from './mediacontents/content.component';
export * from './button/button.component';
export * from './ratingmedia/ratingmedia.component';
export * from './multi-item-carousel/media.ee.carousel.component';

@NgModule({
  imports: [
    CommonModule,
    HttpModule,
    FormsModule,
  ],
  declarations: [
    ContentComponent,
    ButtonMediaComponent,
    RatingMediaComponent,
    AmexioYoutubePlayerComponent,
    MultiMediaCarousel
  ],
  exports: [
    ContentComponent,
    ButtonMediaComponent,
    RatingMediaComponent,
    AmexioYoutubePlayerComponent,
    MultiMediaCarousel
  ]
})
export class AmexioMediaModule {
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: AmexioMediaModule,
      providers: []
    };
  }
}
