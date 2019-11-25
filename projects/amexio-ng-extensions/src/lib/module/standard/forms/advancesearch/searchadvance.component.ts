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
* Created by manisha on 7/6/18.
*/

import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'amexio-searchbox-options',
  template: `
  <form [attr.aria-expanded]="advanceSearchFlag" class="advancesearchform"
  *ngIf="advanceSearchFlag"  [style.width]="formwidth+'px'">
    <label tabindex = "0" class="search-form-label" [attr.aria-labellledby]="title">
        {{title}}
    </label>
    <span tabindex = "0"  aria-label="close form button"
     class="fa fa-window-close fa-1x close-icon"
     (keyup.esc)="closeSearchForm()"
     (keyup.enter)="closeSearchForm()" (click)="closeSearchForm()"></span>
    <hr class="hrclass">
             <ng-content></ng-content>
</form>
`,
})

export class AmexioSearchAdvanceComponent implements OnInit {
  @Input() title = 'Advance Search';
  @Input('form-width') formwidth = 0;
  advanceSearchFlag = false;
  constructor() { }
  closeSearchForm() {
    this.advanceSearchFlag = false;
  }
  ngOnInit() {
  }
}
