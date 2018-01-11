/**
 * Created by pratik on 18/12/17.
 */
/**
 * Created by ketangote on 12/18/17.
 */



import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';

@Component({
  selector: 'amexio-card',
  template: `    
    <div class="card-container" *ngIf="showCard">
      <header class="card-header" *ngIf="enableHeader" [ngClass]="{'flex-start':(headeralign=='left'),'flex-end':(headeralign=='right'),'flex-center':(headeralign=='center')}">
        <ng-content select="amexio-header"></ng-content>
      </header>
      <div class="card-body">
        <ng-content select="amexio-body"></ng-content>
      </div>
      <footer  class="card-footer" *ngIf="enableFooter"  [ngClass]="{'flex-start':(footeralign=='left'),'flex-end':(footeralign=='right'),'flex-center':(footeralign=='center')}">
        <ng-content select="amexio-action"></ng-content>
      </footer>
    </div>

  `
})
export class AmexioCardComponent implements  OnInit{


  @Input() headeralign: string;

  @Input() enableHeader : boolean;

  @Input() enableFooter : boolean;

  @Input() footeralign: string;

  @Input() showCard: boolean = true;



  constructor(){
    this.headeralign = "left";
    this.footeralign = "right";
  }


  ngOnInit(){
  }



}



