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
* Created by pratik on 13/12/17.
*/

import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
@Component({
  selector: 'amexio-btn-dropdown-item', template: '',
})
export class AmexioButtonDropDownItemComponent implements OnInit {
/*
Properties
name : label
datatype : string
version : 4.0 onwards
default : none
description : gives label to the button
*/
  @Input() label: string;

 /*
Properties
name :  badge
datatype : number
version : 4.1.9 onwards
default : none
description : badge  describes the badge value that has to be displayed on button
*/
@Input('badge') badge: number;
  /*
Properties
name : disabled
datatype : boolean
version : 4.0 onwards
default : false
description : Enable/Disables the button
*/
  @Input() disabled: boolean;
/*
Properties
name :  icon
datatype : string
version : 4.0 onwards
default : none
description : Fa icon class name
*/
  @Input() icon: string;
/*
Events
name : onClickRoute
datatype : string
version : 4.0 onwards
default : none
description : routes on click of button
*/
  @Input() onClickRoute: string;

  iconStyleClass: string;

/*
Events
name : onItemClick
datatype : none
version : none
default : none
description : Fire when button-dropdown item button/link click
*/
  @Output() onItemClick: EventEmitter<any> = new EventEmitter<any>();
  constructor() {
  }
  ngOnInit() {
  }
}
