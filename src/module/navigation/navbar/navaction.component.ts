/**
 * Created by ketangote on 1/4/18.
 */

 /*
 Component Name : Amexio Navbar
 Component Selector : <amexio-nav-action>
 Component Description : The Nav Bar Component is a familiar top navigation pattern for users. 
Nav bar has Logo/Title left align, than link, text field, button and menus on right side.
v4.1 Nav bar is not backward compatible of v4.0, for v4.0 refer link
*/
import {Component, Input, OnInit, Output, EventEmitter} from '@angular/core';

@Component({
  selector: 'amexio-nav-action', 
  template: 
  `
    <a *ngIf="(type=='link')" class="top-nav-link" (click)="onClick($event)"><i *ngIf="icon" [ngClass]="icon"></i>{{title}}</a>
    
    <button *ngIf="(type=='button')" class="top-nav-button" (click)="onClick($event)"><i *ngIf="icon" [ngClass]="icon"></i>{{title}}</button>
  `
})
export class AmexioNavActionComponent implements OnInit {


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

  constructor() {

  }

  ngOnInit() {
  }

  onClick(event:any){
      let node = {
        'title': this.title,
        'type' : this.type,
        'icon' : this.icon
      };
      this.navLinkClick.emit({'data':node,'event':event});

  }

}
