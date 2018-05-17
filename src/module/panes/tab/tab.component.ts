/**
 * Created by ketangote on 12/1/17.
 */

/*
 Component Name : Amexio Tab
 Component Selector : <amexio-tab-view>
 Component Description : Tab component for Angular Apps with multiple configurations such as Tab, Icon support,  Closable tabs, Amexio-color, Tab Position at top/bottom/ Tab 

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
import { AmexioTabActionComponent } from "./tab.action";

export namespace AmexioTopColorMap {
  export const COMPONENT_CLASS_MAP: any = {
    red: 'amexio-top-tab-red',
    green: 'amexio-top-tab-green',
    purple: 'amexio-top-tab-purple',
    blue: 'amexio-top-tab-blue',
    brown: 'amexio-top-tab-brown',
    yellow: 'amexio-top-tab-yellow',
    black: 'amexio-top-tab-black',
    pink: 'amexio-top-tab-pink',
    orange: 'amexio-top-tab-orange',
  }
}

export namespace AmexioBottomColorMap {
  export const COMPONENT_CLASS_MAP: any = {
    red: 'amexio-bottom-tab-red',
    green: 'amexio-bottom-tab-green',
    purple: 'amexio-bottom-tab-purple',
    blue: 'amexio-bottom-tab-blue',
    brown: 'amexio-bottom-tab-brown',
    yellow: 'amexio-bottom-tab-yellow',
    black: 'amexio-bottom-tab-black',
    pink: 'amexio-bottom-tab-pink',
    orange: 'amexio-bottom-tab-orange'
  }
}

@Component({
  selector: 'amexio-tab-view',
  templateUrl: './tab.component.html'
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
name : header-align
datatype : string
version : 4.1.9 onwards
default : left
description : specify position of tabs(left/right/center).
*/
@Input('header-align') headeralign: string;

/*
Properties 
name : action-type-align
datatype : string
version : 4.1.9 onwards
default : left
description : specify position of action type(left/right).
*/
@Input('action-type-align') typeActionAlign: string;


/*
Properties 
name : divide-header-equally
datatype : boolean
version : 4.1.9 onwards
default : false
description : If "true" divides all tab equally.
*/
@Input('divide-header-equally') fullPageTabs: boolean;

/*
Properties 
name : type
datatype : string
version : 4.1.9 onwards
default : none
description : Type can be amexio input such as (text field/ number field/ checkbox/ label/ dropdown/
            toggle/ button/ image/ checkbox group/ radio group/ rating/ datefield)
*/
// @Input('type') type: string;

/*
Properties 
name :tab-position
datatype : string
version : 4.1.9 onwards
default : top
description : Position of tab can be (top/bottom)
*/
@Input('tab-position') tabPosition: string;

/*
Properties 
name : header
datatype : string
version : 4.1.9 onwards
default : none
description : Header for Tab.
*/
@Input() header: string;

@ViewChild('tab', { read: ElementRef }) public tabs: ElementRef;
@ViewChild('tabAction', { read: ElementRef }) public tabAction: ElementRef;
@ViewChild('headerWidth', { read: ElementRef }) public headerWidth: ElementRef;

@ViewChild('headerName', { read: ElementRef }) public headerName: ElementRef;
@ViewChild('tabslist', { read: ElementRef }) public tabslist: ElementRef;
@ViewChild('actionProperty', { read: ElementRef }) public actionProperty: ElementRef;

@ContentChildren(AmexioTabPill) queryTabs: QueryList<AmexioTabPill>;
tabCollection: AmexioTabPill[];

@ContentChildren(AmexioTabActionComponent, { descendants: true }) queryAction: QueryList<AmexioTabActionComponent>

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

widthTabs: any;

headWidth: any;

singleTabWidth: any;

map = new Map<any, any>();
constructor(public render: Renderer2) {
  this.headeralign = "left";
  this.typeActionAlign = "left";
  this.tabPosition = "top";
}

ngOnInit() {
}

