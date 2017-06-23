/*
 * Copyright 2016-2017 the original author or authors.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Author - Ketan Gote, Pratik Kelwalkar, Dattaram Gawas
 *
 */

import {
    AfterContentInit, AfterViewInit, ChangeDetectorRef, Component, ContentChildren, ElementRef, EventEmitter, Input,
    OnInit, Output,
    QueryList
} from '@angular/core';
import {TabComponent} from "./tabpill.component";
declare var $ : any;
@Component({
  selector: 'amexio-tab-pane',
  template : `
      <div [ngClass]="{'tabbable tabs-left' : stacked}">

          <ul [attr.id]="elementId" class="nav" [ngClass]="{ 'nav-tabs': !pills, 'nav-pills': pills , 'nav-stacked' : stacked}" role="tablist">
              <li role="presentation" *ngFor="let tab of tabs" id="+{{tab.elementId}}" [class.active]="tab.active" data-toggle="tab">

                  <a (click)="changeActiveTab(tab)" id="#{{tab.elementId}}" href="#{{tab.elementId}}" class="btn" role="tab"  [class.disabled]="tab.disabled" [attr.disabled] = "tab.disabled ? true: null">
                      <i *ngIf="icons" [ngClass]="getIconClass(tab)"></i> {{tab.title}}
                      &nbsp;<span *ngIf="closable" id="-{{tab.elementId}}" class="close">×</span>
                      <!-- Need to Fix Font issue! -->
                  </a>

              </li>
          </ul>

          <div>
              <ng-content></ng-content>
          </div>


      </div>


  `,
  styles: [`
  .wrapper {
      position:relative;
      margin:0 auto;
      overflow:hidden;
      padding:5px;
      height:50px;
  }

  .list {
      position:absolute;
      left:0px;
      top:0px;
      min-width:3000px;
      margin-left:12px;
      margin-top:0px;
  }

  .list li{
      display:table-cell;
      position:relative;
      text-align:center;
      cursor:grab;
      cursor:-webkit-grab;
      color:#efefef;
      vertical-align:middle;
  }

  .scroller {
      text-align:center;
      cursor:pointer;
      display:none;
      padding:7px;
      padding-top:11px;
      white-space:no-wrap;
      vertical-align:middle;
      background-color:#fff;
  }

  .scroller-right{
      float:right;
  }

  .scroller-left {
      float:left;
  }

  /**Stack view css **/
  .tabs-left > .nav-tabs > li,
  .tabs-right > .nav-tabs > li {
      float: none;
  }

  .tabs-left > .nav-tabs > li > a,
  .tabs-right > .nav-tabs > li > a {
      min-width: 74px;
      margin-right: 0;
      margin-bottom: 3px;
  }

  .tabs-left > .nav-tabs {
      float: left;
      margin-right: 19px;
      border-right: 1px solid #ddd;
  }

  .tabs-left > .nav-tabs > li > a {
      margin-right: -1px;
      -webkit-border-radius: 4px 0 0 4px;
      -moz-border-radius: 4px 0 0 4px;
      border-radius: 4px 0 0 4px;
  }

  .tabs-left > .nav-tabs > li > a:hover,
  .tabs-left > .nav-tabs > li > a:focus {
      border-color: #eeeeee #dddddd #eeeeee #eeeeee;
  }

  .tabs-left > .nav-tabs .active > a,
  .tabs-left > .nav-tabs .active > a:hover,
  .tabs-left > .nav-tabs .active > a:focus {
      border-color: #ddd transparent #ddd #ddd;
      *border-right-color: #ffffff;
  }

  .tabs-right > .nav-tabs {
      float: right;
      margin-left: 19px;
      border-left: 1px solid #ddd;
  }

  .tabs-right > .nav-tabs > li > a {
      margin-left: -1px;
      -webkit-border-radius: 0 4px 4px 0;
      -moz-border-radius: 0 4px 4px 0;
      border-radius: 0 4px 4px 0;
  }

  .tabs-right > .nav-tabs > li > a:hover,
  .tabs-right > .nav-tabs > li > a:focus {
      border-color: #eeeeee #eeeeee #eeeeee #dddddd;
  }

  .tabs-right > .nav-tabs .active > a,
  .tabs-right > .nav-tabs .active > a:hover,
  .tabs-right > .nav-tabs .active > a:focus {
      border-color: #ddd #ddd #ddd transparent;
      *border-left-color: #ffffff;
  }
  `]
})
export class TabPaneComponent implements OnInit,AfterContentInit,AfterViewInit {

  @Input()  icons : boolean;

  @Input()  pills: boolean;

  @Input()  stacked : boolean;

  @Input()  closable : boolean;

  @ContentChildren(TabComponent)  tabs: QueryList<TabComponent>;

  @Output()  onSelect = new EventEmitter(false);

  selectedTabId : string;

  OPERATION_TOGGLE = '#';

  OPERATION_DELETE = '-';

  elementId : string;

  constructor(private cdf : ChangeDetectorRef) {
    this.elementId = 'tabpane-' + Math.floor(Math.random()*89999+10000);
  }

  ngOnInit() {
  }

  ngAfterViewInit(){
    $('#'+this.elementId).scrollingTabs();
    $('#'+this.elementId).on('click', (e : any)=>{
      this.selectedTabId = e.target.id;  // Need some validation Here!!!
      if(this.selectedTabId !=null && (this.selectedTabId.charAt(0) == '#' ||this.selectedTabId.charAt(0) == '-')){
        let op = this.selectedTabId.charAt(0);

        if(op == this.OPERATION_TOGGLE){
          this.loadTab(this.selectedTabId.substr(1));
        }
        if(op == this.OPERATION_DELETE){
          this.removeTab();
        }
      }

    });
  }

  ngAfterContentInit() {
    setTimeout(() => { // timeout for ngRepeat
      const readTabs = this.tabs.toArray();
      const activeTab = readTabs.find(tab => tab.active === true);
      if (!activeTab && readTabs.length > 0)
        readTabs[0].active = true;
    });
  }

  loadTab(tabId : string){
    let tabs = this.tabs.toArray();
    tabs.forEach(tab => {
      tab.active = false;
      if(tab.elementId == tabId)
        tab.active = true;
    });
    this.cdf.detectChanges();
  }

  removeTab(){
    let tabs = this.tabs.toArray();
    let tabToRemove : any;
    let previousTabId;
    tabs.forEach((tab,index) => {
      if(tab.elementId == this.selectedTabId.substr(1)){
        tabToRemove = tab;
        tab.active = false;
        if(index != 0){
          previousTabId = tabs[index-1].elementId;
        }
      }

    });
    this.tabs.reset(this.tabs.filter(tab => tab !==tabToRemove));
    let element = document.getElementById('+'+this.selectedTabId.substr(1));
    element.parentNode.removeChild(element);

    this.loadTab(previousTabId);
    $('.nav-tabs').scrollingTabs('refresh');
    this.cdf.detectChanges();
  }

  changeActiveTab(tab: TabComponent) {
    const tabs = this.tabs.toArray();
    tabs.forEach(tab => tab.active = false);
    tab.active = true;
    this.onSelect.emit(tabs.indexOf(tab));
    this.cdf.detectChanges();
  }

  getIconClass(tab : TabComponent): string{
    if(this.icons){
      return 'glyphicon glyphicon-'+tab.icon;
    }
    else {
      return '';
    }
  }

}
