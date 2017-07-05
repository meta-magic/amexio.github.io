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
    <ul style="list-style: none;padding: 1px;">
      <li style="list-style: none; padding: 1px 20px; color: #777"  *ngFor="let sm of subMenuData">
        <ng-container  *ngIf="sm.childrens">
          <a style="text-decoration: none;color: #777" (click)="menuClick(sm)" style="cursor:pointer">
            <ng-container *ngIf="templates==null">
              {{sm.text}}
            </ng-container>
            <ng-template  [ngTemplateOutlet]="templates" [ngOutletContext]="{ $implicit: {}, subMenus:sm }"></ng-template>
           </a>
          <ul style="list-style: none;padding: 1px;">
            <ng-container *ngIf="sm.childrens">
              <li style="list-style: none;padding: 1px; color: #777" (nodeClick)="menuClick($event)" amexio-submenu-view [subMenuData]="sm.childrens" [templates]="templates"></li>
            </ng-container>
          </ul>
        </ng-container>
        
        <ng-container  *ngIf="!sm.childrens">
          <a style="text-decoration: none;color: #777" (click)="menuClick(sm)" style="cursor:pointer">
           <ng-container *ngIf="templates==null">
             {{sm.text}}
           </ng-container> 
            <ng-template *ngIf="templates!=null"  [ngTemplateOutlet]="templates" [ngOutletContext]="{ $implicit: {}, subMenus:sm }"></ng-template>
          </a>
        </ng-container>
      </li>
    </ul>
  `
})
export class NavbarSubMenuComponent implements OnInit{

  @Input()
  subMenuData: any;

  @Output()
  nodeClick : any = new EventEmitter <any>();

  @Input()
  templates : any;


  constructor(){

  }


  ngOnInit(){
  }

  ngAfterViewInit() {
 }

  menuClick(nodeData:any){
    this.nodeClick.emit(nodeData);

  }


}
