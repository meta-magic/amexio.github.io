import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AvailabilityComponent } from './availability.component';
import { DOCUMENT } from '@angular/common';
import { HttpClient, HttpHandler } from '@angular/common/http';
import { IconLoaderService } from '../../../index';

import { AmexioRowComponent } from '../../layout/rows/row.component';
import { AmexioColumnComponent } from '../../layout/columns/column.component';
import { AmexioButtonComponent } from '../../forms/buttons/button.component';
import { AmexioDropDownComponent } from '../../forms/dropdown/dropdown.component';
import { FormsModule } from '@angular/forms';
import { CommonIconComponent } from '../../base/components/common.icon.component';
import { DisplayFieldComponent } from '../../base/display-field/display-field.component';
import { CommonDataService } from '../../services/data/common.data.service';
 
describe('amexio-availability', () => {
  let comp: AvailabilityComponent;
  let fixture: ComponentFixture<AvailabilityComponent>;

  beforeEach(() => {

    TestBed.configureTestingModule({
      imports: [FormsModule],
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
    let radioData = { label: 'Inbound', colorcode: 'blue' };
    comp.onSelection(radioData);
    const obj = { label: radioData.label, colorcode: radioData.colorcode };
    expect(obj).toEqual(comp.styleVar);
  });


  it('clearColorFlag()', () => {
    comp.dateArr1 = [{
      date: new Date(), slots: [{ time: new Date(), colorflag: true, label: "Inbound", color: "red" },
      { time: new Date(), colorflag: true, label: "Inbound", color: "red" }
      ]
    }];

    comp.clearColorFlag();
    comp.dateArr1.forEach((element: any) => {
      if (element.slots) {
        element.slots.forEach((individualSlot: any) => {
          individualSlot.colorflag = false;
          expect(individualSlot.colorflag).toEqual(false);
        });
      }
    });

  });

  it('initializeTimeArr()', () => {
    let timeobj = ['12am', '1am', '2am', '3am', '4am', '5am', '6am', '7am', '8am',
      '9am', '10am', '11am', '12pm', '1pm', '2pm', '3pm', '4pm',
      '5pm', '6pm', '7pm', '8pm', '9pm', '10pm', '11pm',
    ];
    comp.initializeTimeArr();
    expect(comp.completeTimeArr).toEqual(timeobj);
  });

  it('setRange()', () => {
    let minflag = true;
    let maxflag = true;
    let slotArray = [{ time: new Date(), colorflag: false },
    { time: new Date(), colorflag: false },
    { time: new Date(), colorflag: false },
    { time: new Date(), colorflag: false },
    { time: new Date(), colorflag: false },
    { time: new Date(), colorflag: false }]
    let minmaxarr = [{ minIndex: 0, maxIndex: 1 }, { minIndex: 3, maxIndex: 4 }];
    let labelelement = {
      label: "Inbound", colorcode: "red", textcolor: "white", available: [{
        date: new Date(), time: [{ starttime: 5, endtime: 5.30 },
        { starttime: 6, endtime: 6.30 }
        ]
      }]
    };

    comp.setRange(minflag, maxflag, slotArray, minmaxarr, labelelement);
    // setColorRangeTest
    expect(comp.setColorRangeTest(slotArray, minmaxarr, labelelement)).toHaveBeenCalled;
  });

 
});
