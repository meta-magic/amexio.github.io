/**
 * Created by dattaram on 23/1/18.
 */

import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';

@Component({
  selector: 'amexio-dialogue', template: `
    <div class="root-window"
         [ngStyle]="{'display' : showWindow ? 'block' : 'none'}">
      <div class="dialogue-sm">
        <div class="dialogue-content">
          <header class="dialogue-header">
            <div class="dialogue-table">
              <div class="tablerow">
                <div class="tablecol">
                  {{title}}
                </div>
                <div class="tablecol float-right">
                  <ng-container *ngIf="closable">
                    <amexio-pane-icon [key]="'window_close'" (onClick)="onCloseClick()"></amexio-pane-icon>
                  </ng-container>
                </div>
              </div>
            </div>
          </header>
          <div class="dialogue-middle">
            <span class="dialogue-icon">
              <span 
                [ngClass]="{'dialogue-success': messageType == 'help','dialogue-danger':messageType == 'error','dialogue-warning': messageType == 'warning'}"
                *ngIf="messageType || messageType != '' ">
                <amexio-pane-icon [key]="'window-msgtype-'+ messageType"></amexio-pane-icon>
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
            <amexio-button *ngIf="type =='confirm'"  [size]="'small'" [label]="secondaryActionLabel" [type]="'default'" (onClick)="getStatus('cancel')"></amexio-button>
            <amexio-button *ngIf="type =='confirm' || type == 'alert'"   [size]="'small'" [label]="primaryActionLabel" [type]="'primary'" (onClick)="getStatus('ok')"></amexio-button>
          </footer>
        </div>

      </div>
    </div>
  `
})
export class AmexiodialoguePaneComponent implements OnInit {

  @Input('footer-align') footeralign: string;

  @Input('show-window') showWindow: boolean;

  @Input() closable: boolean;

  @Input() title: string;

  @Input() message: string;

  @Input() custom: boolean;

  @Input() type: 'confirm'| 'alert';

  @Input() primaryActionLabel : string;

  @Input() secondaryActionLabel : string;

  @Input() messageType : string;

  @Output() actionStatus : EventEmitter<any> = new EventEmitter<any>();

  constructor() {
    this.closable = true;
    this.secondaryActionLabel = 'No';
    this.primaryActionLabel = 'Yes';
    this.custom = false;

  }

  ngOnInit() {
    if (this.footeralign == null) this.footeralign = "right";
  }

  onCloseClick() {
    if (this.closable) {
      this.showWindow = !this.showWindow;
    }
  }

  getStatus(v : any){
    this.onCloseClick();
    this.actionStatus.emit(v);
  }

}



