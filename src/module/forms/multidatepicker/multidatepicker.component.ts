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
  selector: 'amexio-multiple-date-picker',
  templateUrl: './multidatepicker.component.html',
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
    provide: NG_VALUE_ACCESSOR, useExisting: forwardRef(() => AmexioMultipleDatePickerComponent), multi: true,
  }, {
    provide: NG_VALIDATORS, useExisting: forwardRef(() => AmexioMultipleDatePickerComponent), multi: true,
  }],
})
export class AmexioMultipleDatePickerComponent extends ListBaseDatepickerComponent<string> implements OnInit, Validators {

  @Input() fromlabel: string;
  @Input() tolabel: string;
  @Input('number-of-months') numberofmonths = 1;
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
   name : disabled
   datatype : boolean
   version : 4.1.5 onwards
   default : false
   description : Disable Date/Time Picker field
   */
  @Input('disabled') disabled = false;

  /*
   Properties
   name : min-date
   datatype : string
   version : 4.2 onwards
   default : none
   description : sets minimum date range
   */
  @Input('min-date') minDate = '';
  /*
   Properties
   name : max-date
   datatype : string
   version : 4.2 onwards
   default : none
   description : sets maximum date range
   */
  @Input('max-date') maxDate = '';

  /*
 Properties
 name : diabled-date
 datatype :  any
 version : 4.2 onwards
 default : none
 description : sets disabled dates range
 */
  @Input('disabled-date') diabledDate: any[] = [];

  fromdate = new Date();
  todate = new Date();
  datepicker = false;
  completeDaysArray: any;
  currrentDate: any;
  daysArray: any;
  dateModel: any;
  daysTitle: any = [];
  alterfromdate = false;
  altertodate = false;
  backarrowflag = false;
  forwardarrowflag = false;
  fromcardselected = false;
  tocardselected = false;
  fromtab = false;
  totab = false;
  totalwidth = 0;
  @Output() change: EventEmitter<any> = new EventEmitter<any>();

  constructor(public element: ElementRef, private cdf: ChangeDetectorRef, renderer: Renderer2) {
    super(renderer, element, cdf);
    this.completeDaysArray = [];

  }

  ngOnInit() {
    this.currrentDate = new Date();
    const d = new Date(this.currrentDate);
    let i;
    for (i = 0; i < this.numberofmonths; i++) {
      const obj = {};
      if (i === 0) {
        d.setMonth(d.getMonth());
        obj['prevarrow'] = true;
      } else {
        d.setMonth(d.getMonth() + 1);
        obj['prevarrow'] = false;
      }
      obj['date'] = new Date(d);
      this.createDaysForCurrentMonths(d);
      obj['montharray'] = this.daysArray;
      obj['month'] = this.getFullMonthName(d);
      obj['year'] = d.getFullYear();
      if (i === (this.numberofmonths - 1)) {
        obj['nextarrow'] = true;
      } else {
        obj['nextarrow'] = false;
      }
      this.completeDaysArray.push(obj);
    }
    this.initDaysTitle();

    this.todate.setDate(this.fromdate.getDate() + 7);

    // set from to on completedayarray
    // this.setfromtooncompletedayarray();
    this.calculateMonthBlocks();

    this.fromdate = null;
    this.todate = null;
  }

  setfromtooncompletedayarray() {
    this.completeDaysArray.forEach((dayarr: any) => {
      dayarr.montharray.forEach((individualmonth: any) => {
        individualmonth.forEach((day: any) => {
          if ((day.date.getFullYear() === this.fromdate.getFullYear()) &&
            (day.date.getMonth() === this.fromdate.getMonth()) &&
            (day.date.getDate() === this.fromdate.getDate())) {
            day.from = true;
          }

          if ((day.date.getFullYear() === this.todate.getFullYear()) &&
            (day.date.getMonth() === this.todate.getMonth()) &&
            (day.date.getDate() === this.todate.getDate())) {
            day.to = true;
          }
        });
      });
    });
  }

