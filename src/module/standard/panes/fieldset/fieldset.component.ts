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
* Created by pratik on 12/12/17.
*/
import { animate, state, style, transition, trigger} from '@angular/animations';
import { Component, Input, OnInit } from '@angular/core';
import { LifeCycleBaseComponent } from '../../../base/lifecycle.base.component';

@Component({
  selector: 'amexio-fieldset',
  templateUrl: './fieldset.component.html',
  animations: [
    trigger('fieldsetContent', [
      state('hidden', style({
        height: '0px',
      })),
      state('visible', style({
        height: '*',
      })),
      transition('visible => hidden', animate('400ms cubic-bezier(0.86, 0, 0.07, 1)')),
      transition('hidden => visible', animate('400ms cubic-bezier(0.86, 0, 0.07, 1)')),
    ]),
  ],
})
export class AmexioFieldSetComponent extends LifeCycleBaseComponent implements OnInit {

  /*
Properties
name : collapsible
datatype : boolean
version : 4.0 onwards
default : true
description : Set value true for collapsible fieldset.
*/
  @Input() collapsible: boolean;

    /*
Properties
name : expanded
datatype : boolean
version : 4.0 onwards
default : true
description : Set value true for collapsible fieldset.
*/
@Input() expanded = true;

  /*
Properties
name : title
datatype : string
version : 4.0 onwards
default :
description : Title for fieldset.
*/
  @Input() title: string;

  isActive: boolean;

  constructor() {
    super();
  }

  ngOnInit() {
    if (this.expanded) {
      this.isActive = true;
    } else {
      this.isActive = false;
    }
  }

  onLegendClick() {
    if (this.collapsible) {
      this.isActive = !this.isActive;
    }
  }

}
