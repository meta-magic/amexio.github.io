import { AmexioButtonComponent } from './../buttons/button.component';
import { AmexioFormIconComponent } from './../icon/icon.component';
import { AmexioDateTimePickerComponent } from './datetimepicker.component';
import { By } from '@angular/platform-browser';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { ChangeDetectorRef, ElementRef } from '@angular/core';
import { IconLoaderService } from '../../../index';
import { DebugElement } from '@angular/core';
describe('amexio-date-time-picker', () => {
  let comp: AmexioDateTimePickerComponent;
  let fixture: ComponentFixture<AmexioDateTimePickerComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [FormsModule],
      declarations: [AmexioDateTimePickerComponent, AmexioFormIconComponent, AmexioButtonComponent],
      providers: [IconLoaderService]
    });
    fixture = TestBed.createComponent(AmexioDateTimePickerComponent);
    comp = fixture.componentInstance;
    comp.backArrowFlag = false;
    //comp.testnumber = 5;
    comp.yearList1 = [{ year: 0, flag: false, disabled: false },
    { year: 1, flag: false, disabled: false }, { year: 3, flag: false, disabled: false },
    { year: 4, flag: false, disabled: false }, { year: 5, flag: false, disabled: false }];
    comp.yearList2 = [{ year: 20, flag: false, disabled: false },
    { year: 15, flag: false, disabled: false },
    { year: 8, flag: false, disabled: false },
    { year: 18, flag: false, disabled: false },
    { year: 65, flag: false, disabled: false }];
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
    let element = { flag: true, name: 'Jan' };
    comp.elementFlagMethod(element);
    expect(false).toBe(element.flag);
    comp.negateDrop();
    expect(true).toBe(comp.hostFlag);
    expect(false).toBe(comp.drop);
    expect(true).toBe(comp.showToolTip);
    expect(true).toBe(comp.tempFlag);
    comp.monthList1 = [];
    comp.monthList2 = [];
    const Jan = { name: 'Jan' };
    const Feb = { name: 'Feb' };
    const Mar = { name: 'Mar' };
    const Apr = { name: 'Apr' };
    const May = { name: 'May' };
    const Jun = { name: 'Jun' };
    const Jul = { name: 'Jul' };
    const Aug = { name: 'Aug' };
    const Sep = { name: 'Sep' };
    const Oct = { name: 'Oct' };
    const Nov = { name: 'Nov' };
    const Dec = { name: 'Dec' };
    const month = { name: 'Jan' };
    const monthnew = { name: 'Janone' };
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
    //--------------------------------------------------
    const e1 = { year: 2011, flag: true };
    const e2 = { year: 2011 };
    comp.yearFlag(e1, e2);
    expect(true).toBe(e1.flag);

    comp.checkValidity();
    comp.isValid = false;
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

    const el = { year: 2010, disabled: true };

    comp.disableMinMaxYear(el, new Date(), new Date());
    expect(true).toBe(el.disabled);

    comp.yearFlagDisable(el);
    expect(true).toBe(el.disabled);

    comp.rechkYearFlag();
    expect(false).toBe(comp.backArrowFlag);

    const elt = { year: 2018, disabled: true };
    comp.alterBackArrow(elt, new Date());
    expect(true).toBe(comp.backArrowFlag);

    comp.yearList1 = [{ year: 0, flag: false, disabled: false },
    { year: 1, flag: false, disabled: false }, { year: 3, flag: false, disabled: false },
    { year: 4, flag: false, disabled: false }, { year: 5, flag: false, disabled: false }];
    comp.yearList2 = [{ year: 20, flag: false, disabled: false },
    { year: 15, flag: false, disabled: false },
    { year: 8, flag: false, disabled: false },
    { year: 18, flag: false, disabled: false },
    { year: 65, flag: false, disabled: false }];
    comp.backArrowFlag = false;
    comp.resetYearFlag();
    expect(false).toBe(comp.backArrowFlag);

    comp.daysArray = [{ date: new Date() }];
    comp.resetSelection(new Date());

    comp.setMaxFullYear(new Date('22-Mar-2016'), new Date(), 1);

    comp.onDateClick(new Date());
    expect(true).toBe(comp.showToolTip);


    comp.setPlusData(new Date(), new Date(), 2);

    comp.setPlusData(new Date('22-Mar-2016'), new Date(), 2);
    comp.setMinusData(new Date('22-Mar-2016'), new Date(), 2);
    comp.setMinFullYear(new Date('22-DEC-2019'), new Date(), 1);


    // comp.setDateData1('plus',2,new Event(0));

    comp.currrentDate = new Date();
    comp.initDate();
    expect('').toEqual('');

    //*************chk this */
    // comp.writeValue(11);

    comp.disableYearFlag();

    comp.onFocusOut(new Date());
    expect(false).toBe(comp.isValid);

    comp.minMaxDateFound();
    expect(false).toBe(comp.forwardArrowFlag);

    const eone = { name: 'Jan', flag: true };
    const etwo = { name: 'Jan' };
    comp.chkMonth(eone, etwo);
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
    comp.value = 'date';
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
    let dateObj = new Date("Thu Jul 25 2017 00:00:00 GMT+0530 (IST)");
    let daysArray: any = [];
    let rowDays: any;
    const day: any = {
      date: null, selected: false, isCurrentMonth: null, isDisabled: false,
    };
    day.date = new Date(dateObj.getTime());
    comp.resetSelection(dateObj);
    day.selected = true;
    expect(day.date.getTime()).toEqual(dateObj.getTime());
    expect(day.selected).toEqual(true);
    day.date.setTime(1332403882588);
    day.selected = false;
    expect(day.selected).toEqual(false);
  });


  it('ngOnInit', () => {
    comp.ngOnInit();
    comp.maxDate = "22-Feb-2019"
    comp.minDate = "22-Feb-2015"

    expect(comp.minDate.length).toBeGreaterThan(0);
    const min = new Date(comp.minDate);
    const max = new Date(comp.maxDate);
    comp.yearList1.forEach((element: any) => {
      comp.disableMinMaxYear(element, min, max);
    });
    comp.yearList2.forEach((element: any) => {
      comp.disableMinMaxYear(element, min, max);
    });
  });


  it('setToday()', () => {
    comp['setToday']();
    // comp.currrentDate = new Date();
    comp.initDate();
    comp.showToolTip = true;
    comp.showToolTip = !comp.showToolTip;
    expect(comp.showToolTip).toEqual(false);
  });

  it('onBlur()', () => {
    comp.onBlur();
    comp['onTouchedCallback']();
  });

  it('registerOnChange()', () => {
    let fn;
    comp.registerOnChange(fn);
    comp['onChangeCallback'] = fn;
    expect(comp['onChangeCallback']).toEqual(fn);
  });

  it('registerOnTouched()', () => {
    let fn;
    comp.registerOnTouched(fn);
    comp['onTouchedCallback'] = fn;
    expect(comp['onTouchedCallback']).toEqual(fn);
  });

  // it('onFocusOut()', () => {
  //   comp.onBlur();
  //   comp['onTouchedCallback']();
  //    }); 


  // it('writeValue()', () => {


  //   if (value !== this.innerValue) {
  //     this.innerValue = value;
  //     if (this.required && this.innerValue instanceof Date || ('number' === typeof this.innerValue)) {
  //       this.dateModel = this.innerValue;
  //       this.isValid = true;
  //     } else {
  //       this.isValid = false;
  //       this.hrs = 0;
  //       this.min = 0;
  //     }



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
  //   let selectedperiod = new Date();
  //   comp['createDaysForCurrentMonths'](selectedperiod);
  //   this.daysArray = [];
  //   //year=
  //   const date = new Date(selectedperiod.getFullYear(), selectedperiod.getMonth(), 1, 0, 0, 0, 0);
  //   const extras = (date.getDay() + 6) % 7; // How many days of the last month do we need to include?


  //   let rowDays=[];
  //   //date.setDate(date.getDate() - extras); // Skip back to the previous monday
  //   while (this.daysArray.length < 6) {

  //     const day: any = {
  //       date: null, selected: false, isCurrentMonth: null, isDisabled: false,
  //     };
  //     for (let i = 0; i < 7; i++) {

  //       day.date = new Date("22-Feb-2015");
  //       day.isCurrentMonth = (date.getMonth() === selectedperiod.getMonth());
  //       //comp.dateModel= true;
  //       expect(comp.dateModel).not.toBeNull;
  //       expect(date.getMonth()).toEqual(comp.dateModel.getMonth());
  //       expect(date.getDate()).toEqual(comp.dateModel.getDate());
  //        day.selected = true;
  //       expect(day.selected).toEqual(true);

  //       //else if ((date.getMonth() === this.currrentDate.getMonth()) && (date.getDate() === this.currrentDate.getDate())) {

  //         expect(date.getMonth()).toEqual(comp.currrentDate.getMonth());
  //         expect(date.getDate()).toEqual(comp.currrentDate.getDate());
  //         expect(comp.dateModel).toBeNull;
  //         day.selected = false;
  //         expect(day.selected).toEqual(false);
  //         day.selected=true;
  //         expect(day.selected).toEqual(true);

  //       }
  //       rowDays.push(day);

  //       expect(rowDays.length).toEqual(1);
  //        //date.setDate(date.getDate() + 1);
  //        let inc = date.setDate(date.getDate() + 1);
  //        expect(date).toBeGreaterThan(inc);
  //     }
  //   // this.daysArray.push(rowDays);
  //   expect(comp.daysArray).toContain(rowDays);
  //   // }



  // });

  it('onSelect()', () => {
    comp.onSelect();
    comp.showToolTip = false;
    expect(comp.showToolTip).toEqual(false);
  });


  it('validateMaxDate()', () => {
    let days = new Date("27-May-2017");
    let max = new Date("22-Feb-2015");;
    comp['validateMaxDate'](days, max);
    //if
    let test = expect(days.getDate()).toBeGreaterThan(max.getDate());
    let test1 = expect(days.getMonth()).toBeGreaterThanOrEqual(max.getMonth());
    expect(days.getFullYear()).toBeGreaterThanOrEqual(max.getFullYear());

    //else if 
    max.setFullYear(2017);
    expect(days.getMonth()).toBeGreaterThan(max.getMonth());
    expect(days.getFullYear()).toEqual(max.getFullYear());


  });

  it('getDropdownMonth()', () => {
    let month = 2;
    comp.getDropdownMonth(month);
    comp.monthList1 = [{ name: 'Jan', flag: false, num: 4 }, { name: 'Feb', flag: false },
    { name: 'Mar', flag: false }, { name: 'Apr', flag: false }, { name: 'May', flag: false },
    { name: 'Jun', flag: false }];
    comp.elementFlagMethod(comp.monthList1[1]);
  });

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

  //   const From = new Date(date[1].from);
  //   const To = new Date(date[1].to);
  //   console.log("comp.daysArray[0][0].getDate() = ", comp.daysArray[0][0].getDate());

  //   expect(comp.daysArray[0][0].date.getFullYear()).toBeLessThanOrEqual(To.getFullYear());
  //   expect(comp.daysArray[0][0].date.getMonth()).toBeLessThanOrEqual(To.getMonth());
  //   expect(comp.daysArray[0][0].getDate()).toBeLessThanOrEqual(To.getDate());
  //   console.log("comp.daysArray[0][0].getDate() = ", comp.daysArray[0][0].getDate());

  //   expect(comp.daysArray.date.getFullYear()).toBeGreaterThanOrEqual(From.getFullYear());
  //   expect(comp.daysArray[0][0].date.getMonth()).toBeGreaterThanOrEqual(From.getMonth());
  //   expect(comp.daysArray[0][0].date.getDate()).toBeGreaterThanOrEqual(From.getDate());
  //   comp.daysArray[0][0].isDisabled = true;
  //   expect(comp.daysArray[0][0].isDisabled).toEqual(true);
  // });

  it('arrowClickForward()', () => {
    comp.arrowClickForward();
    comp.disableYearFlag();
    comp.minDate = '22-Mar-2016';
    comp.maxDate = '27-Oct-2018';
    this.yearList1 = [{ year: 0, flag: false, disabled: false }, { year: 0, flag: false, disabled: false },
    { year: 0, flag: false, disabled: false }, { year: 0, flag: false, disabled: false },
    { year: 0, flag: false, disabled: false }];
    this.yearList2 = [{ year: 0, flag: false, disabled: false }, { year: 0, flag: false, disabled: false },
    { year: 0, flag: false, disabled: false }, { year: 0, flag: false, disabled: false },
    { year: 0, flag: false, disabled: false }];

    expect(comp.minDate.length).toBeGreaterThan(0);
    comp['forwardArrow']();
    comp.minDate = '';
    expect(comp.minDate.length).toEqual(0);

    comp.yearList1[0].year = comp.yearList1[0].year + 10;
    this.yearList2[0].year = this.yearList2[0].year + 10;

    comp.disableYearFlag();
    comp.rechkYearFlag();
  });

  it('onFocusOut()', () => {

    let value = { value: 'Mar' };
    comp.onFocusOut(value);
    expect(Date.parse(value.value)).toBeNaN;
    comp.isValid = false;
    expect(comp.isValid).toEqual(false);
    value.value = '';
    value.value = '22-Mar-2016';
    expect(Date.parse(value.value)).not.toBeNaN;
    comp.value = Date.parse(value.value);
    comp.isValid = true;
    //expect(value.value.length).toBeLessThanOrEqual(0);
  });

  it('yearFlagNegate()', () => {
    let element = { year: 0, flag: true, disabled: false };
    comp['yearFlagNegate'](element);
  });

  it('elementFlagMethod()', () => {
    let element = { year: 0, flag: false, disabled: false };

    comp.elementFlagMethod(element);
    expect(element.flag).toEqual(false);
  });

  it('yearFlag()', () => {
    let element = { year: 2010, flag: false, disabled: false };
    let year = { year: 2010 };
    comp.yearFlag(element, year);
    expect(element.year).toEqual(year.year);
  });


  it('getDropdownYear()', () => {
    let element = { year: 2014, flag: false, disabled: false };
    comp.yearList1 = [{ year: 2010, flag: false, disabled: false }, { year: 0, flag: false, disabled: false },
    { year: 0, flag: false, disabled: false }, { year: 0, flag: false, disabled: false },
    { year: 0, flag: false, disabled: false }];
    comp.yearList2 = [{ year: 2011, flag: false, disabled: false }, { year: 0, flag: false, disabled: false },
    { year: 0, flag: false, disabled: false }, { year: 0, flag: false, disabled: false },
    { year: 0, flag: false, disabled: false }];
    let year = { year: 2012 };
    comp['yearFlagNegate'](comp.yearList1[0]);
    comp['yearFlagNegate'](comp.yearList2[0]);
    comp.yearFlag(comp.yearList1[0], year);
    comp.yearFlag(comp.yearList2[0], year);
    comp.yearNo = 2012;
    expect(comp.yearNo).toEqual(year.year);
  });

  //yearflagdisable
  it('yearFlagDisable()', () => {
    let element = { year: 2010, flag: false, disabled: false };
    let year = { year: 2010 };
    comp.minDate = '27-Mar-2016';
    comp.maxDate = '22-Feb-2019';
    comp.yearFlagDisable(element);
    const min = new Date(comp.minDate);
    const max = new Date(comp.maxDate);

    //case 1
    expect(element.year).toBeLessThan(min.getFullYear());

    //case 2
    element.year = 2020;
    expect(element.year).toBeGreaterThan(max.getFullYear());

  });


  //resetyearflag
  it('resetYearFlag()', () => {
    comp.resetYearFlag();

    expect(comp.backArrowFlag).toEqual(false);
    comp.yearList1[0].year = this.yearList1[0].year - 10;
    comp.yearList2[0].year = this.yearList2[0].year - 10;
    comp.yearList1[0].disabled = false;
    comp.yearList2[0].disabled = false;
  });

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
  //   // comp.resetYearFlag();

  // });
  //recchkyearflag

});

