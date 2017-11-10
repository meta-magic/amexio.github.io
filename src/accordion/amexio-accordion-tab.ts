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
declare var $;
 import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';

 @Component({
  selector: 'amexio-accordion-tab',
  template: `

    <div class="card">
      <div class="card-header" role="tab" [attr.id]="headerId">
        <h6 class="mb-0">
          <a data-toggle="collapse" [attr.data-parent]="'#'+'accordion'" [attr.aria-expanded]="expanded" [attr.aria-controls]="headerId" (click)="onHeaderClick()">
            <i class="{{isExpanded ? 'fa fa-chevron-down' : 'fa fa-chevron-right'}}"></i> {{header}}
          </a>
        </h6>
      </div>

      <div [attr.id]="elementId" class="collapse" role="tabpanel" [attr.aria-labelledby]="headerId">
        <div class="card-block">
          <ng-content></ng-content>
        </div>
      </div>
    </div>
  `
 })

 export class AmexioAccordionTabComponent implements OnInit {

  @Input()    header : any;

  @Input()    expanded : boolean;

  headerId : string;

  parentId : string;

  elementId : any;

  @Output() onClick : EventEmitter<any> = new EventEmitter();

  isExpanded : boolean;

  constructor() {
    this.elementId = 'acc-' + Math.floor(Math.random()*90000) + 10000;
    this.headerId = 'header-' + Math.floor(Math.random()*90000) + 10000;
  }

  ngOnInit() {
    this.isExpanded = this.expanded;
  }

  ngAfterViewInit(){
    if(this.expanded)
      $('#'+this.elementId).collapse('show');
    else
      $('#'+this.elementId).collapse('hide');
  }

   onHeaderClick(){
    this.onClick.emit();
     $('#'+this.elementId).collapse('show');
     this.isExpanded = true;
   }

 }
