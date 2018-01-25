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

    <button class="accordion {{active ? 'active-accordion' : ''}}" #btn1 (click)="onTabClick(btn1)">{{header}}
      <div style="float: right"><i class="fa" [ngClass]="{'fa-plus' : !active,'fa-minus' : active}" aria-hidden="true"></i></div>
    </button>
    <div class="panel" #contentPanel>
      <ng-content></ng-content>
    </div>
  `
})

export class AmexioAccordionTabComponent implements AfterViewInit {

  @Input() header: any;

  @Input() active: boolean;

  @Output() onClick: EventEmitter<any> = new EventEmitter();

  @ViewChild('contentPanel') content : any;

  iconclassKey: string;

  paneId : number;

  parentId : number;

  constructor(private acc : AccordionService){
    this.paneId = Math.floor(Math.random() * 90000) + 10000;
  }

  ngAfterViewInit() {
    if(this.active)
      this.content.nativeElement.style.maxHeight = this.content.nativeElement.scrollHeight + 'px';
  }

  onTabClick(btn: any) {
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
