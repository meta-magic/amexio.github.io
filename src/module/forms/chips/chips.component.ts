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
*/

import { Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { AmexioChipComponent } from '../chip/chip.component';

@Component({
  selector: 'amexio-chips',
  templateUrl: './chips.component.html',
  styleUrls: ['./chips.component.css'],
})
export class AmexioChipsComponent {
  /*
 Properties
 name : data
 datatype :
 version : 5.3onwards
 default :
 description : The Data is set of json value like icon,label and closable.
 */
  @Input('data') data: any[];
  /*
    Events
    name : selectedRowData
    datatype : none
    version : none
    default : none
    description : It will fire only on selection of checkbox and gives you selected record data.
    */
  @Output() selectedchipsData: any = new EventEmitter<any>();
  constructor() {
  }
  onCloseChipsClick(item: any) {
    this.data.forEach((element: any, index: number) => {
      if (element.label === item.label) {
        this.data.splice(index, 1);
      }
    });
    this.emitSelectedLabel(item);
  }
  emitSelectedLabel(item: any) {
    this.selectedchipsData.emit(item);
  }
}
