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

import {AfterContentInit, Component, ContentChildren, Input, OnInit, QueryList, ViewChildren} from '@angular/core';
import {ProgressMultiComponent} from "./progress.bar";
@Component({
  selector: 'amexio-progress-bar',
  template : `

      <div class="progress" *ngIf="showProgress && !multi">
          <div class="progress-bar {{stripped ? 'progress-bar-striped' : ''}} {{progressType !=null ? 'bg-'+progressType : ''}} active" role="progressbar" [attr.aria-valuenow]="currentValue" [attr.aria-valuemin]="minValue" [attr.aria-valuemax]="maxValue" [style.width.%]="infinteMode ? 100 : this.currentValue" [style.height.px]="height">
              <span *ngIf="label == '' || label == null">{{infinteMode ? displayText : currentValue+'%'}}<span class="dotdotdot"></span></span>
              <span *ngIf="label != null">{{label}}<span class="dotdotdot"></span></span>
          </div>
      </div>
    
    <div class="progress" *ngIf="multi">
      <div *ngFor="let bar of barData" class="progress-bar" [ngClass]="{'bg-success' : bar.type=='success','bg-info' : bar.type == 'info'}"
           role="progressbar" [style.width.%]="bar.value" [attr.aria-valuenow]="bar.value" [attr.aria-valuemin]="bar.minValue"
           [attr.aria-valuemax]="bar.maxValue">

      </div>
    </div>
    
    <ng-content></ng-content>

  `,
    styles : [`            
        .progress {
            
        }

        .progress .progress-bar.active {
            font-weight: 700;
            animation: progress-bar-stripes .5s linear infinite;
        }

        .dotdotdot:after {
            font-weight: 300;
            content: '...';
            display: inline-block;
            width: 20px;
            text-align: left;
            animation: dotdotdot 1.5s linear infinite;
        }

        @keyframes dotdotdot {
            0%   { content: '...'; }
            25% { content: ''; }
            50% { content: '.'; }
            75% { content: '..'; }
        }
    `]
})

export class ProgressComponent implements OnInit,AfterContentInit{

  @Input()    showProgress : boolean = true;

  @Input()    infinteMode : boolean;

  @Input()    minValue : string;

  @Input()    maxValue  : string;

  @Input()    currentValue : string;

  @Input()    progressType : string;

  @Input()    label : any;

  @Input()    height : any;

  @Input()    stripped : boolean;

  @Input()    multi : boolean;

  displayText : string;

  barColorClass : string;

  @ContentChildren(ProgressMultiComponent)  bars : QueryList<ProgressMultiComponent>;

  barData : any[]= [];

  constructor(){

  }

  ngOnInit(){
    if(this.infinteMode){
      this.displayText = 'Please wait';
      this.currentValue = '100';
      this.minValue = '0';
      this.maxValue = '100';
    }

    else
      this.displayText = this.currentValue+'%';
  }

  ngAfterContentInit(){
    if(this.multi){
      this.createBarConfig();
    }
  }

  createBarConfig() {
    let barRefArray = [];
    debugger;
    barRefArray = this.bars.toArray();
    for (let cr = 0 ; cr < barRefArray.length; cr++) {
      let barConfig = barRefArray[cr];
      let data : any = {
        type : barConfig.type,
        value : barConfig.value, minValue: barConfig.minValue,
        maxValue:barConfig.maxValue
      };
      this.barData.push(data);
    }
  }
}


