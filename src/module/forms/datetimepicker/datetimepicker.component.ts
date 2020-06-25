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
import {
  ChangeDetectorRef, Component, ElementRef,
  EventEmitter, forwardRef, Input, OnInit, Output, Renderer2,
} from '@angular/core';
import { ControlValueAccessor, FormControl, NG_VALIDATORS, NG_VALUE_ACCESSOR, NgModel, Validators } from '@angular/forms';
import { ListBaseDatepickerComponent } from '../../base/list.base.datepicker.component';
import { AmexioFormValidator } from './../form-validator/amexio.form.validator.component';

const noop = () => {
};

@Component({
  selector: 'amexio-date-time-picker',
  templateUrl: './datetimepicker.component.html',
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
    provide: NG_VALUE_ACCESSOR, useExisting: forwardRef(() => AmexioDateTimePickerComponent), multi: true,
  }, {
    provide: NG_VALIDATORS, useExisting: forwardRef(() => AmexioDateTimePickerComponent), multi: true,
  }],
})
export class AmexioDateTimePickerComponent extends ListBaseDatepickerComponent<string> implements OnInit, Validators {

  /*
 Properties
 name : date-format
 datatype : string
 version : 4.0 onwards
 default :
 description : The label of this field
 */
  @Input('date-format') dateformat: string;
  /*
   Properties
   name : date-picker
   datatype : boolean
   version : 4.0 onwards
   default : false
   description : Enable/Disable Date Picker
   */
  @Input('date-picker') datepicker = true;

  @Input() utc = false;

  @Input() timestamp = true;
  /*
  Properties
  name : has-label
  datatype : boolean
  version : 5.21 onwards
  default : false
  description : Flag to set label
  */
  @Input('has-label') hasLabel = true;
  /*
   Properties
   name : time-picker
   datatype : boolean
   version : 4.0 onwards
   default : false
   description : Enable/Disable Time Picker
   */
  @Input('time-picker') timepicker: boolean;
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
  name : field-label
  datatype : string
  version : 5.5.5 onwards
  default :
  description :The label of this field
  */
  @Input('place-holder') placeholder = '';
  /*
   Properties
   name : disabled
   datatype : boolean
   version : 4.1.5 onwards
   default : false
   description : Disable Date/Time Picker field
   */
  @Input('disabled') disabled = false;
  /*
   Properties
   name : read-only
   datatype : boolean
   version : 4.0 onwards
   default : false
   description : Disable Date/Time Picker field
   */
  @Input('read-only') readonly: boolean;
  /*
   Properties
   name : min-date
   datatype : string
   version : 4.2 onwards
   default : none
   description : sets minimum date range
   */
  @Input('min-date') minDate: string;
  /*
   Properties
   name : max-date
   datatype : string
   version : 4.2 onwards
   default : none
   description : sets maximum date range
   */
  @Input('max-date') maxDate: string;
  /*
   Properties
   name : diabled-date
   datatype :  any
   version : 4.2 onwards
   default : none
   description : sets disabled dates range
   */
  @Input('disabled-date') diabledDate: any[] = [];
  /*
   Properties
   name : inline-datepicker
   datatype :  boolean
   version : 4.2 onwards
   default : none
   description : sets inline calender
   */
  @Input('inline-datepicker') inlineDatepicker = false;
  /*
   Properties
   name : dropdown-datepicker
   datatype :  boolean
   version : 4.2 onwards
   default : none
   description : sets dropdown datepicker
   */
  @Input('dropdown-datepicker') dropdownDatepicker = false;
  /*
   Properties
   name : required
   datatype : boolean
   version : 4.0 onwards
   default : false
   description : Flag to allow blank field or not
   */
  @Input() required = false;
  posixUp: boolean;
  positionClass: any;
  /*
   Events
   name : blur
   description : On blur event
   */
  // @Output() blur: EventEmitter<any> = new EventEmitter<any>();
  /*
   Properties
   name : change
   description : On field value change event
   */
  @Output() change: EventEmitter<any> = new EventEmitter<any>();
  /*
   Properties
   name : input
   description : On input event field.
   */
  @Output() input: EventEmitter<any> = new EventEmitter<any>();
  /*
   Properties
   name : focus
   description : On field focus event
   */
  // @Output() focus: EventEmitter<any> = new EventEmitter<any>();
  inputtabindex = 0;
  daystabindex = -1;
  showToolTip: boolean;
  drop = false;
  elementId: string;
  daysTitle: any[];
  tempFlag = true;
  curMonth: any;
  hrsArr: any[] = [];
  minArr: any[] = [];
  pickerele: any;
  daysArray: any;
  selectedDate: any;
  hostFlag = false;
  dateModel: any;
  isValid: boolean;
  roundedgeclass: string;
  @Output() isComponentValid: any = new EventEmitter<any>();
  backArrowFlag = false;
  forwardArrowFlag = false;
  hrs: number;
  min: number;
  viewmode: string;
  okispressed = false;
  cancelispressed = false;
  // The internal dataviews model
  private innerValue: any = '';
  // Placeholders for the callbacks which are later provided
  // by the Control Value Accessor
  private onTouchedCallback: () => void = noop;
  private onChangeCallback: (_: any) => void = noop;
  constructor(public element: ElementRef, private cdf: ChangeDetectorRef, renderer: Renderer2) {
    super(renderer, element, cdf);
    this.viewmode = '1';
    this.hrsArr = [
      { hr: '0' }, { hr: '1' }, { hr: '2' }, { hr: '3' },
      { hr: '4' }, { hr: '5' }, { hr: '6' }, { hr: '7' },
      { hr: '8' }, { hr: '9' }, { hr: '10' }, { hr: '11' },
      { hr: '12' }, { hr: '13' }, { hr: '14' }, { hr: '15' },
      { hr: '16' }, { hr: '17' }, { hr: '18' }, { hr: '19' },
      { hr: '20' }, { hr: '21' }, { hr: '22' }, { hr: '23' },
    ];
    this.minArr = [
      { min: '0' }, { min: '1' }, { min: '2' }, { min: '3' },
      { min: '4' }, { min: '5' }, { min: '6' }, { min: '7' },
      { min: '8' }, { min: '9' }, { min: '10' }, { min: '11' },
      { min: '12' }, { min: '13' }, { min: '14' }, { min: '15' },
      { min: '16' }, { min: '17' }, { min: '18' }, { min: '19' },
      { min: '20' }, { min: '21' }, { min: '22' }, { min: '23' },
      { min: '24' }, { min: '25' }, { min: '26' }, { min: '27' },
      { min: '28' }, { min: '29' }, { min: '30' }, { min: '31' },
      { min: '31' }, { min: '32' }, { min: '33' }, { min: '34' },
      { min: '35' }, { min: '36' }, { min: '37' }, { min: '38' },
      { min: '39' }, { min: '40' }, { min: '41' }, { min: '42' },
      { min: '43' }, { min: '44' }, { min: '45' }, { min: '46' },
      { min: '47' }, { min: '48' }, { min: '49' }, { min: '50' },
      { min: '51' }, { min: '52' }, { min: '53' }, { min: '54' },
      { min: '55' }, { min: '56' }, { min: '57' }, { min: '58' },
      { min: '59' },
    ];
    this.minDate = '';
    this.maxDate = '';
    this.elementId = new Date().getTime() + '';
    this.selectedDate = new Date();
    this.commonDeclaration();
    this.daysTitle = [];
    this.daysArray = [];
    this.timepicker = false;
    this.hrs = this.currrentDate.getHours();
    this.min = this.currrentDate.getMinutes();
    this.initDaysTitle();
    this.createDaysForCurrentMonths(this.currrentDate);
    this.monthList1.forEach((tmpElement: any) => {
    });
  }
  ngOnInit() {
    if (this.inlineDatepicker) {
      this.showToolTip = true;
      this.dropdownstyle = { visibility: 'visible' };
    }
    this.isValid = !this.required;
    this.isComponentValid.emit(!this.required);
    if (this.minDate.length > 0 || this.maxDate.length > 0) {
      this.minMaxDateFound();
    }  // main if ends
    // logic for disabling yrs before min and after max
    if (this.minDate.length > 0 || this.maxDate.length > 0) {
      const min = new Date(this.minDate);
      const max = new Date(this.maxDate);
      this.yearList1.forEach((element: any) => {
        this.disableMinMaxYear(element, min, max);
      });
      this.yearList2.forEach((element: any) => {
        this.disableMinMaxYear(element, min, max);
      });
    }
  }
  onHrsMinSelect(event: any) {

    this.dropdownstyle = { visibility: 'visible' };
    this.showToolTip = true;
    super.posateItemClick();

    this.selectedDate.setDate(this.selectedDate.getDate());
    this.selectedDate.setMonth(this.selectedDate.getMonth());
    this.selectedDate.setFullYear(this.selectedDate.getFullYear());
    this.selectedDate.setHours(this.hrs);
    this.selectedDate.setMinutes(this.min);
    this.dateModel = new Date(this.selectedDate);

    this.value = this.selectedDate;

    this.onChangeCallback(this.dateModel);
    this.isComponentValid.emit(true);

    this.isValid = true;

    if (this.inlineDatepicker || (this.datepicker && this.timepicker)) {
      this.showToolTip = true;

    } else {
      this.showToolTip = !this.showToolTip;
    }
    this.dropdownstyle = { visibility: 'visible' };
    super.itemClicked(true);
    this.change.emit(this.dateModel);

  }

