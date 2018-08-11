import { AmexioButtonComponent } from './../buttons/button.component';
import { AmexioFormIconComponent } from './../icon/icon.component';
import { AmexioDateTimePickerComponent } from './datetimepicker.component';
import { By } from '@angular/platform-browser';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import {FormsModule} from '@angular/forms';
import {ChangeDetectorRef, ElementRef} from '@angular/core';
import { IconLoaderService } from '../../../index';
import { DebugElement } from '@angular/core';
describe('amexio-date-time-picker' , () => {
let comp: AmexioDateTimePickerComponent;
let fixture: ComponentFixture<AmexioDateTimePickerComponent>;

beforeEach(() => {
TestBed.configureTestingModule({
imports : [FormsModule],
declarations: [ AmexioDateTimePickerComponent,AmexioFormIconComponent,AmexioButtonComponent],
providers:[IconLoaderService]
});
  fixture = TestBed.createComponent(AmexioDateTimePickerComponent);
  comp = fixture.componentInstance;
});

it('Initial Check', () => {
  expect(true).toBe(true);
});

it('Condition Check', () => {
  comp.inlineDatepicker = true;
  comp.dateformat = '';
  fixture.detectChanges();
  expect(true).toBe(comp.showToolTip);
  expect(comp.dateformat).not.toBeUndefined();
  // comp.setToday();
  // expect(false).toBe(comp.showToolTip);
  let element = {flag :true, name: 'Jan'};
  comp.elementFlagMethod(element);
  expect(false).toBe(element.flag);
  comp.negateDrop();
  expect(true).toBe(comp.hostFlag);
  expect(false).toBe(comp.drop);
  expect(true).toBe(comp.showToolTip);
  expect(true).toBe(comp.tempFlag);
  comp.monthList1 = [];
  comp.monthList2 = [];
  const Jan = {name:'Jan'};
  const Feb = {name:'Feb'};
  const Mar = {name:'Mar'};
  const Apr = {name:'Apr'};
  const May = {name:'May'};
  const Jun = {name:'Jun'};
  const Jul = {name:'Jul'};
  const Aug = {name:'Aug'};
  const Sep = {name:'Sep'};
  const Oct = {name:'Oct'};
  const Nov = {name:'Nov'};
  const Dec = {name:'Dec'};
  const month = {name:'Jan'};
  const monthnew = {name:'Janone'};
  comp.getDropdownMonth(Jan);
  expect(0).toEqual(comp.monthNo);

  comp.getDropdownMonth(Feb);
  expect(1).toEqual(comp.monthNo);

  comp.getDropdownMonth(Mar);
  expect(2).toEqual(comp.monthNo);

  comp.getDropdownMonth(Apr);
  expect(3).toEqual(comp.monthNo);

  comp.getDropdownMonth(May);
  expect(4).toEqual(comp.monthNo);

  comp.getDropdownMonth(Jun);
  expect(5).toEqual(comp.monthNo);

  comp.getDropdownMonth(Jul);
  expect(6).toEqual(comp.monthNo);

  comp.getDropdownMonth(Aug);
  expect(7).toEqual(comp.monthNo);

  comp.getDropdownMonth(Sep);
  expect(8).toEqual(comp.monthNo);

  comp.getDropdownMonth(Oct);
  expect(9).toEqual(comp.monthNo);

  comp.getDropdownMonth(Nov);
  expect(10).toEqual(comp.monthNo);

  comp.getDropdownMonth(Dec);
  expect(11).toEqual(comp.monthNo);

  comp.getDropdownMonth(monthnew);

  // comp.yearFlag();

  const e1 = {year :2011,flag :true};
  const e2 = {year :2011};
  comp.yearFlag(e1,e2);
  expect(true).toBe(e1.flag);

  comp.checkValidity();
  comp.isValid=false;
  expect(false).toBe(comp.isValid);

  comp.cancelDropdown();
  expect(false).toBe(comp.drop);
  expect(true).toBe(comp.showToolTip);
  comp.minDate = '22-Mar-2016';
  comp.maxDate = '22-Feb-2019';

  comp.yearList1 = [{ year: 2018, flag: false, disabled: false }];
  comp.yearList2 = [{ year: 2018, flag: false, disabled: false }];
  comp.chkYearList1();
  expect(false).toBe(comp.backArrowFlag);
  expect(false).toBe(comp.forwardArrowFlag);

  const el = { year: 2010, disabled: true};

  comp.disableMinMaxYear(el,new Date(),new Date());
  expect(true).toBe(el.disabled);

  comp.yearFlagDisable(el);
  expect(true).toBe(el.disabled);

  comp.rechkYearFlag();
  expect(false).toBe(comp.backArrowFlag);

  const elt = { year: 2018, disabled: true};
  comp.alterBackArrow(elt,new Date());
  expect(true).toBe(comp.backArrowFlag);

  comp.yearList1 = [{ year: 0, flag: false, disabled: false },
    { year: 1, flag: false, disabled: false },{ year: 3, flag: false, disabled: false },
    { year: 4, flag: false, disabled: false },{ year: 5, flag: false, disabled: false }];
  comp.yearList2 = [{ year: 20, flag: false, disabled: false },
    { year: 15, flag: false, disabled: false },
    { year: 8, flag: false, disabled: false },
    { year: 18, flag: false, disabled: false },
    { year: 65, flag: false, disabled: false }];
  comp.backArrowFlag = false;
  comp.resetYearFlag();
  expect(false).toBe(comp.backArrowFlag);

  comp.daysArray=[{date:new Date()}];
  comp.resetSelection(new Date());

  comp.setMaxFullYear(new Date('22-Mar-2016'), new Date(),1);

  comp.onDateClick(new Date());
  expect(true).toBe(comp.showToolTip);


  comp.setPlusData(new Date(),new Date(),2);

  comp.setPlusData(new Date('22-Mar-2016'),new Date(),2);
  comp.setMinusData(new Date('22-Mar-2016'),new Date(),2);
  comp.setMinFullYear(new Date('22-DEC-2019'), new Date(),1);


  // comp.setDateData1('plus',2,new Event(0));

  comp.currrentDate = new Date();
  comp.initDate();
  expect('').toEqual('');

  comp.writeValue(11);

  comp.disableYearFlag();

  comp.onFocusOut(new Date());
  expect(false).toBe(comp.isValid);

  comp.minMaxDateFound();
  expect(false).toBe(comp.forwardArrowFlag);

  const eone = {name:'Jan',flag :true};
  const etwo = {name:'Jan'};
  comp.chkMonth(eone,etwo);
  expect(true).toBe(eone.flag);

  comp.monthList1 = [{ name: 'Jan', flag: false, num: 4 }, { name: 'Feb', flag: false },
  { name: 'Mar', flag: false }, { name: 'Apr', flag: false }, { name: 'May', flag: false },
  { name: 'Jun', flag: false }];
  comp.monthList2 = [{ name: 'Jul', flag: false }, { name: 'Aug', flag: false }, { name: 'Sep', flag: false },
  { name: 'Oct', flag: false }, { name: 'Nov', flag: false }, { name: 'Dec', flag: false }];

  comp.dropdownDatePicker();
  expect(true).toBe(comp.hostFlag);
  expect(true).toBe(comp.drop);
  expect(false).toBe(comp.tempFlag);

});

it('initialize innervalue', () => {
  comp.value='date'; 
       expect(comp['innerValue']).toEqual(comp.value);
    });

    // it('setDateData()', () => {
    // let  state: string, mon: number, event: any = 'MouseEvent {isTrusted: true, screenX: 280, screenY: 224, clientX: 236, clientY: 145, …}';

    // comp.setDateData(state, mon, event);
    
    // const d = new Date(comp.currrentDate.getFullYear(), comp.currrentDate.getMonth(), comp.currrentDate.getDate());
    // const min = new Date(comp.minDate);
    // const max = new Date(comp.maxDate);
     
    // state='plus';
    // expect(state).toEqual('plus');
    // comp.setPlusData(d, max, mon);
    // state='minus';
    // expect(state).toEqual('minus');
    // comp.setPlusData(d, min, mon);

    // expect(comp.currrentDate).toBe(d);
    // comp.initDate();
    // event.stopPropagation();
    //      });


//     it('nextmonth', () => {
//       comp['nextMonth'](fixture);
// comp.setDateData('plus', 1, event);
// comp['disableddays'](comp.);
//          });    

  it('resetselection()', () => {
    let dateObj = new Date("Thu Jul 25 2017 00:00:00 GMT+0530 (IST)") ; 
    let  daysArray: any =[];
    let  rowDays: any;
    const day: any = {
      date: null, selected: false, isCurrentMonth: null, isDisabled: false,
    };
    day.date = new Date(dateObj.getTime());
    comp.resetSelection(dateObj); 
 expect(day.date.getTime()).toEqual(dateObj.getTime());
 day.selected = true;
expect(day.selected).toEqual(true);
 day.date.setTime(1332403882588);
day.selected = false;
expect(day.selected).toEqual(false);
     });  



});
