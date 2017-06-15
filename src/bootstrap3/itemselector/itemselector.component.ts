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

import {AfterViewInit, Component, EventEmitter, Input, OnInit, Output,} from '@angular/core';
import {ItemSelectorService} from "./itemselector.service";

@Component({
  selector: 'amexio-item-selector',
  template:`    
    <div class="col-lg-5">
      <div class="list-group" [ngStyle]="setStyles()">
        <button type="button" class="list-group-item active">Available</button>
        <div style="height:100%;overflow-y: auto;position:relative;" >
          <button type="button" class="list-group-item"  *ngFor="let data of availableData; let i = index" (click)="itemCkick(data,i)">{{data[displayField]}}</button>
        </div>
       
      </div>
    </div>
    <div class="col-lg-2">
        <div class="list-group text-center" [ngStyle]="setStyles()">
          <button type="button" class="list-group-item active" ></button>
          <amexio-btn (onClick)="moveTop()"  [type]="'default'" [tooltipMessage]="'move top'" icon="triangle-top"></amexio-btn>
          <amexio-btn (onClick)="upSwitch()" [type]="'default'" [tooltipMessage]="'move up'" icon="chevron-up"></amexio-btn>
          <amexio-btn (onClick)="leftSwitch()" [type]="'default'" [tooltipMessage]="'move left'" icon="chevron-left"></amexio-btn>
          <amexio-btn (onClick)="rightSwitch()" [type]="'default'" [tooltipMessage]="'move right'" icon="chevron-right"></amexio-btn>
          <amexio-btn (onClick)="downSwitch()" [type]="'default'" [tooltipMessage]="'move down'" icon="chevron-down"></amexio-btn>
          <amexio-btn (onClick)="moveDown()" [type]="'default'" [tooltipMessage]="'bottom'" icon="triangle-bottom"></amexio-btn>
      </div>
      </div>
    <div class="col-lg-5">
      <div class="list-group" [ngStyle]="setStyles()">
        <button type="button" class="list-group-item active">selected</button>
        <div style="height:100%;overflow-y: auto;position:relative;" >
        <button type="button" class="list-group-item"  *ngFor="let data of selectedData; let i = index" (click)="itemCkick(data,i)">{{data[displayField]}}</button>
        </div>
      </div>
    </div>
    
  `
})
export class ItemSelectorComponent implements OnInit,AfterViewInit {

  @Input() height: any;

  @Input() httpUrl: string;

  @Input() dataReader: string;

  @Input() httpMethod: string;

  @Input() ItemSelectBindData: any;

  @Input() displayField : string;

  @Input() valueField : string;

  @Output() availableRecords: any = new EventEmitter<any>();

  @Output() selectedRecords: any = new EventEmitter<any>();


  availableData: any[];

  selectedData: any[];

  switchingObject: any;

  objectIndex: any;


  constructor(private itemSelectorService: ItemSelectorService) {
    this.selectedData = [];
  }

  ngOnInit() {
  }

  ngAfterViewInit() {
    if (this.httpMethod && this.httpUrl) {
      this.itemSelectorService.fetchData(this, this.httpUrl, this.httpMethod);
    }
    else if (this.ItemSelectBindData) {
      this.setData(this.ItemSelectBindData);
    }
  }

  setStyles() {
    let height : any;
    if(this.height){
       height = this.height+'px';
    }else {
      height = '300px';
    }

    let styles = {
      'position': 'relative',
      'height':height
    };
    return styles;
  }
  setData(httpResponse : any){
    let responsedata = httpResponse;
    let dr = this.dataReader.split(".");
    for(let ir = 0 ; ir<dr.length; ir++){
      responsedata = responsedata[dr[ir]];
    }
    responsedata.forEach((option : any,index : any)=>{
      option['isSelected']=false;
    });
    this.availableData = responsedata;
  }

  itemCkick(data : any,index : any){
    this.switchingObject= data;
    this.objectIndex  = index;
  }

  rightSwitch(){
    if(this.switchingObject != null) {
      if (!this.switchingObject.isSelected) {
        this.selectedData.push(this.switchingObject);
        this.switchingObject.isSelected = true;
        this.availableData.forEach((option, index) => {
          if (option.isSelected) {
            this.availableData.splice(index, 1);
          }
        });
        this.switchingObject = null;
        this.dataEmitter();
      }
    }

  }
  leftSwitch(){
    if(this.switchingObject != null){
      if(this.switchingObject.isSelected){
        this.availableData.push(this.switchingObject);
        this.switchingObject.isSelected = false;
        this.selectedData.forEach((option,index)=>{
          if (!option.isSelected) {
            this.selectedData.splice(index, 1);
          }
        });
        this.switchingObject = null;
        this.dataEmitter();
      }
    }


  }
  upSwitch(){
    if(this.switchingObject != null) {
      if (this.switchingObject.isSelected) {
        let index = this.selectedData[this.objectIndex];
        this.selectedData[this.objectIndex] = this.selectedData[this.objectIndex - 1];
        this.selectedData[this.objectIndex - 1] = index;
        this.switchingObject = null;
        this.dataEmitter();
      }
    }
  }
  downSwitch(){
    if(this.switchingObject != null) {
      if (this.switchingObject.isSelected) {
        if (this.selectedData.length - 1 != this.objectIndex) {
          let index = this.selectedData[this.objectIndex];
          this.selectedData[this.objectIndex] = this.selectedData[this.objectIndex + 1];
          this.selectedData[this.objectIndex + 1] = index;
          this.switchingObject = null;
          this.dataEmitter();
        }
      }
    }

  }
  moveTop(){
    let tempArray : any =[];
    if(this.switchingObject != null && this.switchingObject.isSelected){
      if(this.selectedData.length>1) {
        tempArray[0] = this.selectedData[this.objectIndex];
        this.selectedData.splice(this.objectIndex, 1);
        this.selectedData.forEach((option)=>{
          tempArray.push(option)
        });
        this.selectedData = tempArray;
        this.switchingObject = null;
        this.dataEmitter();
      }
    }


  }
  moveDown(){
    if(this.switchingObject != null) {
      if (this.switchingObject.isSelected && this.selectedData.length > 1) {
        this.selectedData.splice(this.objectIndex, 1);
        this.selectedData[this.selectedData.length] = this.switchingObject;
      }
    }
    this.switchingObject = null;
    this.dataEmitter();
  }

  dataEmitter(){
    this.availableRecords.emit(this.availableData);
    this.selectedRecords.emit(this.selectedData);
  }
}
