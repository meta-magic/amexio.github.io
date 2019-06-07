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
 * Created by ketangote on 12/18/17.
 */

import { animate, state, style, transition, trigger } from '@angular/animations';
import {
  AfterContentInit, Component, ContentChildren, ElementRef, EventEmitter, HostListener, Input, OnChanges, OnDestroy,
  OnInit, Output, QueryList, Renderer2, SimpleChanges, ViewChild,
} from '@angular/core';
import { AmexioFooterComponent } from '../action/pane.action.footer';
import { AmexioBodyComponent } from '../body/pane.action.body';
import { AmexioHeaderComponent } from '../header/pane.action.header';
@Component({
  selector: 'amexio-window',
  templateUrl: './window.pane.component.html',
  animations: [
    trigger('animation', [
      state('void', style({
        transform: 'translate3d(0, 25%, 0) scale(0.9)',
        opacity: 0,
      })),
      state('visible', style({
        transform: 'none',
        opacity: 1,
      })),
      transition('* => *', animate('400ms cubic-bezier(0.25, 0.8, 0.25, 1)')),
    ]),
  ],
})
export class AmexioWindowPaneComponent implements OnChanges, OnInit, OnDestroy, AfterContentInit {
  maximumWindowStyle: any;

  dummyWidth: string;

  x: number;

  y: number;

  px: number;

  py: number;

  draggingWindow: boolean;

  flag: boolean;

  posixUp: boolean;

  rightClickNodeData: any;

  themeCss: any;

  amexioComponentId = 'amexio-window';
  /*
   Properties
   name : vertical-position
   datatype : string
   version : 4.1 onwards
   default : none
   description : Postion of window vertically: top or bottom or center.
   This attribute is ignored if user specify position explicitly
   (using position-top/position-bottom/position-left/position-right)
   */
  @Input('vertical-position') verticalposition = 'center';
  /*
   Properties
   name : horizontal-position
   datatype : none
   version : 4.1 onwards
   default : none
   description : Postion of Window horizontally: left or right or center.
   This attribute is ignored if user specify position explicitly
   (using position-top/position-bottom/position-left/position-right)
   */
  @Input('horizontal-position') horizontalposition: string;
  /*
   Properties
   name : close-on-escape
   datatype : string
   version : 4.2onwards
   default : false
   description : Enables And Disables the Escape button.
   */
  @Input('close-on-escape') closeonescape = true;
  /*
   Properties
   name : position-top
   datatype : none
   version : 4.2 onwards
   default : none
   description : Takes top position in percentage or pixel
   */
  @Input('position-top') top: string;

  /*
   Properties
   name : footer-align
   datatype : string
   version : 4.0 onwards
   default : right
   description : Alignment of footer contents to right or left.
   */
  @Input('footer-align') footeralign: string;

  /*
   Properties
   name : show-window
   datatype : boolean
   version : 4.0 onwards
   default : false
   description : Show / Hide Window.
   */
  @Input('show-window') showWindow: boolean;

  @Input('material-design') materialDesign: boolean;

  @Input() show: boolean;

  @ViewChild('windowHeader', { read: ElementRef }) public windowHeader: ElementRef;

  @Output() showChange: EventEmitter<any> = new EventEmitter<any>();

  /*
   Properties
   name : body-height
   datatype : string
   version : 4.0 onwards
   default :
   description : Assign body height in percentage, in case of maximize=true it will be set to 100% by default
   */
  @Input('body-height') bodyHeight: string;

  isFullWindow: boolean;

  /*
   Properties
   name : maximize
   datatype : boolean
   version : 4.0 onwards
   default :false
   description : User can maximize the window to full screen.
   */
  @Input() maximize = false;

  /*
   Properties
   name : closable
   datatype : boolean
   version : 4.0 onwards
   default : false
   description : User can close the window.
   */
  @Input() closable = true;

  /*
   Properties
   name : header
   datatype : boolean
   version : 4.0 onwards
   default : false
   description : it is flag that decides header visibility
   */
  @Input() header = true;

  /*
   Properties
   name : footer
   datatype : boolean
   version : 4.0 onwards
   default : false
   description : it is flag that decides footer visibility
   */
  @Input() footer: boolean;
  /*
   Events
   name : close
   datatype : none
   version : none
   default : none
   description : close the window
   */
  private window = ' window-';
  /*
   Properties
   name :  context-menu
   datatype : string
   version : 5.0.1 onwards
   default :
   description : Context Menu provides the list of menus on right click.
   */
  // context menu input output
  @Input('context-menu') contextmenu: any[];

  @Input('width') width: any = '90%';

  @Output() nodeRightClick: any = new EventEmitter<any>();

  @Output() rightClick: any = new EventEmitter<any>();

