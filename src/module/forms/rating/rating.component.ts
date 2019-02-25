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
* Created by  Pratik .
*/
import { CommonModule } from '@angular/common';
import { Component, EventEmitter, forwardRef, HostListener, Input, NgModule, OnInit, Output } from '@angular/core';
import { AbstractControl, ControlValueAccessor, NG_VALIDATORS, NG_VALUE_ACCESSOR, Validator } from '@angular/forms';
import { AmexioFormValidator } from './../form-validator/amexio.form.validator.component';

@Component({
  selector: 'amexio-rating-input',
  templateUrl: './rating.component.html',
  providers: [{
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => AmexioRatingComponent),
    multi: true,
  },
  {
    provide: NG_VALIDATORS,
    useExisting: forwardRef(() => AmexioRatingComponent),
    multi: true,
  },
  ],
})
export class AmexioRatingComponent extends AmexioFormValidator implements OnInit, ControlValueAccessor, Validator {
  /*
  Properties
  name : icon-class
  datatype : string
  version : 4.0 onwards
  default : star-icon
  description : Sets if custom icon class is required
  */
  @Input('icon-class') iconclass = 'star-icon';
  /*
  Properties
  name : full-icon
  datatype : string
  version : 4.0 onwards
  default :
  description : 	Icon for selected rating .This attribute is useful only
  when user have custom rating icons.example
  */
  @Input('full-icon') fullicon = '★';
  /*
  Properties
  name : empty-icon
  datatype : string
  version : 4.0 onwards
  default :
  description : Icon for non-selected rating .This attribute is useful only
  when user have custom rating icons.example
  */
  @Input('empty-icon') emptyicon = '☆';
  /*
  Properties
  name : read-only
  datatype : boolean
  version : 4.0 onwards
  default : false
  description : If true will not react on any user events.
  */
  @Input('read-only') readonly: boolean;
  /*
  Properties
  name : disabled
  datatype : boolean
  version : 4.0 onwards
  default : false
  description : If true will not react on any user events and show disable icon over
  */
  @Input() disabled: boolean;
  /*
  Properties
  name : required
  datatype : boolean
  version : 4.0 onwards
  default : false
  description : validates the field
  */
  @Input() required: boolean;
  /*
  Properties
  name : float
  datatype : boolean
  version : 4.0 onwards
  default :false
  description :
  */
  @Input() float: boolean;
  /*
  Properties
  name : field-label
  datatype : string
  version : 4.0 onwards
  default :
  description : The label of this field
  */
  @Input('field-label') fieldlabel: string;
  /*
  Properties
  name : titles
  datatype : string array
  version : 4.0 onwards
  default : 1,2,3..
  description : Array of titles
  */
  @Input() titles: string[] = [];
  /*
  Properties
  name : max
  datatype : number
  version : 4.0 onwards
  default :
  description : Number of stars for rating component.
  */
  @Input()
  set max(max: number) {
    this._max = max;
    this.buildRanges();
  }
  get max() {
    return this._max;
  }

  componentId: any;
  starId: any;
  ratingRangeData: any = [];

  // -------------------------------------------------------------------------
  // Outputs
  // -------------------------------------------------------------------------
  /*
  Events
  name : onHover
  datatype : any
  version : 4.0 onwards
  default :
  description : Fires on hovering component
  */
  @Output() onHover = new EventEmitter();
  /*
  Events
  name : onLeave
  datatype : any
  version : 4.0 onwards
  default :
  description : fires on leaving component and returns its value
  */
  @Output() onLeave = new EventEmitter();
  // -------------------------------------------------------------------------
  // Public
  // -------------------------------------------------------------------------
  model: number;
  ratingRange: number[];
  hovered = 0;
  hoveredPercent: number = undefined;
  // -------------------------------------------------------------------------
  // Private
  // -------------------------------------------------------------------------
  private _max = 5;
  private onChange: (m: any) => void;
  private onTouched: (m: any) => void;
  // -------------------------------------------------------------------------
  // Implemented from ControlValueAccessor
  // -------------------------------------------------------------------------
  writeValue(value: number): void {
    this.model = value;
    this.setAttribute(value);
  }
  registerOnChange(fn: any): void {
    this.onChange = fn;
  }
  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }
  // -------------------------------------------------------------------------
  // Implemented from Va..
  // -------------------------------------------------------------------------
  validate(c: AbstractControl) {
    if (this.required && !c.value) {
      return {
        required: true,
      };
    }
    return null;
  }
  // -------------------------------------------------------------------------
  // Lifecycle callbacks
  // -------------------------------------------------------------------------
  ngOnInit() {
    this.componentId = this.createCompId('rating', this.fieldlabel);
    this.starId = 'star' + Math.floor(Math.random() * 1000 + 999);
    for (let i = 0; i < this.ratingRange.length; i++) {
      const obj = {};
      obj['number'] = i + 1;
      obj['selected'] = false;
      obj['tabindex'] = '-1';
      this.ratingRangeData.push(obj);
    }

    this.buildRanges();
  }
  // -------------------------------------------------------------------------
  // Public Methods
  // -------------------------------------------------------------------------
  calculateWidth(item: number) {
    if (this.hovered > 0) {
      if (this.hoveredPercent !== undefined && this.hovered === item) {
        return this.hoveredPercent;
      } else {
        return this.hovered >= item ? 100 : 0;
      }
    } else {
      return this.model >= item ? 100 : 100 - Math.round((item - this.model) * 10) * 10;
    }
  }
  setHovered(hovered: number): void {
    if (!this.readonly && !this.disabled) {
      this.hovered = hovered;
      this.onHover.emit(hovered);
      this.ratingMethod(hovered);
    }
  }
  changeHovered(event: MouseEvent): void {
    if (!this.float) {
      return;
    }
    const target = event.target as HTMLElement;
    const relativeX = event.pageX - target.offsetLeft;
    const percent = Math.round((relativeX * 100 / target.offsetWidth) / 10) * 10;
    this.hoveredPercent = percent > 50 ? 100 : 50;
  }
  resetHovered() {
    this.hovered = 0;
    this.hoveredPercent = undefined;
    this.onLeave.emit(this.hovered);
  }
  rate(value: number) {
    if (!this.readonly && !this.disabled && value >= 0 && value <= this.ratingRange.length) {
      this.setAttribute(value);
      const newValue = this.hoveredPercent ? (value - 1) + this.hoveredPercent / 100 : value;
      this.onChange(newValue);
      this.model = newValue;
    }
  }

  rate1(item: any) {
    this.ratingMethod(item);
  }

  setAttribute(value: any) {
    this.ratingRangeData.forEach((element: any) => {
      element.selected = false;
      element.tabindex = '-1';
      if (value >= element.number) {
        element.selected = true;
      }
      if (value === element.number) {
        element.tabindex = 0;
      }
    });
  }

  ratingMethod(item: any) {
    this.ratingRangeData.forEach((element: any) => {
      element.selected = false;
      if (item + 1 >= element.number) {
        element.selected = true;
      }
    });
  }
  // -------------------------------------------------------------------------
  // Private Methods
  // -------------------------------------------------------------------------
  private buildRanges() {
    this.ratingRange = this.range(1, this.max);
  }
  private range(start: number, end: number) {
    const foo: number[] = [];
    for (let i = start; i <= end; i++) {
      foo.push(i);
    }
    return foo;
  }
}
