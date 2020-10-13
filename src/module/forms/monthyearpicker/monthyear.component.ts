
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

  @Input('enable-date') isdateFlag = false;

  @Input('select-date') selectDate = 'start';
  @Output() input: EventEmitter<any> = new EventEmitter<any>();
  @Output() isComponentValid: any = new EventEmitter<any>();

  @Output() onMonthChange: any = new EventEmitter<any>();
  @Output() onYearChnage: any = new EventEmitter<any>();
  @Output() onDateChange: any = new EventEmitter<any>();

  monthYrModel: any;
  isValid: boolean;

  currentMonth: any;
  currentYear: any;
  currrentDate: any;
  dateCount: any;
  monthData: any[] = [];
  yearData: any[] = [];
  dateArray: any[] = [];
  // The internal dataviews model
  private innerValue: any = '';
  // Placeholders for the callbacks which are later provided
  // by the Control Value Accessor
  private onTouchedCallback: () => void = noop;
  private onChangeCallback: (_: any) => void = noop;
  constructor(private datePipe: DatePipe, public element: ElementRef, private cdf: ChangeDetectorRef, renderer: Renderer2) {
    super(renderer, element, cdf);
    this.monthData = [
      '01',
      '02',
      '03',
      '04',
      '05',
      '06',
      '07',
      '08',
      '09',
      '10',
      '11',
      '12',
    ];
  }

  // mycustinput
  ngOnInit() {
    this.dateflagInit();
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
    this.currrentDate = this.dateArray[0];
    this.isValid = !this.required;
    this.isComponentValid.emit(!this.required);
    this.currrentDate = this.dateArray[0];

  }
  dateflagInit() {
    if (this.isdateFlag) {
      this.dateCount = 31;
      let i = 1;
      for (i = 1; i <= 31; i++) {
        let val;
        if (i <= 9) {
          val = '0' + i;
        } else {
          val = '' + i;
        }
        this.dateArray.push(val);
      }
    }
  }
  dateChange(event: any) {

    this.monthYrModel = this.currentMonth + '/' + event.target.value + '/' + this.currentYear;

    this.currrentDate = event.target.value;
    this.innerValue = this.monthYrModel;
    this.onChangeCallback(this.innerValue);

  }

  monthChange(event: any) {
    this.reinitializeDateArr();
    if (this.selectDate === 'start') {
      this.currrentDate = this.dateArray[0];
    } else {
      this.currrentDate = this.dateArray[this.dateArray.length - 1];
    }
    const mstr = this.currentMonth + '/' + this.currrentDate + '/' + this.currentYear;

    this.innerValue = mstr;

    this.onChangeCallback(this.innerValue);

  }

  reinitializeDateArr() {
    this.dateArray = [];
    switch (this.currentMonth) {
      case '01':
        this.dateCount = 31;
        break;
      case '02':
        if (((this.currentYear % 4 === 0) && (this.currentYear % 100 !== 0)) || (this.currentYear % 400 === 0)) {
          // leap yr
          this.dateCount = 29;
        } else {
          this.dateCount = 28;
        }
        break;
      case '03':
        this.dateCount = 31;
        break;
      case '04':
        this.dateCount = 30;
        break;
      case '05':
        this.dateCount = 31;
        break;
      case '06':
        this.dateCount = 30;
        break;
      case '07':
        this.dateCount = 31;
        break;
      case '08':
        this.dateCount = 31;
        break;
      case '09':
        this.dateCount = 30;
        break;
      case '10':
        this.dateCount = 31;
        break;
      case '11':
        this.dateCount = 30;
        break;
      case '12':
        this.dateCount = 31;
        break;
      default:
        break;
    }
    this.reformDateArr();
  }

  reformDateArr() {
    this.dateArray = [];
    let i = 1;
    for (i = 1; i <= this.dateCount; i++) {
      let datval;
      if (i <= 9) {
        datval = '0' + i;
      } else {
        datval = '' + i;
      }
      this.dateArray.push(datval);
    }

  }
  yearChange(event: any) {
    this.monthYrModel = this.currentMonth + '/' + this.currrentDate + '/' + this.currentYear;
    this.innerValue = this.monthYrModel;
    this.onChangeCallback(this.innerValue);
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
    if ((value !== '') && (value !== null) && (value !== undefined)) {
      this.validateWriteValue(value);
    }

  }

  validateWriteValue(value: any) {
    const arr = value.split('/');
    this.currrentDate = arr[1];

    this.currentMonth = arr[0];

    this.currentYear = arr[2] + '';
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