  fromPicker(elem: any, event: any) {
    this.resetDisabledaysBeforeFrom();
    this.calculateMonthBlocks();
    this.fromtab = true;
    this.totab = false;

    this.fromcardselected = true;
    this.tocardselected = false;
    this.dropdownstyle = { visibility: 'visible' };

    this.openPicker(elem);
    this.resetRange();
    this.setRange();
    event.stopPropagation();

  }

  toPicker(elem: any, event: any) {
    this.setDisableDaysBeforeFrom();
    this.fromtab = false;
    this.totab = true;

    this.tocardselected = true;
    this.fromcardselected = false;
    this.dropdownstyle = { visibility: 'visible' };
    this.openPicker(elem);
    this.resetRange();
    this.setRange();
    event.stopPropagation();

  }

  openPicker(elem: any) {
    if (this.disabled === false) {
      super.focus(elem);
      this.datepicker = true;
      this.validateMinMaxDate();
      this.disableddays();
      this.validateDaysForMinMax();
      this.clearClicks();
    }
  }

  calculateMonthBlocks() {
    const screenwidth = window.screen.width;
    const noofmonthblocks = parseInt(JSON.stringify(screenwidth / 290), 10);
    if (this.numberofmonths <= 4) {
      this.totalwidth = this.numberofmonths * 290;
    } else {
      this.totalwidth = noofmonthblocks * 290;
    }
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
          from: false, to: false, range: false,
        };
        day.date = new Date(date.getTime());
        day.isCurrentMonth = (date.getMonth() === selectedPeriod.getMonth());
        day['id'] = Math.floor(Math.random() * 90000) + 10000 + '_id';
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

  // getFullMonthName
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

  // getFullDayName
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

  private initDaysTitle() {
    this.daysTitle.push({ text: 'Mo' });
    this.daysTitle.push({ text: 'Tu' });
    this.daysTitle.push({ text: 'We' });
    this.daysTitle.push({ text: 'Th' });
    this.daysTitle.push({ text: 'Fr' });
    this.daysTitle.push({ text: 'Sa' });
    this.daysTitle.push({ text: 'Su' });
  }

  private validateDays(days: any) {
    this.disableddays();
    this.validateDaysForMinMax();
  }

  setDisableDaysBeforeFrom() {
    if (this.fromdate) {
      this.completeDaysArray.forEach((daysarray: any) => {
        daysarray.montharray.forEach((dayobject: any) => {
          dayobject.forEach((singleday: any) => {
            if (singleday.date < this.fromdate) {
              singleday.isDisabled = true;
            }
          });
        });
      });
    }
  }

  resetDisabledaysBeforeFrom() {
    if (this.fromdate) {
      this.completeDaysArray.forEach((daysarray: any) => {
        daysarray.montharray.forEach((dayobject: any) => {
          dayobject.forEach((singleday: any) => {
            if (singleday.date < this.fromdate) {
              singleday.isDisabled = false;
            }
          });
        });
      });
    }
    this.disableddays();
  }

  onDateClick(dateObj: any, event: any, elem: any) {
    // refactored code
    this.setVisibility(dateObj);
    if (dateObj.isDisabled === false) {
      if (this.fromcardselected) {
        this.refactoredOnDateClick(dateObj, event, elem);
        this.onfromCardSelected(dateObj, event, elem);
      }

      if (this.tocardselected) {
        this.onToCardSelected(dateObj, event, elem);
      }
      this.change.emit(dateObj.date);
    } else {
      event.stopPropagation();
    }
    this.resetRange();
    this.setRange();
  }

  refactoredOnDateClick(dateObj: any, event: any, elem: any) {
    if ((this.fromdate == null) && (this.todate == null)) {
      this.clearFrom();
      this.assignFrom(dateObj);
      this.fromdate = dateObj.date;
      this.toPicker(elem, event);
      this.clearTo();
      this.todate = null;
      this.setDisableDaysBeforeFrom();
    } else if (this.fromdate && (this.todate == null)) {
      this.clearFrom();
      this.assignFrom(dateObj);
      this.fromdate = dateObj.date;
      this.toPicker(elem, event);
      this.setDisableDaysBeforeFrom();
    }
  }

