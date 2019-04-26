import { AfterContentInit, Component, ContentChild, ContentChildren, HostListener, Input, OnInit, QueryList } from '@angular/core';
import { ViewportBackgroundComponent } from '../viewport.background/viewport.background.component';
import { ViewportContentComponent } from '../viewport.content/viewport.content.component';

@Component({
  selector: 'amexio-viewport',
  templateUrl: './viewport.component.html',
})
export class ViewportComponent implements AfterContentInit, OnInit {

  @ContentChildren(ViewportContentComponent) queryContent: QueryList<ViewportContentComponent>;
  contentCollection: ViewportContentComponent[];

  overflow: string;

  finalWidth: number;

  @Input('scrollable') scrollable = true;

  @Input('type') type = '1';

  @Input('page-color') pageColor = 'black';

  @HostListener('window:scroll', [])
  onWindowScroll($event: any) {
    if ((this.type === '2') && (this.scrollable && window.scrollY > 0)) {
      this.contentCollection.forEach((element: any) => {
        if (element.contentTemplate.navTemplate) {
          element.contentTemplate.navTemplate.transparent = false;
          element.contentTemplate.navTemplate.top = 0;
        }
      });
    }
    if (window.scrollY === 0) {
      this.contentCollection.forEach((element: any) => {
        if (element.contentTemplate.navTemplate) {
          element.contentTemplate.navTemplate.transparent = true;
          element.contentTemplate.navTemplate.top = 'unset';
        }
      });
    }
  }

  constructor() { }

  ngOnInit() {

    document.body.style.backgroundColor = this.pageColor;

    if (this.scrollable) {
      this.overflow = 'auto';
    } else {
      this.overflow = 'hidden';
    }
  }

  ngAfterContentInit() {
    this.contentCollection = this.queryContent.toArray();
    if (this.type === '2') {
      this.contentCollection.forEach((element: any) => {
        if (element.contentTemplate.navTemplate) {
          element.contentTemplate.navTemplate.opacity = 0.8;
          element.contentTemplate.navTemplate.top = 'unset';
        }
      });
    }
    if (this.scrollable) {
      this.contentCollection.forEach((element: any) => {
        element.internalScroll = false;
        this.getType(element);
      });
    } else {
      this.contentCollection.forEach((element: any) => {
        this.getType(element);
        if (element.scrollable) {
          element.internalScroll = true;
          element.height = 100 / this.contentCollection.length + '%';
        } else {
          element.internalScroll = false;
        }
      });
    }
    this.insertStyleSheetRule('body' + '{ overflow-y:' + this.overflow + '}');
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

  getType(element: any) {
    if (this.type === '1' && element.contentTemplate.navTemplate) {
      element.contentTemplate.navTemplate.transparent = true;
    }
    if (this.type === '2' && element.contentTemplate.navTemplate) {
      element.contentTemplate.navTemplate.transparent = true;
    }
    if (this.type === '3' && element.contentTemplate.navTemplate) {
      element.contentTemplate.navTemplate.transparent = false;
    }
  }
}