  @ContentChildren(AmexioHeaderComponent) amexioHeader: QueryList<AmexioHeaderComponent>;
  @ContentChildren(AmexioFooterComponent) amexioFooter: QueryList<AmexioFooterComponent>;
  @ContentChildren(AmexioBodyComponent) amexioBody: QueryList<AmexioBodyComponent>;
  @Output() close: EventEmitter<any> = new EventEmitter<any>();
  @Input() draggable: boolean;
  @Input() resizable: boolean;
  @Input('remember-window-position') windowposition: boolean;
  mouseLocation: { left: number; top: number } = { left: 0, top: 0 };
  globalListenFunc: () => void;
  globalClickListenFunc: () => void;
  globalDragListenFunc: () => void;
  constructor(private renderer: Renderer2) {
    this.x = 0;
    this.y = 0;
    this.px = 0;
    this.py = 0;
    this.draggingWindow = false;
  }
  onCloseClick() {
    if (this.closable) {
      this.showWindow = false;
      this.show = false;
      this.showChange.emit(false);
      this.close.emit(this.showWindow);
      if (this.windowposition) {
        this.x = 0;
        this.y = 0;
      }
    }
  }
  ngOnInit() {
    this.setVerticlePosition();
    this.setHorizontalPosition();
    if (this.maximize) {
      this.dummyWidth = this.width;
      this.isFullWindow = true;
      this.maximumWindowStyle = this.setMaximizeClass(this.isFullWindow);
    }
    if (this.showWindow) {
      this.show = this.showWindow;
    }
    this.globalDragListenFunc = this.renderer.listen('document', 'mouseup', (e: any) => {
      this.draggingWindow = false;
    });
  }

  setMaximizeClass(isFullWindow: boolean) {
    this.isFullWindow = isFullWindow;
    if (isFullWindow) {
      this.width = '100%';
      return {
        'margin-top': '0', 'height': '100%',
      };
    } else {
      this.width = this.dummyWidth;
      return {
        'margin-top': '1%', 'height': '96%',
      };
    }
  }

  setVerticlePosition() {
    switch (this.verticalposition) {
      case 'top': {
        this.verticalposition = 'flex-start';
        break;
      }
      case 'center': {
        this.verticalposition = 'center';
        break;
      }
      case 'bottom': {
        this.verticalposition = 'flex-end';
        break;
      }
      default: {
        this.verticalposition = 'center';
        break;
      }
    }
  }

  setHorizontalPosition() {
    switch (this.horizontalposition) {
      case 'left': {
        this.horizontalposition = 'flex-start';
        break;
      }
      case 'center': {
        this.horizontalposition = 'center';
        break;
      }
      case 'right': {
        this.horizontalposition = 'flex-end';
        break;
      }
      default: {
        this.horizontalposition = 'center';
        break;
      }
    }
  }

  /* ASSIGN PROPERTIES TO FOOTER AND HEADER*/

  ngAfterContentInit(): void {
    if (this.amexioFooter && this.footer) {
      this.amexioFooter.toArray().forEach((footer: any) => {
        footer.footer = this.footer;
        footer.setFooterAlignment(this.footeralign);
      });
    }
    if (this.amexioHeader && this.header) {
      this.amexioHeader.toArray()[0].closeable = this.closable;
      this.amexioHeader.toArray()[0].aComponent1 = 'window';
      if (this.maximize) {
        this.amexioHeader.toArray()[0].setMaximizeData(this.maximize, this.isFullWindow);
        this.amexioHeader.toArray()[0].maximizeBehaiour.subscribe((max: any) => {
          this.maximumWindowStyle = this.setMaximizeClass(max);
        });
      }
      this.amexioHeader.toArray()[0].setMaterialDesignStatus(this.materialDesign);
      this.amexioHeader.toArray()[0].closeableBehaiour.subscribe((close: any) => {
        this.onCloseClick();
      });
    }
    if (this.amexioBody && this.bodyHeight) {
      this.amexioBody.toArray()[0].height = this.bodyHeight + '%';
    }
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['show']) {
      this.setShowFlag(changes.show.currentValue);
    }
    if (changes['showWindow']) {
      this.setShowFlag(changes.showWindow.currentValue);
    }
  }
  setShowFlag(changedValue: any) {
    this.show = changedValue;
    if (this.show && this.closeonescape) {
      this.globalListenFunc = this.renderer.listen('document', 'keyup.esc', (e: any) => {
        this.showWindow = false;
        this.show = false;
        this.showChange.emit(false);
        this.close.emit(this.showWindow);
      });
    } else if (this.globalListenFunc) {
      this.globalListenFunc();
    }
  }

  // context menu code below
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
    if (this.contextmenu && this.contextmenu.length > 0) {
      this.mouseLocation.left = rightClickData.event.clientX;
      this.mouseLocation.top = rightClickData.event.clientY;
      this.getContextMenu();
      this.posixUp = this.getListPosition(rightClickData.ref);
      rightClickData.event.preventDefault();
      rightClickData.event.stopPropagation();
      this.rightClickNodeData = rightClickData.data;
      this.nodeRightClick.emit(rightClickData);
    }
  }

  rightClickDataEmit(Data: any) {
    this.rightClick.emit(Data);
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

  ngOnDestroy() {
    this.removeListner();
    if (this.globalListenFunc) {
      this.globalListenFunc();
    }
    if (this.globalDragListenFunc) {
      this.globalDragListenFunc();
    }
  }

  // Theme Apply
  setColorPalette(themeClass: any) {
    this.themeCss = themeClass;
  }
  onWindowPress(event: MouseEvent) {
    if (this.draggable) {
      this.draggingWindow = true;
      this.px = event.clientX;
      this.py = event.clientY;
    }
  }
  onWindowDrag(event: MouseEvent) {
    if (this.draggable) {
      if (!this.draggingWindow) {
        return;
      }
      const offsetX = event.clientX - this.px;
      const offsetY = event.clientY - this.py;
      this.x += offsetX;
      this.y += offsetY;
      this.px = event.clientX;
      this.py = event.clientY;
    }
  }
}
