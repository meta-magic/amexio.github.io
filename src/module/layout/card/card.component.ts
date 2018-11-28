
/**
 * Created by ketangote on 12/18/17.
 */
/*
Component Name : Amexio card
 Component Selector : <amexio-card>
Component Description : Amexio Card which renders card based on title, body and actions user has configured
*/

import {
  AfterContentInit, AfterViewInit, Component, ElementRef, EventEmitter, HostListener, Input, OnDestroy, OnInit, Output,
  Renderer2, ViewChild
} from '@angular/core';
import { ContentChildren, QueryList } from '@angular/core';
import { AmexioHeaderComponent } from '../../panes/header/pane.action.header';
import { AmexioFooterComponent } from './../../panes/action/pane.action.footer';
import { AmexioBodyComponent } from './../../panes/body/pane.action.body';
@Component({
  selector: 'amexio-card',
  template: `
  <div  #id  class="card-container" *ngIf="show"  (window:resize)="onResize()"
  (contextmenu)="loadContextMenu({event:$event,ref:id})">
    <header #cardHeader  [style.padding]="headerPadding"  class="card-header" *ngIf="header"

            [ngClass]="{'flex-start':(headeralign=='left'),'flex-end':(headeralign=='right'),'flex-center':(headeralign=='center')}">
      <ng-content select="amexio-header"></ng-content>
    </header>
<div class="card-body cardbody" [style.padding]="bodyPadding"
[ngStyle]="{'height.px' : height,'overflow-y' : height!= null ? 'auto' : '','min-height.px' : minHeight}">
      <ng-content select="amexio-body"></ng-content>
    </div>
    <footer  #cardFooter [style.padding]="footerPadding"  class="card-footer" *ngIf="footer"
            [ngClass]="{'flex-start':(footeralign=='left'),'flex-end':(footeralign=='right'),'flex-center':(footeralign=='center')}">
      <ng-content select="amexio-action"></ng-content>
    </footer>
  </div>

  <span *ngIf="flag" [ngStyle]="contextStyle">
    <ul class="context-menu-list" [ngClass]="{'dropdown-up' : posixUp}">
      <li (click)="onContextNodeClick(itemConfig)" class="context-menu-list-items"
      [ngStyle]="{'cursor': itemConfig.disabled ? 'not-allowed':'pointer'}"
        [ngClass]="{'context-menu-separator':itemConfig.seperator}" *ngFor="let itemConfig of contextmenu">
        <em [ngStyle]="{'padding-left': itemConfig.icon ? '5px':'19px'}" [ngClass]="itemConfig.icon"></em>
        <span style="white-space: nowrap;display: inline ; padding-left:5px">{{itemConfig.text}}
        </span>
      </li>
    </ul>
  </span>
  `,
})
export class AmexioCardComponent implements OnInit, OnDestroy, AfterViewInit, AfterContentInit {
  /*
Properties
name : header-align
datatype : string
version : 4.0 onwards
default : left
description : Align of item elements inside card header example : right,center,left.
*/
  @Input('header-align') headeralign: string;
  /*
Properties
name : header-align
datatype : string
version : 4.0 onwards
default : left
description : User can enable header of card by setting this flag to true..
*/
  @Input() header: boolean;
  /*
Properties
name : footer
datatype : boolean
version : 4.0 onwards
default : false
description : User can enable footer of card by setting this flag to true.
*/
  @Input() footer: boolean;
  /*
Properties
name : footer-align
datatype :  string
version : 4.0 onwards
default : left
description : Align of item elements inside card footer example : right,center,left..
*/
  @Input('footer-align') footeralign: string;
  /*
Properties
name : show
datatype :  boolean
version : 4.0 onwards
default : true
description : User can bind variable to this and hide/unhide card based on requirement..
*/
  @Input() show = true;
  /*
Properties
name : height
datatype :   any
version : 4.0 onwards
default :
description : User can set the height to body..
*/
  @Input() height: any;
  /*
Properties
name : min-height
datatype :   any
version : 4.0 onwards
default :
description : Provides minimum card height.
*/
  @Input('min-height') minHeight: any;
  /*
Properties
name : body-height
datatype :   any
version : 4.0 onwards
default :
description : Provides card height.
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
  @Input('context-menu') contextmenu: any[];

  @Input() parentRef: any;

  @Output() nodeRightClick: any = new EventEmitter<any>();

  @Output() rightClick: any = new EventEmitter<any>();
  /*
   view child begins
  */