ngDoCheck() {
  if (this.tabs.nativeElement.scrollWidth > this.tabs.nativeElement.clientWidth) {
    //this.shownext = true;
    this.headeralign = 'left';
  }
  this.adjustWidth();
  
  if (this.tabs && this.tabs.nativeElement
    && this.headerWidth && this.headerWidth.nativeElement
    && this.tabAction && this.tabAction.nativeElement
    && this.tabWidth1 != this.tabs.nativeElement.offsetWidth) {
    this.headWidth = (this.tabAction.nativeElement.scrollWidth + this.headerWidth.nativeElement.scrollWidth);
    this.widthTabs = this.tabs.nativeElement.offsetWidth - this.headWidth;

  }

  if (JSON.stringify(this.tabPreviewData) != JSON.stringify(this.tabLocalData)) {
    this.tabPreviewData = JSON.parse(JSON.stringify(this.tabLocalData));
    this.tabCollection = this.tabLocalData;
  }
}

private tabWidth1: number;
private totalTabs: number;

ngAfterViewInit() {

  let tabWidth
  this.tabWidth1 = this.tabs.nativeElement.offsetWidth;
  this.totalTabs = this.tabCollection.length;
}

adjustWidth() {
  let tWidth = this.tabs.nativeElement.clientWidth;
  let tlistWidth = this.tabslist.nativeElement.scrollWidth;
  let hWidth = 0;
  let totalElWidth = tlistWidth + hWidth;
  
  if(totalElWidth > tWidth){
    this.shownext = true;
  }else{
    this.shownext = false;
  }

  if (this.fullPageTabs == true) {
    if(totalElWidth > tWidth && this.fullPageTabs){
      this.shownext = true;
    }else{
      this.singleTabWidth = totalElWidth / this.totalTabs;
    }
  }
}

ngAfterContentInit() {
  if (this.tabLocalData && this.tabLocalData.length > 0) {
    this.tabPreviewData = JSON.parse(JSON.stringify(this.tabLocalData));
    this.tabCollection = this.tabLocalData;
  } else {
    this.tabCollection = [];
    this.tabCollection = this.queryTabs.toArray();
  }

  this.calculateWidth();

  //To add action in tab
  let actionComp = this.queryAction.toArray();
  if (actionComp.length > 0) {
    actionComp[0].checkActionComponent();
  }

}

calculateWidth() {

  let tabWidth = this.tabCollection.length;
  for (let i = 0; i < tabWidth; i++) {
    if (this.tabPosition == "top") {
      this.tabCollection[i].amexiocolor = AmexioTopColorMap.COMPONENT_CLASS_MAP[this.tabCollection[i].amexiocolor];
    } else
      this.tabCollection[i].amexiocolor = AmexioBottomColorMap.COMPONENT_CLASS_MAP[this.tabCollection[i].amexiocolor];
  }
}


onTabClick(tab: any) {
  if (!tab.disabled && !tab.header) {
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
  if ((tabData.amexiocolor == 'amexio-top-tab-black') && (this.tabPosition == 'top') && tabData.active) {
    return 'activetab';
  }
  if ((tabData.amexiocolor == 'amexio-bottom-tab-black') && (this.tabPosition == 'bottom') && tabData.active) {
    return 'bottomActivetab';
  }
  if (tabData.disabled) {
    return 'disabled-tab';
  }
  if ((tabData.amexiocolor != 'amexio-top-tab-black') && (this.tabPosition == 'top') && tabData.active) {
    return 'activecolortab';
  }
  if ((tabData.amexiocolor != 'amexio-bottom-tab-black') && (this.tabPosition == 'bottom') && tabData.active) {
    return 'activebottomcolortab';
  }
}

findTabStyleClass() {
  if (this.headeralign == 'right' && !this.fullPageTabs) {
    return 'tabposition-right';
  }
  if (this.headeralign == 'left' && !this.fullPageTabs) {
    return 'tabposition-left';
  }
  if (this.fullPageTabs == true) {
    return 'equally-align-tabs';
  }
}


}