  onNgChange() {
    this.change.emit(this.selectedDate);
  }

  private initDaysTitle() {
    this.daysTitle.push({ text: 'Mo' });
    this.daysTitle.push({ text: 'Tu' });
    this.daysTitle.push({ text: 'We' });
    this.daysTitle.push({ text: 'Th' });
    this.daysTitle.push({ text: 'Fr' });
    this.daysTitle.push({ text: 'Sa' });
    this.daysTitle.push({ text: 'Su' });
  }
  validateDateModel() {
    if (this.dateModel && typeof (this.dateModel) === 'string') {
      this.dateModel = new Date(this.dateModel);
    }
  }

  private createDaysForCurrentMonths(selectedPeriod: any) {
    this.daysArray = [];
    this.validateDateModel();
    const date = new Date(selectedPeriod.getFullYear(), selectedPeriod.getMonth(), 1, 0, 0, 0, 0); // Starting at the 1st of the month
    const extras = (date.getDay() + 6) % 7; // How many days of the last month do we need to include?
    date.setDate(date.getDate() - extras); // Skip back to the previous monday
    while (this.daysArray.length < 6) {
      const rowDays = [];
      for (let i = 0; i < 7; i++) {
        const day: any = {
          date: null, selected: false, isCurrentMonth: null, isDisabled: false,
        };
        day.date = new Date(date.getTime());
        day.isCurrentMonth = (date.getMonth() === selectedPeriod.getMonth());
        day['id'] = this.getCryptoId();

        day['daynum'] = (day.date).getDate() + '';
        day['fulldate'] = (day.date).getDate() + ' ' +
          this.getFullMonthName(day.date) + ' ' + (day.date).getFullYear() +
          ' ' + this.getFullDayName(day.date);

        if (this.dateModel && (date.getMonth() === this.dateModel.getMonth()) &&
          (date.getDate() === this.dateModel.getDate())) {
          day.selected = true;
        } else if ((date.getMonth() === this.currrentDate.getMonth()) &&
          (date.getDate() === this.currrentDate.getDate())) {
          if (this.dateModel) {
            day.selected = false;
            day['tabindex'] = -1;
          } else {
            day.selected = true;
            day['tabindex'] = 1;
          }
        }
        rowDays.push(day);
        date.setDate(date.getDate() + 1);
      }
      this.daysArray.push(rowDays);
    }
  }

