/*
 * Copyright 2016-2017 the original author or authors.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Author - Pratik Kelwalkar
 *
 */
declare var $;
 import {AfterContentInit, Component, ContentChildren, OnInit, QueryList} from '@angular/core';
import {AmexioAccordionTabComponent} from "./amexio-accordion-tab";

 @Component({
  selector: 'amexio-accordion',
  template: `
    <div [attr.id]="elementId" role="tablist" aria-multiselectable="true">
      <ng-content></ng-content>
    </div>
  
  `
 })

 export class AmexioAccordionComponent implements OnInit,AfterContentInit {

  elementId : string;

  hasSetDefault : boolean;

  tabs : any[];

  @ContentChildren(AmexioAccordionTabComponent)  queryTabs: QueryList<AmexioAccordionTabComponent>;

  constructor() {

  }

  ngOnInit() {

  }

   ngAfterContentInit() {
     this.elementId = 'acc-' + Math.floor(Math.random()*90000) + 10000;
     this.setParent();
     this.tabs.forEach((tab)=>{
        tab.onClick.subscribe(()=>this.collapseAll());
     })
   }

   collapseAll(){
     this.tabs.forEach((tab)=>{
       $('#'+tab.elementId).collapse('hide');
       tab.isExpanded = false;
     })
   }

   setParent(){
     this.tabs = this.queryTabs.toArray();
     this.tabs.forEach((tab)=>{
       tab.parentId = this.elementId;
       if(tab.expanded)
         this.hasSetDefault = true;
     });
   }
 }
