/*
* Copyright [2019] [Metamagic]
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
* http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*
*  Created by Sagar.
*/
import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'amexio-map-properties', template: ``,
})
export class MapPropertiesComponent implements OnInit {
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
