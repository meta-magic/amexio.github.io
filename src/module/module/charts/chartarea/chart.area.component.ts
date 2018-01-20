/*
 * Copyright 2016-2017 the original author or authors.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Author - Sagar Jadhav
 *
 */
import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'amexio-chart-area-properties', template: ``
})
export class ChartAreaComponent implements OnInit {

  @Input('chart-background-color') chartbackgroundcolor: string;

  @Input('left-position') leftposition: number;

  @Input('top-position') topposition: number;

  @Input('chart-width') chartwidth: number;

  @Input('chart-height') chartheight: number;

  constructor() {
  }

  ngOnInit() {
  }
}
