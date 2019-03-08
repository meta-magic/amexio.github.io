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

import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'amexio-toolbar-item',
  template: `
  <div tabindex="1" [ngClass]="{'toolbaritemseperatorright':(seperatorposition === 'right'),
  'toolbaritemseperatorleft':(seperatorposition === 'left')}">
  <ng-content></ng-content>
  </div>
   `,
})
export class ToolbaroneComponent implements OnInit {
  /*
Properties
name :seperator-position
datatype :string
version : 4.2onwards
default :
description : This will seperate the toolbar right and left.
*/
@Input('seperator-position') seperatorposition: string;

  constructor() {
  }
  ngOnInit() {
  }
}
