/**
 * Created by ketangote on 7/27/17.
 */


import {
  Component,   Input, OnInit
} from '@angular/core';


@Component({
  selector: 'amexio-card-pane',
  template: `
    

    <div *ngIf="showCard" class="amexio-card-padding">
      <div class="card" [ngClass]="cClass">
        <div *ngIf="enableHeader" class="card-header">
          <ng-content select="amexio-pane-header"></ng-content>
        </div>
        <div class="card-block">
          <ng-content select="amexio-pane-body"></ng-content>
        </div>
        <div *ngIf="enableFooter" class="card-footer amexio-card-footer-float-right" >
          <ng-content select="amexio-pane-action"></ng-content>
        </div>
      </div>
    </div>
    
  `,
  styleUrls: ['card.custom.css']
})

export class CardComponent implements OnInit {

  _showCard : boolean;

  @Input() title : boolean;


  @Input() enableHeader : boolean;

  @Input() enableFooter : boolean;

  @Input() cClass : string;

  constructor(){
    this._showCard = true;
    this.enableFooter = true;
    this.enableHeader = true;
  }

  ngOnInit(){

  }

  ngAfterViewInit(){

  }


  @Input()
  get showCard(){
    return this._showCard;
  }


  set showCard(sw){
    this._showCard = sw;
  }


  close(){
    this._showCard=false;
  }

}
