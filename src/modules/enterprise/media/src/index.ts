import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';

import {ButtonMediaComponent} from './button/button.component';
import {RatingMediaComponent} from './ratingmedia/ratingmedia.component';

import {AmexioYoutubePlayerComponent} from './video-player/youtube.player.component';
import {MultiMediaCarousel} from "./multi-item-carousel/media.ee.carousel.component";
import {ContentComponent} from './mediacontents/content.component';
import {FormsModule} from '@angular/forms';



export * from './mediacontents/content.component';
export * from './button/button.component';
export * from './ratingmedia/ratingmedia.component';
export * from './multi-item-carousel/media.ee.carousel.component';
export * from './video-player/youtube.player.component';

const MEDIA = [
  ContentComponent,
  ButtonMediaComponent,
  RatingMediaComponent,
  AmexioYoutubePlayerComponent,
  MultiMediaCarousel
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule
  ],
  declarations: MEDIA,
  exports: MEDIA
})
export class AmexioMediaModule {
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: AmexioMediaModule,
      providers: []
    };
  }
}
