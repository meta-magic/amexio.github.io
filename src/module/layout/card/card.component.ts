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
    <div class="card-container">
      <header class="card-header" [ngClass]="{'flex-start':(headeralign=='left'),'flex-end':(headeralign=='right'),'flex-center':(headeralign=='center')}">
        <ng-content select="amexio-pane-header"></ng-content>
      </header>
      <div>
        <ng-content select="amexio-pane-body"></ng-content>
      </div>
      <footer  class="card-footer"  [ngClass]="{'flex-start':(footeralign=='left'),'flex-end':(footeralign=='right'),'flex-center':(footeralign=='center')}">
        <ng-content select="amexio-pane-action"></ng-content>
      </footer>
    </div>

  `
})
export class AmexioCardComponent implements  OnInit{


  @Input() headeralign: string;
  @Input() footeralign: string;



  constructor(){
    this.headeralign = "left";
    this.footeralign = "right";
  }


  ngOnInit(){
  }



}



