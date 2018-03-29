/**
 * Created by ketangote on 12/18/17.
 */


 /*
 Component Name : Amexio Window
 Component Selector : <amexio-window>
 Component Description:  Window Pane component is a customizable Modal Pane in which user can enter custom content


*/
import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';

@Component({
  selector: 'amexio-window', template: `
    <div class="root-window" [ngClass]="{'modal-window-max': isFullWindow,'modal-window-min': !isFullWindow}"
         [ngStyle]="{'display' : showWindow ? 'block' : 'none'}">
      <div class="modal-window-lg" [ngStyle]="{'height': bodyHeight ? '100%':'auto'}">
        <div class="modal-window-content" [ngStyle]="{'height': bodyHeight+'%'}" [ngClass]="{'modal-window-content-max':isFullWindow}">
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
name : expand-all
datatype : boolean
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

   /*
Properties 
name : body-height
datatype : string
version : 4.0 onwards
default : none
description : 	Assign body height in percentage, in case of maximize=true it will be set to 100% by default
*/
  @Input('body-height') bodyHeight:string;

  isFullWindow: boolean;

    /*
Properties 
name : maximize
datatype : boolean
version : 4.0 onwards
default : none
description : User can maximize the window to full screen.
*/
  @Input() maximize: boolean;

   /*
Properties 
name : closable
datatype : boolean
version : 4.0 onwards
default : none
description : User can close the window.
*/
  @Input() closable: boolean;

    /*
Properties 
name : header
datatype : boolean
version : 4.0 onwards
default : none
description : it is flag that decides header visibility
*/
  @Input() header: boolean;

   /*
Properties 
name : footer
datatype : boolean
version : 4.0 onwards
default : none
description : it is flag that decides footer visibility
*/
  @Input() footer: boolean;

  /*
Events
name : close
datatype : none
version : none
default : none
description : 
*/
  @Output() close : EventEmitter<any> = new EventEmitter<any>();

  constructor() {
    this.header = true;
    this.closable = true;

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

  }

  sizeChange() {
    this.isFullWindow = !this.isFullWindow;
  }

  onCloseClick() {
    if (this.closable) {
      this.showWindow = !this.showWindow;
      this.close.emit(this.showWindow);
    }
  }


}



