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
  const month = {name:'Jan'};
  comp.getDropdownMonth(month);
  expect(0).toEqual(comp.monthNo);
  comp.chkMonth(element,month);
  expect(true).toBe(element.flag);
});



});
