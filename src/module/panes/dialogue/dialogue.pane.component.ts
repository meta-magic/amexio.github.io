/**
 * Created by dattaram on 23/1/18.
 */

/*
 Component Name : Amexio Dialogue
 Component Selector : <amexio-dialogue>
 Component Description :A Simple dialogue which renders various prompts like Confirmation/Alert based on type, title, body user has configured.

 */

import {Component,OnChanges,SimpleChanges ,EventEmitter, Input, OnInit, Output, HostListener} from '@angular/core';

export enum KEY_CODE {
  esc=27
}
@Component({
  selector: 'amexio-dialogue', template: `
    <div class="root-window"
         [ngStyle]="{'display' : show  ? 'block' : 'none'}">
      <div class="dialogue-sm">
        <div class="dialogue-content">
          <header [ngClass]="{ 'dialogue-material-design':materialDesign ,'dialogue-header':!materialDesign}" >
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
          <div class="dialogue-middle" [ngStyle]="{'text-align':custom ? contentalign :'center'}">
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
            <amexio-button *ngIf="type =='confirm'"  [size]="buttonsize" [label]="secondaryactionlabel " [type]="default" (onClick)="getStatus('cancel')"></amexio-button>&nbsp;&nbsp;
            <amexio-button *ngIf="type =='confirm' || type == 'alert'"   [size]="buttonsize" [label]="primaryactionlabel" [type]="buttontype" (onClick)="getStatus('ok')"></amexio-button>
          </footer>
        </div>
      </div>
    </div>
  `
})
export class AmexiodialoguePaneComponent implements OnInit, OnChanges{
  /*
   Properties
   name : close-on-escape
   datatype : string
   version : 4.2onwards
   default : false
   description : Enables And Disables the Escape button.
   */
  @Input('close-on-escape')  closeonescape: boolean;
  /*
   Properties
   name : button-type
   datatype : string
   version : 4.2onwards
   default : theme-color
   description : show the type of button.
   */
  @Input('button-type')  buttontype: string;
  /*
   Properties
   name : button-size
   datatype :  string
   version : 4.2 onwards
   default :
   description : Different Sizes of Buttons availabe : large, default, small & xsmall
   */
  @Input('button-size') buttonsize: string="large"|| "small"||"default"||"xsmall";

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
   name : content-align
   datatype : string
   version : 4.0 onwards
   default : center
   description : Alignment of  contents to right or left or center.
   */
  @Input('content-align') contentalign: string;

  /*
   Properties
   name : show-dialogue
   datatype :  boolean
   version : 4.0 onwards
   default : false
   description : 	Show / Hide Dialogue..
   */
  @Input('show-dialogue') showdialogue : boolean;

  @Input() show : boolean;

  @Output() showChange : EventEmitter<any> = new EventEmitter<any>();



  /*
   Properties
   name : closable
   datatype :  boolean
   version : 4.0 onwards
   default : false
   description : User can close the Dialogue.
   */
  @Input() closable: boolean;

  /*
   Properties
   name : title
   datatype :  string
   version : 4.0 onwards
   default :
   description : Title for dialog.
   */
  @Input() title: string;

  /*
   Properties
   name :  message
   datatype :  string
   version : 4.0 onwards
   default :
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
   name :  type
   datatype :  'confirm'| 'alert'
   version : 4.0 onwards
   default : confirm
   description : Mode to open, alert or dialogue mode.
   */
  @Input() type: 'confirm'| 'alert';

  /*
   Properties
   name : primary-action-label
   datatype :  'string
   version : 4.0 onwards
   default :
   description : Label to be displayed for primary action.
   */
  @Input('primary-action-label') primaryactionlabel   : string;

  /*
   Properties
   name : secondary-action-label
   datatype :  string
   version : 4.0 onwards
   default :
   description : Label to be displayed for secondary action.
   */
  @Input('secondary-action-label') secondaryactionlabel  : string;

  /*
   Properties
   name : message-type
   datatype :  string
   version : 4.0 onwards
   default :
   description : Type of message like error,warning,help.
   */
  @Input('message-type') messagetype  : string;

  @Input ('material-design') materialDesign : boolean;


  /*
   Events
   name : actionStatus
   datatype :  none
   version : none
   default : none
   description : Fire when click on yes or no button
   */
  @Output() actionStatus : EventEmitter<any> = new EventEmitter<any>();

  /*
   Events
   name : close
   datatype :  none
   version : none
   default : none
   description : Fire when user close dialogue
   */
  @Output() close : EventEmitter<any> = new EventEmitter<any>();
  value = 0;
  constructor() {
    this.closable = true;
    this.secondaryactionlabel  = 'Cancel';
    this.primaryactionlabel   = 'Ok';
    this.custom = false;
    this.buttonsize='default';
    this.buttontype='theme-color';
    this.closeonescape=true;


  }
  @HostListener('window:keyup', ['$event'])
  keyEvent(event: KeyboardEvent) {
    if (this.closeonescape == true) {
      if (event.keyCode ==KEY_CODE.esc) {
        this.showdialogue  = false ;
        this.show=false;
        this.showChange.emit(false);

      }

    }
  }

  ngOnInit() {

    if(this.showdialogue) {
      this.show = this.showdialogue;
    }
    if (this.footeralign == null) this.footeralign = "right";
    if(this.contentalign == null || this.contentalign == '') {
      this.contentalign = 'center';
    }
    if(this.type == null) this.type = 'confirm';
  }

  ngOnChanges(changes: SimpleChanges){

    //reassign show
    if (changes['showdialogue']) {
      this.show = changes.showdialogue.currentValue;
    }
  }

  onCloseClick() {

    if (this.closable) {

      this.showdialogue  = false ;
      this.show=false;
      this.showChange.emit(false);
      this.close.emit(false);
    }
  }
  getStatus(v : any){

    this.onCloseClick();
    this.actionStatus.emit(v);
  }
}














