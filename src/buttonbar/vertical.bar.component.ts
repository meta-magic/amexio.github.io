/*
 * Copyright 2016-2017 the original author or authors.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Author -  Pratik Kelwalkar
 *
 */
import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'amexio-vertical-bar',
  template:  `
    <div class="btn-group-vertical">
      <ng-content></ng-content>
    </div>
  `
})

export class VerticalButtonbarComponent implements OnInit {
  constructor() {
  }

  ngOnInit() {
  }
}
