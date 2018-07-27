import { AmexioButtonComponent } from './../buttons/button.component';
import { AmexioFormIconComponent } from './../icon/icon.component';
import { AmexioDateTimePickerComponent } from './datetimepicker.component';
import { By } from '@angular/platform-browser';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import {FormsModule} from '@angular/forms';
import { IconLoaderService } from '../../../index';

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

  comp.chkMonth(element,month);
  expect(true).toBe(element.flag);
  // comp.yearFlag();

  const e1 = {year :2011,flag :true};
  const e2 = {year :2011};
  comp.yearFlag(e1,e2);
  expect(true).toBe(e1.flag);

  comp.checkValidity();
  comp.isValid=false;
  expect(false).toBe(comp.isValid);
});



});
