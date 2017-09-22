/**
 * Created by sagar on 6/9/17.
 */
import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'amexio-dockbar-item',
  template: `    
    <div *ngIf="active" [style.width]="width">
      <ng-container *ngIf="active && title">
        <div class="amexio-dockbar-title">
          {{title}}
          <span class="amexio-dockbar-item-close-bar" (click)="onBarIconClick()">&#9747;</span>
        </div>
      </ng-container>
      <ng-content >
      </ng-content>
    </div>
  `,
  styles:[
    `      
      .amexio-dockbar-item-close-bar{
        font-size: 24px;
        float: right;
        color: black;
        font-weight: 500;
      }
      .amexio-dockbar-title{
        box-sizing: border-box;
        font-size: 17px;
        font-weight: 500;
        padding: 15px 10px 10px 90px;
        border-bottom: 1px solid #c7c7c7;
      }
    `
  ]
})

export class DockbarComponent implements OnInit{


  @Input() name:string;

  @Input() active:boolean;

  @Input() label:string;

  @Input() icon:string;

  @Input() mdbClass:string;

  @Input() width:string;

  @Input() title:string;

  @Input() imagePath:any;


  //Close the  dockbar item
  onBarIconClick(){
    this.active=false;
  }

  constructor() {
  }

  ngOnInit() {
  }
}
