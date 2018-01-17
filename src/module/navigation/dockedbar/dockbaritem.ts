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
          <span class="amexio-dockbar-item-close-bar" (click)="onBarIconClick()">
            <amexio-nav-icon key="dockbar_close"></amexio-nav-icon>
          </span>
        </div>
      </ng-container>
      <ng-content >
      </ng-content>
    </div>
  `
})

export class DockbarComponent implements OnInit{

  @Input() active:boolean;

  @Input() label:string;

  @Input() icon:string;

  @Input() mdb:string;

  @Input() width:string;

  @Input() title:string;

  @Input() path:any;

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
