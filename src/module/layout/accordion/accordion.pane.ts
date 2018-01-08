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
  selector: 'amexio-accordion-tab',
  template: `

    <button class="accordion" #btn1 (click)="onTabClick(btn1)">{{header}}<div style="float: right"><i [class]="iconClassKey" aria-hidden="true"></i></div> </button>
    <div class="panel">
      <ng-content></ng-content>
    </div>
  `
})

export class AmexioAccordionTabComponent implements OnInit {

  @Input()    header : any;

  @Input()    expanded : boolean;

  @Output() onClick : EventEmitter<any> = new EventEmitter();

  iconClassKey : string;

  isExpanded : boolean;

  ngOnInit() {
    this.isExpanded = this.expanded;
    this.iconClassKey = 'fa fa-plus';
  }

  onTabClick(btn : any){
    btn.classList.toggle('active');
    let panel = btn.nextElementSibling;
    // let icon = btn.children[0].children[0];

    if(this.iconClassKey == 'fa fa-plus'){
      this.iconClassKey = 'fa fa-minus';
    }
    else if(this.iconClassKey == 'fa fa-minus'){
      this.iconClassKey = 'fa fa-plus';
    }

    if (panel.style.maxHeight){
      panel.style.maxHeight = null;
    } else {
      panel.style.maxHeight = panel.scrollHeight + 'px';
    }

    this.onClick.emit()
  }

}
