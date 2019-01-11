/*
* Copyright [2019] [Metamagic]
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
* http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*
* Created by ketangote on 1/4/18.
*/

import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';

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



  `,
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
  @Input() type: string;

  /*
Properties
name : title
datatype : string
version : 4.0 onwards
default : none
description : Title for link, button and menu header
*/
  @Input() title: string;

  /*
Properties
name : data
datatype : string
version : 4.0 onwards
default : none
description : Standard JSON format array data which is used for rendering menus. This is used when type=menu is defined.
*/
  @Input() data: string;

  /*
Properties
name : icon
datatype : string
version : 4.0 onwards
default : none
description : Icon for link, button and menu header
*/
  @Input() icon: string;

  /*
Events
name : navLinkClick
datatype : any
version : none
default : none
description : Fire when nav item is clicked, This event is fired when nav item type is defined as 'link/button/menu'

*/
  @Output() navLinkClick: any = new EventEmitter<any>();

  mobilemode = false;

  constructor() {

  }

  ngOnInit() {
  }

  setMobileMode(flag: boolean) {
    this.mobilemode = flag;
  }
  onClick(_node: any, _event: any) {
    const n = {
    title: this.title,
    data: this.data,
    icon: this.icon,
    node: _node,
    mobilemode: this.mobilemode,
    };
    this.navLinkClick.emit(this.dataObject(n, _event));
    }
    dataObject(n: any, _event: any): any {
      return {data: n, event: _event};
    }
    onHeaderClick(event: any) {
    const node = {
    header: true,
    title : this.title,
    icon : this.icon,
    } ;
    this.onClick(node, event);
    }
}
