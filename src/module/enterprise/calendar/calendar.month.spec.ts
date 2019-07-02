/**
 * Created by kedar on 26/6/19.
 */

import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { IconLoaderService } from '../../../index';
import { CommonDataService } from '../../services/data/common.data.service';
import { HttpClientModule } from '@angular/common/http';
import { DisplayFieldComponent } from '../../base/display-field/display-field.component';
import { CommonIconComponent } from '../../base/components/common.icon.component';
import { AmexioCalendarDayTimeWiseComponent } from './calendar.daytimewise.component';
import { AmexioCalendarMonthComponent } from './calendar.month';
import { AmexioCalendarYearComponent } from './calendar.year.component';
import { AmexioLayoutComponent } from '../../layout/basiclayout/layout.component';
import { AmexioLayoutItemComponent } from '../../layout/basiclayout/layoutitem.component';
import { AmexioFloatingPanelComponent } from '../../panes/floatingpanel/floatingpanel.component';
import { AmexioLabelComponent } from '../../forms/label/label.component';


describe('amexio-calendar-month', () => {
  let comp: AmexioCalendarMonthComponent;
  let fixture: ComponentFixture<AmexioCalendarMonthComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [FormsModule, HttpClientModule],
      declarations: [
        AmexioCalendarMonthComponent, DisplayFieldComponent,
        CommonIconComponent, AmexioLayoutComponent,
        AmexioLayoutItemComponent, AmexioFloatingPanelComponent,
        AmexioCalendarDayTimeWiseComponent,
        AmexioCalendarMonthComponent,
        AmexioCalendarYearComponent,
        AmexioLabelComponent
      ],
      providers: [IconLoaderService, CommonDataService],
    });
    fixture = TestBed.createComponent(AmexioCalendarMonthComponent);
    comp = fixture.componentInstance;
    event = jasmine.createSpyObj('event', ['preventDefault', 'stopPropagation']);


  });
 
  //check variables 
  it('check variables in dropdown component ', () => {

    comp.leftPositionPanel = 'leftPositionPanel';
    expect(comp.leftPositionPanel).toEqual('leftPositionPanel');

    comp.rightPositionPanel = 'rightPositionPanel';
    expect(comp.rightPositionPanel).toEqual('rightPositionPanel');
    comp.openFloatingPanel = false;
    expect(comp.openFloatingPanel).toEqual(false);

  });

  // onCloseClick method
  //   it('onCloseClick() method check', () => {
  //     let fn = event;
  //     comp.onCloseClick(fn);
  //     // comp.onCloseClicked.subscribe((g: any) => {
  //     //   expect(comp.onCloseClicked).toEqual(g);
  //     // });
  //   });

  // refactoredleftday method
  it('refactoredleftday() method check', () => {

    let innerindex: any;
    let rowindex: any;
    let calendarrow: any;

    
    rowindex = 0;
    innerindex = 2;
    comp.refactoredleftday(rowindex, innerindex, calendarrow);
    expect(rowindex).toEqual(0);
    expect(innerindex).toBeGreaterThan(0);
    expect(comp.focusrindex).toEqual(rowindex);
    expect(comp.focusiindex).toEqual(innerindex - 1);

    innerindex = -1;
    comp.focusiindex = -1
    comp.refactoredleftday(rowindex, innerindex, calendarrow);
    expect(innerindex).toBeLessThan(0);
    expect(comp.focusrindex).toEqual(rowindex);
    expect(comp.focusiindex).toEqual(innerindex);

    rowindex = 1;
    innerindex = 0;
    comp.focusiindex = 2;
    calendarrow = 'fix';
    comp.refactoredleftday(rowindex, innerindex, calendarrow);
    expect(innerindex).toEqual(0);
    expect(comp.focusrindex).toEqual(rowindex -1);
    expect(comp.focusiindex).toEqual(calendarrow.length - 1);
     
    innerindex = 3;
    comp.focusiindex = 2;
    comp.refactoredleftday(rowindex, innerindex, calendarrow);
    expect(innerindex).toBe(3);
    expect(comp.focusrindex).toEqual(rowindex);
    expect(comp.focusiindex).toEqual(innerindex -1);
  });


  it('getFullDayName()', () => {
      let receiveddate = new Date('16-Jul-2019');
      comp.getFullDayName(receiveddate);
      const weekdays = ['Sunday', 'Monday', 'Tuesday', 'Wednesday',
      'Thursday', 'Friday', 'Saturday'];
  const day = receiveddate.getDay();
  let dayname = '';
  weekdays.forEach((element: any, index: number) => {
    // if (day === index) {
      if(index == 2) {
  expect(day).toEqual(index);
  dayname = element;}
  });
  return dayname;
  });

  it('getFullMonthName()', () => {
    let receiveddate = new Date('16-Jul-2019');
    comp.getFullMonthName(receiveddate);
    const months = ['January', 'Febuary', 'March', 'April', 'May', 'June',
            'July', 'August', 'September', 'October', 'November', 'December'];
        const datemonth = receiveddate.getMonth();
        let monthString = '';
        months.forEach((element: any, index: number) => {
           if(index == 6) {
               expect(datemonth). toEqual(index);
              monthString = element;
           }
         });
         return monthString;
});
  
it('receiveDateFormat()', () => {
  let day = new Date();
     comp.receiveDateFormat(day);
     let datestring = '';
     datestring = (day).getDate() + comp.getFullMonthName(new Date(day)) +
         comp.getFullDayName(new Date(day));
     return datestring;
});

it('formatAMPM()', () => {
  let date = new Date();
  let hours = date.getHours();
  const minutes = date.getMinutes();
  let lmins;
  const ampm = hours >= 12 ? 'pm' : 'am';
  hours = hours % 12;
  hours = hours ? hours : 12; // the hour '0' should be '12'
  lmins = minutes < 10 ? '0' + minutes : minutes;
  return (hours + ':' + lmins + ' ' + ampm);
});

it('eventClicked()', () => {
   let eventData: any = 'a';
   let runTimeDiv: any = 'b';
  comp.eventClicked(event, eventData, runTimeDiv);
  const eventObject = {};
  eventObject['event'] = event;
  eventObject['item'] = eventData;
  eventObject['this'] = comp;
  eventObject['runtimeDiv'] = runTimeDiv;
  comp.onEventClicked.emit(eventObject);
});

it('onCloseClick()', () => {
  let event1 = {data: {fpFlag: false}}
   comp.onCloseClick(event1);
   event1.data.fpFlag = false;
   comp.onCloseClicked.emit(event);
});

it('onChipClick()', () => {
  let item: any = 'a';
  let runtimeDiv: any = 'b';
  let event1 = {pageX: 'page'}
    comp.onChipClick(event1, item, runtimeDiv);
    const emitEvent = {};
        emitEvent['event'] = event;
        emitEvent['item'] = item;
        emitEvent['this'] = this;
        emitEvent['runtimeDiv'] = runtimeDiv;
        comp.xValue = event1.pageX;
        comp.onMoreEventClicked.emit(emitEvent);
});

});