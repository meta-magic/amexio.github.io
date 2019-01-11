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
* Component Name : Amexio Form Action
* Component Selector : <amexio-form-action>
* Component Description : Amexio Form actions contains the action items within form
*/

import {AfterViewInit, Component, ContentChildren, Input, OnInit, QueryList} from '@angular/core';
import { AmexioButtonGroupComponent } from './../../forms/buttongroup/button.group.component';
import { AmexioButtonComponent } from './../../forms/buttons/button.component';

@Component({
  selector: 'amexio-form-action', template: '<ng-content></ng-content>',
})

export class AmexioFormActionComponent implements OnInit, AfterViewInit {
 /*
Properties
name : padding
datatype : string
version : 4.2 onwards
default : left
description : padding for Action.
*/
 @Input() padding: string;

  @ContentChildren(AmexioButtonComponent) btns: QueryList<AmexioButtonComponent>;
  buttons: AmexioButtonComponent[] = [];

  @ContentChildren(AmexioButtonGroupComponent) btngrp: QueryList<AmexioButtonGroupComponent>;

  constructor() {
  }

  ngOnInit() {
  }

  ngAfterViewInit() {

    if (this.btns.length > 0) {
      this.buttons = this.btns.toArray();
    } else if (this.btngrp.length > 0) {
      this.buttons = this.btngrp.toArray()[0].buttons;
    }
  }
}
