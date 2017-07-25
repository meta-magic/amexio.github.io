/*
 * Copyright 2016-2017 the original author or authors.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Author - Ketan Gote, Pratik Kelwalkar, Dattaram Gawas
 *
 */

import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';

@Component({
  selector: 'amexio-btn-dropdown-item',
  template: ``
})
export class DropdownItemComponent implements OnInit {

  @Input()    label: string;

  @Input()    disabled: boolean;

  @Input()    icon: string;

  @Input()    onClickRoute: string;

  iconStyleClass: string;

  @Output()   onItemClick: EventEmitter<any> = new EventEmitter<any>();
  constructor() {
  }
  ngOnInit() {
  }
}
