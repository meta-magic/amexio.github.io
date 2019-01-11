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
* Created by ketangote on 8/16/17.
*/

/*
 Component Name : Amexio datapoints
 Component Selector : < amexio-center >
 Component Description : create datapoints
*/
import {
  Component, Input, OnInit,
} from '@angular/core';

@Component({
  selector: 'amexio-datapoints', template: `

  <div class="datapoints" [ngClass]="dpClass">
      <table width="100%" [style.background-color]="backgroundcolor" [style.color]="fontcolor">
        <tr *ngIf="north">
          <td [attr.colspan]="colspan">
            <ng-content select="amexio-north"></ng-content>
          </td>
        </tr>
        <tr>
          <td *ngIf="west">
            <ng-content select="amexio-west"></ng-content>
          </td>
          <td *ngIf="center">
            <ng-content select="amexio-center"></ng-content>
          </td>
          <td *ngIf="east">
            <ng-content select="amexio-east"></ng-content>
          </td>
        </tr>
        <tr *ngIf="south">
          <td [attr.colspan]="colspan">
            <ng-content select="amexio-south"></ng-content>
          </td>
        </tr>
      </table>
    </div>


  `, styles: [`
    .amexio-datapoints {

    }
  `],
})

export class DataPointsComponent implements OnInit {

  /*
Properties
name : north
datatype :  boolean
version : 4.0 onwards
default : false
description : Enable north position
*/
  @Input() north: boolean;

  /*
Properties
name : south
datatype :  boolean
version : 4.0 onwards
default : false
description : Enable south position
*/
  @Input() south: boolean;

   /*
Properties
name : west
datatype :  boolean
version : 4.0 onwards
default : false
description : Enable west position
*/
  @Input() west: boolean;

    /*
Properties
name : center
datatype :  boolean
version : 4.0 onwards
default : false
description : Enable center position
*/
  @Input() center: boolean;

  /*
Properties
name : east
datatype :  boolean
version : 4.0 onwards
default : false
description : Enable east position
*/
  @Input() east: boolean;

   /*
Properties
name : background-color
datatype :  string
version : 4.0 onwards
default :
description : Set background color
*/
  @Input('background-color') backgroundcolor: string;

  /*
Properties
name : font-color
datatype :  string
version : 4.0 onwards
default :
description : Set font color
*/
  @Input('font-color') fontcolor: string;

  /*
Properties
name : amexio-color
datatype :  string
version : 4.1 onwards
default :
description : Set font color
*/
  @Input('amexio-color') amexiocolor: '';

  colspan: number;

  dpClass: 'datapoint';

  constructor() {
    this.colspan = 1;
  }

  ngOnInit() {

    if (this.amexiocolor !== '') {
      this.dpClass = this.amexiocolor;
    }
    if (this.west) {
      this.colspan++;
    }

    if (this.east) {
      this.colspan++;
    }

  }

}
