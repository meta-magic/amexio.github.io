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
* Created by ketangote on 12/1/17.
*/

import {
  AfterContentInit,
  AfterViewInit,
  Component,
  ComponentFactoryResolver,
  ContentChildren,
  ElementRef,
  EventEmitter,
  Input,
  OnInit,
  Output,
  QueryList,
  Renderer2,
  ViewChild,
  ViewContainerRef,
} from '@angular/core';
import { AmexioTabPillComponent } from '../tab.pill.component';
import { BaseTabComponent } from './../base.tab.component';

@Component({
  selector: 'amexio-right-vertical-tab-view',
  templateUrl: './right.vertical.component.html',
})
export class AmexioRightVerticalTabComponent extends BaseTabComponent implements AfterContentInit, AfterViewInit, OnInit {

  @ViewChild('tab', { read: ElementRef }) public tabs: ElementRef;

  @ContentChildren(AmexioTabPillComponent) queryTabs: QueryList<AmexioTabPillComponent>;

  @ViewChild('target', { read: ViewContainerRef }) target: any;

  @ViewChild('tabId') tabId: ElementRef;

  tabCollection: AmexioTabPillComponent[];

  componentId = '';
  /*
     Properties
     name : closable
     datatype : boolean
     version : 4.0 onwards
     default : false
     description : This flag will make tab closable.
     */
  @Input() closable: boolean;
  /*
   Properties
   name :tab-position
   datatype : string
   version : 4.1.9 onwards
   default : top
   description : Position of tab can be (top/bottom)
   */
  @Input() tabPosition: string;
  /*
 Properties
 name :rotate
 datatype : boolean
 version : 5.12.2 onwards
 default : false
 description : tab header alignment
 */
  @Input() rotate = false;

  content: string;

  height = 580;
  constructor(public render: Renderer2, public componentFactoryResolver: ComponentFactoryResolver) {
    super(componentFactoryResolver);
    this.tabPosition = 'top';
  }

  ngOnInit() {
    this.componentId = Math.floor(window.crypto.getRandomValues(new Uint32Array(1))[0]) + '_tabc';
  }

  ngAfterViewInit() {
    if (this.tabId && this.tabId.nativeElement && this.tabId.nativeElement.offsetWidth) {
      const tabsheight = this.tabId.nativeElement.offsetWidth + 50;
      if (tabsheight > this.height) {
        this.height = tabsheight;
      }
    }
  }

  ngAfterContentInit() {
    this.tabCollection = this.queryTabs.toArray();
  }

  closeAllTabs() {
    this.tabCollection.forEach((tabs) => {
      if (tabs.closable === true || this.closable === true) {
        this.tabPillClose(tabs);
      }
    });
  }

  tabDomRemove(tab: any) {
    const removeNode = document.getElementById(tab.tabId).parentNode;
    const parentRefNode = removeNode.parentNode;
    parentRefNode.removeChild(removeNode);

  }
  activateTab(tabId: number) {
    this.tabCollection.forEach((tab) => {
      tab.active = false;
      if (tab.tabId === tabId) {
        tab.active = true;
      }
    });
  }
}
