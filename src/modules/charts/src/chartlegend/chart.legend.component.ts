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
    selector: 'amexio-chart-legend',
    template: ` `
})
export class ChartLegendComponent implements OnInit {


  @Input() legendPosition: string;

  //start,center,end
  @Input() legendAlignment: string;

  @Input() legendColor: string;

  @Input() legendFontName: string;

  @Input() legendFontSize: string;

  @Input() isLegendBold: boolean = false;

  //this work only in chart position is top
  @Input() maxLinesOfLegend: number;

  constructor() {
  }

  ngOnInit() {
  }
}
