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
* Created by pratik on 13/12/17.
*/

import {AfterContentInit, Component, ContentChildren, Input, OnInit, QueryList} from '@angular/core';
import {AmexioButtonDropDownItemComponent} from './button.dropdown.item';

@Component({
  selector: 'amexio-btn-split-dropdown', template: `
    <div class="dropdown-button" [ngStyle]="getBackgroundColor()">
      <button class="button" [attr.disabled]="disabled ? true: null"
              [ngClass]="{'button-default': size=='default' || size ==null,
              'button-small': size=='small','button-large' : size=='large',
              'button-primary' : type == 'primary' || type == null,
              'button-success' : type == 'success',' button-danger' : type=='danger',
              'button-warning' : type=='warning'}">
        {{label}}
      </button>
      <button class="button"
              [ngClass]="{'button-default': size=='default' || size ==null,
              'button-small': size=='small',
              'button-large' : size=='large',
              'button-primary' : type == 'primary' || type == null || type == 'theme-color',
              'button-success' : type == 'success' || type == 'green',
              'button-danger' : type=='danger' || type == 'red',
              'button-warning' : type=='warning' ||  type == 'yellow'}">
              (click)="onClick()"><i class="fa fa-chevron-down" aria-hidden="true"></i></button>
      <div class="dropdown-button-content" [ngStyle]="{'display' : openContent ? 'block' : 'none'}">
        <ul class="dropdown-list">
          <ng-container *ngFor="let itemData of dropdownItemData">
            <li class="list-items" [ngClass]="{'disabled':itemData.disabled}" (click)="itemClick($event,itemData)">
            <ng-container *ngIf="itemData.icon!=null">
              <!--<i [class]="itemData.iconStyleClass" aria-hidden="true"></i>-->
              <amexio-c-icon style="padding-right: 5px;" [customclass]="itemData.iconStyleClass"></amexio-c-icon>
            </ng-container>{{itemData.label}}
            </li>
          </ng-container>
        </ul>
      </div>
    </div>
  `,
})
export class AmexioSpiltButtonDropdownComponent implements AfterContentInit {
/*
Properties
name : label
datatype : string
version : 4.0 onwards
default : none
description : Label on button
*/
  @Input() label: string;
/*
Properties
name :  badge
datatype : number
version : 4.1.9 onwards
default : none
description : Badge  describes the badge value that has to be displayed on button
*/
@Input('badge') badge: number;
  openContent: boolean;
  @ContentChildren(AmexioButtonDropDownItemComponent) buttons: QueryList<AmexioButtonDropDownItemComponent>;
  dropdownItemData: any[] = [];
/*
Properties
name : type
datatype : string
version : 4.0 onwards
default : none
description : Type of button : default,theme-color,theme-backgroundcolor,
 green, red, yellow ( primary, secondary ,success , danger
   & warning Depricated v4.1 onwards)
*/
  @Input() type: string;
/*
Properties
name : disabled
datatype : boolean
version : 4.0 onwards
default : false
description : Enable/Disables the button
*/
  @Input() disabled: boolean;

/*
Properties
name : size
datatype :  string
version : 4.0 onwards
default : none
description : Different Sizes of Buttons availabe : large, default, small & xsmall
*/
  @Input() size: string;
  constructor() {
  }
  ngAfterContentInit() {
    this.createDropdownItemConfig();
  }
  createDropdownItemConfig() {
    let itemRefArray = [];
    itemRefArray = this.buttons.toArray();
    for (const itemConfig of itemRefArray) {
      const data: any = {
        label: itemConfig.label,
        disabled: itemConfig.disabled,
        onItemClick: itemConfig.onItemClick,
        iconStyleClass: itemConfig.iconStyleClass,
        icon: itemConfig.icon,
        onClickRoute: itemConfig.onClickRoute,
      };
      data.iconStyleClass = data.icon;
      this.dropdownItemData.push(data);
    }
  }

  onClick() {
    this.openContent = !this.openContent;
  }
  itemClick(event: any, itemData: any) {
    itemData.onItemClick.emit(event);
  }
  getBackgroundColor() {
    let colorCode: string;
    if (this.type === 'primary' || this.type === 'theme-color') {
      colorCode = '#0275d8';
    } else if (this.type === 'success' || this.type === 'green') {
      colorCode = '#5cb85c';
     } else if (this.type === 'danger' || this.type === 'red') {
        colorCode = '#d9534f';
      } else if (this.type === 'warning' || this.type === 'yellow') {
        colorCode = '#f0ad4e';
      }
    return {
      'background-color': colorCode,
    };
  }
}
