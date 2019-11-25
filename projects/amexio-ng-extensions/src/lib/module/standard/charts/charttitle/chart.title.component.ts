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
Component Name : Amexio chart title
Component Selector : <amexio-chart-title>
Component Description : describes chart title properties
*/
import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'amexio-chart-title', template: ` `,
})

export class ChartTitleComponent implements OnInit {

 /*
Properties
name : title
datatype : string
version : 4.0 onwards
default :
description : Title to display above the chart.
*/
@Input() title: string;

 /*
Properties
name : position
datatype : string
version : 4.0 onwards
default :
description : Position of chart title
*/
@Input() position: string;

 /*
Properties
name : color
datatype : string
version : 4.0 onwards
default :
description : Color of chart title.
*/
@Input() color: string;

 /*
Properties
name : font-name
datatype : string
version : 4.0 onwards
default : none
description : Font name of chart title.
*/
@Input('font-name') fontname: string;

 /*
Properties
name : font-size
datatype : number
version : 4.0 onwards
default :
description : Font size of chart title.
*/
@Input('font-size') fontsize: number;

 /*
Properties
name : bold
datatype : boolean
version : 4.0 onwards
default : false
description : Set true for title in bold font.
*/
@Input() bold: boolean;

 /*
Properties
name : italic
datatype : boolean
version : 4.0 onwards
default :false
description : Set true for title text in italic style.
*/
@Input() italic: boolean;

  constructor() {
  }

  ngOnInit() {
  }
}
