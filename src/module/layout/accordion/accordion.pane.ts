/**
 * Created by pratik on 14/12/17.
 */
/*
 * Copyright 2016-2017 the original author or authors.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Author - Pratik Kelwalkar
 *
 */

import {AfterViewInit, Component, EventEmitter, Input, Output, ViewChild} from '@angular/core';
import {AccordionService} from "./accordion.service";

@Component({
  selector: 'amexio-accordion-tab', template: `

    <button class="{{isTransparent ? 'accordion-transparent' : 'accordion'}} {{active ? 'active-accordion' : ''}} {{disabled ? 'accordion-disable' : ''}}" #btn1 (click)="onTabClick(btn1)">
      <div style="float: left;" *ngIf="leftIcon">
        <i class="fa {{leftIcon}}"></i>
      </div>
      {{header}}
      <div style="float: right">
        <i *ngIf="!angleIcon" class="fa" [ngClass]="{'fa-plus' : !active,'fa-minus' : active}" aria-hidden="true"></i>
        <i *ngIf="angleIcon" class="fa" [ngClass]="{'fa-angle-down' : !active,'fa-angle-up' : active}" aria-hidden="true"></i>
      </div>
    </button>
    <div class="panel" #contentPanel>
      <ng-content></ng-content>
    </div>
  `
})

export class AmexioAccordionTabComponent implements AfterViewInit {

  @Input() header: any;

  @Input() active: boolean;

  @Input('left-icon') leftIcon: string;

  @Output() onClick: EventEmitter<any> = new EventEmitter();

  @ViewChild('contentPanel') content : any;

  @Input('angle-icon') angleIcon : boolean;

  isTransparent : boolean;

  iconclassKey: string;

  paneId : number;

  parentId : number;

  @Input('disabled') disabled : boolean;

  constructor(private acc : AccordionService){
    this.paneId = Math.floor(Math.random() * 90000) + 10000;
  }

  ngAfterViewInit() {
    if(this.active)
      this.content.nativeElement.style.maxHeight = this.content.nativeElement.scrollHeight + 'px';
  }

  onTabClick(btn: any) {
    if(!this.disabled){
    this.active = !this.active;
    if (this.content.nativeElement.style.maxHeight) {
      this.content.nativeElement.style.maxHeight = null;
    } else {
      this.content.nativeElement.style.maxHeight = this.content.nativeElement.scrollHeight + 'px';
    }

    this.onClick.emit();
    // this.acc.onClick.next();
    this.acc.onClickEvent(this.paneId,this.parentId);
  }
  }

}
