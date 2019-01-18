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
* Created by pratik on 8/1/18.
*/

import {Component, HostBinding, Input, OnInit} from '@angular/core';
import {DomSanitizer} from '@angular/platform-browser';

@Component({
  selector: 'amexio-column', templateUrl: 'column.component.html',
})

export class AmexioColumnComponent implements OnInit {
  size_: string;

  colclass: string;
  @HostBinding('attr.class') role = this.colclass;

  constructor() {

  }
   /*
Properties
name : FitHeight
datatype : any
version : 5.2 onwards
default :boolen
description : Column size*/
@Input('fit') fit: false;
/*
Properties
name : size
datatype : any
version : 4.0 onwards
default :
description : Column size*/
  @Input()
  set size(value: any) {
    this.size_ = value;
    this.colclass = 'flex-col flex-col-' + value;
    this.role = this.colclass;
  }

  get size() {
    return this.size_;
  }

  ngOnInit() {

  }
}
