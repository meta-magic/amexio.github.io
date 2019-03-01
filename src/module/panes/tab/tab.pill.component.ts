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
* Created by pratik on 8/12/17.
*/

import { Component, EventEmitter, Input, OnInit, Output, ViewChild, ViewContainerRef } from '@angular/core';

@Component({
  selector: 'amexio-tab', templateUrl: './tab.pill.component.html',
})
export class AmexioTabPillComponent implements OnInit {

  /*
Properties
name : title
datatype : string
version : 4.0 onwards
default :
description : Title on Tab Button/Pill.
*/
  @Input() title: string;

  /*
Properties
name : disabled
datatype : boolean
version : 4.1.4 onwards
default : false
description : Disable property for tab
*/
  @Input() disabled = false;

  /*
Properties
name : active
datatype : boolean
version : 4.0 onwards
default : false
description : Set true for specific tab open as default tab..
*/
  @Input() active = false;

  /*
Properties
name : icon
datatype : string
version : 4.0 onwards
default :
description : Supports glyphicon only. Can add directly home instead of 'glyphicon glyphicon-home.
*/
  @Input() icon: string;

  /*
Properties
name : amexio-color
datatype : string
version : 4.1.9 onwards
default : black
description : Font color of label
*/
  @Input('amexio-color') amexiocolor: string;

  /*
 Properties
 name : closable
 datatype : boolean
 version : 4.2 onwards
 default : false
 description : Font color of label
 */
  @Input() closable: boolean = null;

  tabId: any;

  tablk: any;

  @ViewChild('target', { read: ViewContainerRef }) public target: any;

  constructor() {
    this.tabId = Math.floor(Math.random() * 90000) + 10000;
  }

  ngOnInit() {
  }
}
