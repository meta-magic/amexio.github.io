import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';
import {ContentComponent} from './mediacontents/content.component';
import {HttpModule} from '@angular/http';
import {FormsModule} from '@angular/forms';
/*import { BrowserAnimationsModule } from '@angular/platform-browser/animations';*/
import {ButtonMediaComponent} from './button/button.component';
import {RatingMediaComponent} from './ratingmedia/ratingmedia.component';

import {AmexioYoutubePlayerComponent} from './video-player/youtube.player.component';



export * from './mediacontents/content.component';
export * from './button/button.component';
export * from './ratingmedia/ratingmedia.component';
/*export * from './multicarousel/amexio.multicarousel.component';
export * from './video-player/youtube.player.component';*/

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
    AmexioYoutubePlayerComponent
  ],
  exports: [
    ContentComponent,
    ButtonMediaComponent,
    RatingMediaComponent,
    AmexioYoutubePlayerComponent
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
