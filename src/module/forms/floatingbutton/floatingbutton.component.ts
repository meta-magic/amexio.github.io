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
* Created by ketangote on 26/2/2018.
*/

import { ChangeDetectionStrategy, Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
@Component({
  selector: 'amexio-floating-button',
  templateUrl: './floatingbutton.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AmexioFloatingButtonComponent implements OnInit {
  /*
  Properties
  name : vertical-position
  datatype : string
  version : 4.1 onwards
  default : none
  description : Postion floating button vertically: top or bottom or center.
  This attribute is ignored if user specify position explicitly
  (using position-top/position-bottom/position-left/position-right)
  */
  @Input('vertical-position') verticalposition: string;
  /*
  Properties
  name : horizontal-position
  datatype : none
  version : 4.1 onwards
  default : none
  description : Postion floating button horizontally: left or right or center.
  This attribute is ignored if user specify position explicitly
  (using position-top/position-bottom/position-left/position-right)
  */
  @Input('horizontal-position') horizontalposition: string;
  /*
  Properties
  name : position-top
  datatype : none
  version : 4.1 onwards
  default : none
  description : Takes top position in percentage or pixel
  */
  @Input('position-top') top: string;
  /*
  Properties
  name : position-bottom
  datatype : none
  version : 4.1 onwards
  default : none
  description : Takes bottom position in percentage or pixel
  */
  @Input('position-bottom') bottom: string;
  /*
  Properties
  name : position-left
  datatype : none
  version : 4.1 onwards
  default : none
  description : Takes left position in percentage or pixel
  */
  @Input('position-left') left: string;
  /*
  Properties
  name : position-right
  datatype : none
  version : 4.1 onwards
  default : none
  description : Takes right position in percentage or pixel
  */
  @Input('position-right') right: string;
  /*
  Properties
  name : label
  datatype : none
  version : 4.1 onwards
  default : none
  description : Label on floating button, this is activated in case of block=square
  */
  @Input('label') label: string;
  /*
  Properties
  name : block
  datatype : none
  version : 4.1 onwards
  default : none
  description : Display button as round or square
  */
  @Input('block') block = 'circle';
  /*
  Properties
  name : icon
  datatype : string
  version : 4.1 onwards
  default : none
  description : FaIcon class-name.
  */
  @Input('icon') icon: string;
  /*
  Properties
  name : type
  datatype : string
  version : 4.1 onwards
  default : none
  description : Type of button - default / theme-color / theme-backgroundcolor / green / red / yellow
  */
  @Input('type') type: string;
  /*
  Properties
  name : disabled
  datatype : string
  version : 4.1 onwards
  default : none
  description :Enable/Disables the button
  */
  @Input('disabled') disabled: string;
  /*
  Properties
  name : relative
  datatype : boolean
  version : 4.1 onwards
  default : none
  description : Place floating button at relative position
  */
  @Input('relative') relative = false;
  /*
  Events
  name : onClick
  datatype : any
  version : none
  default : none
  description : Event is fired when button is click
  */
  @Output() onClick: any = new EventEmitter<any>();
  /*
  Properties
  name : size
  datatype : string
  version : 5.4 onwards
  default : none
  description : large, default, small & xsmall
  */
  @Input('size') size: string;

  /*
Properties
name : tooltip
datatype : string
version : 5.5.2 onwards
default : none
description : Provides Tooltip for button.
*/
  @Input('tool-tip') tooltip: string;

  positionclass: string;
  absoluteposition = false;
  ispressed = false;
  componentId: string;

  constructor() {
  }
  ngOnInit() {
    this.componentId = this.createCompId('checkbox');
    this.addCSSClasses();
  }
  // THIS METHOD IS USED FOR SETTING CSS CLASSSES
  addCSSClasses(): any {
    if (this.top || this.bottom || this.right || this.left) {
      this.absoluteposition = true;
    }
    this.positionclass = '';
    if (this.relative) {
      this.positionclass = ' floatingbutton-relative ';
    } else {
      this.positionclass = ' floatingbutton-fixed ';
    }
    if (!this.absoluteposition && !this.relative) {
      this.btnPositionCss();
    }
    if (this.block === 'circle') {
      this.setCricle();
    } else if (this.block === 'square') {
      this.positionclass = this.positionclass + ' floatingbutton-square';
    }
    if (this.type === 'theme-color') {
      this.themeColorCss();
    } else if (this.type === 'green') {
      this.greenColorType();

    } else if (this.type === 'red') {
      this.redColorType();

    } else if (this.type === 'yellow') {
      this.yellowColorType();

    } else {
      this.defaultType();
    }
    return this.positionclass;
  }

  private setCricle() {
    if (this.size && (this.size === 'large' || this.size === 'small')) {
      this.positionclass = this.positionclass + ' floatingbutton-circle-' + this.size;
    } else {
      this.positionclass = this.positionclass + ' floatingbutton-circle';
    }
    this.label = '';
  }

  // Method to call css class on the basis of theme color
  themeColorCss() {
    this.positionclass = this.disabled ? this.positionclass + ' floatingbutton-theme-color-disabled' :
      this.positionclass + ' floatingbutton-theme-color';
  }

  // Css for button type default.
  defaultType() {
    this.positionclass = this.disabled ? this.positionclass + ' floatingbutton-default-disabled' :
      this.positionclass + 'floatingbutton-default';
  }

  // Css for button type yellow.
  yellowColorType() {
    this.positionclass = this.disabled ? this.positionclass + 'floatingbutton-yellow-disabled' :
      this.positionclass + ' floatingbutton-yellow';
  }

  // Css for button type red.
  redColorType() {
    this.positionclass = this.disabled ? this.positionclass + 'floatingbutton-red-disabled' :
      this.positionclass + ' floatingbutton-red';
  }
  // Css for button type green.
  greenColorType() {
    this.positionclass = this.disabled ? this.positionclass + ' floatingbutton-green-disabled' :
      this.positionclass + ' floatingbutton-green';
  }

  // Css on btn position
  btnPositionCss() {
    if (this.verticalposition === null) {
      this.verticalposition = 'top';
    } else if (this.horizontalposition === null) {
      this.horizontalposition = 'right';
    }
    this.positionclass = this.positionclass + ' floatingbutton-' +
      this.verticalposition + ' floatingbutton-' + this.horizontalposition +
      ' floatingbutton-default';
  }

  // Method for button click
  buttonClick(clickEvent: any) {
    this.ispressed = !this.ispressed;
    if (!this.disabled) {
      this.onClick.emit({ thisObj: this, event: clickEvent });
    }
  }

  togglebtn(event1: any) {
    this.ispressed = !this.ispressed;
    if (!this.disabled) {
      this.onClick.emit({ thisObj: this, event: event1 });
    }
  }

  createCompId(inputType: any) {
    return inputType + '_' + Math.floor(Math.random() * 1000 + 999);
  }
}
