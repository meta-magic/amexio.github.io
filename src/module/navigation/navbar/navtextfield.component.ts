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
import {
  Component, ElementRef, EventEmitter, forwardRef, Input, OnInit, Output, ViewChild, ViewEncapsulation} from '@angular/core';
import {ControlValueAccessor, NG_VALUE_ACCESSOR} from '@angular/forms';

const noop = () => {
};

@Component({
  selector: 'amexio-nav-textfield',
  template:
  `
  <input  [ngStyle]="{'color':color}" type="text" class="top-nav-input-control" [(ngModel)]="value"/>

  `,
  providers: [{
    provide: NG_VALUE_ACCESSOR, useExisting: forwardRef(() => AmexioNavTextFieldComponent), multi: true,
  }],
  encapsulation: ViewEncapsulation.None,
})

export class AmexioNavTextFieldComponent implements ControlValueAccessor, OnInit {
  private innerValue: any = '';
  private onTouchedCallback: () => void = noop;
  private onChangeCallback: (_: any) => void = noop;

  @Input('color') color: string;

  constructor() {
  }

  ngOnInit() {
  }
  // The internal dataviews model
  // Placeholders for the callbacks which are later provided
  // by the Control Value Accessor
  // get accessor
  get value(): any {
    return this.innerValue;
  }

  // set accessor including call the onchange callback
  set value(v: any) {
    if (v !== this.innerValue) {
      this.innerValue = v;
      this.onChangeCallback(v);
    }
  }

  // From ControlValueAccessor interface
  writeValue(value: any) {
    if (value !== this.innerValue) {
      this.innerValue = value;
    }
  }

  // From ControlValueAccessor interface
  registerOnChange(fn: any) {
    this.onChangeCallback = fn;
  }

  // From ControlValueAccessor interface
  registerOnTouched(fn: any) {
    this.onTouchedCallback = fn;
  }

}