  onfromCardSelected(dateObj: any, event: any, elem: any) {
    if (this.fromdate && this.todate) {
      this.clearFrom();
      this.assignFrom(dateObj);
      this.fromdate = dateObj.date;

      if (dateObj.date > this.todate) {
        this.clearTo();
        this.todate = null;
        this.toPicker(elem, event);
        this.setDisableDaysBeforeFrom();
      }
    }
  }

  onToCardSelected(dateObj: any, event: any, elem: any) {
    if (this.fromdate && (dateObj.date > this.fromdate)) {
      this.clearTo();
      this.assignTo(dateObj);
      this.todate = dateObj.date;
    }
  }

  setVisibility(dateObj: any) {
    if (this.inlineDatepicker === false) {
      this.dropdownstyle = { visibility: 'visible' };
      event.stopPropagation();
    }

    if (dateObj.date.isDisabled) {
      this.dropdownstyle = { visibility: 'visible' };
      event.stopPropagation();
    }
  }

  fromdateRefactored(dateObj: any) {
    this.clearFrom();
    this.clearTo();

    this.fromdate = dateObj.date;
    // call assign from flag true of matching dateObj.date
    this.assignFrom(dateObj);

    const newdate = new Date(this.fromdate);
    newdate.setDate(this.fromdate.getDate() + 1);
    this.todate = newdate;

    const daysobject = { date: this.todate };
    this.assignTo(daysobject);
  }

  assignFrom(dateObj: any) {
    // assign from flags
    this.completeDaysArray.forEach((daysarray: any) => {
      daysarray.montharray.forEach((dayobject: any) => {
        dayobject.forEach((singleday: any) => {
          if ((dateObj.date.getFullYear() === singleday.date.getFullYear()) &&
            (dateObj.date.getMonth() === singleday.date.getMonth()) &&
            (dateObj.date.getDate() === singleday.date.getDate())) {
            singleday.from = true;
          }
        });
      });
    });
  }

  assignTo(dateObj: any) {
    // assdign to
    this.completeDaysArray.forEach((daysarrays: any) => {
      daysarrays.montharray.forEach((dayobj: any) => {
        dayobj.forEach((day: any) => {

          if ((dateObj.date.getFullYear() === day.date.getFullYear()) &&
            (dateObj.date.getMonth() === day.date.getMonth()) &&
            (dateObj.date.getDate() === day.date.getDate())) {
            day.to = true;
          }
        });
      });
    });
  }

  resetRange() {
    this.completeDaysArray.forEach((arrays: any) => {
      arrays.montharray.forEach((dayobj: any) => {
        dayobj.forEach((day: any) => {
          day.range = false;
        });
      });
    });
  }

  setRange() {
    this.completeDaysArray.forEach((days: any) => {
      days.montharray.forEach((dayobj: any) => {
        dayobj.forEach((day: any) => {
          if ((day.date > this.fromdate) && (day.date < this.todate)) {
            day.range = true;
          }
        });
      });
    });
  }

  private disableddays() {
    if (this.diabledDate) {
      this.diabledDate.forEach((element: any) => {
        const From = new Date(element.from);
        const To = new Date(element.to);
        this.completeDaysArray.forEach((dayarr: any) => {
          dayarr.montharray.forEach((weekarr: any) => {
            weekarr.forEach((day: any) => {

              if (day.date.getFullYear() <= To.getFullYear() &&
                day.date.getMonth() <= To.getMonth() &&
                day.date.getDate() <= To.getDate() &&
                day.date.getFullYear() >= From.getFullYear() &&
                day.date.getMonth() >= From.getMonth() &&
                day.date.getDate() >= From.getDate()) {
                day.isDisabled = true;
              }

            });
          });
        });

      });
    }
  }

