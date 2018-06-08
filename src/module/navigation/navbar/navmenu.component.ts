/**
 * Created by ketangote on 1/4/18.
 */

/*
 Component Name : Amexio Navbar
 Component Selector : <amexio-nav-menu>
 Component Description : The Nav Bar Component is a familiar top navigation pattern for users. 
Nav bar has Logo/Title left align, than link, text field, button and menus on right side.
v4.1 Nav bar is not backward compatible of v4.0, for v4.0 refer link
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
      
      <div *ngIf="type==='menucontainer'" class="nav-menu-container" >
      <a *ngFor="let node of data" (click)="onClick(node, $event)">
      <i *ngIf="icon" [ngClass]="node.icon"></i>&nbsp;{{node.text}}</a>
      <ng-content ></ng-content>
      </div>
    </div>
  </div>



  `
})
export class AmexioNavMenuComponent implements OnInit {

  /*
Properties 
name : type
datatype : string
version : 4.0 onwards
default : none
description : Indicate the type of menu-items (link / button / textfield /menu )
*/ 
  @Input() type : string;

  /*
Properties 
name : title
datatype : string
version : 4.0 onwards
default : none
description : Title for link, button and menu header
*/
  @Input() title : string;

  /*
Properties 
name : data
datatype : string
version : 4.0 onwards
default : none
description : Standard JSON format array data which is used for rendering menus. This is used when type=menu is defined.
*/
  @Input() data : string;

  /*
Properties 
name : icon
datatype : string
version : 4.0 onwards
default : none
description : Icon for link, button and menu header
*/
  @Input() icon : string;

  /*
Events 
name : navLinkClick
datatype : any
version : none
default : none
description : Fire when nav item is clicked, This event is fired when nav item type is defined as 'link/button/menu'
	
*/
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
