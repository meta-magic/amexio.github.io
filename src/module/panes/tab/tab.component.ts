/*
* Copyright [2019] [Metamagic]
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
* http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*
* Created by ketangote on 12/1/17.
*/

import {
  AfterContentInit, AfterViewInit, Component, ComponentFactoryResolver, ContentChildren, ElementRef, EventEmitter,
  HostListener, Input, OnDestroy, OnInit, Output, QueryList, Renderer2, ViewChild, ViewContainerRef,
} from '@angular/core';
import { LifeCycleBaseComponent } from '../../base/lifecycle.base.component';
import { AmexioTabActionComponent } from './tab.action';
import { AmexioTabPillComponent } from './tab.pill.component';

export const TOP_COMPONENT_CLASS_MAP: any = {
  red: 'amexio-top-tab-red',
  green: 'amexio-top-tab-green',
  purple: 'amexio-top-tab-purple',
  blue: 'amexio-top-tab-blue',
  brown: 'amexio-top-tab-brown',
  yellow: 'amexio-top-tab-yellow',
  black: 'amexio-top-tab-black',
  pink: 'amexio-top-tab-pink',
  orange: 'amexio-top-tab-orange',
};

export const BOTTOM_COMPONENT_CLASS_MAP: any = {
  red: 'amexio-bottom-tab-red',
  green: 'amexio-bottom-tab-green',
  purple: 'amexio-bottom-tab-purple',
  blue: 'amexio-bottom-tab-blue',
  brown: 'amexio-bottom-tab-brown',
  yellow: 'amexio-bottom-tab-yellow',
  black: 'amexio-bottom-tab-black',
  pink: 'amexio-bottom-tab-pink',
  orange: 'amexio-bottom-tab-orange',
};

@Component({
  selector: 'amexio-tab-view',
  templateUrl: './tab.component.html',
})
export class AmexioTabComponent extends LifeCycleBaseComponent implements AfterContentInit, AfterViewInit, OnInit, OnDestroy {

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
   name : action
   datatype : string
   version : 4.1.9 onwards
   default : left
   description : This flag ensures the action component.
   */
  @Input() action: boolean;

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

  height: any;

  minHeight: any;

  /*
   Properties
   name : body-height
   datatype :   any
   version : 4.2 onwards
   default :
   description : Provides form body height.
   */
  @Input('body-height') bodyheight: any;

  /*
   Properties
   name :  context-menu
   datatype : string
   version : 5.0.1 onwards
   default :
   description : Context Menu provides the list of menus on right click.
   */
  @Input('context-menu') contextmenu: any[] = [];

  /*
   Properties
   name : default-context-menu
   datatype : boolean
   version : 5.0.1 onwards
   default : false
   description : If "true" add two context menus i.e close All and close Others tabs.
   */
  @Input('default-context-menu') defaultContextMenu: boolean;

  /*
Properties
name : active-bg-color
datatype : boolean
version : 5.9.3 onwards
default : false
description : sets background color for active tab
*/
  @Input('active-bg-color') activeBGColor: boolean;

  /*
   Events
   name : rightClick
   datatype : none
   version : 5.0.1
   default : none
   description : It will gives you row clicked data.
   */
  @Output() rightClick: any = new EventEmitter<any>();

  @ViewChild('tab', { read: ElementRef }) public tabs: ElementRef;
  @ViewChild('tabAction', { read: ElementRef }) public tabAction: ElementRef;
  @ViewChild('headerWidth', { read: ElementRef }) public headerWidth: ElementRef;
  @ViewChild('headerName', { read: ElementRef }) public headerName: ElementRef;
  @ViewChild('tabslist', { read: ElementRef }) public tabslist: ElementRef;
  @ViewChild('actionProperty', { read: ElementRef }) public actionProperty: ElementRef;

  @ContentChildren(AmexioTabPillComponent) queryTabs: QueryList<AmexioTabPillComponent>;
  tabCollection: AmexioTabPillComponent[];
  @ViewChild('target', { read: ViewContainerRef }) target: any;

