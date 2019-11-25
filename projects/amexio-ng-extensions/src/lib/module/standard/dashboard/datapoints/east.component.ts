/*
* Copyright [2019] [Metamagic]
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*     http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*
* Created by ketangote on 7/25/17.
*/

/*
 Component Name : Amexio east datapoints
 Component Selector : <amexio-east>
 Component Description : Represent the summary of the data in bullet point format.
*/
import {
  Component, Input, OnInit,
} from '@angular/core';

@Component({
  selector: 'amexio-east', template: `

    <div [ngClass]="cclass" class="datapoint-east" [attr.align]="contentalign" [style.background-color]="backgroundcolor"
         [style.color]="fontcolor" [style.width]="width" [style.height]="height">
      <ng-content></ng-content>
    </div>
  `,
})

export class DataPointEastComponent implements OnInit {

   /*
Properties
name : content-align
datatype :  string
version : 4.0 onwards
default : none
description :  Set content align like : center,left,right
*/
  @Input('content-align') contentalign: string;

    /*
Properties
name : background-color
datatype :  string
version : 4.0 onwards
default : none
description : Set background color
*/
  @Input('background-color') backgroundcolor: string;

   /*
Properties
name : font-color
datatype :  string
version : 4.0 onwards
default : none
description : Set font color
*/
  @Input('font-color') fontcolor: string;

  /*
Properties
name : width
datatype :  string
version : 4.0 onwards
default : none
description : 	Set width
*/
  @Input() width: string;

    /*
Properties
name : height
datatype :  string
version : 4.0 onwards
default : none
description : Set height
*/
  @Input() height: string;

  /*
Properties
name : c-class
datatype :  string
version : 4.0 onwards
default : none
description : To use custom css class
*/
  @Input('c-class') cclass: string;

  constructor() {
  }

  ngOnInit() {
    if (this.cclass == null) {
      this.cclass = 'datapoint-east';
    }
  }

}
