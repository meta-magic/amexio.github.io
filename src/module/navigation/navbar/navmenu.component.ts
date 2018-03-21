/**
 * Created by ketangote on 1/4/18.
 */

import {Component, Input, OnInit, Output, EventEmitter} from '@angular/core';

@Component({
  selector: 'amexio-nav-menu', 
  template: 
  `
  <div class="nav-dropdown">
    <a class="nav-dropbtn"  (click)="onHeaderClick($event)">
      <i *ngIf="icon" [ngClass]="icon"></i>{{title}}<i class="dropdownicon fa fa-angle-down"></i>
    </a>
    <div class="nav-dropdown-content">
      <a *ngFor="let node of data" (click)="onClick(node, $event)">
      <i *ngIf="icon" [ngClass]="node.icon"></i>&nbsp;{{node.text}}</a>
      
      <ng-content *ngIf="type==='menucontainer'"></ng-content>
    </div>
  </div>



  `
})
export class AmexioNavMenuComponent implements OnInit {

  @Input() type : string;

  @Input() title : string;

  @Input() data : string;

  @Input() icon : string;

  @Output() navLinkClick: any = new EventEmitter<any>();
  
  mobilemode : boolean = false;

  constructor() {

  }

  ngOnInit() {
  }

  setMobileMode(flag : boolean){
    this.mobilemode = flag;
  }
  onClick(node:any, event:any){
    let n = {
      'title':this.title,
      'data':this.data,
      'icon':this.icon,
      'node': node,
      'mobilemode':this.mobilemode
    };
    this.navLinkClick.emit({'data':n,'event':event});
  }
  onHeaderClick(event:any){
    let node = {
      'header': true,
      'title' : this.title,
      'icon'  : this.icon
    } ;
    this.onClick(node, event);
  }
}
