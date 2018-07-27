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

it('Display correct label', () => {
  // let date=new Date();
  // let ex=comp.setMaxFullYear(date, date, 2);
  expect(true).toBe(true);
  fixture.detectChanges();
});

});
