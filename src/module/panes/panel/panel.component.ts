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
          <ng-container *ngIf="customheader">
            <div class="panel-header">
              {{title}}
              <div class="custom-header">
                <ng-content select="amexio-header"></ng-content>
                <div class="panel-icon" (click)="onTabClick(btn1)">
                  <i [class]="iconclassKey" aria-hidden="true"></i>
                </div>
              </div>
            </div>
          </ng-container>
        </div>
      </ng-container>
      <ng-container *ngIf="expanded">
        <div class="panel-panel" [style.max-height.px]="height">
          <ng-content></ng-content>
        </div>
      </ng-container>

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


  ngOnInit() {
    if (!this.header){
      this.expanded = true;
    }
    this.iconclassKey = 'fa fa-caret-down';
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

    this.expanded = !this.expanded;
    this.onClick.emit()
  }

}
