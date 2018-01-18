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
import {DockbarComponent} from "./dockbaritem";



@Component({
  selector: 'amexio-dockbar',
  template : `

    <div class="dockbar" [style.min-height]="height">
      <ng-container *ngFor="let dockbar of dockbarArray">
        <button [ngClass]="{'active':dockbar.active}" (click)="onClick(dockbar)">

          <!--Normal image-->
          <ng-container *ngIf="dockbar.path">
            <img [src]="dockbar.path">
          </ng-container>

          <!--this is for fontawesome-->
          <ng-container *ngIf="(!(dockbar.icon && dockbar.mdb) && dockbar.icon)">
            <amexio-image [iconclass]="dockbar.icon" [cclass]=""></amexio-image>
            <!--<i [ngClass]="dockbar.icon"></i>-->
          </ng-container>

          <!--if dockbar have label instead of icon -->
          <ng-container *ngIf="dockbar.label && dockbar.active">
            <p><strong class="dockbar-label-highlight">{{dockbar.label}}</strong></p>
          </ng-container>

          <ng-container *ngIf="dockbar.label && !dockbar.active">
            <p>{{dockbar.label}}</p>
          </ng-container>

        </button>
      </ng-container>
    </div>
    <div class="dockbar-content" [style.min-height]="height">
      <ng-content></ng-content>
    </div>
    
  `

})
export class DockedBarToolComponent implements OnInit{

  @ContentChildren(DockbarComponent) dockbars:QueryList<DockbarComponent>;

  dockbarArray:DockbarComponent[];

  @Input() height :string;

  constructor(){

  }
  //on docker bar click event
  onClick(event: any) {
    const tabs = this.dockbarArray;
    tabs.forEach(tab => {
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
