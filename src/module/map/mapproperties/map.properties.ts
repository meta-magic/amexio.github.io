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
 Component Name : Amexio Map
 Component Selector : <amexio-map-properties>
 Component Description : Map properties
*/
import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'amexio-map-properties', template: ``
})
export class MapProperties implements OnInit {

 
  /*
Properties 
name : chart-background-color
datatype : string
version : 4.0 onwards
default : none
description : user can give chart background color
*/ 
  @Input('chart-background-color') chartbackgroundcolor: string;


  /*
Properties 
name : left-position
datatype : number
version : 4.0 onwards
default : none
description : position from left
*/ 
  @Input('left-position') leftposition: number;


  /*
Properties 
name : top-position
datatype : number
version : 4.0 onwards
default : none
description : position from top
*/ 
  @Input('top-position') topposition: number;



  /*
Properties 
name : chart-width
datatype : number
version : 4.0 onwards
default : none
description : Width of chart
*/ 
  @Input('chart-width') chartwidth: number;


  /*
Properties 
name : chart-height
datatype : number
version : 4.0 onwards
default : none
description : height of chart
*/ 
  @Input('chart-height') chartheight: number;

  constructor() {
  }

  ngOnInit() {
  }
}
