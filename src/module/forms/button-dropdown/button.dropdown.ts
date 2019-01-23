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

import { animate, state, style, transition, trigger } from '@angular/animations';
import {
  AfterContentInit, ChangeDetectorRef, Component, ContentChildren, ElementRef, EventEmitter, Input,
  OnInit, Output, QueryList, Renderer2, ViewChild,
} from '@angular/core';
import { BaseFormValidator } from '../../base/base.validator.component';
import { AmexioButtonDropDownItemComponent } from './button.dropdown.item';

@Component({
  selector: 'amexio-btn-dropdown',
  templateUrl: './button.dropdown.html',
  animations: [
    trigger('changeState', [
      state('visible', style({
      })),
      state('hidden', style({
        height: '0px',
      })),
      transition('*=>*', animate('200ms')),
    ]),
  ],
})

export class AmexioButtonDropdownComponent extends BaseFormValidator<any> implements AfterContentInit, OnInit {
  @ViewChild('btnRef') btnReference: any;
  private componentLoaded: boolean;
  /*
  Properties
  name : label
  datatype : string
  version : 4.0 onwards
  default : none
  description : Label on button
  */
  @Input() label: string;
  openContent: boolean;
  posixUp: boolean;
  @ContentChildren(AmexioButtonDropDownItemComponent) buttons: QueryList<AmexioButtonDropDownItemComponent>;
  dropdownItemData: any[] = [];
  /*
   For internal use
  */

