/**
 * Created by ketangote on 12/1/17.
 */

/*
 Component Name : Amexio Tab
 Component Selector : <amexio-tab-view>
 Component Description : Tab component for Angular Apps with multiple configurations such as Tab, Icon support, Scrollable tabs, Closable tab, Vertical Tabs

*/
import {
  AfterContentInit,
  AfterViewInit,
  Component,
  ContentChildren,
  ElementRef,
  EventEmitter,
  Input,
  OnInit,
  Output,
  QueryList,
  Renderer2,
  ViewChild
} from '@angular/core';
import { AmexioTabPill } from "./tab.pill.component";


export namespace AmexioColorMap {
  export const COMPONENT_CLASS_MAP: any = {
    red: 'amexio-tab-red',
    lightred: 'amexio-tab-red-light',
    lightgreen: 'amexio-tab-green-light',
    green: 'amexio-tab-green',
    lightpurple: 'amexio-tab-purple-light',
    purple: 'amexio-tab-purple',
    lightblue: 'amexio-tab-blue-light',
    blue: 'amexio-tab-blue',
    lightbrown: 'amexio-tab-brown-light',
    brown: 'amexio-tab-brown',
    lightyellow: 'amexio-tab-yellow-light',
    yellow: 'amexio-tab-yellow',
    black: 'amexio-tab-black',
    white: 'amexio-tab-white'
  }
}

@Component({
  selector: 'amexio-tab-view',
  templateUrl: './tab.component.html',
  styleUrls: ['tab.component.scss']
})
export class AmexioTabComponent implements OnInit, AfterViewInit, AfterContentInit {

  /*
Properties 
name : closable
datatype : boolean
version : 4.0 onwards
default : false
description : This flag will make tab closable.
*/
  @Input() closable: boolean;

  /*
Properties 
name : Header Alignment
datatype : string
version : 4.0 onwards
default : none
description : specify position of tabs(left/right/center).
*/
  @Input('header-align') headeralign: string;

  /*
  Properties 
  name : Divide Header Equally
  datatype : string
  version : 4.0 onwards
  default : none
  description : If "true" divides all tab equally.
  */
  @Input('divide-header-equally') fullPageTabs: boolean;

  /*
Properties 
name : title
datatype : string
version : 4.0 onwards
default : none
description : Title on Tab Button/Pill.
*/
  @Input() header: string;

  @ViewChild('tab', { read: ElementRef }) public tabs: ElementRef;
  @ViewChild('headerName', { read: ElementRef }) public headerName: ElementRef;
  @ViewChild('tabslist', { read: ElementRef }) public tabslist: ElementRef;

  @ContentChildren(AmexioTabPill) queryTabs: QueryList<AmexioTabPill>;
  tabCollection: AmexioTabPill[];

  /*
Events
name : onClick
datatype : none
version : none
default : none
description : Callback to invoke on activated tab event.
*/
  @Output() onClick: any = new EventEmitter<any>();

  /* for internal purpose .*/
  @Input() tabLocalData: any;

  tabPreviewData: any;

  showprev: boolean = false;

  shownext: boolean = false;

  content: string;

  constructor(public render: Renderer2) {
    this.headeralign = "left";
  }

  ngOnInit() {

  }

  ngDoCheck() {
    if (JSON.stringify(this.tabPreviewData) != JSON.stringify(this.tabLocalData)) {
      this.tabPreviewData = JSON.parse(JSON.stringify(this.tabLocalData));
      this.tabCollection = this.tabLocalData;
    }
  }


  ngAfterViewInit() {
    if (this.tabs.nativeElement.scrollWidth > this.tabs.nativeElement.clientWidth) {
      this.shownext = true;
    }
    // this.action = this.queryAction.toArray();


  }

  ngAfterContentInit() {
    if (this.tabLocalData && this.tabLocalData.length > 0) {
      this.tabPreviewData = JSON.parse(JSON.stringify(this.tabLocalData));
      this.tabCollection = this.tabLocalData;
    } else {
      this.tabCollection = this.queryTabs.toArray();
    }
    this.calculateWidth();
  }

  calculateWidth() {
    let tabWidth: number;
    tabWidth = this.tabCollection.length;
    for (let i = 0; i < this.tabCollection.length; i++) {
      if (this.fullPageTabs == true) {
        this.tabCollection[i]['width'] = (100 / tabWidth) + "%";
      }
      this.tabCollection[i].amexiocolor = AmexioColorMap.COMPONENT_CLASS_MAP[this.tabCollection[i].amexiocolor];
    }
  }


  onTabClick(tab: any) {
    if (!tab.disabled) {
      for (let i = 0; i < this.tabCollection.length; i++) {
        if (this.tabCollection[i] === tab) {
          this.tabCollection[i]['active'] = true;
          this.onClick.emit(tab);
        } else {
          this.tabCollection[i]['active'] = false;
        }
      }
    }

    // this.content = tab.title;
  }

  next() {
    let nxt = this.tabs.nativeElement;
    nxt.scrollLeft = nxt.scrollLeft + 200;

    if ((nxt.scrollWidth - nxt.offsetWidth - nxt.scrollLeft) <= 0) {
      this.shownext = false;
    }
    this.showprev = true;
  }

  previous() {
    let prev = this.tabs.nativeElement;
    prev.scrollLeft = prev.scrollLeft - 200;

    if (prev.scrollLeft == 0) {
      this.showprev = false;
    }
    this.shownext = true;
  }

  closeTab(tabNode: AmexioTabPill) {
    const newTab: AmexioTabPill[] = [];
    const tabs = this.tabs;
    let index = 0;
    let tabHighlightIndex = 0;

    this.tabCollection.forEach(tab => {
      tab.active = false;
      if (tab.tabId == tabNode.tabId) {
        tabHighlightIndex = index;
      }
      if (tab.tabId != tabNode.tabId) {
        newTab.push(tab);
      }
      index++;
    });

    if (tabHighlightIndex == newTab.length) {
      tabHighlightIndex--;
    }
    this.activateTab(newTab[tabHighlightIndex].tabId);
    this.tabCollection = newTab;
    if (this.tabCollection.length == 1) {
      this.closable = false;
    }
  }

  activateTab(tabId: number) {
    const tabs = this.tabs;
    this.tabCollection.forEach(tab => {
      tab.active = false;
      if (tab.tabId == tabId) {
        tab.active = true;
      }
    });
  }

  findStyleClass(tabData: any): string {
    if ((tabData.amexiocolor == 'amexio-tab-black') && tabData.active) {
      return 'activetab';
    }
    if (tabData.disabled) {
      return 'disabled-tab';
    }
    if ((tabData.amexiocolor != 'amexio-tab-black') && tabData.active)
      return 'activecolortab';
  }

}