  @ContentChildren(AmexioTabActionComponent, { descendants: true }) queryAction: QueryList<AmexioTabActionComponent>;

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
  _tabLocalData: any;
  componentLoaded: boolean;
  @Input('tabLocalData')
  set tabLocalData(value: any) {
    this._tabLocalData = value;
    if (this.componentLoaded) {
      this.updateTabComponent();
    }
  }
  get tabLocalData(): any {
    return this._tabLocalData;
  }

  tabPreviewData: any;

  showprev = false;

  private tabWidth1: number;
  private totalTabs: number;

  shownext = false;

  content: string;

  widthTabs: any;

  headWidth: any;

  singleTabWidth: any;

  actionComp: any;

  mouseLocation: { left: number; top: number } = { left: 0, top: 0 };

  contextMenuFlag: boolean;

  posixUp: boolean;

  rightClickRowData: any;

  private closeOthersConst = 'Close Others';

  contextStyle: any;

  dummyArray: any[] = [];

  tabPositionClass = '';

  componentId = '';

  map = new Map<any, any>();

  prevtabindex = -1;

  currtabindex = -1;

  tablk: any;

  themeCss: any;
  amexioComponentId = 'amexio-tab';

  globalClickListenFunc: () => void;

  constructor(
    public render: Renderer2, private componentFactoryResolver: ComponentFactoryResolver,
    private renderer: Renderer2,
  ) {
    super();
    this.headeralign = 'left';
    this.typeActionAlign = 'left';
    this.tabPosition = 'top';
    this.fullPageTabs = false;
    this.action = false;
  }
  ngOnInit() {
    this.componentLoaded = true;
    this.componentId = Math.floor(Math.random() * 90000) + 10000 + '_tabc';
    super.ngOnInit();
  }

  updateTabComponent() {
    if (this.tabs.nativeElement.scrollWidth > this.tabs.nativeElement.clientWidth) {
      this.headeralign = 'left';
    }
    this.adjustWidth();

    if (this.tabs && this.tabs.nativeElement
      && this.headerWidth && this.headerWidth.nativeElement
      && this.tabAction && this.tabAction.nativeElement
      && this.tabWidth1 !== this.tabs.nativeElement.offsetWidth) {
      this.headWidth = (this.tabAction.nativeElement.scrollWidth + this.headerWidth.nativeElement.scrollWidth);
      this.widthTabs = this.tabs.nativeElement.offsetWidth - this.headWidth;
    }

    if (JSON.stringify(this.tabPreviewData) !== JSON.stringify(this.tabLocalData)) {
      this.tabPreviewData = JSON.parse(JSON.stringify(this.tabLocalData));
      this.tabCollection = this.tabLocalData;
    }
    this.tabPositionClass = this.findTabStyleClass();
  }

  ngAfterViewInit() {
    // set time out
    setTimeout(() => {
      this.tabWidth1 = this.tabs.nativeElement.offsetWidth;
      this.totalTabs = this.tabCollection.length;
      this.updateTabComponent();
      this.tabCollection.forEach((element, index) => {
        element['tablk'] = Math.floor(Math.random() * 90000) + 10000 + '_tablk';
        super.ngAfterViewInit();
      });
    }, 500);
  }

  adjustWidth() {
    const tWidth = this.tabs.nativeElement.clientWidth;
    const tlistWidth = this.tabslist.nativeElement.scrollWidth;
    const hWidth = 0;
    const totalElWidth = tlistWidth + hWidth;

    if (totalElWidth > tWidth) {
      this.shownext = true;
    } else {
      this.shownext = false;
    }

    if (this.fullPageTabs === true) {
      if (totalElWidth > tWidth && this.fullPageTabs) {
        this.shownext = true;
      } else {
        this.singleTabWidth = totalElWidth / this.totalTabs;
      }
    }
    this.onAdjustHeight();
  }