  _buttonGroupLocalData: any;
  @Input('buttonGroupLocalData')
  set data(value: any[]) {
    this._buttonGroupLocalData = value;
    if (this.componentLoaded) {
      this.updateComponent();
    }
  }
  get buttonGroupLocalData(): any {
    return this._buttonGroupLocalData;
  }
  /*
  Properties
  name : type
  datatype : string
  version : 4.0 onwards
  default : none
  description : Type of button : default,theme-color,theme-backgroundcolor,
  green, red, yellow ( primary, secondary ,success , danger & warning Depricated v4.1 onwards)
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
  /*
  Properties
  name :  badge
  datatype : number
  version : 4.1.9 onwards
  default : none
  description : Badge  describes the badge value that has to be displayed on button
  */
  @Input('badge') badge: number;
  /*
  Events
  name : click
  datatype :  none
  version : none
  default : none
  description : Fire when button-dropdown item button/link click
  */
  @Output() click: any = new EventEmitter<any>();
  /*
Events
name : getLinkData
datatype :  none
version : none
default : none
description : Fire when button-dropdown item button/link click
*/
  @Output() getLinkData: any = new EventEmitter<any>();
  buttonGroupPreviewData: any;
  ispressed = false;
  selected = false;
  showToolTip: boolean;
  flag = false;
  buttonindex1: number;
  activedescendant = 'aria-activedescendant';
  componentId: string;
  constructor(
    public element: ElementRef, renderer: Renderer2, _cd: ChangeDetectorRef,
  ) {
    super(renderer, element, _cd);
  }
  ngOnInit() {
    this.componentId =  this.label + Math.floor(Math.random() * 1000 + 999);
  }
  updateComponent() {
    if (JSON.stringify(this.buttonGroupPreviewData) !== JSON.stringify(this.buttonGroupLocalData)) {
      this.buttonGroupPreviewData = JSON.parse(JSON.stringify(this.buttonGroupLocalData));
      this.dropdownItemData = this.buttonGroupLocalData;
    }
  }
  generateIndex(array: any) {
    this.dropdownItemData.forEach((element: any, index: number) => {
      element['index'] = this.componentId + 'listitem' + index;
    });
  }
  ngAfterContentInit() {
    if (this.buttonGroupLocalData && this.buttonGroupLocalData.length > 0) {
      this.buttonGroupPreviewData = JSON.parse(JSON.stringify(this.buttonGroupLocalData));
      this.dropdownItemData = this.buttonGroupLocalData;
      this.createDropdownItemConfig(this.dropdownItemData);
    } else {
      this.createDropdownItemConfig(this.buttons.toArray());
    }
    this.componentLoaded = true;
  }
  createDropdownItemConfig(btnCollection: any) {
    const itemRefArray = btnCollection;
    for (const itemConfig of itemRefArray) {
      const data: any = {
        label: itemConfig.label,
        disabled: itemConfig.disabled,
        onItemClick: itemConfig.onItemClick,
        iconStyleClass: itemConfig.iconStyleClass,
        icon: itemConfig.icon,
        badge: itemConfig.badge,
        selected: false,
        onClickRoute: itemConfig.onClickRoute,
      };
      data.iconStyleClass = data.icon;
      this.dropdownItemData.push(data);
    }
    if (itemRefArray.length === this.dropdownItemData.length) {
      this.generateIndex(this.dropdownItemData);
    }
  }
  onClick(elem: any) {
    this.ispressed = !this.ispressed;
    this.openContent = !this.openContent;
    if (this.openContent) {
      this.onBaseFocusEvent({});
    } else {
      this.openContent = this.onBaseBlurEvent(elem);
    }
    this.posixUp = this.getListPosition(elem);
    this.click.emit();
  }
  onEnterClick(elem: any) {
    this.flag = true;
    this.dropdownItemData[0].selected = true;
    this.ispressed = !this.ispressed;
    if (this.openContent) {
      this.onBaseFocusEvent({});
    } else {
      this.openContent = this.onBaseBlurEvent(elem);
    }
    this.posixUp = this.getListPosition(elem);
    this.click.emit();
    const divid = document.getElementById(this.componentId);
    divid.setAttribute(this.activedescendant, this.dropdownItemData[0].index);

  }
  onClickEscape(elem: any) {
    this.openContent = false;
    this.hide();
  }
  onSpaceClick(elem: any) {
    this.onEnterClick(elem);
  }
  onHomeClick(elem: any) {
    if (this.flag) {
      this.buttonindex1 = this.findbuttonindex();
      if (this.buttonindex1 < (this.dropdownItemData.length - 1)) {
        this.onHomeClickSelected();
      }else if (this.buttonindex1 === this.dropdownItemData.length - 1) {
       this.onHomeClickSelected();
      }
    }
  }
  onHomeClickSelected() {
    this.dropdownItemData[this.buttonindex1].selected = false;
    this.dropdownItemData[0].selected = true;
    const divid = document.getElementById(this.componentId);
    divid.setAttribute(this.activedescendant, this.dropdownItemData[0].index);
  }
  onEndClick(elem: any) {
    if (this.flag) {
      this.buttonindex1 = this.findbuttonindex();
      if (this.buttonindex1 < (this.dropdownItemData.length - 1)) {
        this.onEndClickSelected();
      }else if (this.buttonindex1 === this.dropdownItemData.length - 1) {
        this.onEndClickSelected();
      }
    }
  }
  onEndClickSelected() {
    this.dropdownItemData[this.buttonindex1].selected = false;
    this.dropdownItemData[this.dropdownItemData.length - 1].selected = true;
    const divid = document.getElementById(this.componentId);
    divid.setAttribute(this.activedescendant, this.dropdownItemData[this.dropdownItemData.length - 1].index);
  }
  onclickDown(elem: any) {
    if (this.flag) {
      this.buttonindex1 = this.findbuttonindex();
      if (this.buttonindex1 < (this.dropdownItemData.length - 1)) {
        this.dropdownItemData[this.buttonindex1].selected = false;
        this.dropdownItemData[this.buttonindex1 + 1].selected = true;
        const divid = document.getElementById(this.componentId);
        divid.setAttribute(this.activedescendant, this.dropdownItemData[this.buttonindex1 + 1].index);
      }else if (this.buttonindex1 === this.dropdownItemData.length - 1) {
        this.dropdownItemData[this.buttonindex1].selected = false;
        this.dropdownItemData[0].selected = true;
        const divid = document.getElementById(this.componentId);
        divid.setAttribute(this.activedescendant, this.dropdownItemData[0].index);
      }
    }else {
      this.dropdownstyle = { visibility: 'visible' };
      this.dropdownItemData[0].selected = true;
      const divid = document.getElementById(this.componentId);
      divid.setAttribute(this.activedescendant, this.dropdownItemData[0].index);
      this.flag = true;
    }
  }
  onclickUp(elem: any) {
    if (this.flag) {
      this.buttonindex1 = this.findbuttonindex();
      if ((this.buttonindex1 < (this.dropdownItemData.length - 1)) && this.buttonindex1 !== 0) {
        this.onClickUpSelected();
      }else if (this.buttonindex1 === (this.dropdownItemData.length - 1)) {
        this.onClickUpSelected();
      }else if (this.buttonindex1 === 0) {
        this.dropdownItemData[this.dropdownItemData.length - 1].selected = true;
        this.dropdownItemData[this.buttonindex1].selected = false;
        const divid = document.getElementById(this.componentId);
        divid.setAttribute(this.activedescendant, this.dropdownItemData[this.dropdownItemData.length - 1].index);
      }
    }else {
      this.dropdownstyle = { visibility: 'visible' };
      this.dropdownItemData[this.dropdownItemData.length - 1].selected = true;
      const divid = document.getElementById(this.componentId);
      divid.setAttribute(this.activedescendant, this.dropdownItemData[this.dropdownItemData.length - 1].index);
      this.flag = true;
    }
  }
  onClickUpSelected() {
    this.dropdownItemData[this.buttonindex1].selected = false;
    this.dropdownItemData[this.buttonindex1 - 1].selected = true;
    const divid = document.getElementById(this.componentId);
    divid.setAttribute(this.activedescendant, this.dropdownItemData[this.buttonindex1 - 1].index);
  }
  findbuttonindex() {
    let buttonindex;
    this.dropdownItemData.forEach((element, index) => {
      if (element.selected === true) {
        buttonindex = index;
      }
    });
    return buttonindex;
  }
  getListPosition(elementRef: any): boolean {
    const dropdownHeight = 325; // must be same in dropdown.scss
    if (window.screen.height - (elementRef.getBoundingClientRect().bottom) < dropdownHeight) {
      return true;
    } else {
      return false;
    }
  }

  onblur(eve: any) {
    this.openContent = this.onBaseBlurEvent(eve);
  }

  btnItemClick(clickEvent: any, itemData: any) {
    if (this.buttonGroupLocalData && this.buttonGroupLocalData.length > 0) {
      this.getLinkData.emit({ event: clickEvent, parentRef: this, data: itemData });
    } else {
      if (!itemData.disabled) {
        itemData.onItemClick.emit(clickEvent);
        this.openContent = !this.openContent;
        this.onBaseBlurEvent(event);
      }
    }
  }
}
