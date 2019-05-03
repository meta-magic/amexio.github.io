/*
* Copyright [2019] [Metamagic]
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*     http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*
*/

import {Component,  HostBinding, Input, OnInit} from '@angular/core';

@Component({
  selector: 'amexio-grid-item',
  template: `
          <ng-content></ng-content>
  `,
})
export class AmexioGridItemComponent implements OnInit {
  /*
Properties
name : name
datatype :
version : 5.3.1onwards
default : Type of name header/leftside/main/rightside/footer.
description : The name is for determining the name of item.
*/
  @HostBinding('class') hostname: any;
  private _name: string;

  get name(): string{
    return this._name;
  }

  @Input('name')
  set name(value: string) {
    this._name = value;
    this.hostname = this._name;
  }

  constructor() {
  }

  ngOnInit() {
   this.insertStyleSheetRule ('.' + this.name + '{ grid-area: ' + this.name + ' } ' );
   }

   insertStyleSheetRule(ruleText: any) {
    const sheets: any = document.styleSheets;
    if (sheets.length === 0) {
      const style = document.createElement('style');
      style.appendChild(document.createTextNode(''));
      document.head.appendChild(style);
    }
    let isCssAdded = false;
    for (const sh of sheets) {
      const sheet: any = sh;
      if (!isCssAdded && (sheet && sheet.href === null && sheet.rules)) {
        try {
          sheet.insertRule(ruleText, 0);
          isCssAdded = true;
        } catch (e) {
        }
      }
    }
  }
}
