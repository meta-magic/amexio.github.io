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
  AfterContentInit, Component, ContentChildren, EventEmitter, Input, OnInit, Output,
  QueryList
} from '@angular/core';
import {DropdownItemComponent} from './dropdown.item.component';

@Component({
  selector: 'amexio-btn-dropdown',
  template: `
      <div [class]="btnGroupStyleClass" [attr.id]="elementId">
          <button type="button" [class]="btnDropdownStyle"  data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
              {{label}}
          </button>
          <ul class="dropdown-menu">
              <ng-container *ngFor="let itemData of dropdownItemData">
                  <a class="dropdown-item" [ngClass]="{'disabled':itemData.disabled}" (click)="itemClick($event,itemData)">
                      {{itemData.label}}
                      <ng-container *ngIf="itemData.icon!=null">
                          <i [class]="itemData.iconStyleClass" aria-hidden="true"></i>
                      </ng-container>
                  </a>
              </ng-container>
          </ul>
      </div>
      
  `,
})
export class ButtonDropdownComponent implements OnInit, AfterContentInit {

  @Input()    label: string;

  @Input()   type: string;

  @Input()    size: string;

  dropdownItemData: any[];

  elementId: any;

  btnStyleClass: string;

  btnDropdownStyle: string;

  btnGroupStyleClass: string;

  @ContentChildren(DropdownItemComponent) dropdownItemRef: QueryList<DropdownItemComponent>;
  constructor() {
    this.elementId = 'button-dropdown' + Math.floor(Math.random()*90000) + 10000;
  }

  ngOnInit() {
    this.btnStyleClass = 'btn ';
   this.btnDropdownStyle = 'dropdown-toggle dropdown-toggle-split';
    if (this.type !== '' || this.type != null) {
      if (this.type === 'warning') {
        this.btnStyleClass = this.btnStyleClass + 'btn-warning';
      } else if (this.type === 'primary') {
        this.btnStyleClass = this.btnStyleClass + 'btn-primary';
      } else if (this.type === 'success') {
        this.btnStyleClass = this.btnStyleClass + 'btn-success';
      } else if (this.type === 'danger') {
        this.btnStyleClass = this.btnStyleClass + 'btn-danger';
      }
    } else {
      this.btnStyleClass = this.btnStyleClass + 'btn-secondary';
    } if (this.size != null) {
      this.btnGroupStyleClass = 'btn-group ';
      if (this.size != null) {
        if (this.size === 'large') {
          this.btnGroupStyleClass = this.btnGroupStyleClass.concat(' btn-group-lg');
        } else if (this.size === 'small') {
          this.btnGroupStyleClass = this.btnGroupStyleClass.concat(' btn-group-sm');
        }
      }
    }
    this.btnDropdownStyle = this.btnStyleClass + ' ' + this.btnDropdownStyle;
  }
  ngAfterContentInit() {
    this.createConfig();
  }

  createConfig() {
    this.dropdownItemData = [];
    this.createDropdownItemConfig();
  }
  createDropdownItemConfig() {
    let itemRefArray  = [];
    itemRefArray = this.dropdownItemRef.toArray();
    for (let cr = 0 ; cr < itemRefArray.length; cr++) {
      const itemConfig = itemRefArray[cr];
      const data: any = {label : itemConfig.label, disabled: itemConfig.disabled, onItemClick : itemConfig.onItemClick, iconStyleClass: itemConfig.iconStyleClass, icon : itemConfig.icon, onClickRoute: itemConfig.onClickRoute};
      data.iconStyleClass = data.icon + ' pull-right';
      this.dropdownItemData.push(data);
    }
  }

  itemClick(event: any, itemData: any) {
    itemData.onItemClick.emit(event);
    if (itemData.onClickRoute != null) {
      // this.router.navigate([itemData.onClickRoute]);
    }
  }
}
