/**
 * Created by dattaram on 28/5/19.
 */
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'amexio-banner',
  templateUrl: 'banner.component.html',
  styles: [
    `
      :host{
        display: inline-flex;
        justify-content: space-between;
        width: 100%;
        align-items: center;
      }

      amexio-c-icon {
        margin: 0 10px;
        cursor: pointer;
      }

      .bannerContent {
        flex-grow: 1;
        display: inline-flex;
      }

    `,
  ],
})

export class AmexioBannerComponent implements OnInit {

  @Input('closable') closeable = false;

  showBanner = true;

  @Input() interval = 0;

  @Input() title = '';

  @Input() icon = '';

  @Output() hideBanner = new EventEmitter();

  @Input() alignment = 'center';

  themeCss: any;

  amexioComponentId = 'amexio-banner';

  constructor() {
  }

  ngOnInit() {
    if (this.interval !== 0) {
      setTimeout(() => {
        this.hideBanner.emit(false);
        this.showBanner = false;
      }, this.interval);
    }
    if (this.alignment === 'end') {
      this.alignment = 'flex-end';
    }

  }
  onCloseClick() {
    this.hideBanner.emit(false);
    this.showBanner = false;
  }

  setColorPalette(themeClass: any) {
    this.themeCss = themeClass;
  }
}
