/**
 * Copyright 2016-2017 the original author or authors.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Created by Ketan Gote on 6/30/17.
 */


import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';


@Component({
  selector: '[amexio-submenu-view]',
  template : `
    <ul class="amexio-navbarsubmenu-ul">
      <li *ngFor="let sm of subMenuData">
        <ng-container  *ngIf="sm.childrens">
          <a class="amexio-navbarsubmenu-a" (click)="menuClick(sm)">
            <ng-container *ngIf="templates==null">
              {{sm.text}}
            </ng-container>
            <ng-template  [ngTemplateOutlet]="templates" [ngOutletContext]="{ $implicit: {}, subMenus:sm }"></ng-template>
           </a>
          <ul class="amexio-navbarsubmenu-ul">
            <ng-container *ngIf="sm.childrens">
              <li (nodeClick)="menuClick($event)" amexio-submenu-view [subMenuData]="sm.childrens" [templates]="templates"></li>
            </ng-container>
          </ul>
        </ng-container>
        
        <ng-container  *ngIf="!sm.childrens">
          <a class="amexio-navbarsubmenu-a" (click)="menuClick(sm)">
           <ng-container *ngIf="templates==null">
             {{sm.text}}
           </ng-container> 
            <ng-template *ngIf="templates!=null"  [ngTemplateOutlet]="templates" [ngOutletContext]="{ $implicit: {}, subMenus:sm }"></ng-template>
          </a>
        </ng-container>
      </li>
    </ul>
  `,
  styleUrls: ['navbarsubmenu.custom.css']
})
export class NavbarSubMenuComponent implements OnInit {

  @Input()
  subMenuData: any;

  @Output()
  nodeClick: any = new EventEmitter <any>();

  @Input()
  templates: any;


  constructor() {
  }


  ngOnInit() {
  }

  menuClick(nodeData: any) {
    this.nodeClick.emit(nodeData);

  }


}
