/**
 * Created by ketangote on 12/1/17.
 */

/*
 Component Name : Amexio Tab
 Component Selector : <amexio-tab-view>
 Component Description : Tab component for Angular Apps with multiple configurations such as Tab, Icon support,
 Closable tabs, Amexio-color, Tab Position at top/bottom/ Tab

*/
import {
  AfterContentInit,
  AfterViewInit,
  Component,
  ComponentFactoryResolver,
  ContentChildren,
  ElementRef,
  EventEmitter,
  HostListener,
  Input,
  OnInit,
  Output,
  QueryList,
  Renderer2,
  ViewChild,
  ViewContainerRef,
} from '@angular/core';
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
export class AmexioTabComponent implements AfterContentInit, AfterViewInit, OnInit {

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

  map = new Map<any, any>();
  constructor(public render: Renderer2, private componentFactoryResolver: ComponentFactoryResolver, viewContainerRef: ViewContainerRef) {
    this.headeralign = 'left';
    this.typeActionAlign = 'left';
    this.tabPosition = 'top';
    this.fullPageTabs = false;
    this.action = false;
  }
  ngOnInit() {
    this.componentLoaded = true;
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
  }

  ngAfterViewInit() {
    this.tabWidth1 = this.tabs.nativeElement.offsetWidth;
    this.totalTabs = this.tabCollection.length;
    setTimeout(()=>{
      this.updateTabComponent();
    },500);
    
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
    this.tabCollection.push(tp.instance);
    this.selectTab(tp.instance);

    return dynCmp.instance;
  }

  // Method to close all tab
  closeAllTabs() {
    this.tabCollection.forEach((tabs) => {
      if (tabs.closable === true || this.closable === true) {
        this.closeTab(tabs);
      }
    });
  }

  // Method to close particular tabs
  closeTabs(data: any) {
    this.tabCollection.forEach((tabs) => {
      data.forEach((opt: any) => {
        if (opt.toLowerCase() !== tabs.title.toLowerCase() && (tabs.closable === true || this.closable === true)) {
          this.closeTab(tabs);
        }
      });
    });
  }

  // Method to set active tab on the basis of tab sequence or tab title
  setActiveTab(input: any) {
    let flag = false;
    if (typeof input === 'string') {
      this.tabCollection.forEach((tabs) => {
        if (input.trim().toLowerCase() === tabs.title.trim().toLowerCase()) {
          tabs.active = true;
          flag = true;
        } else {
          tabs.active = false;
        }
      });
    } else if (typeof input === 'number') {
      this.tabCollection.forEach((tabs: any, index: number) => {
        if (index + 1 === input) {
          tabs.active = true;
          flag = true;
        } else {
          tabs.active = false;
        }
      });
    }
    return flag;

  }

  selectTab(tab: AmexioTabPillComponent) {
    // deactivate all tabs
    this.tabCollection.forEach((tab1: any) => (tab1.active = false));
    tab.active = true;
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
    }
  }

  onTabClick(tab: any) {
    if (!tab.disabled && !tab.header) {
      for (const i of this.tabCollection) {
        if (i === tab) {
          i['active'] = true;
          this.onClick.emit(tab);
        } else {
          i['active'] = false;
        }
      }
    }
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

    this.tabCollection.forEach((tab) => {
      tab.active = false;
      if (tab.tabId === tabNode.tabId) {
        tabHighlightIndex = index;
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
  }

  activateTab(tabId: number) {
    if (tabId !== null) {
      this.tabCollection.forEach((tab) => {
        tab.active = false;
        if (tab.tabId === tabId) {
          tab.active = true;
        }
      });
    }
  }

  findStyleClass(tabData: any): string {
    if ((!tabData.amexiocolor || tabData.amexiocolor === '') && tabData.active && (this.tabPosition === 'top')) {
      return 'activetab';
    }
    if ((!tabData.amexiocolor || tabData.amexiocolor === '') && (this.tabPosition === 'bottom') && tabData.active) {
      return 'bottomActivetab';
    }
    if (tabData.disabled) {
      return 'disabled-tab';
    }
    if ((tabData.amexiocolor !== '') && (this.tabPosition === 'top') && tabData.active) {
      return 'activecolortab';
    }
    if ((tabData.amexiocolor !== '') && (this.tabPosition === 'bottom') && tabData.active) {
      return 'activebottomcolortab';
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
    event.preventDefault();
    event.stopPropagation();
    this.rightClickRowData = row;
    this.contextStyle = this.getContextMenuStyle();
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
    } else if (this.contextmenu && this.contextmenu.length > 0) {
      this.contextMenuFlag = true;
    }
  }

  getContextMenuStyle() {
    console.log('*******CSSSS******');
    return {
      'cursor': 'default',
      'position': 'fixed',
      'display': this.contextMenuFlag ? 'block' : 'none',
      'left': this.mouseLocation.left + 'px',
      'top': this.mouseLocation.top + 'px',
      'box-shadow': '1px 1px 2px #000000',
      'width': '15%',
    };
  }

  getListPosition(elementRef: any) {
    const height = 240;
    if ((window.screen.height - elementRef.getBoundingClientRect().bottom) < height) {
      return true;
    } else {
      return false;
    }
  }

  onContextNodeClick(itemConfig: any) {
    let temptab;
    this.tabCollection.forEach((obj) => {
      if (obj.active) {
        temptab = obj;
      }
    });
    if (itemConfig.active) {
      temptab = itemConfig;
    }
    if (!itemConfig.disabled) {
      const obj = {
        menuData: itemConfig,
        rowData: this.rightClickRowData,
      };
      if (itemConfig.text === 'Close All') {
        this.closeAllTabs();
      }
      if (itemConfig.text === this.closeOthersConst) {
        this.closeOtherTabs(temptab);
      }
      this.rightClick.emit(obj);
    }
  }

  closeOtherTabs(data: any) {
    this.tabCollection.forEach((tabs) => {
      if (data.title.toLowerCase() !== tabs.title.toLowerCase() && (tabs.closable === true || this.closable === true)) {
        this.closeTab(tabs);
      }
    });
  }

  @HostListener('document:click')
  onWindowClick() {
    this.contextMenuFlag = false;
  }

  @HostListener('document:scroll')
  onscroll() {
    this.contextMenuFlag = false;
  }

}
