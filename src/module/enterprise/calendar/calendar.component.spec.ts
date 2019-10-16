/**
 * Created by kedar on 26/6/19.
 */

import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { IconLoaderService } from '../../../index';
import { AmexioCalendarComponent } from './calendar.component';
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


describe('amexio-calendar', () => {
  let comp: AmexioCalendarComponent;
  let fixture: ComponentFixture<AmexioCalendarComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [FormsModule, HttpClientModule],
      declarations: [
        AmexioCalendarComponent, DisplayFieldComponent,
        CommonIconComponent, AmexioLayoutComponent,
        AmexioLayoutItemComponent, AmexioFloatingPanelComponent,
        AmexioCalendarDayTimeWiseComponent,
        AmexioCalendarMonthComponent,
        AmexioCalendarYearComponent,
        AmexioLabelComponent
      ],
      providers: [IconLoaderService, CommonDataService],
    });
    fixture = TestBed.createComponent(AmexioCalendarComponent);
    comp = fixture.componentInstance;
    event = jasmine.createSpyObj('event', ['preventDefault', 'stopPropagation']);
  });

  //check variables 
  it('check variables in dropdown component ', () => {

    comp.displayHeaders = [];
    expect(comp.displayHeaders).toEqual([]);
    comp.calendarMonthData = [];

    expect(comp.calendarMonthData).toEqual([]);
    comp.calendarWeekData = [];

    expect(comp.calendarWeekData).toEqual([]);


    expect(comp.prevMonthPressed).toEqual(false);
    expect(comp.nextMonthPressed).toEqual(false);
    expect(comp.dayPressed).toEqual(false);
    expect(comp.weekPressed).toEqual(false);

    expect(comp.monthPressed).toEqual(false);
    expect(comp.yearPressed).toEqual(false);
  })

  // onDayTimeWiseEvent method
  it('onDayTimeWiseEvent() method check', () => {
    let fn = event;
    comp.onDayTimeWiseEvent(fn);
    comp.onEventClicked.subscribe((g: any) => {
      expect(comp.onEventClicked).toEqual(g);
    });
  });


// InitCalendar
  it('onDayTimeWiseEvent() method check', () => {
    comp.initCalendar();
    comp.prevbtnid = window.crypto.getRandomValues(new Uint32Array(1))[0] + '_previd';
    expect(comp.prevbtnid).toBeDefined();
    comp.nextbtnid = window.crypto.getRandomValues(new Uint32Array(1))[0] + '_nextid';
    expect(comp.nextbtnid).toBeDefined();
    comp.daybtnid = window.crypto.getRandomValues(new Uint32Array(1))[0] + '_dayid';
    expect(comp.daybtnid).toBeDefined();
    comp.weekbtnid = window.crypto.getRandomValues(new Uint32Array(1))[0] + '_weekid';
    expect(comp.weekbtnid).toBeDefined();
    comp.monthbtnid = window.crypto.getRandomValues(new Uint32Array(1))[0] + '_monthid';
    expect(comp.monthbtnid).toBeDefined();
    comp.yearbtnid = window.crypto.getRandomValues(new Uint32Array(1))[0] + '_yearid';
    expect(comp.yearbtnid).toBeDefined();
  });



  // onMonthEvent method
  it('onMonthEvent() method check', () => {
    let fn = event;
    comp.onMonthEvent(fn);
    comp.onEventClicked.subscribe((g: any) => {
      expect(comp.onEventClicked).toEqual(g);
    });
  });


  // onMonthEvent method
  it('onMoreCloseClick() method check', () => {
    let fn = event;
    comp.onMoreCloseClick(fn);
    comp.onCloseClick.subscribe((g: any) => {
      expect(comp.onCloseClick).toEqual(g);
    });
  });

   // onMoreEventClicked method
   it('onMoreEventClicked() method check', () => {
    let fn = event;
    comp.onMoreEventClicked(fn);
    comp.onMoreEventClick.subscribe((g: any) => {
      expect(comp.onMoreEventClick).toEqual(g);
    });
  });

});
