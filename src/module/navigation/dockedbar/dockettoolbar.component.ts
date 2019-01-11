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
* Created by Ketan Gote on 8/21/17.
*/

import {AfterContentInit, Component, ContentChildren, Input, OnInit, QueryList} from '@angular/core';
import {DockbarComponent} from './dockbaritem';

@Component({
  selector: 'amexio-dockbar', template: `
    <div class="dockbar" [style.min-height]="height">
      <ng-container *ngFor="let dockbar of dockbarArray">
        <button [ngClass]="{'active':dockbar.active}" (click)="onClick(dockbar)">

          <!--Normal image-->
          <ng-container *ngIf="dockbar.path">
            <img [src]="dockbar.path">
          </ng-container>

          <!--this is for fontawesome-->
          <ng-container *ngIf="(!(dockbar.icon && dockbar.mda) && dockbar.icon)">
            <amexio-image [icon-class]="dockbar.icon" [c-class]=""></amexio-image>
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

  `,

})
export class DockedBarToolComponent implements AfterContentInit, OnInit {

  @ContentChildren(DockbarComponent) dockbars: QueryList<DockbarComponent>;

  dockbarArray: DockbarComponent[];

  /*
Properties
name : height
datatype : string
version : 4.0 onwards
default : none
description : Height of dockbar.
*/
  @Input() height: string;

  constructor() {

  }

  // on docker bar click event
  onClick(event: any) {
    const tabs = this.dockbarArray;
    tabs.forEach((tab) => {
      tab.active = false;
      if (tab.elementId === event.elementId) {
        tab.active = true;
      }
    });
  }

  ngAfterContentInit() {
    this.dockbarArray = this.dockbars.toArray();
  }

  ngOnInit() {

  }

}
