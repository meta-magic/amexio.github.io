/**
 * Created by ketangote on 1/4/18.
 */

 /*
 Component Name : Amexio Navbar
 Component Selector : <amexio-nav-item>
 Component Description : The Nav Bar Component is a familiar top navigation pattern for users.
Nav bar has Logo/Title left align, than link, text field, button and menus on right side.
v4.1 Nav bar is not backward compatible of v4.0, for v4.0 refer link
*/
import { AfterContentInit, AfterViewInit, Component, ContentChildren, ElementRef, EventEmitter, forwardRef, Input, OnInit, Output,
  QueryList, ViewEncapsulation} from '@angular/core';

import {ControlValueAccessor, NG_VALUE_ACCESSOR} from '@angular/forms';
import { AmexioNavMenuComponent } from './navmenu.component';

const noop = () => {
};

export const CUSTOM_INPUT_CONTROL_VALUE_ACCESSOR: any = {
  provide: NG_VALUE_ACCESSOR, useExisting: forwardRef(() => AmexioNavItemComponent), multi: true,
};

@Component({
  selector: 'amexio-nav-item',
  templateUrl: 'navitem.component.html',
  providers: [CUSTOM_INPUT_CONTROL_VALUE_ACCESSOR],
  encapsulation: ViewEncapsulation.None,
})
export class AmexioNavItemComponent implements OnInit , ControlValueAccessor, AfterViewInit, AfterContentInit {

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

  mobilemode: boolean = false;

  isAction: boolean = false;
  isTextField: boolean = false;
  isMenu: boolean = false;
  isMenuContainer: boolean = false;
  right: number;
  navbarwidth: number;
  enablerightclass: boolean;

  constructor(private elementref: ElementRef) {

  }

  ngOnInit() {
    if (this.type === 'link' || this.type === 'button') {
      this.isAction = true;
    }else if (this.type === 'textfield') {
      this.isTextField = true;
    }else if (this.type === 'menu') {
      this.isMenu = true;
    }else if (this.type === 'menucontainer') {
      this.isMenuContainer = true;
    }
  }

  ngAfterViewInit() {
   this.right = this.elementref.nativeElement.getBoundingClientRect().right;
  }
  ngAfterContentInit() {

  }

  navItemClick(event: any) {
    this.onNavItemClick.emit(event);
  }

  setMobileMode(flag: boolean) {
    this.mobilemode = flag;
  }

  setNavbarWidth(navbarwidth: number) {
    this.navbarwidth = navbarwidth;
    if (((this.navbarwidth - this.elementref.nativeElement.getBoundingClientRect().left)) < 165) {
      this.enablerightclass = true;
    }
  }

  /**MODEL BINDING FOR TEXT FIELD **/
  // The internal dataviews model
  private innerValue: any = '';

  // Placeholders for the callbacks which are later provided
  // by the Control Value Accessor
  private onTouchedCallback: () => void = noop;
  private onChangeCallback: (_: any) => void = noop;

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

}
