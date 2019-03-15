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

import { Component, Host, Input, OnInit } from '@angular/core';
import { AmexioCheckBoxGroupComponent } from './checkbox.group.component';

const noop = () => {
};
@Component({
  selector: 'checkbox',
  templateUrl: './checkbox.component.html',
})
export class CheckboxComponent implements OnInit {
  // Placeholders for the callbacks which are later provided
  // by the Control Value Accessor
  private onTouchedCallback: () => void = noop;
  private onChangeCallback: (_: any) => void = noop;
  @Input() label: any;

  @Input() value: any;

  @Input() name: any;

  @Input() checked: boolean;

  tabFocus = false;

  @Input() disabled: boolean;

  componentId: string;
  constructor(@Host() private checkboxGroup: AmexioCheckBoxGroupComponent) { }

  toggleCheck() {
    if (!this.checked) {
      this.checkboxGroup.add(this.value);
    } else {
      this.checkboxGroup.remove(this.value);
    }
    this.checked = !this.checked;
  }

  isChecked() {
    return this.checked || this.checkboxGroup.contains(this.value);
  }
  onBlur() {
    this.tabFocus = false;
    this.onTouchedCallback();
  }
  onFocus() {
    this.tabFocus = true;
  }

  ngOnInit() {
    this.componentId = this.createCompId('checkbox', this.name);
    setTimeout(() => {
      if (this.checked) {
        this.checkboxGroup.add(this.value);
      }
    }, 200);
  }

  createCompId(inputType: any, name: any) {
    return inputType + '_' + name + '_' + Math.floor(Math.random() * 1000 + 999);
  }
}
