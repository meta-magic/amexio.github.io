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

/*
Component Name : Amexio area chart properties
Component Selector : <amexio-chart-area-properties>
Component Description : An area chart that is rendered within the browser using SVG .Displays tips when hovering over points.
*/
import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'amexio-chart-area-properties', template: ``,
})
export class ChartAreaComponent implements OnInit {

/*
Properties
name : chart-background-color
datatype : string
version : 4.0 onwards
default : none
description : sets chart background color
*/
  @Input('chart-background-color') chartbackgroundcolor: string;

  /*
  not in use
*/
  @Input('left-position') leftposition: number;

  /*
  not in use
*/
  @Input('top-position') topposition: number;

  /*
Properties
name : chart-width
datatype : number
version : 4.0 onwards
default : none
description : sets chart width
*/
  @Input('chart-width') chartwidth: number;

  /*
  Properties
  name : chart-height
  datatype : number
  version : 4.0 onwards
  default : none
  description : sets chart height
  */

  @Input('chart-height') chartheight: number;

  constructor() {
  }

  ngOnInit() {
  }
}
