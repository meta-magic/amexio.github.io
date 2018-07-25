/**
 * Created by ketangote on 12/1/17.
 */

/*
Component Name : Amexio Accordion
Component Selector : <amexio-accordion>
Component Description : Amexio Accordion provides an easy way to organize big
forms by grouping the fields in accordion tabs.

*/

import {
  AfterContentInit,
  AfterViewInit,
  Component,
  ContentChildren,
  ElementRef,
  EventEmitter,
  Input,
  OnInit,
  Output,
  QueryList,
  Renderer2,
  ViewChild,
} from '@angular/core';
import { AmexioTabPillComponent } from '../tab.pill.component';

@Component({
  selector: 'amexio-vertical-tab-view',
  templateUrl: './vertical.tab.component.html',
})
export class AmexioVerticalTabComponent implements AfterContentInit, AfterViewInit, OnInit {

  @ViewChild('tab', { read: ElementRef }) public tabs: ElementRef;

  @ContentChildren(AmexioTabPillComponent) queryTabs: QueryList<AmexioTabPillComponent>;

  /*
Events
name : onClick
datatype : none
version : 4.0 onwards
default :none
description : Callback to invoke on activated tab event.
*/
  @Output() onClick: any = new EventEmitter<any>();

  tabCollection: AmexioTabPillComponent[];

  content: string;

  constructor(public render: Renderer2) {
  }

  ngOnInit() {

  }

  ngAfterViewInit() {
  }

  ngAfterContentInit() {
    this.tabCollection = this.queryTabs.toArray();
  }

  onTabClick(tab: any) {
    if (!tab.disabled) {
      for (const i of this.tabCollection) {
        if (i === tab) {
          i['active'] = true;
          this.onClick.emit(tab);
        } else {
          i['active'] = false;
        }
      }
    }
  }

  closeTab(tabNode: AmexioTabPillComponent) {
    const newTab: AmexioTabPillComponent[] = [];
    let index = 0;
    let tabHighlightIndex = 0;

    this.tabCollection.forEach((tab) => {
      tab.active = false;
      if (tab.tabId === tabNode.tabId) {
        tabHighlightIndex = index;
      }
      if (tab.tabId !== tabNode.tabId) {
        newTab.push(tab);
      }
      index++;
    });

    if (tabHighlightIndex === newTab.length) {
      tabHighlightIndex--;
    }
    this.activateTab(newTab[tabHighlightIndex].tabId);
    this.tabCollection = newTab;
  }

  activateTab(tabId: number) {
    this.tabCollection.forEach((tab) => {
      tab.active = false;
    });
  }
}
