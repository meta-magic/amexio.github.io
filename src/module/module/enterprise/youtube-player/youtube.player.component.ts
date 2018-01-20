/**
 * Created by pratik on 18/1/18.
 */
import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {DomSanitizer} from "@angular/platform-browser";

@Component({
  selector: 'amexio-ee-youtube-player', template: `
    <div>
      <span class="close-button">
        <i class="fa fa-times fa-lg" (click)="routeBackToApp()" aria-hidden="true"></i>
      </span>
      <div class="text-center">
        <iframe [height]="height" width="98%"
                style="position: absolute; top: 0; right: 0; bottom: 0; left: 0;padding-top: 30px;padding-left: 30px"
                [src]="sanitizedUrl" frameborder="0"
                allowfullscreen>
        </iframe>
      </div>
    </div>
  `, styles: [`
    .close-button {
      cursor: pointer;
      padding-left: 98%;
      color: gray;
      background: radial-gradient(ellipse at top right, rgba(0, 0, 0, .4) 0, rgba(0, 0, 0, 0) 70%, rgba(0, 0, 0, 0) 100%);
    }

    .close-button i:hover {
      color: red;
      cursor: pointer;
    }
  `]
})

export class AmexioYoutubePlayerComponent implements OnInit {
  name: string;

  @Input() url: any;

  @Input() height: any;

  @Output() onCloseVideoPlayer: EventEmitter<any> = new EventEmitter<any>();

  sanitizedUrl: any;

  constructor(private sanitizer: DomSanitizer) {

  }

  ngOnInit() {
    if (this.height == null || this.height === 'undefined') {
      this.height = '98%';
    }
    if (this.url != null) this.sanitizedUrl = this.sanitizer.bypassSecurityTrustResourceUrl(this.url);
  }

  routeBackToApp() {
    this.onCloseVideoPlayer.emit(this.url);
  }
}
