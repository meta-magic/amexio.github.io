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
*  Created by ketangote on 1/4/18.
*/
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'amexio-nav-action',
  template:
    `
    <a *ngIf="(type=='link')" [ngStyle]="{'color':color}" class="top-nav-link" style="margin-right:20px"
    (click)="onClick($event)"><i *ngIf="icon" [ngClass]="icon"></i>{{title}}</a>

    <button *ngIf="(type=='button')" [ngStyle]="{'color':color}" class="top-nav-button" (click)="onClick($event)">
    <i *ngIf="icon" style="padding-right:10px" [ngClass]="icon"></i>{{title}}</button>

    <div  *ngIf="(type=='slider')" style="width: 60px;
    padding-bottom: 20px;" class="top-nav-button">
    <amexio-darkmode [type]="2"  [mode]="'sepia'" [size]="'small'"></amexio-darkmode>
    </div>
    <div  *ngIf="(type=='toggle')" class="top-nav-button">
    <amexio-darkmode [type]="2"  [mode]="'day-night'" [size]="'small'"></amexio-darkmode>
    </div>
    `,
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

  @Input('color') color: string;

  constructor() {

  }

  ngOnInit() {
  }

  onClick(event: any) {
    const node = {
      // 'title': this.title,
      // 'type' : this.type,
      // 'icon' : this.icon,
    };
    this.navLinkClick.emit({ node, event });

  }

}
