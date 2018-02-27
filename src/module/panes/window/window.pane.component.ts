/**
 * Created by ketangote on 12/18/17.
 */

import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';

@Component({
  selector: 'amexio-window', template: `
    <div class="root-window" [ngClass]="{'modal-window-max': isFullWindow,'modal-window-min': !isFullWindow}"
         [ngStyle]="{'display' : showWindow ? 'block' : 'none'}">
      <div class="modal-window-lg" [ngStyle]="{'height': bodyHeight ? '100%':auto}">
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

  @Input('footer-align') footeralign: string;

  @Input('show-window') showWindow: boolean;

  @Input('body-height') bodyHeight:string;

  isFullWindow: boolean;

  @Input() maximize: boolean;

  @Input() closable: boolean;

  @Input() header: boolean;

  @Input() footer: boolean;

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



