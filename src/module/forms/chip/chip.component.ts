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

import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'amexio-chip',
  templateUrl: './chip.component.html',
  styleUrls: ['./chip.component.css'],
})
export class AmexioChipComponent implements OnInit {
  /*
Properties
name : icon
datatype :
version : 5.3.1 onwards
default :
description : The icon is for determining of icon.
*/
  @Input('icon') icon = '';
  /*
Properties
name : label
datatype :
version : 5.3.1onwards
default :
description : The label is for determining of label.
*/
  @Input('label') label: any;
  /*
Properties
name : color
datatype :
version : 5.3.1onwards
default :
description : The color is for determining color of particular chip.
*/
  @Input ('color') color: any;
  /*
Properties
name : badge
datatype :
version : 5.3.1onwards
default :
description : The badge is for determining value of particular chip.
*/
  @Input('badge') badge: any;
  /*
Properties
name : closeable
datatype :
version : 5.3.1onwards
default :
description : The closeable is for closing particular chip.
*/
  @Input('closable') closable: false;
  /*
    Events
    name :  closeClick
    datatype : none
    version : none
    default : none
    description : It will fire only on selection of checkbox and gives you selected record data.
    */
  @Output() closeClick: any = new EventEmitter<any>();
  /*
   Events
   name :  labelClick
   datatype : none
   version : none
   default : none
   description : It will fire only on selection of checkbox and gives you selected record data.
   */
  @Output() labelClick: any = new EventEmitter<any>();

 @Input('index') index: string;

 @Input('selected') selected: boolean;
  constructor() {
  }
  onCloseClick(event: any) {
    this.closeClick.emit(this.createObject());
  }
  onLabelClick(event: any) {
    this.labelClick.emit(this.createObject());
  }
  ngOnInit() {
  }
  createObject(): object {
    const obj = {};
    obj['icon'] = this.icon;
    obj['label'] = this.label;
    obj['badge'] = this.badge;
    obj['closable'] = this.closable;
    obj['color'] = this.color;
    return obj;
  }
}
