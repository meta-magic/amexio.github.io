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

import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'amexio-tab',
  template: `
    <div role="tabpanel" class="tab-pane active" [attr.id]="elementId">
      <ng-content *ngIf="active"></ng-content>
    </div>
  `
})
export class TabComponent implements OnInit {

  @Input()  title: string;

  @Input()  active = false;

  @Input()  disabled = false;

  @Input()  icon  : string;

  elementId : string;


  constructor() {
    this.elementId = 'tab-pill'+Math.floor(Math.random() * 90000) + 10000;;
  }

  ngOnInit() {
  }
}
