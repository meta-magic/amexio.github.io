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

 /*
 Component Name : Amexio panel
 Component Selector : <amexio-panel>
 Component Description : Panel provides an easy way to organize big forms by
 grouping the fields in panel
*/
import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';

@Component({
  selector: 'amexio-panel', template: `
    <div class="panel-box">
      <ng-container *ngIf="header">
        <div class="panel-accordion" #btn1 >
            <div class="panel-header">
              {{title}}
              <div class="custom-header">
                <ng-content select="amexio-header"></ng-content>
                <div class="panel-icon" (click)="onTabClick(btn1)">
                  <i [class]="iconclassKey" aria-hidden="true"></i>
                </div>
              </div>
            </div>
        </div>
      </ng-container>
      <ng-container *ngIf="expanded">
        <div class="panel-panel" [style.max-height.px]="height">
          <ng-content></ng-content>
        </div>
      </ng-container>
    </div>
  `,
})

export class AmexioPanelComponent implements OnInit {

   /*
Properties
name : title
datatype : string
version : 4.0 onwards
default :
description : Title for panel.
*/
  @Input() title: any;

    /*
Properties
name : header
datatype :  boolean
version : 4.0 onwards
default : true
description : 	Enable/Disabled header.
*/
  @Input() header: boolean;

  /*
Properties
name : expanded
datatype :  boolean
version : 4.0 onwards
default : false
description : Pane will expand or collapse based on the boolean.
*/
  @Input() expanded: boolean;

    /*
Properties
name : height
datatype :  number
version : 4.0 onwards
default : none
description : Height of panel must be in px ex.100, 250..
*/
  @Input() height: number;

     /*
Events
name : onClick
datatype : none
version : none
default : none
description : Fires the on accordion pane click event.
*/
  @Output() onClick: EventEmitter<any> = new EventEmitter();

  iconclassKey: string;

  ngOnInit() {
    if (!this.header) {
      this.expanded = true;
    }
    if (this.expanded) {
      this.iconclassKey = 'fa fa-caret-up';
    } else {
      this.iconclassKey = 'fa fa-caret-down';
    }
    if (this.height) {
     return this.height;
    }
  }

  onTabClick(btn: any) {
    btn.classList.toggle('active-accordion');
    if (this.iconclassKey === 'fa fa-caret-down') {
      this.iconclassKey = 'fa fa-caret-up';
    } else if (this.iconclassKey === 'fa fa-caret-up') {
      this.iconclassKey = 'fa fa-caret-down';
    }
    this.expanded = !this.expanded;
    this.onClick.emit();
  }

}
