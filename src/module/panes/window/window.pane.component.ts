/**
 * Created by ketangote on 12/18/17.
 */

/*
 Component Name : Amexio Window
 Component Selector : <amexio-window>
 Component Description:  Window Pane component is a customizable Modal Pane in which user can enter custom content

 */
import {
  Component, ContentChildren, ElementRef, EventEmitter, HostListener,
  Input, OnChanges, OnDestroy, OnInit, Output, QueryList, Renderer2, SimpleChanges, ViewChild,
} from '@angular/core';
import { AmexioWindowHeaderComponent } from './window.pane.header.component';
export enum KEY_CODE_window {
  esc = 27,
}
@Component({
  selector: 'amexio-window',
  templateUrl: './window.pane.component.html',
})
export class AmexioWindowPaneComponent implements OnChanges, OnInit, OnDestroy {
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
  @Input('vertical-position') verticalposition: string;
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
  @Input('close-on-escape') closeonescape: boolean;
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
   name : position-bottom
   datatype : none
   version : 4.2onwards
   default : none
   description : Takes top position in percentage or pixel
   */
  @Input('position-bottom') bottom: string;
  /*
   Properties
   name : relative
   datatype : boolean
   version : 4.1 onwards
   default : none
   description : Place floating button at relative position
   */
  @Input('relative') relative = false;

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
  @Input() maximize: boolean;

  /*
   Properties
   name : closable
   datatype : boolean
   version : 4.0 onwards
   default : false
   description : User can close the window.
   */
  @Input() closable: boolean;

  /*
   Properties
   name : header
   datatype : boolean
   version : 4.0 onwards
   default : false
   description : it is flag that decides header visibility
   */
  @Input() header: boolean;

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

  @Input() parentRef: any;

  @Output() nodeRightClick: any = new EventEmitter<any>();

  @Output() rightClick: any = new EventEmitter<any>();

  @ContentChildren(AmexioWindowHeaderComponent) amexioHeader: QueryList<AmexioWindowHeaderComponent>;
  headerComponentList: AmexioWindowHeaderComponent[];

  @Output() close: EventEmitter<any> = new EventEmitter<any>();
  styleClass: string;

  constructor(private renderer: Renderer2) {
    this.header = true;
    this.closable = true;
    this.closeonescape = true;
    if (this.verticalposition == null) {
      this.verticalposition = 'center';
    }
    if (this.horizontalposition == null) {
      this.horizontalposition = 'center';
    }
    this.positionclass = this.window + this.verticalposition + this.window + this.horizontalposition;
  }
  flag: boolean;

  posixUp: boolean;

  rightClickNodeData: any;

  contextStyle: any;

  mouseLocation: { left: number; top: number } = { left: 0, top: 0 };
  absoluteposition = false;
  positionclass: string;
  globalListenFunc: () => void;
  globalClickListenFunc: () => void;
  // THIS METHOD IS USED FOR SETTING CSS CLASSSES

  sizeChange() {
    this.isFullWindow = !this.isFullWindow;
    this.setClass();
  }

  onCloseClick() {
    if (this.closable) {
      this.showWindow = false;
      this.show = false;
      this.showChange.emit(false);
      this.close.emit(this.showWindow);

    }
  }
  ngOnInit() {
    if (this.showWindow) {
      this.show = this.showWindow;
    }

    if (this.maximize == null) {
      this.maximize = false;
      this.isFullWindow = false;
    } else if (this.maximize) {
      this.isFullWindow = true;
      this.bodyHeight = '100%';
    }
    if (this.footeralign == null) {
      this.footeralign = 'right';
    }

    if (this.verticalposition === '') {
      this.verticalposition = 'center';
    }
    if (this.horizontalposition === '') {
      this.horizontalposition = 'center';
    }
    this.positionclass = this.window + this.verticalposition + this.window + this.horizontalposition;
    this.setClass();

  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['show']) {
      this.setShowFlag(changes.show.currentValue);
    }
    if (changes['showWindow']) {
      this.setShowFlag(changes.show.currentValue);
    }
  }
  setShowFlag(changedValue: any) {
    this.show = changedValue;
    if (this.show && this.closeonescape) {
      this.globalListenFunc = this.renderer.listen('document', 'keyup.esc', (e: any) => {
        this.showWindow = false;
        this.showChange.emit(false);
      });
    } else if (this.globalListenFunc) {
      this.globalListenFunc();
    }
  }
  setClass() {
    if (this.isFullWindow) {
      this.styleClass = 'modal-window-content-max';
    } else {
      this.styleClass = this.positionclass;
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

  ngOnDestroy() {
    this.removeListner();
    if (this.globalListenFunc) {
      this.globalListenFunc();
    }
  }
}
