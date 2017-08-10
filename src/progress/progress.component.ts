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

import {Component, Input, OnInit} from '@angular/core';
@Component({
  selector: 'amexio-progress-bar',
  template : `

      <div class="amexio-progress" *ngIf="showProgress">
          <div class="progress-bar progress-bar-striped {{progressType !=null ? 'bg-'+progressType : ''}} active" role="progressbar" [attr.aria-valuenow]="currentValue" [attr.aria-valuemin]="minValue" [attr.aria-valuemax]="maxValue" [style.width.%]="infinteMode ? 100 : this.currentValue">
              <span>{{infinteMode ? displayText : currentValue+'%'}}<span class="dotdotdot"></span></span>
          </div>
      </div>

  `,
    styleUrls : ['progress.component.css']
})

export class ProgressComponent implements OnInit{

  @Input()    showProgress : boolean = true;

  @Input()    infinteMode : boolean;

  @Input()    minValue : string;

  @Input()    maxValue  : string;

  @Input()    currentValue : string;

  @Input()    progressType : string;

  displayText : string;

  barColorClass : string;



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
}


