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
* Created by ketangote on 1/4/18.
*/

import { Component, HostBinding, Input, OnInit } from '@angular/core';

@Component({
  selector: 'amexio-borderlayout-item',
  templateUrl: './borderlayoutitem.component.html',
})
export class AmexioBorderLayoutItemComponent implements OnInit {

  /*
Properties
name : position
datatype : string
version : 4.0 onwards
default :
description : Layout the contents to North , East , West , Center & South positions
*/
  @Input() position: string;
  positionClass= 'borderlayout-';
  @HostBinding('attr.class') role = this.positionClass;

  constructor() {
  }
  ngOnInit() {
  }

  getClassType() {
    let pos = '';
    if (this.position.toLowerCase() === 'north') {
      pos = 'N';
    } else if (this.position.toLowerCase() === 'east') {
      pos = 'E';
    } else if (this.position.toLowerCase() === 'center') {
      pos = 'C';
    } else if (this.position.toLowerCase() === 'west') {
      pos = 'W';
    } else if (this.position.toLowerCase() === 'south') {
      pos = 'S';
    }

    this.positionClass = this.positionClass + pos;
    this.role = this.positionClass;

    return pos;
  }
}
