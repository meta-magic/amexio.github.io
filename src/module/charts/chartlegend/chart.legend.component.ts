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
Component Name : Amexio chart legend
Component Selector : <amexio-chart-legend>
Component Description : describes chart legend properties
*/
import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'amexio-chart-legend', template: ` `,
})
export class ChartLegendComponent implements OnInit {

/*
Properties
name : position
datatype : string
version : 4.0 onwards
default :
description : Position of the legend.'bottom' - Below the chart.'top' - Above the chart.
*/
@Input() position: string;

  // start,center,end
/*
Properties
name : alignment
datatype : string
version : 4.0 onwards
default :
description : Alignment of the legend.'start' - Aligned to the start of the area allocated for the legend.'center' -
Centered in the area allocated for the legend 'end' - Aligned to the end of the area allocated for the legend.
*/
@Input() alignment: string;

/*
Properties
name : color
datatype : string
version : 4.0 onwards
default :
description : Color of chart legend. for example: 'red' or '#00cc00'.
*/
@Input() color: string;

/*
Properties
name : font-name
datatype : string
version : 4.0 onwards
default :
description : Font name of chart legend
*/
@Input('font-name') fontname: string;

/*
Properties
name : font-size
datatype : string
version : 4.0 onwards
default :
description : Font size of chart legend
*/
  @Input('font-size') fontsize: string;

/*
Properties
name : bold
datatype : boolean
version : 4.0 onwards
default : false
description : Set true for Legend text in bold
*/
  @Input() bold = false;

  // this work only in chart position is top
  /*
Properties
name : max-lines
datatype : number
version : 4.0 onwards
default :
description : Maximum number of lines in the legend. Set this to a number greater than one to add lines to your legend.
*/
  @Input('max-lines') maxlines: number;

  constructor() {
  }

  ngOnInit() {
  }
}
