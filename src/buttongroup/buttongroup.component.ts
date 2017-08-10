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

import {AfterContentInit, AfterViewInit, Component, ContentChildren, Input, OnInit, QueryList} from '@angular/core';
import {ButtonGroupActionComponent} from './buttongroup.action.component';
declare var $;
@Component({
  selector: 'amexio-btn-group',
  template: `    
      <div [class]="btnGroupStyleClass" role="group" [attr.id]="elementId">
        <button *ngFor="let data of buttonData" type="button" (click)="buttonClick($event,data)"
                [class]="data.btnStyleClass"
                [attr.fieldName] = "data.fieldName"
                [attr.disabled] = "data.disabled ? true: null"
                data-toggle="tooltip" [attr.data-placement]="popoverPlacement" [attr.title]="data.tooltipMessage"
        >
          <ng-container *ngIf="data.isLoading">
            <i class="fa fa-refresh fa-spin " aria-hidden="true"></i>&nbsp;&nbsp;&nbsp;
          </ng-container>
          {{data.label}}
          <ng-container *ngIf="data.iconStyleClass!=null">
            <i [class]="data.iconStyleClass" aria-hidden="true"></i>
          </ng-container>
        </button>
      </div>
      <ng-content></ng-content>
  `,

})
export class ButtonGroupComponent implements OnInit, AfterContentInit, AfterViewInit {

  @Input()    size: string;

  btnGroupStyleClass: string;

  elementId: any;

  buttonData: any[];

  @Input()   popoverPlacement: string;

  @ContentChildren(ButtonGroupActionComponent) buttonComponentRef: QueryList<ButtonGroupActionComponent>;
  constructor() {
    this.elementId = 'button-group' + Math.floor(Math.random()*90000) + 10000;
  }

  ngAfterViewInit() {
    $('[data-toggle="popover"]').popover();
  }

  ngAfterContentInit() {
    this.createConfig();
  }
  ngOnInit() {
    this.btnGroupStyleClass = 'btn-group ';
    if (this.size != null) {
      if (this.size === 'large') {
        this.btnGroupStyleClass = this.btnGroupStyleClass.concat(' btn-group-lg');
      } else if (this.size === 'small') {
        this.btnGroupStyleClass = this.btnGroupStyleClass.concat(' btn-group-sm');
      }
    }
    if (this.popoverPlacement == null) {
      this.popoverPlacement = 'bottom';
    }
  }

  createConfig() {
    this.buttonData = [];
    this.createButtonConfig();
  }


  buttonClick(event: any, btnObj: any) {
    btnObj.onClick.emit(event);
    if (btnObj.onClickRoute !=  null) {
      // this.router.navigate([this.onClickRoute]);
    }
  }
  createButtonConfig() {
    let buttonRefArray = [];
    buttonRefArray = this.buttonComponentRef.toArray();
    for (let cr = 0 ; cr < buttonRefArray.length; cr++) {
      let buttonConfig = buttonRefArray[cr];
      let data : any = {
        label : buttonConfig.label, onClick : buttonConfig.onClick,
        icon : buttonConfig.icon, type: buttonConfig.type,
        tooltipMessage: buttonConfig.tooltipMessage, onClickRoute: buttonConfig.onClickRoute,
        disabled: buttonConfig.disabled, isLoading: buttonConfig.isLoading,
        fieldName: buttonConfig.fieldName, btnStyleClass: buttonConfig.btnStyleClass,
        iconStyleClass: buttonConfig.iconStyleClass, btnSizeStyleClass: buttonConfig.btnSizeStyleClass,
        hasToolTip : buttonConfig.hasToolTip, elementId: buttonConfig.elementId};
      this.buttonData.push(data);
    }
  }
}
