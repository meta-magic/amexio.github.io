import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AvailabilityComponent } from './availability.component';
import { DOCUMENT } from '@angular/common';
import { HttpClient, HttpHandler } from '@angular/common/http';
import { IconLoaderService } from '../../../index';

import { AmexioRowComponent } from '../../layout/rows/row.component';
import { AmexioColumnComponent} from '../../layout/columns/column.component';
import { AmexioButtonComponent} from '../../forms/buttons/button.component';
import { AmexioDropDownComponent } from '../../forms/dropdown/dropdown.component';
import { FormsModule } from '@angular/forms';
import { CommonIconComponent} from '../../base/components/common.icon.component';
import {DisplayFieldComponent} from '../../base/display-field/display-field.component';
import { CommonDataService } from '../../services/data/common.data.service';

fdescribe('amexio-availability', () => {
  let comp: AvailabilityComponent;
  let fixture: ComponentFixture<AvailabilityComponent>;

  beforeEach(() => {

    TestBed.configureTestingModule({
      imports:[FormsModule],
      declarations: [AvailabilityComponent, DisplayFieldComponent, CommonIconComponent, AmexioRowComponent, AmexioColumnComponent, AmexioButtonComponent, AmexioDropDownComponent],
      providers: [IconLoaderService, HttpClient, HttpHandler, CommonDataService]
    });
    fixture = TestBed.createComponent(AvailabilityComponent);
    comp = fixture.componentInstance;

  });

  it('Test availability', () => {
     
    expect(comp).toBeTruthy();

});


it('onSelection()', () => {
  let radioData = {label: 'Inbound', colorcode: 'blue'};
  comp.onSelection(radioData);
 const obj = { label: radioData.label, colorcode: radioData.colorcode };
  expect(obj).toEqual(comp.styleVar);
  
});
});

