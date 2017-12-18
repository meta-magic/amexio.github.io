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
  `
})

export class AmexioDockBarItem implements OnInit{

  @Input() active:boolean;

  @Input() label:string;

  @Input() icon:string;

  @Input() mdbClass:string;

  @Input() width:string;

  @Input() title:string;

  @Input() imagePath:any;

  elementId:string;

  //Close the  dockbar item
  onBarIconClick(){
    this.active=false;
  }

  constructor() {
    this.elementId = 'dockbar-item-id' + Math.floor(Math.random()*90000) + 10000;
  }

  ngOnInit() {
  }
}
