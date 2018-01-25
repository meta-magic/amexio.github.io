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
import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';

@Component({
  selector: 'amexio-panel', template: `

    <div class="panel-box">
      <ng-container *ngIf="header">
        <div class="panel-accordion" #btn1 >
          <ng-container *ngIf="customheader; else elseBolck">
            <header
              [ngClass]="{'flex-start':(headeralign=='left'),'flex-end':(headeralign=='right'),'flex-center':(headeralign=='center')}">
              <ng-content select="amexio-header"></ng-content>
              <div style="float: right" (click)="onTabClick(btn1)"><i [class]="iconclassKey" aria-hidden="true"></i></div>
            </header>
          </ng-container>
          <ng-template #elseBolck>
            {{title}}
            <div style="float: right" (click)="onTabClick(btn1)"><i [class]="iconclassKey" aria-hidden="true"></i></div>
          </ng-template>
        </div>
      </ng-container>
      <div class="panel" [style.max-height.px]="height">
        <ng-content></ng-content>
      </div>
    </div>

  `
})

export class AmexioPanelComponent implements OnInit {

  @Input() title: any;

  @Input() header: boolean;

  @Input() expanded: boolean;

  @Input() height: number;

  @Input('custom-header') customheader: boolean;

  @Output() onClick: EventEmitter<any> = new EventEmitter();

  iconclassKey: string;

  isExpanded: boolean;

  ngOnInit() {
    this.isExpanded = this.expanded;
    this.iconclassKey = 'fa fa-caret-down';
    if (!this.header && this.height == null) {
      this.height = 200;
    }
    if(this.height){
      this.height = this.height;
    }

  }

  onTabClick(btn: any) {
    btn.classList.toggle('active-accordion');
    let panel = btn.nextElementSibling;
    if (this.iconclassKey == 'fa fa-caret-down') {
      this.iconclassKey = 'fa fa-caret-up';
    } else if (this.iconclassKey == 'fa fa-caret-up') {
      this.iconclassKey = 'fa fa-caret-down';
    }
    if (panel.style.maxHeight) {
      this.height = null;
      panel.style.maxHeight = null;
    } else {
      panel.style.maxHeight = panel.scrollHeight + 'px';
    }

    this.onClick.emit()
  }

}
