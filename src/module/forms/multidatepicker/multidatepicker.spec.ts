// Copyright [2019] [Metamagic]

// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at

//     http://www.apache.org/licenses/LICENSE-2.0

// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.
import { CommonIconComponent } from './../../base/components/common.icon.component';

import { AmexioButtonComponent } from './../buttons/button.component';
import { AmexioMultipleDatePickerComponent } from './multidatepicker.component';
import { By } from '@angular/platform-browser';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { ChangeDetectorRef, ElementRef } from '@angular/core';
import { IconLoaderService } from '../../../index';
import { DebugElement } from '@angular/core';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';

describe('amexio-date-time-picker', () => {
  let comp: AmexioMultipleDatePickerComponent;
  let fixture: ComponentFixture<AmexioMultipleDatePickerComponent>;

  beforeEach(() => {
    // TestBed.configureTestingModule({
    //   imports: [FormsModule, NoopAnimationsModule],
    //   declarations: [AmexioMultipleDatePickerComponent, AmexioButtonComponent ,CommonIconComponent],
    //   providers: [IconLoaderService ]
    // });
    // fixture = TestBed.createComponent(AmexioMultipleDatePickerComponent);
    // comp = fixture.componentInstance;
    // comp.backArrowFlag = false;
    // event = jasmine.createSpyObj('event', ['preventDefault', 'stopPropagation']);

    // //comp.testnumber = 5;
    // comp.yearList1 = [{ year: 0, flag: false, disabled: false },
    // { year: 1, flag: false, disabled: false }, { year: 3, flag: false, disabled: false },
    // { year: 4, flag: false, disabled: false }, { year: 5, flag: false, disabled: false }];
    // comp.yearList2 = [{ year: 20, flag: false, disabled: false },
    // { year: 15, flag: false, disabled: false },
    // { year: 8, flag: false, disabled: false },
    // { year: 18, flag: false, disabled: false },
    // { year: 65, flag: false, disabled: false }];
  });

  // it('Initial Check', () => {
  //   expect(true).toBe(true);
  // });

  // it('Condition Check', () => {
  //   comp.inlineDatepicker = true;
  //   comp.dateformat = '';
  //   fixture.detectChanges();
  //   expect(true).toBe(comp.showToolTip);
  //   expect(comp.dateformat).not.toBeUndefined();
  //   // comp.setToday();
  //   // expect(false).toBe(comp.showToolTip);
  //   let element = { flag: true, name: 'Jan' };
  //   comp.elementFlagMethod(element);
  //   expect(false).toBe(element.flag);
  //   comp.negateDrop();
  //   expect(true).toBe(comp.hostFlag);
  //   expect(false).toBe(comp.drop);
  //   expect(true).toBe(comp.showToolTip);
  //   expect(true).toBe(comp.tempFlag);
  //   comp.monthList1 = [];
  //   comp.monthList2 = [];
  //   const Jan = { name: 'Jan' };
  //   const Feb = { name: 'Feb' };
  //   const Mar = { name: 'Mar' };
  //   const Apr = { name: 'Apr' };
  //   const May = { name: 'May' };
  //   const Jun = { name: 'Jun' };
  //   const Jul = { name: 'Jul' };
  //   const Aug = { name: 'Aug' };
  //   const Sep = { name: 'Sep' };
  //   const Oct = { name: 'Oct' };
  //   const Nov = { name: 'Nov' };
  //   const Dec = { name: 'Dec' };
  //   const month = { name: 'Jan' };
  //   const monthnew = { name: 'Janone' };
  //   comp.getDropdownMonth(Jan);
  //   expect(0).toEqual(comp.monthNo);

  //   comp.getDropdownMonth(Feb);
  //   expect(1).toEqual(comp.monthNo);

  //   comp.getDropdownMonth(Mar);
  //   expect(2).toEqual(comp.monthNo);

  //   comp.getDropdownMonth(Apr);
  //   expect(3).toEqual(comp.monthNo);

  //   comp.getDropdownMonth(May);
  //   expect(4).toEqual(comp.monthNo);

  //   comp.getDropdownMonth(Jun);
  //   expect(5).toEqual(comp.monthNo);

  //   comp.getDropdownMonth(Jul);
  //   expect(6).toEqual(comp.monthNo);

  //   comp.getDropdownMonth(Aug);
  //   expect(7).toEqual(comp.monthNo);

  //   comp.getDropdownMonth(Sep);
  //   expect(8).toEqual(comp.monthNo);

  //   comp.getDropdownMonth(Oct);
  //   expect(9).toEqual(comp.monthNo);

  //   comp.getDropdownMonth(Nov);
  //   expect(10).toEqual(comp.monthNo);

  //   comp.getDropdownMonth(Dec);
  //   expect(11).toEqual(comp.monthNo);

  //   comp.getDropdownMonth(monthnew);

  //   // comp.yearFlag();
  //   //--------------------------------------------------
  //   const e1 = { year: 2011, flag: true };
  //   const e2 = { year: 2011 };
  //   comp.yearFlag(e1, e2);
  //   expect(true).toBe(e1.flag);

  //   comp.checkValidity();
  //   comp.isValid = false;
  //   expect(false).toBe(comp.isValid);

  //   comp.cancelDropdown();
  //   expect(false).toBe(comp.drop);
  //   expect(true).toBe(comp.showToolTip);
  //   comp.minDate = '22-Mar-2016';
  //   comp.maxDate = '22-Feb-2019';

  //   comp.yearList1 = [{ year: 2018, flag: false, disabled: false }];
  //   comp.yearList2 = [{ year: 2018, flag: false, disabled: false }];
  //   comp.chkYearList1();
  //   expect(false).toBe(comp.backArrowFlag);
  //   expect(false).toBe(comp.forwardArrowFlag);

  //   const el = { year: 2010, disabled: true };

  //   comp.disableMinMaxYear(el, new Date(), new Date());
  //   expect(true).toBe(el.disabled);

  //   comp.yearFlagDisable(el);
  //   expect(true).toBe(el.disabled);

  //   comp.rechkYearFlag();
  //   expect(false).toBe(comp.backArrowFlag);

  //   const elt = { year: 2018, disabled: true };
  //   comp.alterBackArrow(elt, new Date());
  //   expect(true).toBe(comp.backArrowFlag);

  //   comp.yearList1 = [{ year: 0, flag: false, disabled: false },
  //   { year: 1, flag: false, disabled: false }, { year: 3, flag: false, disabled: false },
  //   { year: 4, flag: false, disabled: false }, { year: 5, flag: false, disabled: false }];
  //   comp.yearList2 = [{ year: 20, flag: false, disabled: false },
  //   { year: 15, flag: false, disabled: false },
  //   { year: 8, flag: false, disabled: false },
  //   { year: 18, flag: false, disabled: false },
  //   { year: 65, flag: false, disabled: false }];
  //   comp.backArrowFlag = false;
  //   comp.resetYearFlag();
  //   expect(false).toBe(comp.backArrowFlag);

  //   comp.daysArray = [{ date: new Date() }];
  //   comp.resetSelection(new Date());

  //   comp.setMaxFullYear(new Date('22-Mar-2016'), new Date(), 1);

  //   comp.onDateClick(new Date());
  //   expect(true).toBe(comp.showToolTip);


  //   comp.setPlusData(new Date(), new Date(), 2);

  //   comp.setPlusData(new Date('22-Mar-2016'), new Date(), 2);
  //   comp.setMinusData(new Date('22-Mar-2016'), new Date(), 2);
  //   comp.setMinFullYear(new Date('22-DEC-2019'), new Date(), 1);


  //   // comp.setDateData1('plus',2,new Event(0));

  //   comp.currrentDate = new Date();
  //   comp.initDate();
  //   expect('').toEqual('');

  //   //*************chk this */
  //   // comp.writeValue(11);

  //   comp.disableYearFlag();

  //   // comp.onFocusOut(new Date());
  //   // expect(false).toBe(comp.isValid);

  //   comp.minMaxDateFound();
  //   expect(false).toBe(comp.forwardArrowFlag);

  //   const eone = { name: 'Jan', flag: true };
  //   const etwo = { name: 'Jan' };
  //   comp.chkMonth(eone, etwo);
  //   expect(true).toBe(eone.flag);

  //   comp.monthList1 = [{ name: 'Jan', flag: false, num: 4 }, { name: 'Feb', flag: false },
  //   { name: 'Mar', flag: false }, { name: 'Apr', flag: false }, { name: 'May', flag: false },
  //   { name: 'Jun', flag: false }];
  //   comp.monthList2 = [{ name: 'Jul', flag: false }, { name: 'Aug', flag: false }, { name: 'Sep', flag: false },
  //   { name: 'Oct', flag: false }, { name: 'Nov', flag: false }, { name: 'Dec', flag: false }];

  //   comp.dropdownDatePicker();
  //   expect(true).toBe(comp.hostFlag);
  //   expect(true).toBe(comp.drop);
  //   expect(false).toBe(comp.tempFlag);




  // });

  // it('initialize innervalue', () => {
  //   comp.value = 'date';
  //   expect(comp['innerValue']).toEqual(comp.value);
  // });

  // it('setDateData()', () => {
    // let state: string, mon: number = 9, event1: any;
    // //= 'MouseEvent {isTrusted: true, screenX: 280, screenY: 224, clientX: 236, clientY: 145, …}';

    // comp.setDateData(state, mon, event);
    // expect(event.preventDefault).toBeTruthy();
    // comp.currrentDate = new Date();
    // comp.maxDate = "27-Feb-2019";
    // comp.minDate = "22-Jan-2015";
    // const d = new Date(comp.currrentDate.getFullYear(), comp.currrentDate.getMonth(), comp.currrentDate.getDate());
    // const min = new Date(comp.minDate);
    // const max = new Date(comp.maxDate);
    // comp.currrentDate = d;

    // state = 'plus';
    // expect(state).toEqual('plus');
    // comp.setPlusData(d, max, mon);
    // state = 'minus';
    // expect(state).toEqual('minus');
    // comp.setPlusData(d, min, mon);
    // expect(comp.currrentDate).toEqual(d);
    // comp.initDate();
    // event.stopPropagation();
  // });





  // it('setDateData1()', () => {
  //   let state: string, mon: number = 9, event1: any;
  //   //= 'MouseEvent {isTrusted: true, screenX: 280, screenY: 224, clientX: 236, clientY: 145, …}';

  //   comp.setDateData1(state, mon, event);
  //   expect(event.preventDefault).toBeTruthy();
  //   comp.currrentDate = new Date();
  //   comp.maxDate = "27-Feb-2019";
  //   comp.minDate = "22-Jan-2015";
  //   const d = new Date(comp.currrentDate.getFullYear(), comp.currrentDate.getMonth(), comp.currrentDate.getDate());
  //   const min = new Date(comp.minDate);
  //   const max = new Date(comp.maxDate);
  //   comp.currrentDate = d;

  //   state = 'plus';
  //   expect(state).toEqual('plus');
  //   expect(comp.maxDate.length).toBeGreaterThan(0);
  //   expect(d.getFullYear()).toBeLessThanOrEqual(max.getFullYear() - 1);
  //   d.setMonth(d.getMonth() + mon);
  //   //d.setFullYear(2021);
  //   comp.maxDate = "";
  //   expect(comp.maxDate.length).toEqual(0);
  //   d.setMonth(d.getMonth() + mon);

  //   state = 'minus';
  //   expect(state).toEqual('minus');
  //   expect(comp.minDate.length).toBeGreaterThan(0);

  //   expect(d.getFullYear()).toBeGreaterThanOrEqual(min.getFullYear() + 1);
  //   d.setMonth(d.getMonth() - mon);
  //   comp.minDate = "";
  //   expect(comp.minDate.length).toEqual(0);
  //   d.setMonth(d.getMonth() - mon);

  //   comp.currrentDate = d;
  //   expect(comp.currrentDate).toEqual(d);

  //   comp.initDate();
  //   event.stopPropagation();
  // });

  // it('nextYear()', () => {
  //   comp['nextYear'](event);
  //  //  comp.setDateData1('plus', 12, event);
  // });
  // it('prevYear()', () => {
  //   comp['prevYear'](event);
  // //  comp.setDateData1('minus', 12, event);
  // });






  // it('nextmonth', () => {
  //   let date = [
  //     {
  //       "from": "13-Jul-2018",
  //       "to": "15-Jul-2018"
  //     },
  //     {
  //       "from": "20-Jul-2018",
  //       "to": "23-Jul-2018"
  //     },
  //     {
  //       "from": "15-Jun-2018",
  //       "to": "19-Jun-2018"
  //     },
  //     {
  //       "from": "27-Jun-2018",
  //       "to": "29-Jun-2018"
  //     },
  //     {
  //       "from": "23-Aug-2018",
  //       "to": "28-Aug-2018"
  //     },
  //     {
  //       "from": "17-Aug-2018",
  //       "to": "19-Aug-2018"
  //     },
  //     {
  //       "from": "19-Sep-2018",
  //       "to": "21-Sep-2018"
  //     },
  //     {
  //       "from": "1-Nov-2018",
  //       "to": "30-Nov-2018"
  //     }
  //   ];
  //   comp['nextMonth'](event);

  //   // event = jasmine.createSpyObj('event', ['preventDefault', 'stopPropagation']);

  //   comp.setDateData('plus', 1, event);
  //   // expect(event.preventDefault).toBeTruthy();

  //   comp['disableddays'](date);
  // });


  // it('prevMonth', () => {
  //   let date = [
  //     {
  //       "from": "13-Jul-2018",
  //       "to": "15-Jul-2018"
  //     },
  //     {
  //       "from": "20-Jul-2018",
  //       "to": "23-Jul-2018"
  //     },
  //     {
  //       "from": "15-Jun-2018",
  //       "to": "19-Jun-2018"
  //     },
  //     {
  //       "from": "27-Jun-2018",
  //       "to": "29-Jun-2018"
  //     },
  //     {
  //       "from": "23-Aug-2018",
  //       "to": "28-Aug-2018"
  //     },
  //     {
  //       "from": "17-Aug-2018",
  //       "to": "19-Aug-2018"
  //     },
  //     {
  //       "from": "19-Sep-2018",
  //       "to": "21-Sep-2018"
  //     },
  //     {
  //       "from": "1-Nov-2018",
  //       "to": "30-Nov-2018"
  //     }
  //   ];
  //   comp['prevMonth'](event);

  //   comp.setDateData('plus', 1, event);
  //   // expect(event.preventDefault).toBeTruthy();

  //   comp['disableddays'](date);
  // });

  // it('resetselection()', () => {
  //   let dateObj = new Date("Thu Jul 25 2017 00:00:00 GMT+0530 (IST)");
  //   let daysArray: any = [];
  //   let rowDays: any;
  //   const day: any = {
  //     date: null, selected: false, isCurrentMonth: null, isDisabled: false,
  //   };
  //   day.date = new Date(dateObj.getTime());
  //   comp.resetSelection(dateObj);
  //   day.selected = true;
  //   expect(day.date.getTime()).toEqual(dateObj.getTime());
  //   expect(day.selected).toEqual(true);
  //   day.date.setTime(1332403882588);
  //   day.selected = false;
  //   expect(day.selected).toEqual(false);
  // });


  // it('ngOnInit', () => {
  //   comp.ngOnInit();

  //   comp.maxDate = "22-Feb-2019"
  //   comp.minDate = "22-Feb-2015"

  //   expect(comp.minDate.length).toBeGreaterThan(0);
  //   comp.minMaxDateFound();
  //   expect(comp.maxDate.length).toBeGreaterThan(0);
  //   comp.minMaxDateFound();

  //   expect(comp.minDate.length).toBeGreaterThan(0);
  //   expect(comp.maxDate.length).toBeGreaterThan(0);
  //   const min = new Date(comp.minDate);
  //   const max = new Date(comp.maxDate);

  //   // comp.disableMinMaxYear(comp.yearList1[0], min, max);

  //   // comp.disableMinMaxYear(comp.yearList2[0], min, max);

  // });


  // it('setToday()', () => {
  //   comp['setToday']();
  //   // comp.currrentDate = new Date();
  //   comp.initDate();
  //   comp.showToolTip = true;
  //   comp.showToolTip = !comp.showToolTip;
  //   expect(comp.showToolTip).toEqual(false);
  // });

  // it('onBlur()', () => {
  //   comp.onBlur();
  //   comp['onTouchedCallback']();
  // });

  // it('registerOnChange()', () => {
  //   let fn;
  //   comp.registerOnChange(fn);
  //   comp['onChangeCallback'] = fn;
  //   expect(comp['onChangeCallback']).toEqual(fn);
  // });

  // it('registerOnTouched()', () => {
  //   let fn;
  //   comp.registerOnTouched(fn);
  //   comp['onTouchedCallback'] = fn;
  //   expect(comp['onTouchedCallback']).toEqual(fn);
  // });


  // it('writeValue()', () => {

  //   let value = 11;
  //   comp.writeValue(value);

  //   expect(value).not.toEqual(comp['innerValue']);
  //   comp['innerValue'] = value;
  //   expect(comp['innerValue']).toEqual(value);

  //   expect(comp.required).toEqual(true);

  //   let bool = comp['innerValue'] instanceof Date;
  //   expect(bool).toEqual(true);

  // });

  // it('createDaysForCurrentMonths()', () => {
  //   event = jasmine.createSpyObj('event', ['preventDefault', 'stopPropagation']);
  //   expect(event.preventDefault).toBeTruthy();
  //   let selectedperiod = new Date();
  //   comp['createDaysForCurrentMonths'](selectedperiod);
  //   comp.daysArray = [];
  //   const extras = (selectedperiod.getDay() + 6) % 7;
  //   let rowDays = [];
  //   const day: any = {
  //     date: null, selected: false, isCurrentMonth: null, isDisabled: false,
  //   };
  //   day.date = new Date(selectedperiod.getTime());
  //   day.isCurrentMonth = true;

  //   comp.dateModel = new Date();
  //   expect(comp.dateModel).not.toBeNull;
  //   expect(selectedperiod.getMonth()).toEqual(comp.dateModel.getMonth());
  //   expect(selectedperiod.getDate()).toEqual(comp.dateModel.getDate());
  //   day.selected = true;
  //   expect(day.selected).toEqual(true);

  //   comp.currrentDate = new Date();
  //   expect(selectedperiod.getMonth()).toEqual(comp.currrentDate.getMonth());
  //   expect(selectedperiod.getDate()).toEqual(comp.currrentDate.getDate());
  //   expect(comp.dateModel).not.toBeNull;
  //   day.selected = false;
  //   expect(day.selected).toEqual(false);
  //   comp.dateModel = '';
  //   expect(comp.dateModel.length).toEqual(0);
  //   day.selected = true;
  //   expect(day.selected).toEqual(true);
  // });

  // it('onSelect()', () => {
  //   comp.onSelect();
  //   comp.showToolTip = false;
  //   expect(comp.showToolTip).toEqual(false);
  // });


  // it('validateMaxDate()', () => {
  //   let days = new Date("27-May-2017");
  //   let max = new Date("22-Feb-2015");;
  //   comp['validateMaxDate'](days, max);
  //   //if
  //   let test = expect(days.getDate()).toBeGreaterThan(max.getDate());
  //   let test1 = expect(days.getMonth()).toBeGreaterThanOrEqual(max.getMonth());
  //   expect(days.getFullYear()).toBeGreaterThanOrEqual(max.getFullYear());

  //   //else if
  //   max.setFullYear(2017);
  //   expect(days.getMonth()).toBeGreaterThan(max.getMonth());
  //   expect(days.getFullYear()).toEqual(max.getFullYear());


  // });

  // it('getDropdownMonth()', () => {
  //   let month = 2;
  //   // comp.getDropdownMonth(month);
  //   comp.monthList1 = [{ name: 'Jan', flag: false, num: 4 }, { name: 'Feb', flag: false },
  //   { name: 'Mar', flag: false }, { name: 'Apr', flag: false }, { name: 'May', flag: false },
  //   { name: 'Jun', flag: false }];
  //   comp.elementFlagMethod(comp.monthList1[1]);
  // });

  // it('disableddays()', () => {
  //   let date = [
  //     {
  //       "from": "13-Jul-2018",
  //       "to": "15-Jul-2018"
  //     },
  //     {
  //       "from": "20-Jul-2018",
  //       "to": "23-Jul-2018"
  //     },
  //     {
  //       "from": "15-Jun-2018",
  //       "to": "19-Jun-2018"
  //     },
  //     {
  //       "from": "27-Jun-2018",
  //       "to": "29-Jun-2018"
  //     },
  //     {
  //       "from": "23-Aug-2018",
  //       "to": "28-Aug-2018"
  //     },
  //     {
  //       "from": "17-Aug-2018",
  //       "to": "19-Aug-2018"
  //     },
  //     {
  //       "from": "19-Sep-2018",
  //       "to": "21-Sep-2018"
  //     },
  //     {
  //       "from": "1-Nov-2018",
  //       "to": "30-Nov-2018"
  //     }
  //   ];
  //   comp.daysArray = [[{
  //     date: new Date('21-Jul-2018'),
  //     isCurrentMonth: false, isDisabled: false,
  //     selected: false
  //   }]]
  //   comp['disableddays'](date);
  //   expect(date).not.toBeNull; //validates if
  //   expect(date.length).toBeGreaterThan(0);
  //   const From = new Date(date[1].from);
  //   const To = new Date(date[1].to);

  //   expect(comp.daysArray[0][0].date.getFullYear()).toBeLessThanOrEqual(To.getFullYear());
  //   expect(comp.daysArray[0][0].date.getMonth()).toBeLessThanOrEqual(To.getMonth());
  //   expect(comp.daysArray[0][0].date.getDate()).toBeLessThanOrEqual(To.getDate());

  //   expect(comp.daysArray[0][0].date.getFullYear()).toBeGreaterThanOrEqual(From.getFullYear());
  //   expect(comp.daysArray[0][0].date.getMonth()).toBeGreaterThanOrEqual(From.getMonth());
  //   expect(comp.daysArray[0][0].date.getDate()).toBeGreaterThanOrEqual(From.getDate());
  //   comp.daysArray[0][0].isDisabled = true;
  //   expect(comp.daysArray[0][0].isDisabled).toEqual(true);
  // });

  // it('arrowClickForward()', () => {
  //   // comp.arrowClickForward("");
  //   comp.disableYearFlag();
  //   comp.minDate = '22-Mar-2016';
  //   comp.maxDate = '27-Oct-2018';
  //   comp.yearList1 = [{ year: 0, flag: false, disabled: false }, { year: 0, flag: false, disabled: false },
  //   { year: 0, flag: false, disabled: false }, { year: 0, flag: false, disabled: false },
  //   { year: 0, flag: false, disabled: false }];
  //   comp.yearList2 = [{ year: 0, flag: false, disabled: false }, { year: 0, flag: false, disabled: false },
  //   { year: 0, flag: false, disabled: false }, { year: 0, flag: false, disabled: false },
  //   { year: 0, flag: false, disabled: false }];

  //   expect(comp.minDate.length).toBeGreaterThan(0);
  //   comp['forwardArrow']();
  //   comp.minDate = '';
  //   expect(comp.minDate.length).toEqual(0);

  //   comp.yearList1[0].year = comp.yearList1[0].year + 10;
  //   comp.yearList2[0].year = comp.yearList2[0].year + 10;

  //   comp.disableYearFlag();
  //   comp.rechkYearFlag();
  // });

  // it('onFocusOut()', () => {

  //   let value = { value: 'Mar' };
  //   comp.onFocusOut(value);
  //   expect(Date.parse(value.value)).toBeNaN;
  //   comp.isValid = false;
  //   expect(comp.isValid).toEqual(false);
  //   value.value = '';
  //   value.value = '22-Mar-2016';
  //   expect(Date.parse(value.value)).not.toBeNaN;
  //   comp.value = Date.parse(value.value);
  //   comp.isValid = true;
  // });

  // it('yearFlagNegate()', () => {
  //   let element = { year: 0, flag: true, disabled: false };
  //   comp['yearFlagNegate'](element);
  // });

  // it('elementFlagMethod()', () => {
  //   let element = { year: 0, flag: false, disabled: false };

  //   comp.elementFlagMethod(element);
  //   expect(element.flag).toEqual(false);
  // });

  // it('yearFlag()', () => {
  //   let element = { year: 2010, flag: false, disabled: false };
  //   let year = { year: 2010 };
  //   comp.yearFlag(element, year);
  //   expect(element.year).toEqual(year.year);
  // });


  // it('getDropdownYear()', () => {
  //   let year = { year: 2012 };
  //   // comp.getDropdownYear(year);

  //   comp['yearFlagNegate'](comp.yearList1[0]);
  //   comp['yearFlagNegate'](comp.yearList2[0]);
  //   comp.yearFlag(comp.yearList1[0], year);
  //   comp.yearFlag(comp.yearList2[0], year);
  //   comp.yearNo = 2012;
  //   expect(comp.yearNo).toEqual(year.year);
  // });

  // //yearflagdisable
  // it('yearFlagDisable()', () => {
  //   let element = { year: 2010, flag: false, disabled: false };
  //   let year = { year: 2010 };
  //   comp.minDate = '27-Mar-2016';
  //   comp.maxDate = '22-Feb-2019';
  //   comp.yearFlagDisable(element);
  //   const min = new Date(comp.minDate);
  //   const max = new Date(comp.maxDate);

  //   //case 1
  //   expect(element.year).toBeLessThan(min.getFullYear());

  //   //case 2
  //   element.year = 2020;
  //   expect(element.year).toBeGreaterThan(max.getFullYear());

  // });


  // //resetyearflag
  // it('resetYearFlag()', () => {
  //   comp.backArrowFlag = false;
  //   comp.resetYearFlag();
  //   expect(comp.backArrowFlag).toEqual(false);
  //   comp.yearList1[0].year = comp.yearList1[0].year - 10;
  //   comp.yearList2[0].year = comp.yearList2[0].year - 10;
  //   comp.yearList1[0].disabled = false;
  //   comp.yearList2[0].disabled = false;
  // });

  //backarrow
  // it('backArrow()', () => {
  //   let min = new Date('27-Mar-2016');
  //   let max = new Date('22-Feb-2012');

  //   comp.yearList1 = [{ year: 2018, flag: false, disabled: false }];

  //   comp['backArrow']();
  //   //case 1
  //   comp.yearList1[0].year = 2012;
  //   expect(comp.yearList1[0].year).toEqual(min.getFullYear());
  //   comp.backArrowFlag = true;
  //   expect(comp.backArrowFlag).toEqual(true);

  //   //case 2
  //   comp.yearList1[0].year = 2016;
  //   expect(comp.yearList1[0].year).toEqual(max.getFullYear());
  //   expect(comp.yearList1[0].year).not.toEqual(min.getFullYear());
  //   comp.forwardArrowFlag = true;
  //   expect(comp.forwardArrowFlag).toEqual(true);
  //   comp.backArrowFlag = false;
  //   expect(comp.backArrowFlag).toEqual(false);

  //   //case 3
  //   comp.yearList1[0].year = 2015;
  //   expect(comp.yearList1[0].year).not.toEqual(min.getFullYear());
  //   expect(comp.yearList1[0].year).not.toEqual(max.getFullYear());
  //   comp.backArrowFlag = false;
  //   expect(comp.backArrowFlag).toEqual(false);
  //   comp.forwardArrowFlag = false;
  //   expect(comp.forwardArrowFlag).toEqual(false);

  //   comp.minDate = '27-Mar-2016';
  //   comp.maxDate = '22-Feb-2019';
  //   comp.yearList2 = [{ year: 2019, flag: false, disabled: false },
  //   { year: 15, flag: false, disabled: false },
  //   { year: 8, flag: false, disabled: false },
  //   { year: 18, flag: false, disabled: false },
  //   { year: 65, flag: false, disabled: false }];

  //   comp.backArrowFlag = false;
  //   comp.yearList1 = [{ year: 2000, flag: false, disabled: false }, { year: 0, flag: false, disabled: false },
  //     { year: 0, flag: false, disabled: false }, { year: 0, flag: false, disabled: false },
  //     { year: 0, flag: false, disabled: false }];
  //   comp.yearList2 = [{ year: 2020, flag: false, disabled: false }, { year: 0, flag: false, disabled: false },
  //     { year: 0, flag: false, disabled: false }, { year: 0, flag: false, disabled: false },
  //     { year: 0, flag: false, disabled: false }];
  //  comp.resetYearFlag();

  // });

  // it('alterBackForwardArrow()', () => {
  //   let element = { year: 2016, flag: false, disabled: false };
  //   comp.minDate = '27-Mar-2016';
  //   comp.maxDate = '22-Feb-2019';

  //   comp['alterBackForwardArrow'](element);
  //   const min = new Date(comp.minDate);
  //   const max = new Date(comp.maxDate);

  //   expect(element.year).toEqual(min.getFullYear());
  //   comp.backArrowFlag = true;
  //   expect(comp.backArrowFlag).toEqual(true);
  //   element.year = 2019;
  //   expect(element.year).toEqual(max.getFullYear());
  //   comp.forwardArrowFlag = true;
  //   expect(comp.forwardArrowFlag).toEqual(true);
  // });
  // //recchkyearflag

  // it('rechkYearFlag()', () => {
  //   comp.yearList1 = [{ year: 2000, flag: false, disabled: false }, { year: 0, flag: false, disabled: false },
  //   { year: 0, flag: false, disabled: false }, { year: 0, flag: false, disabled: false },
  //   { year: 0, flag: false, disabled: false }];
  //   comp.yearList2 = [{ year: 2010, flag: false, disabled: false }, { year: 0, flag: false, disabled: false },
  //   { year: 0, flag: false, disabled: false }, { year: 0, flag: false, disabled: false },
  //   { year: 0, flag: false, disabled: false }];
  //   comp.minDate = '27-Mar-2016';
  //   comp.maxDate = '22-Feb-2019';
  //   comp.rechkYearFlag();

  //   const min = new Date(comp.minDate);
  //   const max = new Date(comp.maxDate);

  //   comp.yearList1[0].year = 2016;
  //   expect(comp.yearList1[0].year).toEqual(min.getFullYear());
  //   comp.backArrowFlag = true;
  //   expect(comp.backArrowFlag).toEqual(true);

  //   comp.yearList1[0].year = 2019;
  //   expect(comp.yearList1[0].year).toEqual(max.getFullYear());
  //   comp.forwardArrowFlag = true;
  //   expect(comp.forwardArrowFlag).toEqual(true);

  //   comp.yearList1[0].year = 201;
  //   expect(comp.yearList1[0].year).not.toEqual(min.getFullYear());
  //   expect(comp.yearList1[0].year).not.toEqual(max.getFullYear());
  //   comp.forwardArrowFlag = false;
  //   comp.backArrowFlag = false;
  //   expect(comp.forwardArrowFlag).toEqual(false);
  //   expect(comp.backArrowFlag).toEqual(false);

  //   comp['alterBackForwardArrow'](comp.yearList2[0]);

  // });

  // // arrowclickback()
  // it('arrowClickBack()', () => {
  //   comp.minDate = '27-Mar-2016';
  //   comp.maxDate = '22-Feb-2019';
  //   comp.yearList1 = [{ year: 2000, flag: false, disabled: false },
  //   { year: 1, flag: false, disabled: false }, { year: 3, flag: false, disabled: false },
  //   { year: 4, flag: false, disabled: false }, { year: 5, flag: false, disabled: false }];
  //   comp.yearList2 = [{ year: 2020, flag: false, disabled: false },
  //   { year: 15, flag: false, disabled: false },
  //   { year: 8, flag: false, disabled: false },
  //   { year: 18, flag: false, disabled: false },
  //   { year: 65, flag: false, disabled: false }];

  //   // comp.arrowClickBack("");

  //   comp.disableYearFlag();
  //   // if
  //   expect(comp.minDate.length).toBeGreaterThan(0);
  //   expect(comp.maxDate.length).toBeGreaterThan(0);
  //   comp['backArrow']();
  //   // else
  //   comp.minDate = '';
  //   comp.maxDate = '';
  //   expect(comp.minDate.length).toEqual(0);
  //   expect(comp.maxDate.length).toEqual(0);
  //   comp.yearList1[0].year = comp.yearList1[0].year - 10;
  //   expect(comp.yearList1[0].year - 10).toBeLessThan(comp.yearList1[0].year);
  //   expect(comp.yearList2[0].year - 10).toBeLessThan(comp.yearList2[0].year);
  //   comp.disableYearFlag();
  //   comp.rechkYearFlag();
  // });

  // it('alterBackArrow()', () => {
  //   let element = { year: 2016, flag: true, disabled: false };
  //   comp.minDate = '27-Mar-2016';
  //   const min = new Date(comp.minDate);
  //   comp.alterBackArrow(element, min);
  //   expect(element.year).toEqual(min.getFullYear());
  //   comp.backArrowFlag = true;
  //   expect(comp.backArrowFlag).toEqual(true);
  // });

  // it('resetArrowFlag()', () => {
  //   comp.minDate = '27-Mar-2016';
  //   comp.maxDate = '22-Feb-2019';
  //   comp.yearList2 = [{ year: 2019, flag: false, disabled: false },
  //   { year: 15, flag: false, disabled: false },
  //   { year: 8, flag: false, disabled: false },
  //   { year: 18, flag: false, disabled: false },
  //   { year: 65, flag: false, disabled: false }];
  //   comp['resetArrowFlag']();
  //   const min = new Date(comp.minDate);
  //   const max = new Date(comp.maxDate);
  //   comp.alterBackArrow(comp.yearList2[0], min);
  //   expect(comp.yearList2[0].year).toEqual(max.getFullYear());
  //   comp.forwardArrowFlag = true;
  //   expect(comp.forwardArrowFlag).toEqual(true);
  // });

  // it('forwardArrow()', () => {
  //   comp.forwardArrowFlag = false;

  //   comp['forwardArrow']();
  //   expect(comp.forwardArrowFlag).toEqual(false);

  // });

  // it('chkYearList1()', () => {
  //   comp.minDate = '27-Mar-2016';
  //   comp.maxDate = '22-Feb-2019';
  //   comp.yearList1[0].year = 2016;

  //   comp.chkYearList1();
  //   const min = new Date(comp.minDate);
  //   const max = new Date(comp.maxDate);
  //   expect(comp.yearList1[0].year).toEqual(min.getFullYear());

  //   comp.yearList1[0].year = 2019;
  //   expect(comp.yearList1[0].year).toEqual(max.getFullYear());
  //   comp.backArrowFlag = true;
  //   expect(comp.backArrowFlag).toEqual(true);

  //   comp.yearList1[0].year = 2016;
  //   expect(comp.yearList1[0].year).toEqual(min.getFullYear());
  //   expect(comp.yearList1[0].year).not.toEqual(max.getFullYear());
  //   comp.forwardArrowFlag = false;
  //   expect(comp.forwardArrowFlag).toEqual(false);
  //   comp.backArrowFlag = true;
  //   expect(comp.backArrowFlag).toEqual(true);

  //   comp.yearList1[0].year = 2025;
  //   expect(comp.yearList1[0].year).not.toEqual(min.getFullYear());
  //   expect(comp.yearList1[0].year).not.toEqual(max.getFullYear());
  //   comp.forwardArrowFlag = false;
  //   expect(comp.forwardArrowFlag).toEqual(false);
  //   comp.backArrowFlag = false;
  //   expect(comp.backArrowFlag).toEqual(false);

  //   comp.yearList1[0].year = 2019;
  //   expect(comp.yearList1[0].year).toEqual(max.getFullYear());
  //   comp.forwardArrowFlag = true;
  //   expect(comp.forwardArrowFlag).toEqual(true);

  // });

  // it('minMaxDateFound()', () => {
  //   comp.minDate = '27-Mar-2016';
  //   comp.maxDate = '22-Feb-2019';
  //   comp.yearList1[0].year = 2016;
  //   comp.yearList2[0].year = 2016;


  //   comp.minMaxDateFound();
  //   const min = new Date(comp.minDate);
  //   const max = new Date(comp.maxDate);

  //   expect(comp.yearList1[0].year).toEqual(min.getFullYear());
  //   comp.backArrowFlag = true;
  //   expect(comp.backArrowFlag).toEqual(true);
  //   comp.yearList1[0].year = 2019;
  //   expect(comp.yearList1[0].year).toEqual(max.getFullYear());
  //   comp.forwardArrowFlag = true;
  //   expect(comp.forwardArrowFlag).toEqual(true);

  //   expect(comp.yearList2[0].year).toEqual(min.getFullYear());
  //   comp.backArrowFlag = true;
  //   expect(comp.backArrowFlag).toEqual(true);
  //   comp.yearList2[0].year = 2019;
  //   expect(comp.yearList2[0].year).toEqual(max.getFullYear());
  //   comp.forwardArrowFlag = true;
  //   expect(comp.forwardArrowFlag).toEqual(true);
  // });

  //openPicker()
  // it('openPicker()', () => {
  //   comp.diabledDate = [
  //     {
  //       "from": "13-Jul-2018",
  //       "to": "15-Jul-2018"
  //     },
  //     {
  //       "from": "20-Jul-2018",
  //       "to": "23-Jul-2018"
  //     },
  //     {
  //       "from": "15-Jun-2018",
  //       "to": "19-Jun-2018"
  //     },
  //     {
  //       "from": "27-Jun-2018",
  //       "to": "29-Jun-2018"
  //     },
  //     {
  //       "from": "23-Aug-2018",
  //       "to": "28-Aug-2018"
  //     },
  //     {
  //       "from": "17-Aug-2018",
  //       "to": "19-Aug-2018"
  //     },
  //     {
  //       "from": "19-Sep-2018",
  //       "to": "21-Sep-2018"
  //     },
  //     {
  //       "from": "1-Nov-2018",
  //       "to": "30-Nov-2018"
  //     }
  //   ];
  //   let elem: any;
  //   comp.inlineDatepicker = true;
  //   comp.openPicker(elem);
  //   comp.hostFlag = false;
  //   expect(comp.hostFlag).toEqual(false);
  //   comp.pickerele = elem;
  //   expect(comp.pickerele).toEqual(elem);
  //   expect(comp.inlineDatepicker).toEqual(true);
  //   comp.showToolTip = comp.inlineDatepicker;
  //   expect(comp.showToolTip).toEqual(comp.inlineDatepicker);

  //   comp.inlineDatepicker = false;
  //   expect(comp.inlineDatepicker).toEqual(false);
  //   comp.showToolTip = true;
  //   expect(comp.showToolTip).toEqual(true);

  //   comp.posixUp = comp.getListPosition(elem);
  //   comp['disableddays'](comp.diabledDate);

  //  });

//   it('navigateDropdown()', () => {
//     // comp.navigateDropdown();
//     comp.hostFlag = true;
//     comp.yearNo = 4;
//     comp.monthNo = 7;

//     expect(comp.hostFlag).toEqual(true);
//     comp.selectedDate = new Date();
//     expect(comp.yearNo).not.toBeNull;
//     expect(comp.monthNo).not.toBeNull;
//     comp.selectedDate.setFullYear(comp.yearNo);
//     comp.selectedDate.setMonth(comp.monthNo);

//     expect(comp.yearNo).not.toBeNull;
//     comp.monthNo = '';
//     expect(comp.monthNo).toBeNull;
//     comp.selectedDate.setFullYear(comp.yearNo);
//     comp.yearNo = '';
//     expect(comp.yearNo).toBeNull;
//     comp.monthNo = 5;
//     expect(comp.monthNo).not.toBeNull;
//     comp.selectedDate.setMonth(comp.monthNo);

//     comp.drop = false;
//     expect(comp.drop).toEqual(false);
//     comp.daysArray = [];
//     comp['createDaysForCurrentMonths'](comp.selectedDate);
//     comp['disableddays'](comp.diabledDate);
//     comp.tempFlag = true;
//     expect(comp.tempFlag).toEqual(true);
//     comp['cdf'].detectChanges();

//   });

//   //validateDays
//   it('validateDays()', () => {
//     let days = new Date();
//     comp.minDate = '';
//     comp.maxDate = '';
//     comp['validateDays'](days);

//     // expect(comp.maxDate.length).toBeLessThanOrEqual(0);
//     // expect(comp.minDate.length).toBeLessThanOrEqual(0);


//     comp.maxDate = '27-Mar-2016';
//     comp.minDate = ''

//     expect(comp.maxDate.length).toBeGreaterThan(0);
//     expect(comp.minDate.length).toBeLessThanOrEqual(0);

//     comp.minDate = '27-Mar-2016';
//     comp.maxDate = '27-Mar-2019';

//     const max = new Date(comp.maxDate);
//     const min = new Date(comp.minDate);
//     comp['validateMaxDate'](days, max);

//     expect(comp.maxDate.length).toBeGreaterThan(0);
//     expect(comp.minDate.length).toBeGreaterThan(0);
//     comp['validateMaxDate'](days, max);

//     comp.maxDate = ''
//     expect(comp.maxDate.length).toBeLessThanOrEqual(0);
//     expect(comp.minDate.length).toBeGreaterThan(0)
//     comp.maxDate = '27-Mar-2016';
//     comp.minDate = '24-Aug-2012';
//     expect(comp.maxDate.length).toBeGreaterThan(0);
//     expect(comp.minDate.length).toBeGreaterThan(0)

//     min.setDate(27);
//     days.setDate(20);
//     expect(days.getDate()).toBeLessThan(min.getDate());
//     days.setMonth(4);
//     min.setMonth(4);
//     expect(days.getMonth()).toBe(min.getMonth());
//     days.setFullYear(2010);
//     min.setFullYear(2010);
//     expect(days.getFullYear()).toEqual(min.getFullYear())

//     days.setMonth(3);
//     min.setMonth(8);
//     expect(days.getMonth()).toBeLessThan(min.getMonth());
//     expect(days.getFullYear()).toEqual(min.getFullYear())
//     comp.diabledDate = [
//       {
//         "from": "13-Jul-2018",
//         "to": "15-Jul-2018"
//       },
//       {
//         "from": "20-Jul-2018",
//         "to": "23-Jul-2018"
//       },
//       {
//         "from": "15-Jun-2018",
//         "to": "19-Jun-2018"
//       },
//       {
//         "from": "27-Jun-2018",
//         "to": "29-Jun-2018"
//       },
//       {
//         "from": "23-Aug-2018",
//         "to": "28-Aug-2018"
//       },
//       {
//         "from": "17-Aug-2018",
//         "to": "19-Aug-2018"
//       },
//       {
//         "from": "19-Sep-2018",
//         "to": "21-Sep-2018"
//       },
//       {
//         "from": "1-Nov-2018",
//         "to": "30-Nov-2018"
//       }
//     ];
//     comp['disableddays'](comp.diabledDate);

//   });

//   //
//   it('plus()', () => {
//    let type = 'min';
//     comp.plus(type, event);

//     expect(type).toEqual('min');
//     comp.min = 59;
//     expect(comp.min).toEqual(59);
//     comp.min = -1;
//     expect(comp.min).toEqual(-1);
//     comp.hrs++;
//     comp.min++;
//     type = 'hrs';
//     expect(type).toEqual('hrs')
//     comp.hrs++;

//     comp.hrs = 24;
//     expect(comp.hrs).toEqual(24);
//     comp.hrs = 0;

//     comp.selectedDate.setHours(comp.hrs);

//     comp.selectedDate.setMinutes(comp.min);
//     comp.value = comp.selectedDate;
//     expect(comp.value).toEqual(comp.selectedDate);
//     comp.isValid = true;
//     expect(comp.isValid).toEqual(true);
//     // event.stopPropagation();

//   });

// //minus
// it('onminus()', () => {
//   let type = 'min';
//   comp.minus(type, event);
//   expect(type).toEqual('min');
//   comp.min = 0;
//   expect(comp.min).toEqual(0);
//   comp.min = 60;
//   comp.hrs--;

//   type = 'hrs';
//   comp.hrs = 20;
//   expect(type).toEqual('hrs');
//   comp.hrs--;

//   comp.hrs = 0;
//   expect(comp.hrs).toEqual(0);
//   comp.hrs = 23;

//   comp.selectedDate.setHours(comp.hrs);
//   comp.selectedDate.setMinutes(comp.min);
//   comp.value = comp.selectedDate;
//   comp.isValid = true;
//   expect(comp.isValid).toEqual(true);

//   // event.stopPropagation();

// });

//getlistposition()
// it('getListPosition()', () => {
//   let elem: any;
//   comp.getListPosition(elem);

// });

});

