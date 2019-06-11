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

import {
  AfterContentInit, AfterViewInit, Component, ContentChildren, ElementRef, EventEmitter, forwardRef, Input, OnInit, Output,
  QueryList, ViewEncapsulation,
} from '@angular/core';

import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

import { AmexioNavMenuComponent } from './navmenu.component';

const noop = () => {
};

@Component({
  selector: 'amexio-nav-item',
  templateUrl: 'navitem.component.html',
  providers: [{
    provide: NG_VALUE_ACCESSOR, useExisting: forwardRef(() => AmexioNavItemComponent), multi: true,
  }],
  encapsulation: ViewEncapsulation.None,
})
export class AmexioNavItemComponent implements OnInit, ControlValueAccessor, AfterViewInit, AfterContentInit {

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
  name : icon
  datatype : string
  version : 4.0 onwards
  default : none
  description : Icon for link, button and menu header
  */
  @Input() icon: string;

  /*
  Properties
  name : data
  datatype : string
  version : 4.0 onwards
  default : none
  description : Standard JSON format array data which is used for rendering menus. This is used when type=menu is defined.
  */
  @Input() data: any[];

  /*
  Events
  name : onNavItemClick
  datatype : any
  version : none
  default : none
  description : Fire when nav item is clicked, This event is fired when nav item type is defined as 'link/button/menu'
  */
  @Output() onNavItemClick: any = new EventEmitter<any>();
  @ContentChildren(AmexioNavMenuComponent) navmenus: QueryList<AmexioNavMenuComponent>;

  navMenusComponents: AmexioNavMenuComponent[];
  @Input() mobilemode = false;
  @Input('sub-menu-height-padding') subMenuPadding = '10px';

  isAction = false;
  isTextField = false;
  isMenu = false;
  isMenuContainer = false;
  right: number;
  itemcolor: string;
  navbarwidth: number;
  enablerightclass: boolean;
  private innerValue = '';
  private onTouchedCallback: () => void = noop;
  private onChangeCallback: (_: any) => void = noop;
  componentId = '';
  offsetWidth = 0;
  constructor(public elementref: ElementRef) {
    this.componentId = Math.floor(Math.random() * 90000) + 10000 + '_navctyt';
    this.offsetWidth = this.elementref.nativeElement.offsetWidth;

  }

  ngOnInit() {
    if (this.type === 'link' || this.type === 'button' || this.type === 'toggle' ||  this.type === 'slider') {
      this.isAction = true;
    } else if (this.type === 'textfield') {
      this.isTextField = true;
    } else if (this.type === 'menu') {
      this.isMenu = true;
    } else if (this.type === 'menucontainer') {
      this.isMenuContainer = true;
    }
  }

  ngAfterViewInit() {
  }

  ngAfterContentInit() {
    setTimeout(() => {
      this.right = this.elementref.nativeElement.getBoundingClientRect().right;
    }, 100);
  }

  setSubmenuIcon(node: any) {
    if (node.submenus && (node.submenus.length > 0)) {
      node.submenus['iconposition'] = 'left';
      this.setSubmenuIcon(node.submenus);
    }
  }

  setHoverattr(node: any) {
    node['ishover'] = false;
    if (node.submenus && (node.submenus.length > 0)) {
      this.setHoverattr(node.submenus);
    }
  }

  navItemClick(event: any) {
    this.onNavItemClick.emit(event);
  }

  setMobileMode(flag: boolean) {
    this.mobilemode = flag;
  }

  setNavbarWidth(navbarwidth: number) {

    setTimeout(() => {
      this.navbarwidth = navbarwidth;
      if ((this.navbarwidth - this.elementref.nativeElement.getBoundingClientRect().left) < 165) {
        this.enablerightclass = true;
      }
    }, 0);

  }
  //  MODEL BINDING FOR TEXT FIELD
  // The internal dataviews model

  // Placeholders for the callbacks which are later provided
  // by the Control Value Accessor

  // get accessor
  get value(): any {
    return this.innerValue;
  }

  // set accessor including call the onchange callback
  set value(v: any) {
    if (v !== this.innerValue) {
      this.innerValue = v;
      this.onChangeCallback(v);
    }
  }

  // From ControlValueAccessor interface
  writeValue(value: any) {
    if (value !== this.innerValue) {
      this.innerValue = value;
    }
  }

  // From ControlValueAccessor interface
  registerOnChange(fn: any) {
    this.onChangeCallback = fn;
  }

  // From ControlValueAccessor interface
  registerOnTouched(fn: any) {
    this.onTouchedCallback = fn;
  }

  hoverfun() {
    this.data.forEach((node: any) => {
      this.ResetHoverattr(node);
    });
  }

  ResetHoverattr(node: any) {
    node.ishover = false;
    if (node.submenus && (node.submenus.length > 0)) {
      node.submenus.forEach((element: any) => {
        this.ResetHoverattr(node.submenus);
      });
    }
  }
}
