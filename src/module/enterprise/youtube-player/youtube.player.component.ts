/**
 * Created by pratik on 18/1/18.
 */

 /*
 Component Name : Amexio youtube player
 Component Selector : <amexio-ee-youtube-player>
 Component Description : A simple configurable of video player.
*/
import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {DomSanitizer} from '@angular/platform-browser';

@Component({
  selector: 'amexio-ee-youtube-player', template: `
    <div>
      <span class="close-button" [ngStyle]="{'padding-left':closePadding+'%'}">
        <i class="fa fa-times fa-lg" (click)="routeBackToApp()" aria-hidden="true"></i>
      </span>
      <div class="text-center">
        <iframe [height]="height+'px'" [width]="width+'%'"
                [src]="sanitizedUrl" frameborder="0"
                allowfullscreen>
        </iframe>
      </div>
    </div>
  `,
})

export class AmexioYoutubePlayerComponent implements OnInit {
  name: string;

  /*
Properties
name : url
datatype :  any
version : 4.0 onwards
default : none
description :
*/
  @Input() url: any;

  /*
Properties
name : height
datatype : number
version : 4.0 onwards
default : none
description : 	Height should be in Px Ex.500
*/
  @Input() height: number;

  /*
Properties
name :width
datatype : number
version : 4.0 onwards
default : none
description : Width should be in percentage Ex.50

*/
  @Input() width: number;

  /*
Events
name :onCloseVideoPlayer
datatype : none
version : none
default : none
description : it is fired on video player close event

*/
  @Output() onCloseVideoPlayer: EventEmitter<any> = new EventEmitter<any>();

  sanitizedUrl: any;

  closePadding: any;

  constructor(private sanitizer: DomSanitizer) {

  }

  ngOnInit() {
    if (this.height == null) {
      this.height = 450;
    }
    if (this.width == null) {
      this.width = 98;
      this.closePadding = 97;
    } else {
      this.closePadding = this.width - 1;
    }
    if (this.url != null) {
    this.sanitizedUrl = this.sanitizer.bypassSecurityTrustResourceUrl(this.url);
    }
  }

  routeBackToApp() {
    this.onCloseVideoPlayer.emit(this.url);
  }
}
