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

import { AfterContentInit, AfterViewInit, Component, ContentChildren, Input, OnDestroy, OnInit, QueryList } from '@angular/core';
import { LifeCycleBaseComponent } from '../../base/lifecycle.base.component';
import { AmexioAccordionTabComponent } from './accordion.pane';

@Component({ selector: 'amexio-accordion', templateUrl: './accordion.component.html' })
export class AmexioAccordionComponent extends LifeCycleBaseComponent implements AfterContentInit, AfterViewInit, OnInit, OnDestroy {
  /*
  Properties
  name : expand-all
  datatype : boolean
  version : 4.0 onwards
  default : false
  description : Pane will expand or collapse based on the boolean
  */
  @Input('expand-all') expandAll: boolean;
  /*
  Properties
  name : transparent
  datatype : boolean
  version : 4.0 onwards
  default : false
  description : Apply Transparent styles to accordion
  */
  @Input('transparent') isTransparent: boolean;
  /*Properties
  name : angle-icon
  datatype : boolean
  version : 4.0 onwards
  default : false
  description : Can use Angle Icons instead of default plus/minus icons
  */
  @Input('angle-icon') angleIcon: boolean;
  /*Properties
  name : background
  datatype : string
  version : 5.6.1 onwards
  default :
  description : provides background color for accordion header
*/
  @Input('background') bgColor: string;

  /*Properties
  name : color
  datatype : string
  version : 5.6.1 onwards
  default :
  description : provides foreground color for accordion header
  */
  @Input('color') color: string;

  /*Properties
  name : color
  datatype : string
  version : 5.6.1 onwards
  default :
  description : provides foreground color for accordion header
  */
  @Input('multi-open') multiopen: boolean;

  @ContentChildren(AmexioAccordionTabComponent) queryTabs: QueryList<AmexioAccordionTabComponent>;
  accordionCollections: AmexioAccordionTabComponent[];
  flag = false;
  prevaccindex = -1;
  accindex = -1;
  constructor() {
    super();
    this.flag = true;
  }
  ngOnInit() {
    super.ngOnInit();
  }
  ngAfterViewInit() {
    super.ngAfterViewInit();
  }

  ngAfterContentInit() {
    this.accordionCollections = this.queryTabs.toArray();
    this.accordionCollections.forEach((node) => node.emittedEvent.subscribe((eventdata: any) => this.activateAccordionPane(eventdata)));
    this.accordionCollections.forEach((node, index) => {
      if (this.expandAll) {
        node.active = true;
      } else if (node.active) {
        node.active = true;
      } else {
        node.active = false;
      }
      if (this.isTransparent) {
        node.isTransparent = true;
      }
      if (this.angleIcon) {
        node.angleIcon = true;
      }
      if (this.color) {
        node.color = this.color;
      }
      if (this.bgColor) {
        node.bgColor = this.bgColor;
      }
      node['index'] = node.componentId;
    });
  }
  activateAccordionPane(nodeEvent: any) {
    const node = nodeEvent.current;
    if (nodeEvent.keydown) {
      this.onkeyDown();
    } else if (nodeEvent.keyup) {
      this.onkeyUp();
    } else {
      this.accordionCollections.forEach((tab) => {
        if (tab === node) {
          tab.active = node.active;
        } else if (this.multiopen && tab.active) {
          tab.active = true;
        } else {
          tab.active = false;
        }
      });
    }
  }

  onkeyDown() {
    this.onPreAccIndex();
    this.accindex++;
    this.prevaccindex = this.accindex;
    if (this.accindex >= this.accordionCollections.length) {
      this.accindex = 0;
      this.prevaccindex = 0;
    }
    this.setAccoordionActive(this.accindex);
  }
  onkeyUp() {
    this.onPreAccIndex();
    this.prevaccindex--;
    if (this.prevaccindex === -1) {
      this.prevaccindex = this.accordionCollections.length - 1;
      this.accindex = -1;
    }
    this.setAccoordionActive(this.prevaccindex);
    if (this.prevaccindex === 0) {
      this.accindex = 0;
    }
  }
  private onPreAccIndex() {
    if (this.prevaccindex > -1) {
      this.accordionCollections[this.prevaccindex]['isSelected'] = false;
    }
  }
  private setAccoordionActive(index: number) {
    this.accordionCollections[index]['isSelected'] = true;
    if (this.accordionCollections[index]['isSelected']) {
      this.accordionCollections[index].btn.nativeElement.focus();
    }
  }
  ngOnDestroy(): void {
    super.ngOnDestroy();
  }
}
