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

import {AfterContentInit, AfterViewInit, Component, ContentChildren, DebugElement, Input, OnInit, QueryList } from '@angular/core';
import { AmexioAccordionTabComponent } from './accordion.pane';
@Component ({selector : 'amexio-accordion', templateUrl : './accordion.component.html'})
export class AmexioAccordionComponent implements OnInit, AfterContentInit {
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

@ContentChildren(AmexioAccordionTabComponent) queryTabs: QueryList<AmexioAccordionTabComponent>;
accordionCollections: AmexioAccordionTabComponent[];
constructor() {}
ngOnInit() {}
ngAfterContentInit() {
    this.accordionCollections = this.queryTabs.toArray();
    this.accordionCollections.forEach((node) => node.emittedEvent.subscribe((eventdata: any) => this.activateAccordionPane(eventdata)));
    this.accordionCollections.forEach((node) => {
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
      });

    }

activateAccordionPane(node: AmexioAccordionTabComponent) {
    this.accordionCollections.forEach((tab) => {
     if (tab === node) {
        tab.active = node.active ;
      } else {
       tab.active = false ;
      }});
 }}
