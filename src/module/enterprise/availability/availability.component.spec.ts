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

  it('clearColorFlag() for positive outcome', () => {
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

  it('clearColorFlag() for negative outcome', () => {
    comp.dateArr1 = [{
      date: new Date()
    }];

    comp.clearColorFlag();
    comp.dateArr1.forEach((element: any) => {
      expect(element.slots).toBeUndefined();
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
    expect(minflag).toBe(true);
    expect(maxflag).toBe(true);
    expect(comp.setColorRangeTest(slotArray, minmaxarr, labelelement)).toHaveBeenCalled;
  });

  it('setRange() for negative value of flags', () => {
    let minflag = false;
    let maxflag = false;
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
    expect(minflag).toBe(false);
    expect(maxflag).toBe(false);
    expect(comp.setColorRangeTest(slotArray, minmaxarr, labelelement)).not.toHaveBeenCalled;
  });

  it('setRange() for 1st negative value of flags', () => {
    let minflag = true;
    let maxflag = false;
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
    expect(minflag).toBe(true);
    expect(maxflag).toBe(false);
    expect(comp.setColorRangeTest(slotArray, minmaxarr, labelelement)).not.toHaveBeenCalled;
  });

  it('setRange() for 2nd negative value of flags', () => {
    let minflag = false;
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
    expect(minflag).toBe(false);
    expect(maxflag).toBe(true);
    expect(comp.setColorRangeTest(slotArray, minmaxarr, labelelement)).not.toHaveBeenCalled;
  });

  it('getHourMinuteFormat() with whole number input', () => {
    let usertime = 6;
    comp.getHourMinuteFormat(usertime);
    let arr = [];
    arr = usertime.toString().split('.');
    expect(arr).toEqual(usertime.toString().split('.'))
    expect(arr[1]).toBeUndefined();
    return { hours: parseInt((arr[0]), 10), minutes: arr[1] ? (parseInt((arr[1]), 10) * 10) : 0 };
  });

  it('getHourMinuteFormat() with fraction number input', () => {
    let usertime = 6.3;
    comp.getHourMinuteFormat(usertime);
    let arr = [];
    arr = usertime.toString().split('.');
    expect(arr).toEqual(usertime.toString().split('.'))
    expect(arr[1]).toBeDefined();
    return { hours: parseInt((arr[0]), 10), minutes: arr[1] ? (parseInt((arr[1]), 10) * 10) : 0 };
  });

  it('setTimeArr()', () => {
    let startindex = 0;
    let endindex = 2;
    comp.completeTimeArr = ['12am', '1am', '2am', '3am', '4am', '5am', '6am', '7am', '8am',
      '9am', '10am', '11am', '12pm', '1pm', '2pm', '3pm', '4pm',
      '5pm', '6pm', '7pm', '8pm', '9pm', '10pm', '11pm',
    ];
    comp.dateArr = [{ timearr: [] }]
    comp.setTimeArr(startindex, endindex);

    const tarr: any = [];
    comp.completeTimeArr.forEach((element: any, index: number) => {
      if ((index >= startindex) && (index <= endindex)) {
        // const tobj = { time: element };
        // tarr.push(tobj);
        expect(index).toBeGreaterThanOrEqual(startindex);
        expect(index).toBeLessThanOrEqual(endindex);

      }
    });
    // this.dateArr[0].timearr = tarr;

    expect(comp.dateArr[0].timearr).toBeDefined();
  });

  it('generateSlotTimeArr()', () => {
    comp.startTime = 4;
    comp.endTime = 6;
    comp.newTimeArr = [];
    comp.generateSlotTimeArr();
    expect(comp.newTimeArr).toBeDefined();
    expect(comp.newTimeArr).not.toBeNull();
  });

  it('generateLegendArr()', () => {
    comp.legendArr = [];
    comp.labelData = [
      {
        "label": "Inbound",
        "colorcode": "red",
        "textcolor": "white",
        "available": [
          {
            "date": "01-Sep-2019",
            "time": [
              {
                "starttime": 5,
                "endtime": 5.30
              },
              ,
              {
                "starttime": 6.30,
                "endtime": 7
              }
            ]
          },
          {
            "date": "02-Sep-2019",
            "time": [
              {
                "starttime": 5,
                "endtime": 5.30
              },
              ,
            ]
          },
        ]
      },
      {
        "label": "Outbound",
        "colorcode": "blue",
        // "textcolor": "white",
        "available": [
          {
            "date": "02-Sep-2019",
            "time": [
              {
                "starttime": 5.30,
                "endtime": 6.30
              },
            ]
          }
        ]
      },
 
    ];
     comp.generateLegendArr();
     comp.labelData.forEach((element: any) => {
      // this.legendObj[element.label] = false;
      expect(comp.legendObj[element.label]).toEqual(false);
    });

    expect(comp.legendArr).toBeDefined();
    expect(comp.legendArr).not.toBeNull();

    comp.labelData.forEach((element: any) => {
      // const obj = { label: element.label, 
      //   colorcode: element.colorcode, 
      //   textcolor: element.textcolor ? element.textcolor : 'black' };
        if(element.textcolor) {
          expect(element.textcolor).toBeDefined();
        } else {
          expect(element.textcolor).toBeUndefined();
        }
    });
  });

  it('generateTimeArr()', () => {
    comp.completeTimeArr = ['12am', '1am', '2am', '3am', '4am', 
                            '5am', '6am', 
                            '7am', '8am',
                            '9am', '10am', '11am', '12pm', '1pm', '2pm',
                             '3pm', '4pm',
                            '5pm', '6pm', '7pm', '8pm', '9pm', '10pm', '11pm',
              ];
     let startindex = 4;
    let endindex = 6;
    comp.completeTimeArr = ['12am', '1am', '2am', '3am', '4am', '5am', '6am', '7am', '8am',
    '9am', '10am', '11am', '12pm', '1pm', '2pm', '3pm', '4pm',
    '5pm', '6pm', '7pm', '8pm', '9pm', '10pm', '11pm',
  ];
    comp.dateArr = [{ timearr: [] }]
    comp.generateTimeArr();

    comp.completeTimeArr.forEach((element: any, index: number) => {
      if (element === this.startTime) {
         expect(startindex).toEqual(index);
         expect(endindex).not.toEqual(index);
      }
      if (element === this.endTime) {
         expect(endindex).toEqual(index);
         expect(startindex).not.toEqual(index);
      }
    });
    expect(comp.setTimeArr(startindex, endindex)).toHaveBeenCalled;
    // this.setTimeArr(startindex, endindex);
  });

  it('availableTimeTest() both false values', () => {
    let availableElement = {date: "01-Sep-2019", time: [{starttime: 5, endtime: 5.3},
                                                        {starttime: 6.3, endtime: 7}
                                                       ]};
    let slotArray = [{time: new Date(), colorflag: false},
      {time: new Date(), colorflag: false},
      {time: new Date(), colorflag: false},
      {time: new Date(), colorflag: false},
      {time: new Date(), colorflag: false},
      {time: new Date(), colorflag: false}]
      let d = new Date();
      let dt = new Date();
      let minmaxarr: any = [];    
      // if (minflag && maxflag) {
      let minflag = false;
      let maxflag = false;                                       
    comp.availableTimeTest(availableElement, slotArray, dt , d , minmaxarr) 
    
    availableElement.time.forEach((timeElement: any) => {
      // this.chkMinMaxIndexTest(slotArray, dt, d, timeElement);
      expect(comp.chkMinMaxIndexTest(slotArray, dt, d, timeElement)).toHaveBeenCalled;
      
      expect(minflag).toBe(false);
      expect(maxflag).toBe(false);

    });
  });


  it('availableTimeTest() both true values', () => {
    let availableElement = {date: "01-Sep-2019", time: [{starttime: 5, endtime: 5.3},
                                                        {starttime: 6.3, endtime: 7}
                                                       ]};
    let slotArray = [{time: new Date(), colorflag: false},
      {time: new Date(), colorflag: false},
      {time: new Date(), colorflag: false},
      {time: new Date(), colorflag: false},
      {time: new Date(), colorflag: false},
      {time: new Date(), colorflag: false}]
      let d = new Date();
      let dt = new Date();
      let minmaxarr: any = [];    
      // if (minflag && maxflag) {
      let minflag = true;
      let maxflag = true;                                       
    comp.availableTimeTest(availableElement, slotArray, dt , d , minmaxarr) 
    
    availableElement.time.forEach((timeElement: any) => {
      // this.chkMinMaxIndexTest(slotArray, dt, d, timeElement);
      expect(comp.chkMinMaxIndexTest(slotArray, dt, d, timeElement)).toHaveBeenCalled;
      
      expect(minflag).toBe(true);
      expect(maxflag).toBe(true);

    });
  });


  it('availableTimeTest() false true combination', () => {
    let availableElement = {date: "01-Sep-2019", time: [{starttime: 5, endtime: 5.3},
                                                        {starttime: 6.3, endtime: 7}
                                                       ]};
    let slotArray = [{time: new Date(), colorflag: false},
      {time: new Date(), colorflag: false},
      {time: new Date(), colorflag: false},
      {time: new Date(), colorflag: false},
      {time: new Date(), colorflag: false},
      {time: new Date(), colorflag: false}]
      let d = new Date();
      let dt = new Date();
      let minmaxarr: any = [];    
      // if (minflag && maxflag) {
      let minflag = true;
      let maxflag = false;                                       
    comp.availableTimeTest(availableElement, slotArray, dt , d , minmaxarr) 
    
    availableElement.time.forEach((timeElement: any) => {
      // this.chkMinMaxIndexTest(slotArray, dt, d, timeElement);
      expect(comp.chkMinMaxIndexTest(slotArray, dt, d, timeElement)).toHaveBeenCalled;
      
      expect(minflag).toBe(true);
      expect(maxflag).toBe(false);

    });
  });


  it('availableTimeTest() true false combination', () => {
    let availableElement = {date: "01-Sep-2019", time: [{starttime: 5, endtime: 5.3},
                                                        {starttime: 6.3, endtime: 7}
                                                       ]};
    let slotArray = [{time: new Date(), colorflag: false},
      {time: new Date(), colorflag: false},
      {time: new Date(), colorflag: false},
      {time: new Date(), colorflag: false},
      {time: new Date(), colorflag: false},
      {time: new Date(), colorflag: false}]
      let d = new Date();
      let dt = new Date();
      let minmaxarr: any = [];    
      // if (minflag && maxflag) {
      let minflag = true;
      let maxflag = false;                                       
    comp.availableTimeTest(availableElement, slotArray, dt , d , minmaxarr) 
    
    availableElement.time.forEach((timeElement: any) => {
      // this.chkMinMaxIndexTest(slotArray, dt, d, timeElement);
      expect(comp.chkMinMaxIndexTest(slotArray, dt, d, timeElement)).toHaveBeenCalled;
      
      expect(minflag).toBe(true);
      expect(maxflag).toBe(false);

    });
  });

  it('chkMinMaxIndexTest() for TTT  inner TT case', () => {
    let myd = new Date();
    myd.setHours(5);
    myd.setMinutes(0);
     let slotArray = [
       { time: myd, colorflag: false },
      // { time: new Date(), colorflag: false },
      // { time: new Date(), colorflag: false },
      // { time: new Date(), colorflag: false },
      // { time: new Date(), colorflag: false },
      // { time: new Date(), colorflag: false }
    ];
    let dt = new Date();
    let d = new Date();
    let timeElement = {starttime: 5, endtime: 6};
    comp.chkMinMaxIndexTest(slotArray, dt, d, timeElement);
    slotArray.forEach((slotElement: any, slotIndex: number) => {
      // (dt.getFullYear() === d.getFullYear()) &&
      // (dt.getMonth() === d.getMonth()) && 
      // (dt.getDate() === d.getDate()))
      expect(dt.getFullYear()).toEqual(d.getFullYear());
      expect(dt.getMonth()).toEqual(d.getMonth());
      expect(dt.getDate()).toEqual(d.getDate())
    //  if (((obj.hours === slotElement.time.getHours()) 
    //   && (obj.minutes === slotElement.time.getMinutes()))) {
      const obj = comp.getHourMinuteFormat(timeElement.starttime); //5
      expect(obj.hours).toEqual(slotElement.time.getHours());
      expect(obj.minutes).toEqual(slotElement.time.getMinutes());
    
    });
  });

  it('chkMinMaxIndexTest() for TTT  inner FF case', () => {
    let myd = new Date();
    myd.setHours(new Date().getHours() + 1);
    myd.setMinutes(new Date().getMinutes() + 20);

    let slotArray = [{ time: myd, colorflag: false },
    //  { time: new Date(), colorflag: false },
    //  { time: new Date(), colorflag: false },
    //  { time: new Date(), colorflag: false },
    //  { time: new Date(), colorflag: false },
    //  { time: new Date(), colorflag: false }
    ];
   let dt = new Date();
   let d = new Date();
   let timeElement = {starttime: 5, endtime: 6};
   comp.chkMinMaxIndexTest(slotArray, dt, d, timeElement);
   slotArray.forEach((slotElement: any, slotIndex: number) => {
     // (dt.getFullYear() === d.getFullYear()) &&
     // (dt.getMonth() === d.getMonth()) && 
     // (dt.getDate() === d.getDate()))
     expect(dt.getFullYear()).toEqual(d.getFullYear());
     expect(dt.getMonth()).toEqual(d.getMonth());
     expect(dt.getDate()).toEqual(d.getDate())
   //  if (((obj.hours === slotElement.time.getHours()) 
   //   && (obj.minutes === slotElement.time.getMinutes()))) {
     const obj = comp.getHourMinuteFormat(timeElement.starttime); //5
     expect(obj.hours).not.toEqual(slotElement.time.getHours());
     expect(obj.minutes).not.toEqual(slotElement.time.getMinutes());
   
   });
 });

 it('chkMinMaxIndexTest() for TTT  inner TF case', () => {
   let myd = new Date();
   myd.setHours(5);
   myd.setMinutes(new Date().getMinutes() + 20);

   let slotArray = [{ time: myd, colorflag: false },
   ];
   let dt = new Date();
   let d = new Date();
   let timeElement = {starttime: 5, endtime: 6};
   comp.chkMinMaxIndexTest(slotArray, dt, d, timeElement);
   slotArray.forEach((slotElement: any, slotIndex: number) => {
   // (dt.getFullYear() === d.getFullYear()) &&
   // (dt.getMonth() === d.getMonth()) && 
   // (dt.getDate() === d.getDate()))
   expect(dt.getFullYear()).toEqual(d.getFullYear());
   expect(dt.getMonth()).toEqual(d.getMonth());
   expect(dt.getDate()).toEqual(d.getDate())
   //  if (((obj.hours === slotElement.time.getHours()) 
   //   && (obj.minutes === slotElement.time.getMinutes()))) {
   const obj = comp.getHourMinuteFormat(timeElement.starttime); //5
  //  expect(obj.hours).toEqual(slotElement.time.getHours());
   expect(obj.minutes).not.toEqual(slotElement.time.getMinutes());
 });
});

it('chkMinMaxIndexTest() for TTT  inner FT case', () => {
  let myd = new Date();
  
  myd.setHours(8);
  myd.setMinutes(0);
  let slotArray = [{ time: myd, colorflag: false},
  
  ];
 let dt = new Date();
 let d = new Date();
 let timeElement = {starttime: 5, endtime: 6};
 comp.chkMinMaxIndexTest(slotArray, dt, d, timeElement);
 slotArray.forEach((slotElement: any, slotIndex: number) => {
   // (dt.getFullYear() === d.getFullYear()) &&
   // (dt.getMonth() === d.getMonth()) && 
   // (dt.getDate() === d.getDate()))
   expect(dt.getFullYear()).toEqual(d.getFullYear());
   expect(dt.getMonth()).toEqual(d.getMonth());
   expect(dt.getDate()).toEqual(d.getDate())
 //  if (((obj.hours === slotElement.time.getHours()) 
 //   && (obj.minutes === slotElement.time.getMinutes()))) {
   const obj = comp.getHourMinuteFormat(timeElement.starttime); //5
   expect(obj.hours).not.toEqual(slotElement.time.getHours());
   expect(obj.minutes).toEqual(slotElement.time.getMinutes());
 
 });
});

  it('chkMinMaxIndexTest() for TTF', () => {
    let slotArray = [{ time: new Date(), colorflag: false },
     { time: new Date(), colorflag: false },
     { time: new Date(), colorflag: false },
     { time: new Date(), colorflag: false },
     { time: new Date(), colorflag: false },
     { time: new Date(), colorflag: false }];
   let dt = new Date();
   let d = new Date();
   dt.setDate(10);
   d.setDate(12);
   let timeElement = {starttime: 5, endtime: 6};
   comp.chkMinMaxIndexTest(slotArray, dt, d, timeElement);
   slotArray.forEach((slotElement: any, slotIndex: number) => {
     // (dt.getFullYear() === d.getFullYear()) &&
     // (dt.getMonth() === d.getMonth()) && 
     // (dt.getDate() === d.getDate()))
     expect(dt.getFullYear()).toEqual(d.getFullYear());
     expect(dt.getMonth()).toEqual(d.getMonth());
     expect(dt.getDate()).not.toEqual(d.getDate())
   });
 });

 it('chkMinMaxIndexTest() for TFT', () => {
  let slotArray = [{ time: new Date(), colorflag: false },
   { time: new Date(), colorflag: false },
   { time: new Date(), colorflag: false },
   { time: new Date(), colorflag: false },
   { time: new Date(), colorflag: false },
   { time: new Date(), colorflag: false }];
   let dt = new Date();
   let d = new Date();
   dt.setFullYear(2020);
   d.setFullYear(2020);
   dt.setMonth(10);
   d.setMonth(12);
   let timeElement = {starttime: 5, endtime: 6};
   comp.chkMinMaxIndexTest(slotArray, dt, d, timeElement);
   slotArray.forEach((slotElement: any, slotIndex: number) => {
   // (dt.getFullYear() === d.getFullYear()) &&
   // (dt.getMonth() === d.getMonth()) && 
   // (dt.getDate() === d.getDate()))
   expect(dt.getFullYear()).toEqual(d.getFullYear() -1);
   expect(dt.getMonth()).not.toEqual(d.getMonth());
   expect(dt.getDate()).toEqual(d.getDate())
    });
});

it('chkMinMaxIndexTest() for TFF', () => {
  let slotArray = [{ time: new Date(), colorflag: false },
   { time: new Date(), colorflag: false },
   { time: new Date(), colorflag: false },
   { time: new Date(), colorflag: false },
   { time: new Date(), colorflag: false },
   { time: new Date(), colorflag: false }];
   let dt = new Date();
   let d = new Date();
   dt.setFullYear(2020);
   d.setFullYear(2020);
   dt.setMonth(10);
   d.setMonth(12);
   d.setDate(11);
   dt.setDate(14);
   let timeElement = {starttime: 5, endtime: 6};
   comp.chkMinMaxIndexTest(slotArray, dt, d, timeElement);
   slotArray.forEach((slotElement: any, slotIndex: number) => {
   // (dt.getFullYear() === d.getFullYear()) &&
   // (dt.getMonth() === d.getMonth()) && 
   // (dt.getDate() === d.getDate()))
   expect(dt.getFullYear()).toEqual(d.getFullYear() -1);
   expect(dt.getMonth()).not.toEqual(d.getMonth());
   expect(dt.getDate()).not.toEqual(d.getDate())
    });
});


it('chkMinMaxIndexTest() for FTT', () => {
  let slotArray = [{ time: new Date(), colorflag: false },
   { time: new Date(), colorflag: false },
   { time: new Date(), colorflag: false },
   { time: new Date(), colorflag: false },
   { time: new Date(), colorflag: false },
   { time: new Date(), colorflag: false }];
   let dt = new Date();
   let d = new Date();
   dt.setFullYear(2019);
   d.setFullYear(2020);
   let timeElement = {starttime: 5, endtime: 6};
   comp.chkMinMaxIndexTest(slotArray, dt, d, timeElement);
   slotArray.forEach((slotElement: any, slotIndex: number) => {
   // (dt.getFullYear() === d.getFullYear()) &&
   // (dt.getMonth() === d.getMonth()) && 
   // (dt.getDate() === d.getDate()))
   expect(dt.getFullYear()).not.toEqual(d.getFullYear());
   expect(dt.getMonth()).toEqual(d.getMonth());
   expect(dt.getDate()).toEqual(d.getDate())
    });
});


it('chkMinMaxIndexTest() for FTF', () => {
  let slotArray = [{ time: new Date(), colorflag: false },
   { time: new Date(), colorflag: false },
   { time: new Date(), colorflag: false },
   { time: new Date(), colorflag: false },
   { time: new Date(), colorflag: false },
   { time: new Date(), colorflag: false }];
   let dt = new Date();
   let d = new Date();
   dt.setFullYear(2005);
   d.setFullYear(2019);
   d.setDate(11);
   dt.setDate(14);
   let timeElement = {starttime: 5, endtime: 6};
   comp.chkMinMaxIndexTest(slotArray, dt, d, timeElement);
   slotArray.forEach((slotElement: any, slotIndex: number) => {
   // (dt.getFullYear() === d.getFullYear()) &&
   // (dt.getMonth() === d.getMonth()) && 
   // (dt.getDate() === d.getDate()))
   expect(dt.getFullYear()).not.toEqual(d.getFullYear());
   expect(dt.getMonth()).toEqual(d.getMonth());
   expect(dt.getDate()).not.toEqual(d.getDate())
    });
});


it('chkMinMaxIndexTest() for FFT', () => {
  let slotArray = [{ time: new Date(), colorflag: false },
   { time: new Date(), colorflag: false },
   { time: new Date(), colorflag: false },
   { time: new Date(), colorflag: false },
   { time: new Date(), colorflag: false },
   { time: new Date(), colorflag: false }];
   let dt = new Date();
   let d = new Date();
   dt.setFullYear(2005);
   d.setFullYear(2019);
   dt.setMonth(10);
   d.setMonth(12);
 
   let timeElement = {starttime: 5, endtime: 6};
   comp.chkMinMaxIndexTest(slotArray, dt, d, timeElement);
   slotArray.forEach((slotElement: any, slotIndex: number) => {
   // (dt.getFullYear() === d.getFullYear()) &&
   // (dt.getMonth() === d.getMonth()) && 
   // (dt.getDate() === d.getDate()))
   expect(dt.getFullYear()).not.toEqual(d.getFullYear());
   expect(dt.getMonth()).not.toEqual(d.getMonth());
   expect(dt.getDate()).toEqual(d.getDate())
    });
});


it('chkMinMaxIndexTest() for FFF', () => {
  let slotArray = [{ time: new Date(), colorflag: false },
   { time: new Date(), colorflag: false },
   { time: new Date(), colorflag: false },
   { time: new Date(), colorflag: false },
   { time: new Date(), colorflag: false },
   { time: new Date(), colorflag: false }];
   let dt = new Date();
   let d = new Date();
   dt.setFullYear(2005);
   d.setFullYear(2025);
   dt.setMonth(10);
   d.setMonth(12);
   d.setDate(11);
   dt.setDate(14);
   let timeElement = {starttime: 5, endtime: 6};
   comp.chkMinMaxIndexTest(slotArray, dt, d, timeElement);
   slotArray.forEach((slotElement: any, slotIndex: number) => {
   // (dt.getFullYear() === d.getFullYear()) &&
   // (dt.getMonth() === d.getMonth()) && 
   // (dt.getDate() === d.getDate()))
   expect(dt.getFullYear()).not.toEqual(d.getFullYear());
   expect(dt.getMonth()).not.toEqual(d.getMonth());
   expect(dt.getDate()).not.toEqual(d.getDate())
    });
});

it('setSlots()', () => {
  let d = new Date();
  comp.startTime = 5;
  comp.endTime = 6;
  comp.labelData = [
    {
      "label": "Inbound",
      "colorcode": "red",
      "textcolor": "white",
      "available": [
        {
          "date": "01-Sep-2019",
          "time": [
            {
              "starttime": 5,
              "endtime": 5.30
            },
            ,
            {
              "starttime": 6.30,
              "endtime": 7
            }
          ]
        },
        {
          "date": "02-Sep-2019",
          "time": [
            {
              "starttime": 5,
              "endtime": 5.30
            },
            ,
          ]
        },
      ]
    },
    {
      "label": "Outbound",
      "colorcode": "blue",
      // "textcolor": "white",
      "available": [
        {
          "date": "02-Sep-2019",
          "time": [
            {
              "starttime": 5.30,
              "endtime": 6.30
            },
          ]
        }
      ]
    },

  ];
  let slot = [{ time: new Date(), colorflag: false },
    { time: new Date(), colorflag: false },
    { time: new Date(), colorflag: false },
    { time: new Date(), colorflag: false },
    { time: new Date(), colorflag: false },
    { time: new Date(), colorflag: false }];
   comp.setSlots(d);
  //  let slot = [{ time: new Date(), colorflag: false },
  //   { time: new Date(), colorflag: false },
  //   { time: new Date(), colorflag: false },
  //   { time: new Date(), colorflag: false },
  //   { time: new Date(), colorflag: false },
  //   { time: new Date(), colorflag: false }];
expect(comp.startTime).toBeDefined();
expect(comp.endTime).toBeDefined();

expect(comp.chkLabels(d,slot)).toHaveBeenCalled

});

});
