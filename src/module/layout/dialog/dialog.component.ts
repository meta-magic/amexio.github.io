/**
 * Created by pratik on 18/12/17.
 */
import { Component, OnInit } from '@angular/core';

@Component({
 selector: 'amexio-dialog',
 template: `
   <div class="modal-window" [ngClass]="{'modal-window-max':isFullWindow}" [ngStyle]="{'display' : showWindow ? 'block' : 'none'}">
     <div class="modal-window-content" [ngClass]="{'modal-window-content-max':isFullWindow}">
       <header class="modal-window-header">
         <div class="table" style="width: 100%;">
           <div class="tablerow">
             <div class="tablecol" >
               <ng-content select="amexio-pane-header"></ng-content>
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
         <ng-content select="amexio-pane-body"></ng-content>
       </div>
       <footer class="modal-window-footer"   [ngClass]="{'flex-start':(footeralign=='left'),'flex-end':(footeralign=='right'),'flex-center':(footeralign=='center')}">
         <ng-content select="amexio-pane-action"></ng-content>
       </footer>
     </div>

   </div>
 `
})

export class AmexioDialogComponent implements OnInit {
 constructor() { }

 ngOnInit() { }
}
