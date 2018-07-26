import { AmexioDateTimePickerComponent } from './datetimepicker.component';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';
import {FormsModule} from '@angular/forms';

describe('amexio-text-field' , () => {
  let comp: AmexioDateTimePickerComponent;
  let fixture: ComponentFixture<AmexioDateTimePickerComponent>;
  let de: DebugElement;
  let el: HTMLElement;

beforeEach(() => {
 TestBed.configureTestingModule({
  imports : [FormsModule],
  declarations: [ AmexioDateTimePickerComponent ],
  });
  fixture = TestBed.createComponent(AmexioDateTimePickerComponent);
  comp = fixture.componentInstance;
  de = fixture.debugElement.children[0];
  el = de.nativeElement;
});

it('Display correct label', () => {
  const date=new Date();
  comp.setMaxFullYear(date,date,1);
  fixture.detectChanges();
});

});
