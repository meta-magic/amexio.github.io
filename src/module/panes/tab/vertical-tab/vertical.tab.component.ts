/**
 * Created by ketangote on 12/1/17.
 */

 /*
 Component Name : Amexio Accordion
 Component Selector : <amexio-accordion>
 Component Description : Amexio Accordion provides an easy way to organize big forms by grouping the fields in accordion tabs.

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
  ViewChild
} from '@angular/core';
import {AmexioTabPill} from "../tab.pill.component";

@Component({
  selector: 'amexio-vertical-tab-view',
  templateUrl: './vertical.tab.component.html',
  styleUrls: ['../tab.component.scss']
})
export class AmexioVerticalTabComponent implements OnInit, AfterViewInit, AfterContentInit {

  @ViewChild('tab', {read: ElementRef}) public tabs: ElementRef;

  @ContentChildren(AmexioTabPill) queryTabs: QueryList<AmexioTabPill>;

  /*
Events
name : onClick
datatype : none
version : 4.0 onwards
default :none
description : Callback to invoke on activated tab event.
*/
  @Output() onClick: any = new EventEmitter<any>();

  tabCollection: AmexioTabPill[];

  content: string;

  constructor(public render: Renderer2) {
  }

  ngOnInit() {

  }

  ngAfterViewInit() {
    if (this.tabs.nativeElement.scrollWidth > this.tabs.nativeElement.clientWidth) {
    }
  }

  ngAfterContentInit() {
    this.tabCollection = this.queryTabs.toArray();
  }

  onTabClick(tab: any) {
    for (let i = 0; i < this.tabCollection.length; i++) {
      if (this.tabCollection[i] === tab) {
        this.tabCollection[i]['active'] = true;
        this.onClick.emit(tab);
      } else {
        this.tabCollection[i]['active'] = false;
      }
    }
    ;
  }

  closeTab(tabNode: AmexioTabPill) {
    const newTab: AmexioTabPill[] = [];
    const tabs = this.tabs;
    let index = 0;
    let tabHighlightIndex = 0;

    this.tabCollection.forEach(tab => {
      tab.active = false;
      if (tab.tabId == tabNode.tabId) {
        tabHighlightIndex = index;
      }
      if (tab.tabId != tabNode.tabId) {
        newTab.push(tab);
      }
      index++;
    });

    if (tabHighlightIndex == newTab.length) {
      tabHighlightIndex--;
    }
    this.activateTab(newTab[tabHighlightIndex].tabId);
    this.tabCollection = newTab;
    if (this.tabCollection.length == 1) {

    }
  }

  activateTab(tabId: number) {
    const tabs = this.tabs;
    this.tabCollection.forEach(tab => {
      tab.active = false;
      if (tab.tabId == tabId) {
        tab.active = true;
      }
    });
  }


}