  getFullMonthName(recevieddate: Date) {
    const months = ['January', 'Febuary', 'March', 'April', 'May',
      'June', 'July', 'August', 'September', 'October', 'November', 'December'];
    const datemonth = recevieddate.getMonth();
    let monthString = '';
    months.forEach((element: any, index: number) => {
      if (datemonth === index) {
        monthString = element;
      }
    });
    return monthString;
  }

  getHalfMonthName(recDate: Date) {
    const mons = ['Jan', 'Feb', 'Mar', 'Apr', 'May',
      'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    const datemonth = recDate.getMonth();
    let mString = '';
    mons.forEach((element: any, index: number) => {
      if (datemonth === index) {
        mString = element;
      }
    });
    return mString;

  }
  getFullDayName(receiveddate: Date) {
    const weekdays = ['Sunday', 'Monday', 'Tuesday', 'Wednesday',
      'Thursday', 'Friday', 'Saturday'];
    const day = receiveddate.getDay();
    let dayname = '';
    weekdays.forEach((element: any, index: number) => {
      if (day === index) {
        dayname = element;
      }
    });
    return dayname;
  }

  onDateClick(dateObj: any, event: any) {
    if (dateObj.isDisabled === false) {
      this.change.emit(dateObj.date);
      if ((this.inlineDatepicker === false) && (this.timepicker === false && this.datepicker === true)) {
        super.itemClicked(false);
      } else if ((this.inlineDatepicker === false) && (this.datepicker === true) && (this.timepicker === true)) {
        super.posateItemClick();
      }
      this.hostFlag = true;
      this.selectedDate = dateObj.date;
      this.selectedDate.setDate(dateObj.date.getDate());
      this.selectedDate.setMonth(dateObj.date.getMonth());
      this.selectedDate.setFullYear(dateObj.date.getFullYear());
      this.selectedDate.setHours(this.hrs);
      this.selectedDate.setMinutes(this.min);
      this.resetSelection(dateObj.date);

      this.dateModel = this.selectedDate;
      this.dateModel.setDate(this.selectedDate.getDate());
      this.dateModel.setMonth(this.selectedDate.getMonth());
      this.dateModel.setFullYear(this.selectedDate.getFullYear());
      if (this.utc) {

        this.dateModel = new Date(this.selectedDate);
        this.setDateModel();
        this.onChangeCallback(this.dateModel);
      }

      if (!this.timestamp) {

        this.dateModel = this.selectedDate.getFullYear() + '-' +
          ('0' + (this.selectedDate.getMonth() + 1)).slice(-2)
          + '-' + ('0' + this.selectedDate.getDate()).slice(-2);
        this.setDateModel();
        this.onChangeCallback(this.dateModel);
      }

      this.value = this.selectedDate;
      this.isValid = true;
      this.isComponentValid.emit(true);
      if (this.inlineDatepicker) {
        this.showToolTip = true;
      } else {
        this.showToolTip = !this.showToolTip;
      }
    } else {
      event.stopPropagation();
    }
  }

  resetSelection(dateObj: any) {
    for (const i of this.daysArray) {
      for (const j of i) {
        const day = j;
        if (day.date.getTime() === dateObj.getTime()) {
          day.selected = true;
        } else {
          day.selected = false;
        }
      }
    }
  }
  onInput(event: any) {
    if (event.target.value != null && event.target.value !== '') {
      const timeValue = event.target.value.split(':');
      if (timeValue != null) {
        const hrs = parseInt(timeValue[0].trim(), 10);
        const mins = parseInt(timeValue[1].trim(), 10);
        this.selectedDate.setHours(hrs);
        this.selectedDate.setMinutes(mins);
        this.hrs = hrs;
        this.min = mins;
        this.value = this.selectedDate;
        event.stopPropagation();
      }
    }
  }
  public nextMonth(event: any) {
    this.setDateData('plus', 1, event);
    this.disableddays(this.diabledDate);
  }

  setDateModel() {
    this.dateModel = new Date(this.dateModel);
    this.dateModel = new Date(this.getHalfMonthName(this.dateModel) + ' ' +
      this.dateModel.getDate() + ' ' + this.dateModel.getFullYear() + ' 05:30:00 UTC');
    if (!this.timestamp) {
      this.dateModel = new Date(this.dateModel);
      this.dateModel = this.dateModel.getFullYear() + '-'
        + (('0' + (this.dateModel.getMonth() + 1)).slice(-2)) + '-'
        + ('0' + this.dateModel.getDate()).slice(-2);

    }
  }
  public prevMonth(event: any) {
    this.setDateData('minus', 1, event);
    this.disableddays(this.diabledDate);
  }
  public nextYear(event: any) {
    this.setDateData1('plus', 12, event);
  }
  public prevYear(event: any) {
    this.setDateData1('minus', 12, event);
  }
  // this function validates month
  setDateData(state1: string, mon: number, event: any) {
    const d = new Date(this.currrentDate.getFullYear(), this.currrentDate.getMonth(), this.currrentDate.getDate());
    const min = new Date(this.minDate);
    const max = new Date(this.maxDate);
    // checks if selected date is within maximum range of month
    if (state1 === 'plus') {
      this.setPlusData(d, max, mon);
    } else if (state1 === 'minus') {
      this.setMinusData(d, min, mon);
    }
    this.currrentDate = d;
    this.initDate();
    event.stopPropagation();
  }

  // Set Plus Data
  setPlusData(d: any, max: any, mon: any) {
    if (this.maxDate.length > 0) {
      if (d.getFullYear() === max.getFullYear()) {
        this.setMaxFullYear(d, max, mon);
      } else {
        // logic to chk if year is valid
        if (d.getFullYear() <= max.getFullYear()) {
          d.setMonth(d.getMonth() + mon);
        }
      }
    } else { // outer ends
      d.setMonth(d.getMonth() + mon);
    } // checks if selected date is within minimum range of month
  }

  // Set Max Full Year
  setMaxFullYear(d: any, max: any, mon: any) {
    if ((d.getMonth() !== max.getMonth()) && d.getFullYear() <= max.getFullYear() && d.getMonth() <= max.getMonth()) {
      d.setMonth(d.getMonth() + mon);
    }
  }
  // Set Minus Data
  setMinusData(d: any, min: any, mon: any) {
    if (this.minDate.length > 0) {
      if (d.getFullYear() === min.getFullYear()) {
        this.setMinFullYear(d, min, mon);
      } else {
        d.setMonth(d.getMonth() - mon);
      }
    } else {
      d.setMonth(d.getMonth() - mon);
    }
  }

  // Set Min Full year
  setMinFullYear(d: any, min: any, mon: any) {
    if ((d.getMonth() !== min.getMonth()) && d.getFullYear() >= min.getFullYear() && d.getMonth() >= min.getMonth()) {
      // logic to chk if year is valid
      d.setMonth(d.getMonth() - mon);
    }
  }
  // this function validates year
  setDateData1(state1: string, mon: number, event: any) {
    const d = new Date(this.currrentDate.getFullYear(), this.currrentDate.getMonth(), this.currrentDate.getDate());
    const min = new Date(this.minDate);
    const max = new Date(this.maxDate);
    // checks if selected date is within maximum range of year
    if (state1 === 'plus') {
      if (this.maxDate.length > 0) {
        if (d.getFullYear() <= max.getFullYear() - 1) {
          d.setMonth(d.getMonth() + mon);
        }
      } else {
        d.setMonth(d.getMonth() + mon);
      }  // checks if selected date is within minimum range of year
    } else if (state1 === 'minus') {
      if (this.minDate.length > 0) {
        if (d.getFullYear() >= min.getFullYear() + 1) {
          d.setMonth(d.getMonth() - mon);
        }
      } else {
        d.setMonth(d.getMonth() - mon);
      }
    }
    this.currrentDate = d;
    this.initDate();
    event.stopPropagation();
  }
  setToday() {
    this.currrentDate = new Date();
    this.initDate();
    this.showToolTip = !this.showToolTip;
  }
  initDate() {
    this.daysArray = [];
    this.createDaysForCurrentMonths(this.currrentDate);
    this.daysArray.forEach((dayrow: any, outerindex: number) => {
      dayrow.forEach((element: any, innerindex: number) => {
        if (this.currrentDate === new Date(element.date)) {
          const itemid = this.daysArray[outerindex][innerindex];
          document.getElementById(itemid['id']).focus();
        }
      });
    });
    this.selectedDate = this.currrentDate;
    this.dateModel = this.selectedDate;
    this.value = this.selectedDate;
    this.innerValue = '';
  }
  plus(type: string, event: any) {
    if (type === 'min') {
      if (this.min === 59) {
        this.min = -1;
        this.hrs++;
      }
      this.min++;
    }
    if (type === 'hrs') {
      this.hrs++;
    }
    if (this.hrs === 24) {
      this.hrs = 0;
    }
    this.selectedDate.setHours(this.hrs);
    this.selectedDate.setMinutes(this.min);
    this.value = this.selectedDate;
    this.isValid = true;
    this.isComponentValid.emit(true);
    this.change.emit(this.value);
    event.stopPropagation();
  }
  minus(type: string, event: any) {
    if (type === 'min') {
      if (this.min === 0) {
        this.min = 60;
        this.hrs--;
      }
      this.min--;
    }
    if (type === 'hrs') {
      this.hrs--;
    }
    if (this.hrs === 0) {
      this.hrs = 23;
    }
    this.selectedDate.setHours(this.hrs);
    this.selectedDate.setMinutes(this.min);
    this.value = this.selectedDate;
    this.isValid = true;
    this.isComponentValid.emit(true);
    this.change.emit(this.value);
    event.stopPropagation();
  }
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
  // Set touched on blur
  onBlur() {
    this.onTouchedCallback();
    this.onChangeCallback(this.dateModel);
  }

  // From ControlValueAccessor interface
  writeValue(value: any) {
    if (value !== '') {
      if (value !== this.innerValue) {
        this.validateWriteValue(value);
      }
    } else {
      this.dateModel = '';
    }
  }
  setTimeStamp() {
    if (!this.timestamp) {
      this.dateModel = new Date(this.dateModel);
      this.dateModel = this.dateModel.getFullYear() + '-' +
        ('0' + (this.dateModel.getMonth() + 1)).slice(-2)
        + '-' + ('0' + this.dateModel.getDate()).slice(-2)
        ;

      this.setDateModel();
      this.onChangeCallback(this.dateModel);
    }
  }

  validateWriteValue(value: any) {
    this.innerValue = value;
    if (this.innerValue instanceof Date || ('number' === typeof this.innerValue)) {
      if (('number' === typeof this.innerValue)) {
        this.innerValue = new Date(this.innerValue);
      }
      if (this.utc) {
        this.dateModel = new Date(this.innerValue);

        this.setDateModel();
        this.onChangeCallback(this.dateModel);

        this.setTimeStamp();
      } else {
        this.dateModel = this.innerValue;
        if (!this.timestamp) {
          this.dateModel = this.dateModel.getFullYear() + '-'
            + ('0' + (this.dateModel.getMonth() + 1)).slice(-2)
            + '-' + ('0' + this.dateModel.getDate()).slice(-2)
            ;

          this.setDateModel();
          this.onChangeCallback(this.dateModel);
        }
      }
      this.currrentDate = this.dateModel;
      this.selectedDate = this.currrentDate;
      this.createDaysForCurrentMonths(this.dateModel);
      if (this.required) {
        this.isValid = true;
      }
    } else {
      this.negateisValid();
    }
  }

  negateisValid() {
    this.isValid = false;
    this.hrs = 0;
    this.min = 0;
  }

  // From ControlValueAccessor interface
  registerOnChange(fn: any) {
    this.onChangeCallback = fn;
  }
  // From ControlValueAccessor interface
  registerOnTouched(fn: any) {
    this.onTouchedCallback = fn;
  }
  onFocus(elem: any) {
  }
  onFocusOut(value: any) {
    if (isNaN(Date.parse(value.value))) {
      this.isValid = false;
      value.value = '';
    } else {

      if (this.utc) {

        const d = new Date(value.value);
        this.value = new Date(this.getHalfMonthName(d) + ' ' + d.getDate() + ' '
          + d.getFullYear() + ' 05:30:00 UTC');
        this.dateModel = d;
        this.setDateModel();

        if (!this.timestamp) {
          this.dateModel = new Date(this.dateModel);
          this.dateModel = this.dateModel.getFullYear() + '-' +
            ('0' + (this.dateModel.getMonth() + 1)).slice(-2)
            + '-' + ('0' + this.dateModel.getDate()).slice(-2)
            ;

          this.setDateModel();
          this.onChangeCallback(this.dateModel);

        }
      } else {
        this.value = new Date(value.value);
        if (!this.timestamp) {
          this.dateModel = new Date(this.dateModel);
          this.dateModel = this.dateModel.getFullYear() + '-' +
            ('0' + (this.dateModel.getMonth() + 1)).slice(-2)
            + '-' + ('0' + this.dateModel.getDate()).slice(-2)
            ;

          this.setDateModel();
          this.onChangeCallback(this.dateModel);

        }
      }
      this.isValid = true;
    }
  }
  // open picker

  openPicker(elem: any) {
    this.inputtabindex = -1;
    this.daystabindex = 1;
    if (this.disabled === false) {
      super.focus(elem);
      this.hostFlag = false;
      this.pickerele = elem;
      if (this.inlineDatepicker) {
        this.showToolTip = this.inlineDatepicker;
        this.setFocus();
      } else {
        this.showToolTip = true;
      }
      this.posixUp = this.getListPosition(elem);
      const visibility = this.dropdownstyle.visibility;
      // 1
      this.dropdownstyle = JSON.parse(JSON.stringify(this.positionClass));
      this.dropdownstyle.visibility = visibility;
      this.dropdownstyle.position = 'fixed';
      this.disableddays(this.diabledDate);
      this.setFocus();
      this.poscls = this.positionClass;
    }

  }

  setFocus() {
    setTimeout(() => {
      // focus code starts
      this.daysArray.forEach((row: any, index: number) => {
        row.forEach((day: any, innerindex: number) => {
          if (day.selected) {
            document.getElementById(day.id).focus();
          }
        });
      });
    }, 0);
  }
  getListPosition(elementRef: any): boolean {
    const dropdownHeight = 350; // must be same in dropdown.scss
    if (window.innerHeight - (elementRef.getBoundingClientRect().bottom) < dropdownHeight) {
      this.positionClass = {
        top: ((elementRef.getBoundingClientRect().top - dropdownHeight) + elementRef.getBoundingClientRect().height) + 'px',
      };
      return true;
    } else {
      this.positionClass = {
        top: (elementRef.getBoundingClientRect().top + elementRef.getBoundingClientRect().height) + 'px',
      };
      return false;
    }
  }
  onSelect() {
    this.showToolTip = false;
  }
  validateDays(days: any) {
    const max = new Date(this.maxDate);
    const min = new Date(this.minDate);
    // check1: if min max is null return false
    if (this.maxDate.length <= 0 && this.minDate.length <= 0) {
      return false;
    }
    if ((this.maxDate.length > 0 && this.minDate.length <= 0) ||
      (this.maxDate.length > 0 && this.minDate.length > 0)) {
      this.validateMaxDate(days, max);
    }
    if ((this.maxDate.length <= 0 && this.minDate.length > 0) || (this.maxDate.length > 0 && this.minDate.length > 0)) {
      // 3
      if ((days.getDate() < min.getDate() &&
        days.getMonth() === min.getMonth() && days.getFullYear() === min.getFullYear()) ||
        days.getMonth() < min.getMonth() && days.getFullYear() === min.getFullYear()) {
        return true;
        // 4
      }
    }
    this.disableddays(this.diabledDate);
  }

  private validateMaxDate(days: any, max: any) {
    // check if days greater than max return
    // 1
    if ((days.getDate() > max.getDate() &&
      days.getMonth() >= max.getMonth() && days.getFullYear() >= max.getFullYear()) ||
      days.getMonth() > max.getMonth() && days.getFullYear() === max.getFullYear()) {
      return true;
      // 2
    }
  }
  private disableddays(dates: any) {
    if (dates) {
      dates.forEach((element: any) => {
        const From = new Date(element.from);
        const To = new Date(element.to);
        this.daysArray.forEach((element2: any) => {
          element2.forEach((element1: any) => {
            if (element1.date.getFullYear() <= To.getFullYear() && element1.date.getMonth()
              <= To.getMonth() && element1.date.getDate() <= To.getDate() && element1.date.getFullYear() >= From.getFullYear() &&
              element1.date.getMonth() >= From.getMonth() &&
              element1.date.getDate() >= From.getDate()) {
              element1.isDisabled = true;
            }
          });
        });
      });
    }
  }
  dropdownDatePicker(elem: any) {
    this.monthList1.forEach((element: any) => {
      this.elementFlagMethod(element);
    });
    this.monthList2.forEach((element: any) => {
      this.elementFlagMethod(element);
    });
    this.yearList1.forEach((element: any) => {
      this.elementFlagMethod(element);
    });
    this.yearList2.forEach((element: any) => {
      this.elementFlagMethod(element);
    });
    this.hostFlag = true;
    this.tempFlag = false;
    this.drop = true;
    super.focus({});
    this.okispressed = false;
    this.cancelispressed = false;
    this.posixUp = this.getListPosition(this.pickerele);
    const visibility = this.dropdownstyle.visibility;
    this.dropdownstyle = JSON.parse(JSON.stringify(this.positionClass));
    this.dropdownstyle.visibility = visibility;
    this.dropdownstyle.position = 'fixed';
  }

  negateDrop() {
    this.cancelispressed = true;
    this.hostFlag = true;
    this.drop = false;
    this.showToolTip = true;
    this.tempFlag = true;
    this.setDateWindowPosition();
  }

  navigateDropdown() {
    this.okispressed = true;
    this.hostFlag = true;
    this.selectedDate = new Date(this.selectedDate);

    if (this.monthNo || (this.monthNo === 0)) {
      this.selectedDate.setMonth(this.monthNo);
    }

    if (this.yearNo) {
      this.selectedDate.setFullYear(this.yearNo);
    }
    this.drop = false;
    this.daysArray = [];
    this.createDaysForCurrentMonths(this.selectedDate);
    this.disableddays(this.diabledDate);
    this.tempFlag = true;
    this.cdf.detectChanges();
    this.yearList1.forEach((element: any) => {
      this.elementFlagMethod(element);
    });
    this.yearList2.forEach((element: any) => {
      this.elementFlagMethod(element);
    });
    this.daysArray = [];
    this.createDaysForCurrentMonths(this.selectedDate);
    this.disableddays(this.diabledDate);
    super.focus({});
    this.setDateWindowPosition();
  }
  cancelDropdown() {
    this.drop = false;
    this.showToolTip = true;
  }
  arrowClickBack(event: any) {
    let i;
    // disable flag logic
    this.disableYearFlag();
    if (this.minDate.length > 0 || this.maxDate.length > 0) {
      // arrow click logic
      this.backArrow();
    } else {
      for (i = 0; i < 5; i++) {
        this.yearList1[i].year = this.yearList1[i].year - 10;
        this.yearList2[i].year = this.yearList2[i].year - 10;
      } // for ends
    } // main else ends
    // disable flag logic
    this.disableYearFlag();
    // rechking arrow flags after reinitialization of yrlist1 & 2
    this.rechkYearFlag();
    event.stopPropagation();
    this.setDateWindowPosition();
  }

  // this function is obtained by breaking arrowClickBack() for dropdown year back arrow logic for if
  private backArrow() {
    const min = new Date(this.minDate);
    const max = new Date(this.maxDate);
    this.yearList1.forEach((element: any) => {
      if (element.year === min.getFullYear() ||
        (element.year === min.getFullYear() && element.year === max.getFullYear())) {
        this.backArrowFlag = true;
      }
      if (element.year === max.getFullYear() && element.year !== min.getFullYear()) {
        this.forwardArrowFlag = true;
        this.backArrowFlag = false;
      }
      if (element.year !== min.getFullYear() && element.year !== max.getFullYear()) {
        this.forwardArrowFlag = false;
        this.backArrowFlag = false;
      }
    });
    // resets Arrow Flag
    this.resetYearFlag();
  }
  // this function is broken from resetArrowFlag()
  alterBackArrow(element: any, min: any) {
    if (element.year === min.getFullYear()) {
      this.backArrowFlag = true;
    }
  }

  // this function is broken from backArrow() resets Arrow Flag
  private resetArrowFlag() {
    const min = new Date(this.minDate);
    const max = new Date(this.maxDate);
    this.yearList2.forEach((element: any) => {
      this.alterBackArrow(element, min);
      if (element.year === max.getFullYear() ||
        (element.year === min.getFullYear() && element.year === max.getFullYear())) {
        this.forwardArrowFlag = true;
      }
    });
  }

  // this fn is broken from  backArrow() and it resets Year Flag
  resetYearFlag() {
    let i;
    if (!this.backArrowFlag) {
      for (i = 0; i < 5; i++) {
        this.yearList1[i].year = this.yearList1[i].year - 10;
        this.yearList2[i].year = this.yearList2[i].year - 10;
        this.yearList1[i].disabled = false;
        this.yearList2[i].disabled = false;
      }
    } /* if ends */
  }

  // this function is broken from forwardArrow()
  private alterBackForwardArrow(element: any) {
    const min = new Date(this.minDate);
    const max = new Date(this.maxDate);
    if (element.year === min.getFullYear()) {
      this.backArrowFlag = true;
    }
    if (element.year === max.getFullYear() ||
      (element.year === min.getFullYear() && element.year === max.getFullYear())) {
      this.forwardArrowFlag = true;
    }
  }
  // this function is obtained by breaking arrowClickForward() for dropdown year forward arrow logic for if
  private forwardArrow() {
    let i;
    // chk yearlist1
    this.chkYearList1();
    this.yearList2.forEach((element: any) => {
      this.alterBackForwardArrow(element);
    });
    if (!this.forwardArrowFlag) {
      for (i = 0; i < 5; i++) {
        this.yearList1[i].year = this.yearList1[i].year + 10;
        this.yearList2[i].year = this.yearList2[i].year + 10;
        this.yearList1[i].disabled = false;
        this.yearList2[i].disabled = false;
      }  // for ends
    }   // if ends
  }

  // chk yearlist1 broken from forwardArrow()
  chkYearList1() {
    const min = new Date(this.minDate);
    const max = new Date(this.maxDate);
    this.yearList1.forEach((element: any) => {
      if (element.year === min.getFullYear() ||
        (element.year === min.getFullYear() && element.year === max.getFullYear())) {
        this.backArrowFlag = true;
      }
      if (element.year === min.getFullYear() && element.year !== max.getFullYear()) {
        this.forwardArrowFlag = false;
        this.backArrowFlag = true;
      }
      if (element.year !== min.getFullYear() && element.year !== max.getFullYear()) {
        this.forwardArrowFlag = false;
        this.backArrowFlag = false;
      }
      if (element.year === max.getFullYear()) {
        this.forwardArrowFlag = true;
      }
    });
  }

  // this function is obtained by breaking arrowClickBack() and arrowClickForward()
  // for rechking arrow flags after reinitialization of yrlist1 & 2
  rechkYearFlag() {
    this.yearList1.forEach((element: any) => {
      const min = new Date(this.minDate);
      const max = new Date(this.maxDate);
      if (element.year === min.getFullYear() ||
        (element.year === min.getFullYear() && element.year === max.getFullYear())) {
        this.backArrowFlag = true;
      }
      if (element.year === max.getFullYear()) {
        this.forwardArrowFlag = true;
      }
      if (element.year !== min.getFullYear() && element.year !== max.getFullYear()) {
        this.forwardArrowFlag = false;
        this.backArrowFlag = false;
      }
    });
    this.yearList2.forEach((element: any) => {
      this.alterBackForwardArrow(element);
    });
  }
  // this function is broken from disableYearFlag() , here year flag disable altered to true
  yearFlagDisable(element: any) {
    const min = new Date(this.minDate);
    const max = new Date(this.maxDate);
    if (element.year < min.getFullYear() || element.year > max.getFullYear()) {
      element.disabled = true;
    } // if ends
  }

  // this function is obtained by breaking arrowClickBack() and arrowClickForward()
  // for disabling year flag
  disableYearFlag() {
    if (this.minDate.length > 0 || this.maxDate.length > 0) {
      this.yearList1.forEach((element: any) => {
        this.yearFlagDisable(element);
      }); // for ends
      this.yearList2.forEach((element: any) => {
        this.yearFlagDisable(element);
      }); // for ends
    } // outer if ends
  }

  arrowClickForward(event: any) {
    let i;
    // disable flag logic
    this.disableYearFlag();
    if (this.minDate.length > 0 || this.maxDate.length > 0) {
      this.forwardArrow();
    } else {
      for (i = 0; i < 5; i++) {
        this.yearList1[i].year = this.yearList1[i].year + 10;
        this.yearList2[i].year = this.yearList2[i].year + 10;
      }
    }
    // disable flag logic
    this.disableYearFlag();
    // rechking arrow flags after reinitialization of yrlist1 & 2
    this.rechkYearFlag();
    this.setDateWindowPosition();
    event.stopPropagation();
  }
  // onInit Method: If min max date is provided
  minMaxDateFound() {
    const min = new Date(this.minDate);
    const max = new Date(this.maxDate);
    this.yearList1.forEach((element: any) => {
      if (element.year === min.getFullYear() ||
        (element.year === min.getFullYear() && element.year === max.getFullYear())) {
        this.backArrowFlag = true;
      }
      if (element.year === max.getFullYear()) {
        this.forwardArrowFlag = true;
      }
    });
    this.yearList2.forEach((element: any) => {
      if (element.year === min.getFullYear()) {
        this.backArrowFlag = true;
      }
      if (element.year === max.getFullYear() ||
        (element.year === min.getFullYear() && element.year === max.getFullYear())) {
        this.forwardArrowFlag = true;
      }
    });
  }

  // Method to disable when min max year provided
  disableMinMaxYear(element: any, min: any, max: any) {
    if (element.year < min.getFullYear() || element.year > max.getFullYear()) {
      element.disabled = true;
    }
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

  arrowright(day: any, month: any, event: any) {
    let currentindex: number;
    let ismonthchanged = false;
    let drindex: number;
    month.forEach((dayrow: any, dayrowindex: number) => {
      dayrow.forEach((element: any, index: number) => {
        if (day['id'] === element['id']) {
          if (index < dayrow.length - 1) {
            currentindex = index + 1;
            drindex = dayrowindex;
          } else {
            if ((dayrowindex === (month.length - 1)) && (index === (dayrow.length - 1))) {
              this.nextMonth(event);
              ismonthchanged = true;
            } else {
              currentindex = 0;
              drindex = dayrowindex + 1;
            }
          }
        }
      });
    });
    this.refactoredRightArrow(ismonthchanged, month, drindex, currentindex);
  }

  refactoredRightArrow(ismonthchanged: boolean, month: any, drindex: number, currentindex: number) {
    if (!ismonthchanged) {
      this.refactoredFocus(month, drindex, currentindex);
    } else {
      this.setFocus();
    }
  }

  refactoredFocus(month: any, drindex: number, currentindex: number) {
    let itemid;
    itemid = month[drindex][currentindex];
    document.getElementById(itemid['id']).focus();
  }

  setDateWindowPosition() {
    this.posixUp = this.getListPosition(this.pickerele);
    const visibility = this.dropdownstyle.visibility;
    this.dropdownstyle = JSON.parse(JSON.stringify(this.positionClass));
    this.dropdownstyle.visibility = visibility;
    this.dropdownstyle.position = 'fixed';
  }

  arrowleft(day: any, month: any, event: any) {
    let currentindex: number;
    const flag = false;
    let drindex: number;
    let ismonthchanged = false;
    month.forEach((dayrow: any, dayrowindex: number) => {
      dayrow.forEach((element: any, index: number) => {
        if (day['id'] === element['id']) {
          if (index > 0) {
            currentindex = index - 1;
            drindex = dayrowindex;
          } else {
            if (dayrowindex === 0 && index === 0) {
              this.prevMonth(event);
              ismonthchanged = true;
            } else {
              drindex = dayrowindex - 1;
              currentindex = 6;
            }
          }
        }
      });
    });
    this.refactoredarrow(ismonthchanged, month, drindex, currentindex);

  }
  refactoredarrow(ismonthchanged: boolean, month: any, drindex: number, currentindex: number) {
    let itemid;
    if (!ismonthchanged) {
      itemid = month[drindex][currentindex];
      document.getElementById(itemid['id']).focus();
    } else {
      this.setFocus();
    }
  }
  arrowup(day: any, month: any, event: any) {
    let isfirstrow = false;
    let drindex: number;
    let currentindex: number;
    month.forEach((dayrow: any, dayrowindex: number) => {
      dayrow.forEach((element: any, index: number) => {
        if (day.id === element.id) {
          if (dayrowindex === 0) {
            isfirstrow = true;
            this.prevMonth(event);
          } else {
            drindex = dayrowindex - 1;
            currentindex = index;
          }
        }
      });
    });
    if (!isfirstrow) {
      let itemid;
      itemid = this.daysArray[drindex][currentindex];
      document.getElementById(itemid['id']).focus();
    } else {
      this.setFocus();
    }

  }

  arrowdown(day: any, month: any, event: any) {
    let islastrow = false;
    let drindex: number;
    let currentindex: number;
    month.forEach((dayrow: any, dayrowindex: number) => {
      dayrow.forEach((element: any, index: number) => {
        if (day.id === element.id) {
          if (dayrowindex === (month.length - 1)) {
            islastrow = true;
            this.nextMonth(event);
          } else {
            drindex = dayrowindex + 1;
            currentindex = index;
          }
        }
      });
    });
    if (!islastrow) {
      let itemid;
      itemid = this.daysArray[drindex][currentindex];
      document.getElementById(itemid['id']).focus();
    } else {
      this.setFocus();
    }

  }

  dropdownListOneArrowDown(currentmonth: any) {
    let focusindex: number;
    let islast = false;
    this.monthList1.forEach((element, index) => {
      if (element.id === currentmonth.id) {
        if (index !== (this.monthList1.length - 1)) {
          focusindex = index + 1;
        } else {
          islast = true;
        }
      }
    });
    let itemid;
    if (!islast) {
      itemid = this.monthList1[focusindex];
      document.getElementById(itemid['id']).focus();

    } else {
      itemid = this.monthList2[0];
      document.getElementById(itemid['id']).focus();
    }
    this.setDateWindowPosition();
  }

  dropdownListOneArrowUp(currentmonth: any) {
    let focusindex: number;
    let isfirst = false;
    this.monthList1.forEach((elementmonthList1: any, index: number) => {
      if (elementmonthList1.id === currentmonth.id) {
        if (index > 0) {
          focusindex = index - 1;
        } else {
          isfirst = true;
        }
      }
    });
    let itemid;
    if (!isfirst) {
      itemid = this.monthList1[focusindex];
    } else {
      itemid = this.monthList2[this.monthList2.length - 1];
    }
    document.getElementById(itemid['id']).focus();
    this.setDateWindowPosition();
  }

  dropdownListTwoArrowDown(currentmonth: any) {
    let focusindex: number;
    let islast = false;
    this.monthList2.forEach((element, index) => {
      if (element.id === currentmonth.id) {
        if (index !== (this.monthList2.length - 1)) {
          focusindex = index + 1;
        } else {
          islast = true;
        }
      }
    });
    let itemid;
    if (!islast) {
      itemid = this.monthList2[focusindex];
    } else {
      itemid = this.monthList1[0];
    }
    document.getElementById(itemid['id']).focus();
    this.setDateWindowPosition();
  }

  dropdownListTwoArrowUp(currentmonth: any) {
    let focusindex: number;
    let isfirst = false;
    this.monthList2.forEach((element: any, index: any) => {
      if (element.id === currentmonth.id) {
        if (index > 0) {
          focusindex = index - 1;
        } else {
          isfirst = true;
        }
      }
    });
    let itemid;

    if (!isfirst) {
      itemid = this.monthList2[focusindex];
    } else {
      itemid = this.monthList1[this.monthList1.length - 1];
    }
    document.getElementById(itemid['id']).focus();
    this.setDateWindowPosition();
  }

  yearList1ArrowDown(currentyear: any) {
    let focusindex: number;
    let islast = false;
    this.yearList1.forEach((element: any, index: number) => {
      if (element.id === currentyear.id) {
        if (index !== (this.yearList1.length - 1)) {
          focusindex = index + 1;
        } else {
          islast = true;
        }
      }
    });
    let itemid;
    if (!islast) {
      itemid = this.yearList1[focusindex];
    } else {
      itemid = this.yearList2[0];
    }
    document.getElementById(itemid['id']).focus();
    this.setDateWindowPosition();
  }

  yearList2ArrowDown(currentyear: any) {
    let focusindex: number;
    let islast = false;
    this.yearList2.forEach((element: any, index: number) => {
      if (element.id === currentyear.id) {
        if (index !== (this.yearList2.length - 1)) {
          focusindex = index + 1;
        } else {
          islast = true;
        }
      }
    });
    let itemid;
    if (!islast) {
      itemid = this.yearList2[focusindex];
    } else {
      itemid = this.yearList1[0];
    }
    document.getElementById(itemid['id']).focus();
    this.setDateWindowPosition();
  }

  yearList1ArrowUp(currentyear: any) {
    let focusindex: number;
    let isfirst = false;
    this.yearList1.forEach((elementyearList1: any, index: number) => {
      if (elementyearList1.id === currentyear.id) {
        if (index !== 0) {
          focusindex = index - 1;
        } else {
          isfirst = true;
        }
      }
    });
    let itemid;
    if (!isfirst) {
      itemid = this.yearList1[focusindex];
    } else {
      itemid = this.yearList2[this.yearList2.length - 1];
    }
    document.getElementById(itemid['id']).focus();
    this.setDateWindowPosition();
  }

  yearList2ArrowUp(currentyear: any) {
    let focusindex: number;
    let isfirst = false;
    this.yearList2.forEach((element: any, index: number) => {
      if (element.id === currentyear.id) {
        if (index !== 0) {
          focusindex = index - 1;
        } else {
          isfirst = true;
        }
      }
    });

    let itemid;
    if (!isfirst) {
      itemid = this.yearList2[focusindex];
    } else {
      itemid = this.yearList1[this.yearList1.length - 1];
    }
    document.getElementById(itemid['id']).focus();
    this.setDateWindowPosition();
  }

  onTimeClick(event: any) {
    this.showToolTip = true;
    this.dropdownstyle = { visibility: 'visible' };
    event.stopPropagation();
  }

  setRoundEdge(type: any) {
    if (type === 'round-edge') {
      this.roundedgeclass = 'roundEdgeCommonCss';
    } else if (type === 'classic') {
      this.roundedgeclass = 'classicCommonCss';
    }
  }

}
