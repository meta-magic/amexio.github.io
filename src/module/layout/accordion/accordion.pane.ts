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
*/

import { animate, state, style, transition, trigger } from '@angular/animations';
import {
  AfterContentInit, Component, ContentChildren, ElementRef,
  EventEmitter, Input, OnInit, Output, QueryList, Renderer, ViewChild,
} from '@angular/core';
import { AmexioAccordionHeaderComponent } from './accordion.header.component';

@Component({
  selector: 'amexio-accordion-tab',
  templateUrl: './accordion.pane.html',
  animations: [
    trigger('accordionState', [
      state('hidden', style({
        display: 'none',
        height: '0px',
      })),
      state('visible', style({
        display: 'block',
        height: '*',
      })),
      transition('*=>hidden', animate('0ms')),
      transition('*=>visible', animate('200ms')),
    ]),
  ],
})
export class AmexioAccordionTabComponent implements OnInit, AfterContentInit {
  /*
  Properties
  name : header
  datatype : any
  version : 4.0 onwards
  default :
  description : User can bind title for accordion tab.*/
  @Input() header: any;
  /*
  Properties
  name : active
  datatype : boolean
  version : 4.0 onwards
  default : false
  description : user can Set true for specific accordian open as default
  */
  @Input() active: boolean;
  /*
  Events
  name : emittedEvent
  datatype :none
  version : none
  default : none
  description : Fires the on accordion pane click event.
  */
  @Output() emittedEvent = new EventEmitter();
  /*
  Properties
  name : left-icon
  datatype : string
  version : 4.0 onwards
  default :
  description : places the icon on left
  */
  @Input('left-icon') leftIcon: string;
  /*
  Properties
  name : angle-icon
  datatype : boolean
  version : 4.0 onwards
  default : false
  description : Can use Angle Icons instead of default plus/minus icons
  */
  @Input('angle-icon') angleIcon: boolean;
  /*
  Properties
  name : disabled
  datatype : boolean
  version : 4.0 onwards
  default : false
  description : 	Disabled specific panes
  */
  @Input('disabled') disabled: boolean;
  @Input('data') data: any;
  @ViewChild('btn') btn: ElementRef;
  isTransparent: boolean;
  currentstate: string;
  expanded = false;
  componentId: any;
  isSelected = false;
  bgColor: string;
  color: string;
  hover: boolean;
  themeCss: any;
  amexioComponentId = 'amexio-accordion';
  accordionHeaderData: any;
  headerPresent: boolean;
  gradientFlag: boolean;
  @ContentChildren(AmexioAccordionHeaderComponent) amexioAccHeader: QueryList<AmexioAccordionHeaderComponent>;
  constructor() {
    this.currentstate = 'hidden';
  }

  ngOnInit() {
    this.componentId = '' + Math.floor(Math.random() * 1000 + 999);
    this.emittedEvent.emit({ keydown: true, current: this });
  }

  ngAfterContentInit() {
    setTimeout(() => {
      this.accordionHeaderData = this.amexioAccHeader.toArray();
      if (this.accordionHeaderData && this.accordionHeaderData.length > 0) {
        this.headerPresent = true;
      }
    }, 500);

  }

  emitEvent() {
    if (!this.disabled) {
      this.active = !this.active;
      this.emittedEvent.emit({ keydown: false, current: this });
    }
    if (this.active) {
      this.currentstate = 'visible';
    } else {
      this.currentstate = 'hidden';
    }

  }
  onEnterClick() {
    this.expanded = !this.expanded;
  }
  onArrowDown() {
    this.emittedEvent.emit({ keydown: true, current: this });
  }
  onArrowUp() {
    this.emittedEvent.emit({ keyup: true, current: this });
  }

  // Theme Apply
  setColorPalette(themeClass: any) {
    this.themeCss = themeClass;
  }

  changeHeaderColor() {
    this.gradientFlag = true;
  }
}