  ngAfterContentInit() {
    if (this.tabLocalData && this.tabLocalData.length > 0) {
      this.tabPreviewData = JSON.parse(JSON.stringify(this.tabLocalData));
      this.tabCollection = this.tabLocalData;
    } else {
      this.tabCollection = [];
      this.tabCollection = this.queryTabs.toArray();
    }

    this.tabNodeProperties();

    // To add action in tab
    this.actionComp = this.queryAction.toArray();
    if (this.actionComp.length > 0) {
      this.actionComp[0].checkActionComponent();
    }

    this.tabPositionClass = this.findTabStyleClass();

  }

  addDynamicTab(title: string, amexiocolor: string, closable: boolean, component: any) {
    // get a component factory for our TabComponent
    const tpCF = this.componentFactoryResolver.resolveComponentFactory(
      AmexioTabPillComponent,
    );
    const tp = this.target.createComponent(tpCF);
    // set the according properties on our component instance
    const instance: AmexioTabPillComponent = tp.instance as AmexioTabPillComponent;
    instance.title = title;
    instance.active = true;
    instance.closable = closable;
    instance['tabpillinstance'] = this.target;
    if (instance.amexiocolor === '') {
      instance.amexiocolor = 'amexio-top-tab-black';
    } else {
      instance.amexiocolor = 'amexio-top-tab-' + amexiocolor;
    }
    // create dynamic component
    const dynCF = this.componentFactoryResolver.resolveComponentFactory(
      component,
    );
    const dynCmp = tp.instance.target.createComponent(dynCF);

    // Push new tab and select it.
    this.dummyArray.push(tp);
    this.tabCollection.push(tp.instance);
    this.selectTab(tp.instance);
    this.adjustWidth();
    return dynCmp.instance;
  }

  // Method to close all tab
  closeAllTabs() {
    this.tabCollection.forEach((tabs) => {
      if (tabs.closable || this.closable) {
        this.closeTab(tabs);
      }
    });
  }

  closeAll() {
    this.tabCollection.forEach((tabs) => {
      this.closeTab(tabs);
    });
  }

  closeTabs(data: any) {
    const tabList: any[] = [];
    this.tabCollection.forEach((tabs) => {
      tabs.active = false;
      data.forEach((opt: any) => {
        if (opt.toLowerCase() !== tabs.title.toLowerCase() && (tabs.closable || this.closable)) {
          this.closeTab(tabs);
        } else {
          tabList.push(tabs);
          this.asignTabPillClass(tabs);
        }
      });

    });
    tabList[tabList.length - 1].active = true;
    this.asignTabPillClass(tabList[tabList.length - 1]);

  }

  // Method to set active tab on the basis of tab sequence or tab title
  setActiveTab(input: any) {
    let flag = false;
    if (typeof input === 'string') {
      this.tabCollection.forEach((tabs: any) => {
        tabs.tabPillClass = '';
        if (input.trim().toLowerCase() === tabs.title.trim().toLowerCase()) {
          tabs.active = true;
          flag = true;
        } else {
          tabs.active = false;
        }
        this.asignTabPillClass(tabs);
      });
    } else if (typeof input === 'number') {
      this.tabCollection.forEach((tabs: any, index: number) => {
        tabs.tabPillClass = '';
        if (index + 1 === input) {
          tabs.active = true;
          flag = true;
        } else {
          tabs.active = false;

        }
        this.asignTabPillClass(tabs);
      });
    }
    return flag;

  }

  setDisableTabs(disabledTabInput: any[]) {
    const flag = false;
    if (disabledTabInput.length > 0) {
      disabledTabInput.forEach((ele: any) => {
        if (typeof ele === 'string') {
          this.disableTabByString(flag, ele);
        } else if (typeof ele === 'number') {
          this.disableTabByNumber(flag, ele);
        }
      });
    }
    return flag;
  }

  disableTabByString(flag: boolean, ele: string) {
    this.tabCollection.forEach((tabs: any) => {
      tabs.tabPillClass = '';
      if (ele.trim().toLowerCase() === tabs.title.trim().toLowerCase()) {
        tabs.disabled = true;
        flag = true;
      }
      this.asignTabPillClass(tabs);
    });
  }

