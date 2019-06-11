/**
 * Created by dattaram on 28/5/19.
 */
import { DOCUMENT } from '@angular/common';

import {
  AfterContentInit, Component, ElementRef, EventEmitter, HostListener,
  Inject, Input, OnInit, Output, Renderer2,
} from '@angular/core';

import { fromEvent } from 'rxjs';
import { debounceTime } from 'rxjs/operators';

import { DeviceQueryService } from '../../../services/device/device.query.service';

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
        width: 100px;
      }

    `,
  ],
})

export class AmexioBannerComponent implements AfterContentInit, OnInit {

  @Input('closable') closeable = false;

  showBanner = true;

  @Input() interval = 0;

  @Input() title = '';

  @Input() icon = '';

  @Output() hideBanner = new EventEmitter();

  @Input() alignment = 'center';

  @Input('close-on-scroll') closeOnScroll = false;

  amexioComponentId = 'amexio-banner';

  mobileMode: boolean;

  constructor(
    @Inject(DOCUMENT) private document: any,
    private renderer: Renderer2,
    private el: ElementRef,
    public matchMediaService: DeviceQueryService,
  ) {
    this.callWindowScroll();
  }

  onWindowScroll() {

    if (this.closeOnScroll) {
      const h = document.documentElement;
      const b = document.body;
      const st = 'scrollTop';
      const sh = 'scrollHeight';

      const percent = (h[st] || b[st]) / ((h[sh] || b[sh]) - h.clientHeight) * 100;
      if (percent > 15) {
        this.onCloseCommon();
      } else {
        this.onShowClick();
      }
    }
  }

  callWindowScroll() {
    const clicks = fromEvent(window, 'scroll');
    debounceTime(200);

    clicks.subscribe((x: any) => this.onWindowScroll());
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

  ngAfterContentInit() {
    this.responsiveMethod();
  }
  onCloseCommon() {
    this.hideBanner.emit(false);
    this.showBanner = false;
  }

  onCloseClick() {
    this.hideBanner.emit(false);
    this.showBanner = false;
    this.closeOnScroll = false;
  }

  setColorPalette(themeClass: any) {
    this.renderer.addClass(this.el.nativeElement, themeClass);
  }

  resize(event: any) {
    this.responsiveMethod();
  }

  responsiveMethod() {
    if (this.matchMediaService.IsPhone() || this.matchMediaService.IsTablet()) {
      this.mobileMode = true;
    } else {
      this.mobileMode = false;
    }
  }

  onShowClick() {
    this.hideBanner.emit(true);
    this.showBanner = true;
  }
}
