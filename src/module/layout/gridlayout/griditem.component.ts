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
import { Component, EventEmitter, HostBinding, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'amexio-grid-item',
  templateUrl: './griditem.component.html',
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

  get name(): string {
    return this._name;
  }

  @Input('name')
  set name(value: string) {
    this._name = value;
    this.hostname = this._name;
  }

  @Input('title') title: string;

  @Input('hc-enabled') hcEnabled: boolean;

  @Input('hc-direction') hcDirection = 'right';

  @Input('vc-enabled') vcEnabled: boolean;

  @Input('vc-direction') vcDirection = 'top';

  @Output('onToggle') onToggle = new EventEmitter<any>();

  @Input('min-content') mincontent: boolean;

  hcPosition: string;
  vcPosition: string;
  cPosition: string;
  iconDegree: string;
  iconDegreeData: string[];
  showContent = true;
  containerDirection = 'column';

  constructor() {
    this.iconDegreeData = [];
    this.iconDegreeData['vc-towards-top-true'] = 'rotate(270deg)';
    this.iconDegreeData['vc-towards-bottom-true'] = 'rotate(90deg)';
    this.iconDegreeData['hc-towards-left-true'] = 'rotate(180deg)';
    this.iconDegreeData['hc-towards-right-true'] = 'rotate(0deg)';

    this.iconDegreeData['vc-towards-top-false'] = 'rotate(90deg)';
    this.iconDegreeData['vc-towards-bottom-false'] = 'rotate(270deg)';
    this.iconDegreeData['hc-towards-left-false'] = 'rotate(0deg)';
    this.iconDegreeData['hc-towards-right-false'] = 'rotate(180deg)';
  }

  ngOnInit() {
    if (this.hcEnabled || this.vcEnabled) {
      this.insertStyleSheetRule('.' + this.name + '{ grid-area: ' + this.name + ' ; padding: 0px } ');
    } else {
      this.insertStyleSheetRule('.' + this.name + '{ grid-area: ' + this.name + ' ; padding: 5px } ');
    }
  }

  insertStyleSheetRule(ruleText: any) {
    const sheets: any = document.styleSheets;
    if (sheets.length === 0) {
      const style = document.createElement('style');
      style.appendChild(document.createTextNode(''));
      document.head.appendChild(style);
    }
    let isCssAdded = false;

    if (navigator.userAgent.search('Firefox') === -1) {
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
    } else {
      const sheet: any = sheets[sheets.length - 1];
      isCssAdded = false;
      sheet.insertRule(ruleText, sheet.rules ? sheet.rules.length : sheet.cssRules.length);
    }
    this.setClassDefinition();
  }

  setClassDefinition(): void {
    if (this.hcEnabled) {
      this.hcPosition = 'hc-towards-' + this.hcDirection;
      this.cPosition = 'grid-' + this.hcPosition;
      this.iconDegree = this.iconDegreeData[this.hcPosition + '-' + this.showContent];
      this.containerDirection = (this.showContent) ? 'column' : 'row';
    } else if (this.vcEnabled) {
      this.vcPosition = 'vc-towards-' + this.vcDirection;
      this.cPosition = 'grid-' + this.vcPosition;
      this.iconDegree = this.iconDegreeData[this.vcPosition + '-' + this.showContent];
      this.containerDirection = 'column';
    }
  }

  toggle() {
    this.showContent = !this.showContent;
    this.setClassDefinition();
    this.onToggle.emit(this);
  }
}