  disableTabByNumber(flag: boolean, ele: number) {
    this.tabCollection.forEach((tabs: any, index: number) => {
      tabs.tabPillClass = '';
      if (index + 1 === ele) {
        tabs.active = true;
        flag = true;
      } else {
        tabs.active = false;
      }
      this.asignTabPillClass(tabs);
    });
  }
  setEnableTabs(disabledTabInput: any[]) {
    const flag = false;
    if (disabledTabInput.length > 0) {
      disabledTabInput.forEach((ele: any) => {
        if (typeof ele === 'string') {
          this.enableTabByString(flag, ele);
        } else if (typeof ele === 'number') {
          this.enableTabByNumber(flag, ele);
        }
      });
    }

    return flag;
  }

  enableTabByString(flag: boolean, ele: string) {
    this.tabCollection.forEach((tabs: any) => {
      tabs.tabPillClass = '';
      if (ele.trim().toLowerCase() === tabs.title.trim().toLowerCase()) {
        tabs.disabled = false;
        flag = true;
      }
      this.asignTabPillClass(tabs);
    });
  }

  enableTabByNumber(flag: boolean, ele: number) {
    this.tabCollection.forEach((tabs: any, index: number) => {
      tabs.tabPillClass = '';
      if (index + 1 === ele) {
        tabs.disabled = false;
        flag = true;
      }
      this.asignTabPillClass(tabs);
    });
  }

  selectTab(tab: AmexioTabPillComponent) {
    // deactivate all tabs
    this.tabCollection.forEach((tab1: any) => {
      tab1.active = false;
    });
    tab.active = true;
    this.tabCollection.forEach((tab1: any) => {
      this.asignTabPillClass(tab1);
    });
  }
  tabNodeProperties() {

    const tabWidth = this.tabCollection.length;
    for (let i = 0; i < tabWidth; i++) {
      if (this.tabPosition === 'top') {
        this.tabCollection[i].amexiocolor = TOP_COMPONENT_CLASS_MAP[this.tabCollection[i].amexiocolor];
      } else {
        this.tabCollection[i].amexiocolor = BOTTOM_COMPONENT_CLASS_MAP[this.tabCollection[i].amexiocolor];
      }
      if (this.closable) {
        if (this.tabCollection[i].closable === null || this.tabCollection[i].closable === true) {
          this.tabCollection[i].closable = true;
        } else if (this.tabCollection[i].closable === false) {
          this.tabCollection[i].closable = false;
        }
      }
      this.asignTabPillClass(this.tabCollection[i]);
    }
  }

  onTabClick(tab: any, index: any) {
    if (!tab.disabled && !tab.header) {
      for (const i of this.tabCollection) {
        if (i === tab) {
          i['active'] = true;
          i['index'] = index;
          this.asignTabPillClass(tab);
          this.onClick.emit(tab);
        } else {
          i['active'] = false;
          i['tabPillClass'] = '';
        }
      }
      this.tabCollection.forEach((tab1: any) => {
        this.asignTabPillClass(tab1);
      });
    }
  }
  onArrowRight() {
    if (this.prevtabindex > -1) {
      this.tabCollection[this.prevtabindex]['isSelected'] = false;
    }
    this.currtabindex++;
    this.prevtabindex = this.currtabindex;
    if (this.currtabindex >= this.tabCollection.length) {
      this.currtabindex = 0;
      this.prevtabindex = 0;
    }
    const currentTab: any = this.tabCollection[this.currtabindex];
    this.commonFocus(currentTab);
  }
  onArrowLeft() {
    if (this.prevtabindex > -1) {
      this.tabCollection[this.prevtabindex]['isSelected'] = false;
    }
    this.prevtabindex--;
    if (this.prevtabindex === -1) {
      this.prevtabindex = this.tabCollection.length - 1;
      this.currtabindex = -1;
    }
    this.tabCollection[this.prevtabindex]['isSelected'] = true;
    const currentTab: any = this.tabCollection[this.prevtabindex];
    this.commonFocus(currentTab);
    if (this.prevtabindex === 0) {
      this.currtabindex = 0;
    }
  }
  onHomeClick() {
    const currentTab: any = this.tabCollection[0];
    this.commonFocus(currentTab);
  }

