/**
 * Created by dattaram on 23/1/18.
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

  @Input('footer-align') footeralign: string;

  @Input('show-dialogue') showdialogue : boolean;

  @Input() closable: boolean;

  @Input() title: string;

  @Input() message: string;

  @Input() custom: boolean;

  @Input() type: 'confirm'| 'alert';

  @Input('primary-action-label') primaryactionlabel   : string;

  @Input('secondary-action-label') secondaryactionlabel  : string;

  @Input('message-type') messagetype  : string;

  @Output() actionStatus : EventEmitter<any> = new EventEmitter<any>();

  constructor() {
    this.closable = true;
    this.secondaryactionlabel  = 'No';
    this.primaryactionlabel   = 'Yes';
    this.custom = false;

  }

  ngOnInit() {
    if (this.footeralign == null) this.footeralign = "right";
  }

  onCloseClick() {
    if (this.closable) {
      this.showdialogue  = !this.showdialogue ;
    }
  }

  getStatus(v : any){
    this.onCloseClick();
    this.actionStatus.emit(v);
  }

}



