/**
 * Created by ketangote on 12/18/17.
 */

import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';

@Component({
  selector: 'amexio-window', template: `
    <div class="root-window" [ngClass]="{'modal-window-max': isFullWindow,'modal-window-min': !isFullWindow}"
         [ngStyle]="{'display' : showWindow ? 'block' : 'none'}">
      <div class="modal-window-lg">
        <div class="modal-window-content" [ngClass]="{'modal-window-content-max':isFullWindow}">
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
                  [ngClass]="{'flex-start':(footeralign=='left'),'flex-end':(footeralign=='right'),'flex-center':(footeralign=='center')}">
            <ng-content select="amexio-action"></ng-content>
          </footer>
        </div>

      </div>
    </div>
  `
})
export class AmexioWindowPaneComponent implements OnInit {

  @Input() footeralign: string;

  @Input() showWindow: boolean;

  isFullWindow: boolean;

  @Input() maximize: boolean;

  @Input() closable: boolean;

  @Input() header: boolean;

  @Input() footer: boolean;

  @Output() actionStatus : EventEmitter<any> = new EventEmitter<any>();

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
    }
    if (this.footeralign == null) this.footeralign = "right";

  }

  sizeChange() {
    this.isFullWindow = !this.isFullWindow;
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



