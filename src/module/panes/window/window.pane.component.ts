/**
 * Created by ketangote on 12/18/17.
 */


/*
Component Name : Amexio Window
Component Selector : <amexio-window>
Component Description:  Window Pane component is a customizable Modal Pane in which user can enter custom content


*/
import { Component, EventEmitter, Input, OnInit, Output, HostListener } from '@angular/core';
export enum KEY_CODE_window {
  esc = 27
}

@Component({
  selector: 'amexio-window',
  template: `
    <div class="root-window model-fade" [ngClass]="{'modal-window-max': isFullWindow,'modal-window-min': !isFullWindow}"
         [ngStyle]="{'display' : showWindow ? 'block' : 'none'}" >
      <div class="modal-window-lg" [ngStyle]="{'height': bodyHeight ? '100%':'auto'}">
        <div class="modal-window-content" [ngClass]="setClass()" [style.height]="bodyHeight+'%'">
          <header class="modal-window-header" *ngIf="header">
            <div class="modal-window-table">
              <div class="tablerow">
                <div class="tablecol">
                  <ng-content select="amexio-header"></ng-content>
                </div>
                <div class="tablecol float-right">
                  <ng-container *ngIf="(!isFullWindow && maximize)">
                    <amexio-pane-icon [key]="'window_maximize'" (onClick)="sizeChange()"></amexio-pane-icon>
                  </ng-container>
                  <ng-container *ngIf="(isFullWindow && maximize)">
                    <amexio-pane-icon [key]="'window_restore'" (click)="sizeChange()"></amexio-pane-icon>
                  </ng-container>
                  <ng-container *ngIf="closable">
                    <amexio-pane-icon [key]="'window_close'" (onClick)="onCloseClick()"></amexio-pane-icon>
                  </ng-container>
                </div>
              </div>
            </div>
          </header>
          <div class="modal-window-middle">
            <ng-content select="amexio-body"></ng-content>
          </div>
          <footer *ngIf="footer" class="modal-window-footer"
                  [ngClass]="{'modal-window-footer-max': isFullWindow && maximize,'flex-start':(footeralign =='left'),'flex-end':(footeralign=='right'),'flex-center':(footeralign=='center')}">
            <div [ngClass]="{'footer-right-align': (isFullWindow && maximize)}">
              <ng-content select="amexio-action"></ng-content>
            </div>
          </footer>
        </div>

      </div>
    </div>
  `
})
export class AmexioWindowPaneComponent implements OnInit {
  /*
Properties 
name : vertical-position
datatype : string
version : 4.1 onwards
default : none
description : Postion of window vertically: top or bottom or center. This attribute is ignored if user specify position explicitly (using position-top/position-bottom/position-left/position-right)
*/
  @Input('vertical-position') verticalposition: string;
  /*
  Properties 
  name : horizontal-position
  datatype : none
  version : 4.1 onwards
  default : none
  description : Postion of Window horizontally: left or right or center. This attribute is ignored if user specify position explicitly (using position-top/position-bottom/position-left/position-right)
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
  @Input('relative') relative: boolean = false;

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

  @Input() show: boolean;

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
  @Output() close: EventEmitter<any> = new EventEmitter<any>();
  constructor() {
    this.header = true;
    this.closable = true;
    this.closeonescape = false;
    if ( this.verticalposition==null) {
      this.verticalposition = 'center';
    }
     if(this.horizontalposition==null) {
      this.horizontalposition = 'center';
    }
    this.positionclass = "window-" + this.verticalposition + " window-" + this.horizontalposition;
   }
  absoluteposition: boolean = false;
  positionclass: string;
  // THIS METHOD IS USED FOR SETTING CSS CLASSSES

  sizeChange() {
    this.isFullWindow = !this.isFullWindow;
  }

  onCloseClick() {
    if (this.closable) {
      this.showWindow = !this.showWindow;
      //this.show = !this.show;      
      //this.showChange.emit(this.show);
      this.close.emit(this.showWindow);
    }
  }


  //Escape Key Functionality 
  @HostListener('window:keyup', ['$event'])
  keyEvent(event: KeyboardEvent) {
    if (this.closeonescape == true) {
      if (event.keyCode == KEY_CODE_window.esc) {
        this.showWindow = false;
      }

    }
  }
  ngOnInit() {

    if (this.maximize == null) {
      this.maximize = false;
      this.isFullWindow = false;
    } else if (this.maximize) {
      this.isFullWindow = true;
      this.bodyHeight = "100%";
    }
    if (this.footeralign == null) this.footeralign = "right";

    if (  this.verticalposition == "") {
      this.verticalposition = 'center';
    }
     if( this.horizontalposition == "") {
      this.horizontalposition = 'center';
    }
    this.positionclass = "window-" + this.verticalposition + " window-" + this.horizontalposition;
  }

  setClass():any {
    let styleClass: string;
    if(this.isFullWindow) {
      styleClass = 'modal-window-content-max';
    } else {
      styleClass = this.positionclass
    }
    return styleClass;
  }

}

