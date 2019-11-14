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
*  Created by sagar on 6/9/17.
*/
import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'amexio-step-block', template: `
  `,
})

export class StepBlockComponent implements OnInit {

  /*
Properties
name : active
datatype : boolean
version : 4.0 onwards
default : false
description : The current active step.
*/
  @Input() active: boolean;

    /*
Properties
name : label
datatype : string
version : 4.0 onwards
default :
description : Label for step.
*/
  @Input() label: string;

    /*
Properties
name : icon
datatype : string
version : 4.0 onwards
default :
description : Icon for step box.
*/
  @Input() icon: string;

  constructor() {
  }

  ngOnInit() {
  }
}
