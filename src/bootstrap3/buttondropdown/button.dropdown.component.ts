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


import {AfterContentInit, Component, ContentChildren, Input, OnInit, QueryList} from '@angular/core';
import {ItemComponent} from "./dropdown.item.component";

@Component({
  selector: 'amexio-btn-dropdown',
  template:`    
      <div [class]="btnGroupStyleClass" [attr.id]="elementId">
        <button type="button" [class]="btnStyleClass">{{label}}</button>
        <button type="button" [class]="btnDropdownStyle" data-toggle="dropdown">
          <span class="caret"></span>
        </button>
        <ul class="dropdown-menu" role="menu">
          <li class="lidisabled" [ngClass]="{'lidisabled':itemData.disabled}" *ngFor="let itemData of dropdownItemData" (click)="itemClick($event,itemData)">
            <a style="cursor :pointer">{{itemData.label}}<ng-container *ngIf="itemData.icon!=null">
            <span [class]="itemData.iconStyleClass"></span>
             </ng-container>
            </a>
          </li>
        </ul>
      </div>
  `,
  styles: [`
    .lidisabled {
      pointer-events: none;
      opacity: 0.6;
      background-color: lightgray
    }
  `]
})
export class ButtonDropdownComponent implements OnInit,AfterContentInit{

  @Input()    label : string;

  @Input()   type : string;

  @Input()    size : string;


  dropdownItemData : any[];

  elementId : any;

  btnStyleClass : string;

  btnDropdownStyle : string;

  btnGroupStyleClass : string;

  @ContentChildren(ItemComponent) dropdownItemRef : QueryList<ItemComponent>;
  constructor() {
    this.elementId = 'button-dropdown' + new Date().getTime() + Math.random();
  }

  ngOnInit() {
    this.btnStyleClass = 'btn ';
    this.btnDropdownStyle = 'dropdown-toggle';
    if(this.type!=''|| this.type!=null){
      if(this.type == 'warning')
        this.btnStyleClass = this.btnStyleClass + 'btn-warning';
      else if(this.type == 'primary')
        this.btnStyleClass = this.btnStyleClass + 'btn-primary';
      else if(this.type== 'success')
        this.btnStyleClass = this.btnStyleClass + 'btn-success';
      else if(this.type == 'danger')
        this.btnStyleClass = this.btnStyleClass + 'btn-danger';
    }
    else
      this.btnStyleClass = this.btnStyleClass + 'btn-default';
    if(this.size != null){
      this.btnGroupStyleClass = 'btn-group ';
      if(this.size != null){
        if(this.size == 'large')
          this.btnGroupStyleClass = this.btnGroupStyleClass.concat(' btn-group-lg');
        else if(this.size == 'small')
          this.btnGroupStyleClass = this.btnGroupStyleClass.concat(' btn-group-sm');
        else if(this.size == 'xsmall')
          this.btnGroupStyleClass = this.btnGroupStyleClass.concat(' btn-group-xs');
      }
    }
    this.btnDropdownStyle = this.btnStyleClass+' '+this.btnDropdownStyle;
  }
  ngAfterContentInit() {
    this.createConfig();
  }

  createConfig(){
    this.dropdownItemData =[];
    this.createDropdownItemConfig()
  }
  createDropdownItemConfig(){
    let itemRefArray  = [];
    itemRefArray = this.dropdownItemRef.toArray();
    for(let cr =0 ; cr<itemRefArray.length;cr++){
      let itemConfig = itemRefArray[cr];
      let data : any = {label : itemConfig.label,disabled:itemConfig.disabled,onItemClick : itemConfig.onItemClick,iconStyleClass:itemConfig.iconStyleClass,icon : itemConfig.icon,onClickRoute:itemConfig.onClickRoute};
      data.iconStyleClass = 'glyphicon glyphicon-'+data.icon+' pull-right';
      this.dropdownItemData.push(data);
    }
  }

  itemClick(event : any,itemData : any){
    itemData.onItemClick.emit(event);
    if(itemData.onClickRoute !=null){
      // this.router.navigate([itemData.onClickRoute]);
    }
  }
}
