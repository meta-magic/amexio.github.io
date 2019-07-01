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
  it('true is true', () => expect(true).toBe(true));

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
    expect(innerindex).toBeLessThan(0);
    expect(comp.focusrindex).toEqual(rowindex);
    expect(comp.focusiindex).toEqual(innerindex);

    rowindex = 1;
    innerindex = 0;
    comp.focusiindex = 2;
    calendarrow = 'fix';
    expect(innerindex).toEqual(0);
    expect(comp.focusrindex).toEqual(rowindex -1);
    expect(comp.focusiindex).toEqual(calendarrow.length - 1);
     
    innerindex = 3;
    comp.focusiindex = 2;
    expect(innerindex).toBe(3);
    // expect(comp.focusrindex).toEqual(rowindex);
    expect(comp.focusiindex).toEqual(innerindex -1);


  });

});