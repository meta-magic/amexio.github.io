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
Component Name : Amexio chart horizontal axis
Component Selector : <amexio-chart-horizontal-axis>
Component Description : it describes horizontal axis properties of chart.
*/
import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'amexio-chart-horizontal-axis', template: ` `,
})
export class HorizontalAxisComponent implements OnInit {

/*
Properties
name : title
datatype : string
version : 4.0 onwards
default : none
description : title of horizontal axis
*/
@Input() title: string;

/*
Properties
name : title-color
datatype : string
version : 4.0 onwards
default : none
description : set color to horizontal axis title
*/
@Input('title-color') titlecolor: string;

  constructor() {
  }

  ngOnInit() {
  }
}
