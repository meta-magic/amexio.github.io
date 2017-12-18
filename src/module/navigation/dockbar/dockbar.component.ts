/**
 * Copyright 2016-2017 the original author or authors.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Created by Ketan Gote on 8/21/17.
 */
import {
  Component, ContentChildren, Input, OnInit, QueryList
} from '@angular/core';
import {AmexioDockBarItem} from "./dockbaritem";

@Component({
  selector: 'amexio-dockbar',
  templateUrl : './dockbar.component.html',
  styleUrls : ['./dockbar.component.scss']
})
export class AmexioDockbarComponent implements OnInit{

  @ContentChildren(AmexioDockBarItem) dockbars:QueryList<AmexioDockBarItem>;

  dockbarArray:AmexioDockBarItem[];

  @Input() height :string;

  constructor(){

  }
  //on docker bar click event
  onClick(event: any) {
    const tabs = this.dockbarArray;
    tabs.forEach((tab : any) => {
      tab.active = false;
      if (tab.elementId == event.elementId) {
        tab.active = true;
      }
    });
  }
  ngAfterContentInit() {
    this.dockbarArray = this.dockbars.toArray();
  }
  ngOnInit(){

  }

}