  onEndClick() {
    const currentTab: any = this.tabCollection[this.tabCollection.length - 1];
    this.commonFocus(currentTab);
  }
  commonFocus(currentTab: any) {
    currentTab['isSelected'] = true;
    const tablk = document.getElementById(currentTab.tablk);
    tablk.focus();
  }

  next() {
    const nxt = this.tabs.nativeElement;
    nxt.scrollLeft = nxt.scrollLeft + 200;

    if ((nxt.scrollWidth - nxt.offsetWidth - nxt.scrollLeft) <= 0) {
      this.shownext = false;
    }
    this.showprev = true;
  }

  previous() {
    const prev = this.tabs.nativeElement;
    prev.scrollLeft = prev.scrollLeft - 200;

    if (prev.scrollLeft === 0) {
      this.showprev = false;
    }
    this.shownext = true;
  }

  closeTab(tabNode: AmexioTabPillComponent) {
    const newTab: AmexioTabPillComponent[] = [];
    let index = 0;
    let tabHighlightIndex = 0;
    this.tabCollection.forEach((tab: any, i: number) => {
      tab.active = false;
      if (tab.tabId === tabNode.tabId) {
        tabHighlightIndex = index;
        if (tab.hasOwnProperty('tabpillinstance')) {
          tab.target.remove();
        } else {
          this.tabDomRemove(tab);
        }
      } else if (tab.tabId !== tabNode.tabId) {
        newTab.push(tab);
      }
      index++;
    });
    if (tabHighlightIndex === newTab.length) {
      tabHighlightIndex--;
    }
    this.tabCollection = newTab;
    if (tabHighlightIndex > -1) {
      this.activateTab(newTab[tabHighlightIndex].tabId);
    } else {
      this.activateTab(null);
    }
    if (this.tabCollection.length === 1) {
      this.closable = false;
    }
    if (newTab.length === 1) {
      newTab[0].closable = false;
    }
  }
  tabDomRemove(tab: any) {
    const removeNode = document.getElementById(tab.tabId).parentNode;
    const parentRefNode = removeNode.parentNode;
    parentRefNode.removeChild(removeNode);

  }
  activateTab(tabId: number) {
    if (tabId !== null) {
      this.tabCollection.forEach((tab) => {
        tab.active = false;
        if (tab.tabId === tabId) {
          tab.active = true;
        }
        this.asignTabPillClass(tab);
      });
    }
  }

  asignTabPillClass(tabData: any) {
    tabData.tabPillClass = '';
    if ((!tabData.amexiocolor || tabData.amexiocolor === '') && tabData.active && (this.tabPosition === 'top')) {
      tabData.tabPillClass = 'activetab';
    }
    if ((!tabData.amexiocolor || tabData.amexiocolor === '') && (this.tabPosition === 'bottom') && tabData.active) {
      tabData.tabPillClass = 'bottomActivetab';
    }
    if (tabData.disabled) {
      tabData.tabPillClass = 'disabled-tab';
    }
    if ((tabData.amexiocolor !== '') && (this.tabPosition === 'top') && tabData.active && !this.activeBGColor) {
      tabData.tabPillClass = 'activecolortab';
    }
    if ((tabData.amexiocolor !== '') && (this.tabPosition === 'top') && tabData.active && this.activeBGColor) {
      tabData.tabPillClass = 'activebgcolortab';
    }
    if ((tabData.amexiocolor !== '') && (this.tabPosition === 'bottom') && tabData.active) {
      tabData.tabPillClass = 'activebottomcolortab';
    }
  }

