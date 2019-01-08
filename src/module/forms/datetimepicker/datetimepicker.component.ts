/*
 Component Name : Amexio Date time picker
 Component Selector :  <amexio-date-time-picker>
 Component Description : This component is flexible for both Date and time picker with all required configurations in Style.
 */
import { animate, state, style, transition, trigger} from '@angular/animations';
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
  @Input('date-picker') datepicker: boolean;
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
   name : disabled
   datatype : boolean
   version : 4.1.5 onwards
   default : false
   description : Disable Date/Time Picker field
   */
  @Input('disabled') disabled: boolean;
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
  showToolTip: boolean;
  drop = false;
  elementId: string;
  daysTitle: any[];
  tempFlag = true;
  curYear: any;
  curMonth: any;
  monthNo: any;
  yearNo: any;
  pickerele: any;
  daysArray: any;
  yearList1: any[];
  yearList2: any[];
  monthList1: any[];
  monthList2: any[];
  selectedDate: any;
  hostFlag = false;
  currrentDate: any;
  dateModel: any;
  isValid: boolean;
  @Output() isComponentValid: any = new EventEmitter<any>();
  backArrowFlag = false;
  forwardArrowFlag = false;
  hrs: number;
  min: number;
  viewmode: string;
  // The internal dataviews model
  private innerValue: any = '';
  // Placeholders for the callbacks which are later provided
  // by the Control Value Accessor
  private onTouchedCallback: () => void = noop;
  private onChangeCallback: (_: any) => void = noop;
  constructor(public element: ElementRef, private cdf: ChangeDetectorRef, renderer: Renderer2) {
    super(renderer, element, cdf);
    this.viewmode = '1';

    this.yearList1 = [{ year: 0, flag: false, disabled: false }, { year: 0, flag: false, disabled: false },
    { year: 0, flag: false, disabled: false }, { year: 0, flag: false, disabled: false },
    { year: 0, flag: false, disabled: false }];
    this.yearList2 = [{ year: 0, flag: false, disabled: false }, { year: 0, flag: false, disabled: false },
    { year: 0, flag: false, disabled: false }, { year: 0, flag: false, disabled: false },
    { year: 0, flag: false, disabled: false }];
    this.monthList1 = [{ name: 'Jan', flag: false, num: 4 }, { name: 'Feb', flag: false },
    { name: 'Mar', flag: false }, { name: 'Apr', flag: false }, { name: 'May', flag: false },
    { name: 'Jun', flag: false }];
    this.monthList2 = [{ name: 'Jul', flag: false }, { name: 'Aug', flag: false }, { name: 'Sep', flag: false },
    { name: 'Oct', flag: false }, { name: 'Nov', flag: false }, { name: 'Dec', flag: false }];
    this.minDate = '';
    this.maxDate = '';
    this.elementId = new Date().getTime() + '';
    this.selectedDate = new Date();
    this.currrentDate = new Date();
    this.curYear = this.currrentDate.getFullYear();
    let i = 0;
    let j = 0;
    for (i = 4; i >= 0; i--) {
      this.yearList1[j].year = this.curYear - i;
      j++;
    }
    j = 0;
    for (i = 1; i <= 5; i++) {
      this.yearList2[j].year = this.curYear + i;
      j++;
    }
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
    if (this.dateformat != null) {
      this.dateformat = 'dd/MM/yyyy';
    }
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
  private initDaysTitle() {
    this.daysTitle.push({ text: 'Mo' });
    this.daysTitle.push({ text: 'Tu' });
    this.daysTitle.push({ text: 'We' });
    this.daysTitle.push({ text: 'Th' });
    this.daysTitle.push({ text: 'Fr' });
    this.daysTitle.push({ text: 'Sa' });
    this.daysTitle.push({ text: 'Su' });
  }
  private createDaysForCurrentMonths(selectedPeriod: any) {
    this.daysArray = [];
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
        if (this.dateModel && (date.getMonth() === this.dateModel.getMonth()) && (date.getDate() === this.dateModel.getDate())) {
          day.selected = true;
        } else if ((date.getMonth() === this.currrentDate.getMonth()) && (date.getDate() === this.currrentDate.getDate())) {
          if (this.dateModel) {
            day.selected = false;
          } else {
            day.selected = true;
          }
        }
        rowDays.push(day);
        date.setDate(date.getDate() + 1);
      }
      this.daysArray.push(rowDays);
    }
  }
  onDateClick(dateObj: any) {
    if (this.inlineDatepicker === false) {
      super.itemClicked();
    }
    this.hostFlag = true;
    this.selectedDate = dateObj;
    this.selectedDate.setHours(this.hrs);
    this.selectedDate.setMinutes(this.min);
    this.resetSelection(dateObj);
    this.dateModel = this.selectedDate;
    this.value = this.selectedDate;
    this.isValid = true;
    this.isComponentValid.emit(true);
    if (this.inlineDatepicker) {
      this.showToolTip = true;
    } else {
      this.showToolTip = !this.showToolTip;
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
        this.change.emit(this.value);
        event.stopPropagation();
      }
    }
  }
  public nextMonth(event: any) {
    this.setDateData('plus', 1, event);
    this.disableddays(this.diabledDate);
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
  private setToday() {
    this.currrentDate = new Date();
    this.initDate();
    this.showToolTip = !this.showToolTip;
  }
  initDate() {
    this.daysArray = [];
    this.createDaysForCurrentMonths(this.currrentDate);
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

  validateWriteValue(value: any) {
    this.innerValue = value;
    if (this.innerValue instanceof Date || ('number' === typeof this.innerValue)) {
      if (('number' === typeof this.innerValue)) {
        this.innerValue = new Date(this.innerValue);
      }
      this.dateModel = this.innerValue;
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
      this.value = Date.parse(value.value);
      this.isValid = true;
    }
  }
  openPicker(elem: any) {
    super.focus(elem);
    this.hostFlag = false;
    this.pickerele = elem;
    if (this.inlineDatepicker) {
      this.showToolTip = this.inlineDatepicker;
    } else {
      this.showToolTip = true;
    }
    this.posixUp = this.getListPosition(elem);
    const visibility = this.dropdownstyle.visibility;
    this.dropdownstyle = JSON.parse(JSON.stringify(this.positionClass));
    this.dropdownstyle.visibility = visibility;
    this.dropdownstyle.position = 'fixed';
    this.disableddays(this.diabledDate);
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
  private validateDays(days: any) {
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
      if (days.getDate() < min.getDate() &&
        days.getMonth() === min.getMonth() && days.getFullYear() === min.getFullYear()) {
        return true;
        // 4
      } else if (days.getMonth() < min.getMonth() && days.getFullYear() === min.getFullYear()) {
        return true;
      }
    }
    this.disableddays(this.diabledDate);
  }

  private validateMaxDate(days: any, max: any) {
    // check if days greater than max return
    // 1
    if (days.getDate() > max.getDate() &&
      days.getMonth() >= max.getMonth() && days.getFullYear() >= max.getFullYear()) {
      return true;
      // 2
    } else if (days.getMonth() > max.getMonth() && days.getFullYear() === max.getFullYear()) {
      return true;
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
  dropdownDatePicker() {
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
  }

  // Added method to avois recursive code
  elementFlagMethod(element: any) {
    if (element.flag) {
      element.flag = false;
    }
  }

  negateDrop() {
    this.hostFlag = true;
    this.drop = false;
    this.showToolTip = true;
    this.tempFlag = true;
  }
  getDropdownMonth(month: any) {
    this.monthList1.forEach((element: any) => {
      this.elementFlagMethod(element);
    });
    this.monthList2.forEach((element: any) => {
      this.elementFlagMethod(element);
    });
    this.monthList1.forEach((element: any) => {
      this.chkMonth(element, month);
    });
    this.monthList2.forEach((element: any) => {
      this.chkMonth(element, month);
    });
    switch (month.name) {
      case 'Jan':
        this.monthNo = 0;
        break;
      case 'Feb':
        this.monthNo = 1;
        break;
      case 'Mar':
        this.monthNo = 2;
        break;
      case 'Apr':
        this.monthNo = 3;
        break;
      case 'May':
        this.monthNo = 4;
        break;
      case 'Jun':
        this.monthNo = 5;
        break;
      case 'Jul':
        this.monthNo = 6;
        break;
      case 'Aug':
        this.monthNo = 7;
        break;
      case 'Sep':
        this.monthNo = 8;
        break;
      case 'Oct':
        this.monthNo = 9;
        break;
      case 'Nov':
        this.monthNo = 10;
        break;
      case 'Dec':
        this.monthNo = 11;
        break;
      default:
        break;
    }
    super.focus({});
  }
  // this function broken from chk month getDropdownMonth()
  chkMonth(element: any, month: any) {
    if (element.name === month.name) {
      element.flag = true;
    }
  }

  // this function is broken from getDropdownYear
  private yearFlagNegate(element: any) {
    this.elementFlagMethod(element);
  }
  // this function is broken from getDropdownYear
  yearFlag(element: any, year: any) {
    if (element.year === year.year) {
      element.flag = true;
    }
  }

  getDropdownYear(year: any) {
    this.yearList1.forEach((element: any) => {
      // negate dropdown year flag
      this.yearFlagNegate(element);
    });
    this.yearList2.forEach((element: any) => {
      // negate dropdown year flag
      this.yearFlagNegate(element);
    });
    this.yearList1.forEach((element: any) => {
      this.yearFlag(element, year);
    });
    this.yearList2.forEach((element: any) => {
      this.yearFlag(element, year);
    });
    this.yearNo = year.year;
    super.focus({});
  }
  navigateDropdown() {
    this.hostFlag = true;
    this.selectedDate = new Date();
    if (this.yearNo != null && this.monthNo != null) {
      this.selectedDate.setFullYear(this.yearNo);
      this.selectedDate.setMonth(this.monthNo);
    } else if (this.yearNo != null && this.monthNo === null) {
      this.selectedDate.setFullYear(this.yearNo);
    } else if (this.yearNo === null && this.monthNo != null) {
      this.selectedDate.setMonth(this.monthNo);
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
  }
  cancelDropdown() {
    this.drop = false;
    this.showToolTip = true;
  }
  arrowClickBack() {
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

  arrowClickForward() {
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
}
