
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DisplayFieldComponent } from '../../base/display-field/display-field.component';
import { CommonIconComponent } from '../../base/components/common.icon.component';
import { AmexioCalendarDayTimeWiseComponent } from './calendar.daytimewise.component';
import { AmexioCalendarMonthComponent } from './calendar.month';
import { AmexioCalendarYearComponent } from './calendar.year.component';
import { AmexioLayoutComponent } from '../../layout/basiclayout/layout.component';
import { AmexioLayoutItemComponent } from '../../layout/basiclayout/layoutitem.component';
import { AmexioFloatingPanelComponent } from '../../panes/floatingpanel/floatingpanel.component';
import { AmexioLabelComponent } from '../../forms/label/label.component';
describe('amexio-calender-month', () => {
  let compInstance: AmexioCalendarMonthComponent;
  let fixture : ComponentFixture < AmexioCalendarMonthComponent >;
    beforeEach(() => {
      TestBed.configureTestingModule({
        declarations: [
          AmexioCalendarMonthComponent, DisplayFieldComponent,
        CommonIconComponent, AmexioLayoutComponent,
        AmexioLayoutItemComponent, AmexioFloatingPanelComponent,
        AmexioCalendarDayTimeWiseComponent,
        AmexioCalendarYearComponent,
        AmexioLabelComponent
        ],
      });

      // create component and test fixture
      fixture = TestBed.createComponent(AmexioCalendarMonthComponent);

      // get test component from the fixture
      compInstance = fixture.componentInstance;

      compInstance.calendaryData = [
        [
          {
            date: new Date(),
            eventDetails: {
              isEvent: true,
              events: {
                isEvent: true,
                details: {
                  title: 'Java Conference',
                  end: new Date(),
                  eventclass: 'calendar-active-3',
                  hasTimeSlot: true,
                  people: [{ personName: 'Priyanka Gokhale' }, { personName: 'Seema Rai' }],
                  phone: '020-23456789',
                  start: new Date(),
                  url: 'meet.google.com/izm-pooa-gns',
                },
                title: 'Java Workshop',
                hasTimeSlot: true,
                eventDateTime: new Date(),
                events: null,
                fpFlag: false,
              },
            },
            id: '59460_monthid',
            isActive: false,
            isActivePeriod: true,
            isDisabled: false,
            isEvent: true,
            selected: false,
          },
        ],
      ];

    });
    
  it('should have a defined component', () => {
    console.log(compInstance);
  });

  it('onMoreClicked',() => {
    expect(compInstance.calendaryData).not.toBeNull();
    compInstance.calendaryData.forEach((calendarRow: any) => {
      calendarRow.forEach((day: any) => {
        expect(day.eventDetails).not.toBeNull();
        day.eventDetails.events.fpFlag = true;
      });
    });
    const data = { fpFlag: true };
    compInstance.onMoreClicked(data);
    expect(data.fpFlag).toEqual(true);
    expect(compInstance.openFloatingPanel).toEqual(true);
  });

  it(' onCloseClick event', () => {
    let dummyData = {
      data: {
        fpFlag: false,
      },
    };

    compInstance.onCloseClicked.subscribe((value:any) => dummyData = value);

    compInstance.onCloseClick(dummyData);

    expect(dummyData.data.fpFlag).toBe(false);
  });


  it(' onChipClick event', () => {
    const event1 = { pageX: 'page' };
    const runtimeDiv1: any = 'b';
    let emitEvent = {
      event: event1, item: {}, this: this, runtimeDiv: runtimeDiv1,
    };
    compInstance.xValue = event1.pageX;

    compInstance.onMoreEventClicked.subscribe((value: any) => emitEvent = value);

    compInstance.onChipClick(event1, {}, runtimeDiv1);

    expect(emitEvent.event).toBe(event1);
    expect(emitEvent.runtimeDiv).toBe(runtimeDiv1);
  });

});