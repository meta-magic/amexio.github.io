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
  templateUrl : './accordion.component.html',
  styleUrls : ['./accordion.component.scss']
})

export class AmexioAccordionTabComponent implements OnInit {

  @Input()    header : any;

  @Input()    expanded : boolean;

  @Output() onClick : EventEmitter<any> = new EventEmitter();

  isExpanded : boolean;

  ngOnInit() {
    this.isExpanded = this.expanded;
  }

  onTabClick(btn : any){
    btn.classList.toggle('active');
    let panel = btn.nextElementSibling;
    let icon = btn.children[0].children[0];

    if(icon.classList[1] == 'fa-plus'){
      icon.classList.remove('fa-plus');
      icon.classList.add('fa-minus');
    }
    else if(icon.classList[1] == 'fa-minus'){
      icon.classList.remove('fa-minus');
      icon.classList.add('fa-plus');
    }
    if (panel.style.maxHeight){
      panel.style.maxHeight = null;
    } else {
      panel.style.maxHeight = panel.scrollHeight + 'px';
    }

    this.onClick.emit()
  }

}
