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

import { ChangeDetectorRef, Component, ElementRef, EventEmitter, HostListener, Input, OnInit, Output, Renderer2 } from '@angular/core';
import { ListBaseDatepickerComponent } from '../../base/list.base.datepicker.component';
@Component({
  selector: 'amexio-floating-group-button',
  templateUrl: './floatinggroupbutton.component.html',
})
export class AmexioFloatingGroupButtonComponent extends ListBaseDatepickerComponent<string> implements OnInit {

  /*
Properties
name : vertical-position
datatype : string
version : 4.1 onwards
default : none
description : Positions floating button vertically:
top or bottom or center. This attribute is ignored if user specify position
explicitly (using position-top/position-bottom/position-left/position-right)
*/
  @Input('vertical-position') verticalposition: string;
  /*
  Properties
  name : horizontal-position
  datatype : none
  version : 4.1 onwards
  default : none
  description : Positions floating button horizontally: left or right or center.
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
  name : size
  datatype : string
  version : 5.4 onwards
  default : none
  description : large, default, small & xsmall
  */
  @Input('size') size: string;
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
  name : icon
  datatype : string
  version : 4.1 onwards
  default : none
  description : FaIcon classname.
  */
  @Input('icon') icon: string;
  /*
  Properties
  name : type
  datatype : string
  version : 4.1 onwards
  default : none
  description : Type of button - default  / theme-color /
  theme-backgroundcolor / green / red / yellow
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
  description : Place floating buttong at relative position
  */
  @Input('relative') relative = false;
  /*
  Properties
  name : floating-group-position
  datatype : string
  version : 4.1 onwards
  default : none
  description : Positions floating button group at specified position
  */
  @Input('floating-group-position') floatinggroupposition: string;
  /*
  Properties
  name : data
  datatype : array
  version : 4.1 onwards
  default : none
  description : local data for buttons
  */
  @Input('data') data: any[];
  /*
  Events
  name : onClick
  datatype : any
  version : none
  default : none
  description : Event is fired when button is click
  */
  @Output() onClick: any = new EventEmitter<any>();
  floatinggroupxposition: string;
  floatinggroupyposition: string;
  positionclass: string;
  togglefloatinggroup = false;
  ispressed = false;
  color = 'red-color';
  datacount = 0;
  constructor(private elementref: ElementRef, private cdf: ChangeDetectorRef, renderer: Renderer2) {
    super(renderer, elementref, cdf);
  }

  ngOnInit() {
    this.dropdownstyle = { visibility: 'hidden' };
    if (this.data && this.data.length > 0) {
      this.datacount = this.data.length;
      this.data.forEach((node: any, index: any) => {
        if (!node['type']) {
          node['type'] = this.type;
          node['index'] = index;
          node['typeclass'] = 'floatingbutton-' + this.type;
        } else {
          node['index'] = index;
          node['typeclass'] = 'floatingbutton-' + node['type'];
        }
        this.addCssToBtnGroup();
      });
    }
  }
  addCssToBtnGroup() {
    if (this.data && this.data.length > 0) {
      this.data.forEach((node: any) => {
        if (this.size && (this.size === 'large')) {
          node['typeclass'] = node['typeclass'] + ' floatingbutton-circle-' + this.size;
        }
        if (this.size && (this.size === 'small')) {
          node['typeclass'] = node['typeclass'] + ' floatingbutton-circle-' + this.size;
        }
        if ((this.size !== 'large') && (this.size !== 'small')) {
          node['typeclass'] = node['typeclass'] + ' floatingbutton-circle';
        }
      });
    }
  }

  buttonClick(clickEvent: any) {
    this.ispressed = !this.ispressed;
    const x = clickEvent.currentTarget.getBoundingClientRect().left;
    const y = clickEvent.currentTarget.getBoundingClientRect().top;
    if (!this.disabled) {
      if (this.size === 'small' && this.floatinggroupposition === 'bottom') {
        this.floatinggroupxposition = (x) + 'px';
        this.floatinggroupyposition = (y + 34) + 'px';
      }
      if (this.size === 'large' && this.floatinggroupposition === 'bottom') {
        this.floatinggroupxposition = (x) + 'px';
        this.floatinggroupyposition = (y + 108) + 'px';
      }
      if (((this.size !== 'large') && (this.size !== 'small')) && this.floatinggroupposition === 'bottom') {
        this.floatinggroupxposition = (x) + 'px';
        this.floatinggroupyposition = (y + 70) + 'px';
      }
      this.floatingBtnGroupTopPostion(event);
      this.toggleVisibility();
      this.togglefloatinggroup = !this.togglefloatinggroup;
      this.onClick.emit({ thisObj: this, event: clickEvent });
    }
  }

  floatingBtnGroupTopPostion(clickEvent: any) {
    const x = clickEvent.currentTarget.getBoundingClientRect().left;
    const y = clickEvent.currentTarget.getBoundingClientRect().top;

    if (this.size === 'small' && this.floatinggroupposition === 'top') {
      this.floatinggroupxposition = (x) + 'px';
      this.floatinggroupyposition = (y - (38 * this.datacount)) + 'px';
    }
    if (this.size === 'large' && this.floatinggroupposition === 'top') {
      this.floatinggroupxposition = (x) + 'px';
      this.floatinggroupyposition = (y - (108 * this.datacount)) + 'px';
    }
    if (((this.size !== 'large') && (this.size !== 'small')) && this.floatinggroupposition === 'top') {
      this.floatinggroupxposition = (x) + 'px';
      this.floatinggroupyposition = (y - (80 * this.datacount)) + 'px';
    }
  }

  toggleVisibility() {
    if (this.dropdownstyle.visibility === 'visible') {
      super.itemClicked();
    } else {
      const event: any = '';
      super.focus(event);
    }
  }

  onFloatingButtonClick(event: any) {
    this.buttonClick(event.event);
  }
  onButtonClick(node: any, clickEvent: any) {
    this.toggleVisibility();
    this.togglefloatinggroup = !this.togglefloatinggroup;
    this.onClick.emit({ this: node, parent: this, event: clickEvent });
  }
  arrowDown(ref: any) {
    let trefid;
    const refId = (parseInt(ref.id, 10));
    if (refId === (this.data.length - 1)) {
      trefid = 0;
    } else {
      trefid = refId + 1;
    }
    document.getElementById((trefid).toString()).focus();
  }

  arrowUp(ref: any) {
    let trefid;
    const refId = (parseInt(ref.id, 10));
    if (refId === 0) {
      trefid = this.data.length - 1;
    } else {
      trefid = refId - 1;
    }
    document.getElementById((trefid).toString()).focus();
  }
}
