
/*
* Copyright [2019] [Metamagic]
*
* Licensed under the Apache License, Version 2.0 (the 'License');
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
* http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an 'AS IS' BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*
*/

import { animate, state, style, transition, trigger } from '@angular/animations';
import { DatePipe } from '@angular/common';
import {
  ChangeDetectorRef, Component, ElementRef,
  EventEmitter, forwardRef, Input, OnInit, Output, Renderer2, ViewChild,
} from '@angular/core';
import { ControlValueAccessor, FormControl, NG_VALIDATORS, NG_VALUE_ACCESSOR, NgModel, Validators } from '@angular/forms';
import { ListBaseDatepickerComponent } from '../../base/list.base.datepicker.component';
import { AmexioFormValidator } from './../form-validator/amexio.form.validator.component';

const noop = () => {
};

@Component({
  selector: 'amexio-month-year-picker',
  templateUrl: './monthyear.component.html',
  styleUrls: ['./monthyear.component.css'],
  animations: [
    trigger('changeState', [
      state('visible', style({
        transform: 'scale(1)',
      })),
      state('hidden', style({
        transform: 'scale(0)',
      })),
      transition('*=>*', animate('200ms')),
    ]),
  ],
  providers: [{
    provide: NG_VALUE_ACCESSOR, useExisting: forwardRef(() => MontYearPickerComponent), multi: true,
  }, {
    provide: NG_VALIDATORS, useExisting: forwardRef(() => MontYearPickerComponent), multi: true,
  }, DatePipe],
})
export class MontYearPickerComponent extends ListBaseDatepickerComponent<string> implements OnInit, Validators {
  /*
 Properties
 name : field-label
 datatype : string
 version : 4.0 onwards
 default :
 description :The label of this field
 */
  @Input('field-label') fieldlabel: string;
  /*
  Properties
  name : required
  datatype : boolean
  version : 4.0 onwards
  default : false
  description : Flag to allow blank field or not
  */
  @Input() required = false;

  @Input('min-year') minyr: number;

  @Input('max-year') maxyr: number;

  @Output() input: EventEmitter<any> = new EventEmitter<any>();
  @Output() isComponentValid: any = new EventEmitter<any>();

  monthYrModel: any;
  isValid: boolean;

  currentMonth: any;
  currentYear: any;
  monthData: any[] = [];
  yearData: any[] = [];
  // The internal dataviews model
  private innerValue: any = '';
  // Placeholders for the callbacks which are later provided
  // by the Control Value Accessor
  private onTouchedCallback: () => void = noop;
  private onChangeCallback: (_: any) => void = noop;
  constructor(private datePipe: DatePipe, public element: ElementRef, private cdf: ChangeDetectorRef, renderer: Renderer2) {
    super(renderer, element, cdf);
    this.monthData = ['Jan', 'Feb',
      'Mar', 'Apr', 'May',
      'Jun', 'Jul',
      'Aug', 'Sep',
      'Oct', 'Nov',
      'Dec'];
  }

  // mycustinput
  ngOnInit() {
    let minimumyr;
    let maximumyr;
    if (this.minyr && this.maxyr) {
      minimumyr = this.minyr;
      maximumyr = this.maxyr;
    } else if (this.minyr || this.maxyr) {
      if (this.minyr) {
        minimumyr = this.minyr;
        maximumyr = this.minyr + 20;
      } else {
        maximumyr = this.maxyr;
        minimumyr = this.maxyr - 20;
      }

    } else {
      minimumyr = new Date().getFullYear() - 10;
      maximumyr = new Date().getFullYear() + 10;
    }
    for (let i = minimumyr; i <= maximumyr; i++) {
      this.yearData.push(i + '');
    }
    this.currentMonth = this.monthData[0];
    this.currentYear = this.yearData[0];
    this.isValid = !this.required;
    this.isComponentValid.emit(!this.required);

  }

  onMonthChange(event: any) {
    if (this.monthYrModel) {
      const arr = this.monthYrModel.split(' ');
      arr[0] = this.currentMonth;
      this.monthYrModel = arr.join().replace(',', ' ');
      this.innerValue = this.monthYrModel;
      this.onChangeCallback(this.innerValue);

    } else {
      const mstr = this.currentMonth + ' ' + this.currentYear;
      this.innerValue = mstr;
      this.onChangeCallback(this.innerValue);

    }
  }
  onYearChange(event: any) {
    if (this.monthYrModel) {
      const arr = this.monthYrModel.split(' ');
      arr[1] = this.currentYear;
      this.monthYrModel = arr.join().replace(',', ' ');
      this.innerValue = this.monthYrModel;
      this.onChangeCallback(this.innerValue);
    } else {
      const mstr = this.currentMonth + ' ' + this.currentYear;
      this.innerValue = mstr;
      this.onChangeCallback(mstr);
    }
  }

  // get accessor
  get value(): any {
    return this.innerValue;
  }
  // set accessor including call the onchange callback
  set value(v: any) {
    this.innerValue = v;
    this.onChangeCallback(v);
  }
  // Set touched on blur
  onBlur() {
    this.onTouchedCallback();
    this.onChangeCallback(this.innerValue);
  }

  // From ControlValueAccessor interface
  writeValue(value: any) {
    if ((value !== '') && (value !== null)) {
      this.validateWriteValue(value);
    }

  }

  validateWriteValue(value: any) {
    const arr = value.split(' ');
    this.currentMonth = arr[0];
    this.currentYear = arr[1] + '';

    this.innerValue = value;
  }

  // From ControlValueAccessor interface
  registerOnChange(fn: any) {
    this.onChangeCallback = fn;
  }
  // From ControlValueAccessor interface
  registerOnTouched(fn: any) {
    this.onTouchedCallback = fn;
  }

  setValue(str: any) {
    let seprator = '';
    if (str.indexOf('-') > -1) {
      seprator = '-';
    }
    if (str.indexOf('/') > -1) {
      seprator = '/';
    }
    let splitarr = [];
    if ((seprator === '-') || (seprator === '/')) {
      splitarr = str.split(seprator);
    }
    const date = splitarr[0];
    const month = splitarr[1];
    const year = splitarr[2];
    const datestr = month + '-' + date + '-' + year;
    this.value = new Date(datestr);
  }

  // THIS MEHTOD CHECK INPUT IS VALID OR NOT
  checkValidity(): boolean {
    return this.isValid;
  }

  public validate(c: FormControl) {
    return (this.value || !this.required) ? null : {
      jsonParseError: {
        valid: true,
      },
    };
  }

}
