import { AfterContentInit, AfterViewInit, Component, ContentChild, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { ViewportBackgroundComponent } from '../viewport.background/viewport.background.component';
import { ViewportContentBodyComponent } from '../viewport.content.body/viewport.content.body.component';

@Component({
  selector: 'amexio-viewport-content',
  templateUrl: './viewport.content.component.html',
})
export class ViewportContentComponent implements OnInit, AfterContentInit, AfterViewInit {

  @ViewChild('videoId') videoId: ElementRef;

  @ContentChild(ViewportBackgroundComponent) bgImageTemplate: ViewportBackgroundComponent;
  @ContentChild(ViewportContentBodyComponent) contentTemplate: ViewportContentBodyComponent;
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
      this.backgroundCss = 'bgCss' + Math.floor(Math.random() * 1000) + 'backgound';
      this.insertStyleSheetRule('.' + this.backgroundCss + '{ background-image: url(' + this.bgImageTemplate.imagePath + ')}');
    }

    // VIDEO
    if (this.bgImageTemplate.videoPath) {
      this.bgImageTemplate.videoTemplate.rederVideo = false;
      this.bgvid = 'videoId' + Math.floor(Math.random() * 1000);
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
