/**
 * Created by dattaram on 23/1/18.
 */

 /*
 Component Name : Amexio Dialogue
 Component Selector : <amexio-dialogue>
 Component Description : .

*/

import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';

@Component({
  selector: 'amexio-dialogue', template: `
    <div class="root-window"
         [ngStyle]="{'display' : showdialogue  ? 'block' : 'none'}">
      <div class="dialogue-sm">
        <div class="dialogue-content">
          <header class="dialogue-header">
            <div class="dialogue-table">
              <div class="tablerow">
                <div class="tablecol">
                  {{title}}
                </div>
                <div class="tablecol float-right">
                  <div *ngIf="closable" class="icon-style">
                    <amexio-pane-icon [key]="'window_close'" (onClick)="onCloseClick()"></amexio-pane-icon>
                  </div>
                </div>
              </div>
            </div>
          </header>
          <div class="dialogue-middle">
            <span class="dialogue-icon">
              <span 
                [ngClass]="{'dialogue-success': messagetype  == 'help','dialogue-danger':messagetype  == 'error','dialogue-warning': messagetype  == 'warning'}"
                *ngIf="messagetype  || messagetype  != '' ">
                <amexio-pane-icon [key]="'window-msgtype-'+ messagetype "></amexio-pane-icon>
              </span>
               <ng-container *ngIf="!custom">
                 <span class="dialogue-message">
                        {{message}}
                 </span>
            </ng-container>
            </span>
            <ng-container *ngIf="custom">
              <ng-content select="amexio-body"></ng-content>
            </ng-container>
            
          </div>
          <footer *ngIf="custom" class="dialogue-footer"
                  [ngClass]="{'flex-start':(footeralign=='left'),'flex-end':(footeralign=='right'),'flex-center':(footeralign=='center')}">
            <ng-content select="amexio-action"></ng-content>
          </footer>
          <footer *ngIf="!custom" class="dialogue-footer"
                  [ngClass]="{'flex-start':(footeralign=='left'),'flex-end':(footeralign=='right'),'flex-center':(footeralign=='center')}">
            <amexio-button *ngIf="type =='confirm'"  [size]="'small'" [label]="secondaryactionlabel " [type]="'default'" (onClick)="getStatus('cancel')"></amexio-button>&nbsp;&nbsp;
            <amexio-button *ngIf="type =='confirm' || type == 'alert'"   [size]="'small'" [label]="primaryactionlabel  " [type]="'primary'" (onClick)="getStatus('ok')"></amexio-button>
          </footer>
        </div>

      </div>
    </div>
  `
})
export class AmexiodialoguePaneComponent implements OnInit {

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
name : show-dialogue
datatype :  boolean
version : 4.0 onwards
default : false
description : 	Show / Hide Dialogue..
*/
  @Input('show-dialogue') showdialogue : boolean;

  /*
Properties 
name : show-dialogue
datatype :  boolean
version : 4.0 onwards
default : none
description : User can close the Dialogue.
*/
  @Input() closable: boolean;

  /*
Properties 
name : title
datatype :  string
version : 4.0 onwards
default : none
description : Title for dialog.
*/
  @Input() title: string;

   /*
Properties 
name :  message
datatype :  string
version : 4.0 onwards
default : none
description : Alert or confirm message 
*/
  @Input() message: string;

    /*
Properties 
name :  custom
datatype :  boolean
version : 4.0 onwards
default : false
description : User can custom dialogue box.
*/
  @Input() custom: boolean;

    /*
Properties 
name :  confirm
datatype :  'confirm'| 'alert'
version : 4.0 onwards
default : none
description : Mode to open, alert or dialogue mode.
*/
  @Input() type: 'confirm'| 'alert';

    /*
Properties 
name : primary-action-label
datatype :  'string
version : 4.0 onwards
default : none
description : Label to be displayed for primary action.
*/
  @Input('primary-action-label') primaryactionlabel   : string;

    /*
Properties 
name : secondary-action-label
datatype :  string
version : 4.0 onwards
default : none
description : Label to be displayed for secondary action.
*/
  @Input('secondary-action-label') secondaryactionlabel  : string;

    /*
Properties 
name : message-type
datatype :  string
version : 4.0 onwards
default : none
description : Type of message like error,warning,help.
*/
  @Input('message-type') messagetype  : string;

    /*
 Events
name : message-type
datatype :  none
version : none
default : none
description : Fire when click on yes or no button
*/
  @Output() actionStatus : EventEmitter<any> = new EventEmitter<any>();
  
     /*
 Events
name : message-type
datatype :  none
version : none
default : none
description : Fire when user close dialogue
*/
    @Output() close : EventEmitter<any> = new EventEmitter<any>();

  constructor() {
    this.closable = true;
    this.secondaryactionlabel  = 'Cancel';
    this.primaryactionlabel   = 'Ok';
    this.custom = false;

  }

  ngOnInit() {
    if (this.footeralign == null) this.footeralign = "right";
  }

  onCloseClick() {
    if (this.closable) {
      this.showdialogue  = !this.showdialogue ;
      this.close.emit(this.showdialogue);
    }
  }

  getStatus(v : any){
    this.onCloseClick();
    this.actionStatus.emit(v);
  }

}



