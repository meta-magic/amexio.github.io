/**
 * Created by dattaram on 28/5/19.
 */
import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';

@Component({
  selector: 'amexio-banner',
  template: `
    <span>
       <amexio-image style = "padding-left: 10px;" [icon-class]="icon"></amexio-image>
       <amexio-label style = "padding-left: 10px;">{{title}}</amexio-label>
        <amexio-c-icon style = "padding-left: 10px; cursor: pointer;float:right"
                        [key]="'window_close'" (onClick)="onCloseClick()">
        </amexio-c-icon>
      </span>

  `,
})

export class AmexioBannerComponent implements OnInit {

  @Input('closable') closeable = false;

  @Input() interval = 0 ;

  @Input() title = '';

  @Input() icon = '';

  @Output() hideBanner = new EventEmitter();

  constructor() {
  }

  ngOnInit() {
    if (this.interval !== 0) {
       setTimeout(() => {
       this.hideBanner.emit(false);
       }, this.interval);
    }

  }
  onCloseClick() {
    this.hideBanner.emit(false);
  }
}
