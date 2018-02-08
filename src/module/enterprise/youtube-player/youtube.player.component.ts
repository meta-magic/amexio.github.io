/**
 * Created by pratik on 18/1/18.
 */
import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {DomSanitizer} from "@angular/platform-browser";

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
  `
})

export class AmexioYoutubePlayerComponent implements OnInit {
  name: string;

  @Input() url: any;

  @Input() height: number;

  @Input() width : number;

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
    if (this.url != null) this.sanitizedUrl = this.sanitizer.bypassSecurityTrustResourceUrl(this.url);
  }

  routeBackToApp() {
    this.onCloseVideoPlayer.emit(this.url);
  }
}