  @ViewChild('cardHeader', { read: ElementRef }) public cardHeader: ElementRef;

  @ViewChild('cardFooter', { read: ElementRef }) public cardFooter: ElementRef;

  headerPadding: string;
  bodyPadding: string;
  footerPadding: string;

  flag: boolean;

  posixUp: boolean;

  rightClickNodeData: any;

  contextStyle: any;

  mouseLocation: { left: number; top: number } = { left: 0, top: 0 };

  @ContentChildren(AmexioHeaderComponent) amexioHeader: QueryList<AmexioHeaderComponent>;
  headerComponentList: AmexioHeaderComponent[];
  @ContentChildren(AmexioBodyComponent) amexioBody: QueryList<AmexioBodyComponent>;
  bodyComponentList: AmexioBodyComponent[];
  @ContentChildren(AmexioFooterComponent) amexioFooter: QueryList<AmexioFooterComponent>;
  footerComponentList: AmexioFooterComponent[];
  globalClickListenFunc: () => void;
  constructor(private renderer: Renderer2) {
    this.headeralign = 'left';
    this.footeralign = 'right';
  }
  ngOnInit() {
  }
  ngAfterViewInit() {
    setTimeout(() => {
      this.onResize();
    }, 500);
  }
  ngAfterContentInit() {
    // FOR HEADER PADING
    this.headerComponentList = this.amexioHeader.toArray();
    this.headerComponentList.forEach((item: AmexioHeaderComponent, currentIndex) => {
      if (item.padding) {
        this.headerPadding = item.padding;
      }
    });
    // FOR BODY PADDING
    this.bodyComponentList = this.amexioBody.toArray();
    this.bodyComponentList.forEach((item: AmexioBodyComponent, currentIndex) => {
      if (item.padding) {
        this.bodyPadding = item.padding;
      }
    });
    // FOR FOOTER PADDING
    this.footerComponentList = this.amexioFooter.toArray();
    this.footerComponentList.forEach((item: AmexioFooterComponent, currentIndex) => {
      if (item.padding) {
        this.footerPadding = item.padding;
      }
    });
  }
  // Calculate body size based on browser height
  onResize() {
    if (this.bodyheight) {
      let h = (window.innerHeight / 100) * this.bodyheight;
      if (this.cardHeader && this.cardHeader.nativeElement && this.cardHeader.nativeElement.offsetHeight) {
        h = h - this.cardHeader.nativeElement.offsetHeight;
      }
      if (this.cardFooter && this.cardFooter.nativeElement && this.cardFooter.nativeElement.offsetHeight) {
        h = h - this.cardFooter.nativeElement.offsetHeight;
      }
      if (this.bodyheight === 100) {
        h = h - 40;
      }
      this.minHeight = h;
      this.height = h;
    }
  }

  getContextMenu() {
    if (this.contextmenu && this.contextmenu.length > 0) {
      this.flag = true;
      this.addListner();
    }
  }

  getListPosition(elementRef: any): boolean {
    const height = 240;
    if ((window.screen.height - elementRef.getBoundingClientRect().bottom) < height) {
      return true;
    } else {
      return false;
    }
  }
  loadContextMenu(rightClickData: any) {
    this.mouseLocation.left = rightClickData.event.clientX;
    this.mouseLocation.top = rightClickData.event.clientY;
    this.getContextMenu();
    this.posixUp = this.getListPosition(rightClickData.ref);
    rightClickData.event.preventDefault();
    rightClickData.event.stopPropagation();
    this.rightClickNodeData = rightClickData.data;
    this.contextStyle = this.getContextMenuStyle();
    this.nodeRightClick.emit(rightClickData);
  }

  onContextNodeClick(itemConfig: any) {
    if (!itemConfig.disabled) {
      const obj = {
        menuData: itemConfig,
        NodeData: this.rightClickNodeData,
      };
      this.flag = false;
      this.removeListner();
      this.rightClick.emit(obj);
    }
  }

  getContextMenuStyle() {
    return {
      'cursor': 'default',
      'position': 'fixed',
      'display': this.flag ? 'block' : 'none',
      'left': this.mouseLocation.left + 'px',
      'top': this.mouseLocation.top + 'px',
      'box-shadow': '1px 1px 2px #000000',
      'width': '15%',
    };
  }

  addListner() {
    this.globalClickListenFunc = this.renderer.listen('document', 'click', (e: any) => {
      this.flag = false;
      if (!this.flag) {
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
  }
}
