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
* Created by  Pratik on 7/2/18.
*/

import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
@Component({
  selector: 'amexio-label',
  template: `
  <label [ngClass]="{'labelFontClass': blackLabel, 'eclipse' : !wordwrap}" style="outline: none"
  role="text" tabindex="1" class="label-content {{styleClass}}" (click)="onLabel($event)"
    [ngStyle]="{'color' : fontColor,'cursor': enableclick ? 'pointer': 'text'}">
    <ng-content></ng-content>
    <span class="label-badge" *ngIf="badge">{{badge}}</span>
  </label>
  `,
})
export class AmexioLabelComponent implements OnInit {
  /*
  Properties
  name : badge
  datatype : number
  version : 4.1.9 onwards
  default : none
  description : Badge Value for Label.
  */
  @Input('badge') badge: number;
  /*
  Properties
  name : size
  datatype : string
  version : 4.0 onwards
  default : small
  description : Responsive Font size, large,medium,small & large-bold,medium-bold,small-bold
  */
  @Input('size') styleClass: string;
  /*
  Properties
  name : font-color
  datatype : string
  version : 4.0 onwards
  default : small
  description : Font color of label
  */
  @Input('font-color') fontColor: string;
  @Input('enable-click') enableclick = false;
  @Input('word-wrap') wordwrap = true;

  // For internal use
  @Input() blackLabel = false;

  @Output() onClick: any = new EventEmitter<any>();

  tempStyleArray: any = ['large', 'medium', 'small', 'bold', 'large-bold', 'medium-bold', 'small-bold',
    'large-44', 'large-24', 'large-50', 'large-54', 'large-56', 'large-60', 'large-64', 'large-68', 'large-78', 'large-9vw',
    'large-44-bold', 'large-50-bold', 'large-24-bold', 'large-4vw', 'large-4vw-bold',
    'large-54-bold', 'large-56-bold', 'large-60-bold', 'large-64-bold', 'large-68-bold', 'large-78-bold', 'large-9vw-bold'];
  constructor() { }
  ngOnInit() {
    if (this.styleClass == null) {
      this.styleClass = 'small';
    } else {
      this.styleClass = this.tempStyleArray.find((x: any) => x === this.styleClass);
    }
  }
  onLabel(event: any) {
    if (this.enableclick) {
      this.onClick.emit(event);
    }
  }
}
