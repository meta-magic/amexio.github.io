/**
 * Created by ketangote on 12/1/17.
 */

/*
 Component Name : Amexio Tab
 Component Selector : <amexio-tab-view>
 Component Description : Tab component for Angular Apps with multiple configurations such as Tab, Icon support, Scrollable tabs, Closable tab, Vertical Tabs

 .

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
import {AmexioTabPill} from "./tab.pill.component";

@Component({
  selector: 'amexio-tab-view', templateUrl: './tab.component.html', styleUrls: ['tab.component.scss']
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
name : position
datatype : string
version : 4.0 onwards
default : 
description : specify position of tab.
*/
  @Input() position: string;

  @ViewChild('tab', {read: ElementRef}) public tabs: ElementRef;

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
  }

  ngAfterContentInit() {
    if (this.tabLocalData && this.tabLocalData.length > 0 ) {
      this.tabPreviewData = JSON.parse(JSON.stringify(this.tabLocalData));
      this.tabCollection = this.tabLocalData;
    } else {
      this.tabCollection = this.queryTabs.toArray();
    }

  }

  onTabClick(tab: any) {
    for (let i = 0; i < this.tabCollection.length; i++) {
      if (this.tabCollection[i] === tab) {
        this.tabCollection[i]['active'] = true;
        this.onClick.emit(tab);
      } else {
        this.tabCollection[i]['active'] = false;
      }
    }

    // this.content = tab.title;
  }

  next() {
    let nxt = this.tabs.nativeElement;
    nxt.scrollLeft = nxt.scrollLeft + 200;

    if ((nxt.scrollWidth - nxt.offsetWidth - nxt.scrollLeft ) <= 0) {
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


}
