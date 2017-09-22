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
  Component , ContentChildren,OnInit, QueryList
} from '@angular/core';
import {DockbarComponent} from "./dockbaritem";



@Component({
  selector: 'amexio-dockbar',
  template : `
    <div style="background-color: #0c7cd5">
    <div class="amexio-dockbar">
      <ng-container *ngFor="let dockbar of dockbarArray">
        <button [ngClass]="{'active':dockbar.active}" (click)="onClick(dockbar)">

          <!--Normal image-->
          <ng-container *ngIf="dockbar.imagePath">
            <img [src]="dockbar.imagePath">
          </ng-container>

          <!--this is for material design-->
          <ng-container *ngIf="dockbar.icon && dockbar.mdbClass">
            <amexio-image [imageClass]="dockbar.mdbClass" [mdbClass]="dockbar.icon"></amexio-image>
          </ng-container>

          <!--this is for fontawesome-->
          <ng-container *ngIf="(!(dockbar.icon && dockbar.mdbClass) && dockbar.icon)">
            <amexio-image [imageClass]="dockbar.icon" [cClass]=""></amexio-image>
          </ng-container>
          
          <!--if dockbar have label instead of icon -->
          <ng-container *ngIf="dockbar.label && dockbar.active">
            <p><strong class="amexio-dockbar-label-highlight">{{dockbar.label}}</strong></p>
          </ng-container>
          
          <ng-container *ngIf="dockbar.label && !dockbar.active">
            <p>{{dockbar.label}}</p>
          </ng-container>
          
        </button>
      </ng-container>
    </div>
    <div class="amexio-dockbar-item">
      <ng-content></ng-content>
    </div>
    </div> 
  `,
  styles:[
    `      
      .amexio-dockbar {
        float: left;
        width: 70px;
        border: 1px solid #f1f1f1;
        background-color: #dee0e3;
        height: 100%;
        min-height: 1300px;
        position: relative;
      }
      
      .amexio-dockbar-item{
        background-color: #f1f1f1;
        min-height: 1300px;
      }
      
      /* Style the buttons inside the tab */
      .amexio-dockbar button {
        display: block;
        background-color: inherit;
        color: #adadad;
        padding: 5px;
        width: 100%;
        border: none;
        outline: none;
        text-align: center;
        cursor: pointer;
        transition: 0.3s;
        font-size: 17px;
        border-bottom: 1px solid #c7c7c7;
        border-left: 5px solid #dee0e3;
        height: 50px;
      }

      /* Change background color of buttons on hover */
      .amexio-dockbar button:hover {
        background-color: #f1f1f1;
      }

      /* Create an active/current "tab button" class */
      .amexio-dockbar button.active {
        background-color: #f1f1f1;
        color: black;
        border-left: 5px solid #3192e1;
      }
      
      .amexio-dockbar-label-highlight {
        color: black;
        font-weight: bold;
      }
    `
  ]

})
export class DockedBarToolComponent implements OnInit{

  @ContentChildren(DockbarComponent) dockbars:QueryList<DockbarComponent>;

  dockbarArray:DockbarComponent[];

  constructor(){

  }
  //on docker bar click event
  onClick(event: any) {
    const tabs = this.dockbarArray;
    tabs.forEach(tab => {
      tab.active = false;
      if (tab.name == event.name) {
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
