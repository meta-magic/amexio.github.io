import { AfterContentInit, AfterViewInit, Component, ContentChild, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { ViewportBackgroundComponent } from '../viewport.background/viewport.background.component';
import { ViewportContentBodyComponent } from '../viewport.content.body/viewport.content.body.component';

@Component({
  selector: 'amexio-viewport-content',
  templateUrl: './viewport.content.component.html',
})
export class ViewportContentComponent implements OnInit, AfterContentInit, AfterViewInit {

  @ViewChild('videoId', /* TODO: add static flag */ { static: true}) videoId: ElementRef;

  @ContentChild(ViewportBackgroundComponent, /* TODO: add static flag */ { static: true}) bgImageTemplate: ViewportBackgroundComponent;
  @ContentChild(ViewportContentBodyComponent, /* TODO: add static flag */ { static: true}) contentTemplate: ViewportContentBodyComponent;
  constructor() { }

  backgroundCss: string;

  contentCount: number;

  height: string;

  bgvid: any;

  @Input('scrollable') scrollable = false;

  // For internal use
  internalScroll: boolean;

  backgroundColor: string;
  tempUrl: string;
  ngOnInit() {

  }

  ngAfterViewInit() {

  }

  ngAfterContentInit() {
    if (this.bgImageTemplate.backgroundColor) {
      this.backgroundColor = this.bgImageTemplate.backgroundColor;
    }
    // IMAGE
    if (this.bgImageTemplate.imagePath) {
      this.backgroundCss = 'bgCss' + window.crypto.getRandomValues(new Uint32Array(1))[0] + 'backgound';
      this.insertStyleSheetRule('.' + this.backgroundCss + '{ background-image: url(' + this.bgImageTemplate.imagePath + ')}');
    }

    // VIDEO
    if (this.bgImageTemplate.videoPath) {
      this.bgImageTemplate.videoTemplate.rederVideo = false;
      this.bgvid = 'videoId' + window.crypto.getRandomValues(new Uint32Array(1))[0];
      this.tempUrl = this.bgImageTemplate.videoPath;
      this.playVideo();
    }
  }

  playVideo() {
    const media = this.videoId.nativeElement;
    media.muted = true;
    media.play();
  }

  insertStyleSheetRule(ruleText: any) {
    const sheets: any = document.styleSheets;
    if (sheets.length === 0) {
      const style = document.createElement('style');
      style.appendChild(document.createTextNode(''));
      document.head.appendChild(style);
    }
    const sheet: any = sheets[sheets.length - 1];
    sheet.insertRule(ruleText, sheet.rules ? sheet.rules.length : sheet.cssRules.length);
  }
}
