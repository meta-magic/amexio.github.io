import { AfterContentInit, Component, ContentChild, Input, OnInit, QueryList } from '@angular/core';
import { AmexioImageComponent } from '../../../media/image/image.component';
import { AmexioVideoPlayerComponent } from '../../../media/video-player/video.player.component';

@Component({
  selector: 'amexio-viewport-background',
  templateUrl: './viewport.background.component.html',
})
export class ViewportBackgroundComponent implements AfterContentInit, OnInit {

  @ContentChild(AmexioImageComponent) imageTemplate: AmexioImageComponent;
  @ContentChild(AmexioVideoPlayerComponent) videoTemplate: AmexioVideoPlayerComponent;

  bgCss: string;
  imagePath: string;
  videoPath: string;

  @Input('background-color') backgroundColor: string;

  constructor() { }

  ngOnInit() {
  }

  ngAfterContentInit() {
    // IMAGE
    if (this.imageTemplate) {
      this.imagePath = this.imageTemplate.path;
      this.bgCss = 'bgCss' + Math.floor(Math.random() * 1000) + 'background';
    }

    // VIDEO
    if (this.videoTemplate) {
      this.videoPath = this.videoTemplate.path;
    }
  }
}