  findTabStyleClass() {
    if (this.headeralign === 'right' && !this.fullPageTabs) {
      return 'tabposition-right';
    }
    if (this.headeralign === 'left' && !this.fullPageTabs) {
      return 'tabposition-left';
    }
    if (this.fullPageTabs === true) {
      return 'equally-align-tabs';
    }
  }

  onAdjustHeight() {

    if (this.bodyheight) {
      let h = (window.innerHeight / 100) * this.bodyheight;

      if (this.tabs && this.tabs.nativeElement && this.tabs.nativeElement.offsetHeight) {
        h = h - this.tabs.nativeElement.offsetHeight;
      }
      if (this.bodyheight === 100) {
        h = h - 40;
      }
      this.minHeight = h;
      this.height = h;
    }
  }

  loadContextMenu(event: any, row: any, id: any) {
    this.tempSelectedFlag(this.tabCollection);
    this.mouseLocation.left = event.clientX;
    this.mouseLocation.top = event.clientY;
    row.active = true;
    this.getContextMenu();
    this.posixUp = this.getListPosition(id);
    if (this.contextmenu && this.contextmenu.length > 0) {

      event.preventDefault();
      event.stopPropagation();
    }
    this.rightClickRowData = row;
  }

  tempSelectedFlag(tabs: any) {
    tabs.forEach((tab: any) => {
      if (tab.active) {
        tab.active = false;
      }
    });
  }

  getContextMenu() {
    if (this.defaultContextMenu) {
      const obj = { text: 'Close All', icon: 'fa fa-close', disable: false };
      const obj2 = { text: this.closeOthersConst, icon: 'fa fa-close', seperator: false, disabled: false };
      let tmpflag = true;
      for (const i of this.contextmenu) {
        if (i.text === 'Close All' || i.text === this.closeOthersConst) {
          tmpflag = false;
        }
      }
      if (tmpflag) {
        this.contextmenu.push(obj, obj2);
      }
      this.contextMenuFlag = true;
      this.addListner();
    } else if (this.contextmenu && this.contextmenu.length > 0) {
      this.contextMenuFlag = true;
      this.addListner();
    }
  }

  getListPosition(elementRef: any) {
    const height = 240;
    if ((window.screen.height - elementRef.getBoundingClientRect().bottom) < height) {
      return true;
    } else {
      return false;
    }
  }

  rightClickDataEmit(Data: any) {
    let temptab;
    this.tabCollection.forEach((obj) => {
      if (obj.active) {
        temptab = obj;
      }
    });
    if (Data.nodeData.active) {
      temptab = Data;
    }
    if (Data.menuData.text === 'Close All') {
      this.closeAllTabs();
    }
    if (Data.menuData.text === this.closeOthersConst) {
      this.closeOtherTabs(temptab);
    }
    this.rightClick.emit(Data);
  }

  closeOtherTabs(data: any) {
    this.tabCollection.forEach((tabs) => {
      if (data.nodeData.title.toLowerCase() !== tabs.title.toLowerCase() && (tabs.closable || this.closable)) {
        this.closeTab(tabs);
      }
    });
  }

  addListner() {
    this.globalClickListenFunc = this.renderer.listen('document', 'click', (e: any) => {
      this.contextMenuFlag = false;
      if (!this.contextMenuFlag) {
        this.removeListner();
      }
    });
  }

  removeListner() {
    if (this.globalClickListenFunc) {
      this.globalClickListenFunc();
    }
  }