  private validateDaysForMinMax() {
    this.completeDaysArray.forEach((dayarr: any) => {
      dayarr.montharray.forEach((weekarr: any) => {
        weekarr.forEach((day: any) => {
          this.refactoredvalidateDaysForMinMax(day);
        });
      });
    });
  }

  refactoredvalidateDaysForMinMax(day: any) {
    if (this.minDate) {
      const min = new Date(this.minDate);
      if (day.date < min) {
        day.isDisabled = true;
      }
    }

    if (this.maxDate) {
      const max = new Date(this.maxDate);

      if (day.date > max) {
        day.isDisabled = true;
      }
    }
  }

  clearFromTo() {
    if (this.alterfromdate) {
      // clear all from flags
      this.completeDaysArray.forEach((darray: any) => {
        darray.montharray.forEach((dobject: any) => {
          dobject.forEach((sday: any) => {
            sday.from = false;
          });
        });
      });
    }

    if (this.altertodate) {
      // clear to flag
      this.completeDaysArray.forEach((daysarray: any) => {
        daysarray.montharray.forEach((dayobject: any) => {
          dayobject.forEach((singleday: any) => {
            singleday.to = false;
          });
        });
      });
    }
  }

  clearFrom() {
    // clear all from flags
    this.completeDaysArray.forEach((daysarray: any) => {
      daysarray.montharray.forEach((dayobject: any) => {
        dayobject.forEach((singleday: any) => {
          singleday.from = false;
        });
      });
    });
  }

  clearTo() {
    // clear all to flags
    this.completeDaysArray.forEach((darr: any) => {
      darr.montharray.forEach((dayobj: any) => {
        dayobj.forEach((singleday: any) => {
          singleday.to = false;
        });
      });
    });
  }

  updateMonthList(operation: string, event: any) {
    event.stopPropagation();

    if ((operation === 'plus') && !this.forwardarrowflag) {
      // call plus function
      this.incrementMonthList(event);
    }
    if ((operation === 'minus') && !this.backarrowflag) {
      // call minus function
      this.decrementMonthList(event);
    }
    this.validateMinMaxDate();
    this.disableddays();
    this.validateDaysForMinMax();
    // call set range
    this.resetRange();
    this.setRange();
  }

  incrementMonthList(event: any) {
    this.completeDaysArray.forEach((singleDayArray: any) => {
      const d = new Date(singleDayArray.date);
      d.setMonth(d.getMonth() + this.numberofmonths);
      this.createDaysForCurrentMonths(d);
      singleDayArray.date = d;
      singleDayArray.montharray = this.daysArray;
      singleDayArray.month = this.getFullMonthName(d);
      singleDayArray.year = d.getFullYear();
    });
  }

  decrementMonthList(event: any) {
    this.completeDaysArray.forEach((singleDayArray: any) => {
      const d = new Date(singleDayArray.date);
      d.setMonth(d.getMonth() - this.numberofmonths);
      this.createDaysForCurrentMonths(d);
      singleDayArray.date = d;
      singleDayArray.montharray = this.daysArray;
      singleDayArray.month = this.getFullMonthName(d);
      singleDayArray.year = d.getFullYear();
    });
  }

  validateMinMaxDate() {
    this.backarrowflag = false;
    this.forwardarrowflag = false;
    if (this.minDate.length > 0) {
      this.validateMinDate();
    }
    if (this.maxDate.length > 0) {
      this.validateMaxDate();
    }
  }

  validateMinDate() {
    this.completeDaysArray.forEach((dayarray: any) => {
      if ((dayarray.date.getMonth() === new Date(this.minDate).getMonth()) &&
        (dayarray.date.getFullYear() === new Date(this.minDate).getFullYear())) {
        this.backarrowflag = true;
      }
    });
  }

  validateMaxDate() {
    this.completeDaysArray.forEach((daysarray: any) => {
      if ((daysarray.date.getMonth() === new Date(this.maxDate).getMonth()) &&
        (daysarray.date.getFullYear() === new Date(this.maxDate).getFullYear())) {
        this.forwardarrowflag = true;
      }
    });
  }

}
