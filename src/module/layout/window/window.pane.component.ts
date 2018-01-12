/**
 * Created by ketangote on 12/18/17.
 */

import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';

@Component({
  selector: 'amexio-window',
  template: `

    <div class="modal-window" [ngClass]="{'modal-window-max':isFullWindow}" [ngStyle]="{'display' : showWindow ? 'block' : 'none'}">
      <div class="modal-window-content" [ngClass]="{'modal-window-content-max':isFullWindow}">
        <header class="modal-window-header">
          <div class="table" style="width: 100%;">
            <div class="tablerow">
              <div class="tablecol" >
                <ng-content select="amexio-header"></ng-content>
              </div>
              <div  class="tablecol float-right">
                <i *ngIf="(!isFullWindow && maximize)" class="fa fa-window-maximize" aria-hidden="true" (click)="sizeChange()"></i>
                <i *ngIf="(isFullWindow && maximize)" class="fa fa-window-restore" aria-hidden="true"  (click)="sizeChange()"></i>
                <i class="fa fa-window-close-o" aria-hidden="true" (click)="onCloseClick($event)" ></i>
              </div>
            </div>
          </div>
        </header>
        <div class="modal-window-middle">
          <ng-content select="amexio-body"></ng-content>
        </div>
        <footer class="modal-window-footer"   [ngClass]="{'flex-start':(footeralign=='left'),'flex-end':(footeralign=='right'),'flex-center':(footeralign=='center')}">
          <ng-content select="amexio-action"></ng-content>
        </footer>
      </div>

    </div>

  `
})
export class AmexioWindowPaneComponent implements  OnInit{

  @Input() footeralign: string;

  @Input()  showWindow : boolean;

  isFullWindow : boolean;

  @Input() maximize: boolean;

  @Input()  closable : boolean;

  constructor(){
    this.footeralign = "right";
    this.isFullWindow = false;
    this.maximize = false;
  }


  ngOnInit(){
  }

  sizeChange(){
    this.isFullWindow = !this.isFullWindow;
  }

  onCloseClick(event : any){
    if(this.closable){
      this.showWindow = !this.showWindow;
    }
  }

}