  ngOnDestroy(): void {
    this.removeListner();
    super.ngOnDestroy();
  }
  showTab(input: any) {
    if (typeof input === 'string') {
      this.tabCollection.forEach((tabs: any) => {
        if (input.trim().toLowerCase() !== tabs.title.trim().toLowerCase()) {
          tabs.hide = true;
          tabs['showflag'] = true;
          tabs.active = false;
        } else {
          tabs.hide = false;
          tabs['showflag'] = false;
          tabs.active = true;
        }
        this.asignTabPillClass(tabs);
      });
    } else if (typeof input === 'number') {
      this.tabCollection.forEach((tabs: any, index: any) => {
        if (index !== input) {
          tabs.hide = true;
          tabs['showflag'] = true;
          tabs.active = false;
        } else {
          tabs.hide = false;
          tabs['showflag'] = false;
          tabs.active = true;
        }
      });
    }
  }
  // Method to hide tab
  hideTab(input: any) {
    if (typeof input === 'string') {
      this.tabCollection.forEach((tabs: any, index: any) => {
        if (input.trim().toLowerCase() === tabs.title.trim().toLowerCase() && tabs.active) {
          const i = index + 1;
          tabs.hide = false;
          this.tabCollection[i].active = true;
          const newTab = this.tabCollection[i];
          tabs.active = false;
          tabs['showflag'] = true;
          this.asignTabPillClass(newTab);
        } else if (input.trim().toLowerCase() === tabs.title.trim().toLowerCase() && !tabs.active) {
          tabs.hide = true;
          tabs['showflag'] = true;
        }
      });
    } else if (typeof input === 'number') {
      this.tabCollection.forEach((tabs: any, index: any) => {
        if (index !== input) {
          tabs.hide = true;
          tabs['showflag'] = false;
        } else {
          tabs.hide = false;
          tabs['showflag'] = true;
        }
      });
    }
  }
  disableTab(input: any, flag: boolean) {
    if (typeof input === 'string') {
      this.tabCollection.forEach((tabs: any) => {
        if (input.trim().toLowerCase() === tabs.title.trim().toLowerCase()) {
          tabs.disabled = true;
          flag = true;
        }
        this.asignTabPillClass(tabs);
      });
    } else if (typeof input === 'number') {
      this.tabCollection.forEach((tabs: any, index: any) => {
        if (index === input) {
          tabs.disabled = true;
          flag = true;
        }
        this.asignTabPillClass(tabs);
      });
    } else if (typeof input === 'object') {
      this.disabledsplitmethod(input, flag);
    }
  }
  disabledsplitmethod(input: any, flag: any) {
    input.forEach((element: string) => {
      if (typeof element === 'string') {
        this.tabCollection.forEach((tabs: any) => {
          if (element.trim().toLowerCase() === tabs.title.trim().toLowerCase()) {
            tabs.disabled = true;
            flag = true;
          }
          this.asignTabPillClass(tabs);
        });
      } else if (typeof element === 'number') {
        this.tabCollection.forEach((tabs: any, index: any) => {
          if (index === element) {
            tabs.disabled = true;
            flag = true;
          }
          this.asignTabPillClass(tabs);
        });
      }
    });
  }
  getCurrentTab() {
    let currentindex;
    this.tabCollection.forEach((tabs: any, index: any) => {
      if (tabs.active === true) {
        currentindex = index;
      }
    });
    return currentindex;
  }
  deleteTab(input: any) {
    if (typeof input === 'string') {
      this.tabCollection.forEach((tabs: any) => {
        if (input.trim().toLowerCase() === tabs.title.trim().toLowerCase()) {
          this.closeTab(tabs);
        }
      });
    } else if (typeof input === 'number') {
      this.tabCollection.forEach((tabs: any, index: any) => {
        if (index === input) {
          this.closeTab(tabs);
        }
      });
    }else if (typeof input === 'object') {
      this.deletetypeObject(input);
    }
  }
  deletetypeObject(input: any) {
    input.forEach((element: any) => {
      if (typeof element === 'string') {
        this.tabCollection.forEach((tabs: any) => {
          if (element.trim().toLowerCase() === tabs.title.trim().toLowerCase()) {
            this.closeTab(tabs);
          }
        });
      } else if (typeof element === 'number') {
        this.tabCollection.forEach((tabs: any, index: any) => {
          if (element === index) {
            this.closeTab(tabs);
          }
        });
      }
    });
  }
  replaceTab(input: number, replacetab: any) {
    this.tabCollection.forEach((tabs: any, index: any) => {
      if (input === index) {
        tabs.title = replacetab;
      }
    });
  }
}
