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
import { By } from '@angular/platform-browser';
import { Renderer2 } from '@angular/core';
// import { DummyComponent } from '../../../../tmp/module/enterprise/calendar/calendar.month.spec';


class DummyComponent {

}

describe('amexio-calendar-month', () => {
  let comp: AmexioCalendarMonthComponent;
  let fixture: ComponentFixture<AmexioCalendarMonthComponent>;
  const rendererMock = jasmine.createSpyObj('rendererMock', ['addClass', 'setStyle']);

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [FormsModule, HttpClientModule],
      declarations: [
        AmexioCalendarMonthComponent, DisplayFieldComponent,
        CommonIconComponent, AmexioLayoutComponent,
        AmexioLayoutItemComponent, AmexioFloatingPanelComponent,
        AmexioCalendarDayTimeWiseComponent,
        AmexioCalendarYearComponent,
        AmexioLabelComponent
      ],
      providers: [IconLoaderService, CommonDataService, { provide: Renderer2, useValue: rendererMock }],
    });
    fixture = TestBed.createComponent(AmexioCalendarMonthComponent);
    comp = fixture.componentInstance;
    event = jasmine.createSpyObj('event', ['preventDefault', 'stopPropagation']);
    comp.calendaryData = [
      [
        {
          date: new Date(), eventDetails: {
            isEvent: true,
            events: [{
              isEvent: true,
              details: {
                title: "Java Conference",
                end: new Date(),
                eventclass: "calendar-active-3",
                hasTimeSlot: true,
                people: [{ personName: "Priyanka Gokhale" }, { personName: "Seema Rai" }],
                phone: "020-23456789",
                start: new Date(),
                url: "meet.google.com/izm-pooa-gns"
              }, title: "Java Workshop", hasTimeSlot: true, eventDateTime: new Date(), events: null, fpFlag: false
            }],

          }, id: "59460_monthid", isActive: false, isActivePeriod: true, isDisabled: false, isEvent: true, selected: false
        }
      ],
      [
        {
          date: new Date(), eventDetails: {
            isEvent: true,
            events: [{
              isEvent: true,
              details: {
                title: "Java Conference",
                end: new Date(),
                eventclass: "calendar-active-3",
                hasTimeSlot: true,
                people: [{ personName: "Priyanka Gokhale" }, { personName: "Seema Rai" }],
                phone: "020-23456789",
                start: new Date(),
                url: "meet.google.com/izm-pooa-gns"
              }, title: "Java Workshop", hasTimeSlot: true, eventDateTime: new Date(), events: null, fpFlag: false
            }],

          }, id: "59460_monthid", isActive: false, isActivePeriod: true, isDisabled: false, isEvent: true, selected: false
        },
        {
          date: new Date(), eventDetails: {
            isEvent: true,
            events: [{
              isEvent: true,
              details: {
                title: "Java Conference",
                end: new Date(),
                eventclass: "calendar-active-3",
                hasTimeSlot: true,
                people: [{ personName: "Priyanka Gokhale" }, { personName: "Seema Rai" }],
                phone: "020-23456789",
                start: new Date(),
                url: "meet.google.com/izm-pooa-gns"
              }, title: "Java Workshop", hasTimeSlot: true, eventDateTime: new Date(), events: null, fpFlag: false
            }],

          }, id: "59460_monthid", isActive: false, isActivePeriod: true, isDisabled: false, isEvent: true, selected: false
        },
        {
          date: new Date(), eventDetails: {
            isEvent: true,
            events: [{
              isEvent: true,
              details: {
                title: "Java Conference",
                end: new Date(),
                eventclass: "calendar-active-3",
                hasTimeSlot: true,
                people: [{ personName: "Priyanka Gokhale" }, { personName: "Seema Rai" }],
                phone: "020-23456789",
                start: new Date(),
                url: "meet.google.com/izm-pooa-gns"
              }, title: "Java Workshop", hasTimeSlot: true, eventDateTime: new Date(), events: null, fpFlag: false
            }],

          }, id: "59460_monthid", isActive: false, isActivePeriod: true, isDisabled: false, isEvent: true, selected: false
        }
      ],
      [
        {
          date: new Date(), eventDetails: {
            isEvent: true,
            events: [{
              isEvent: true,
              details: {
                title: "Java Conference",
                end: new Date(),
                eventclass: "calendar-active-3",
                hasTimeSlot: true,
                people: [{ personName: "Priyanka Gokhale" }, { personName: "Seema Rai" }],
                phone: "020-23456789",
                start: new Date(),
                url: "meet.google.com/izm-pooa-gns"
              }, title: "Java Workshop", hasTimeSlot: true, eventDateTime: new Date(), events: null, fpFlag: false
            }],

          }, id: "59460_monthid", isActive: false, isActivePeriod: true, isDisabled: false, isEvent: true, selected: false
        },
        {
          date: new Date(), eventDetails: {
            isEvent: true,
            events: [{
              isEvent: true,
              details: {
                title: "Java Conference",
                end: new Date(),
                eventclass: "calendar-active-3",
                hasTimeSlot: true,
                people: [{ personName: "Priyanka Gokhale" }, { personName: "Seema Rai" }],
                phone: "020-23456789",
                start: new Date(),
                url: "meet.google.com/izm-pooa-gns"
              }, title: "Java Workshop", hasTimeSlot: true, eventDateTime: new Date(), events: null, fpFlag: false
            }],

          }, id: "59460_monthid", isActive: false, isActivePeriod: true, isDisabled: false, isEvent: true, selected: false
        },
        {
          date: new Date(), eventDetails: {
            isEvent: true,
            events: [{
              isEvent: true,
              details: {
                title: "Java Conference",
                end: new Date(),
                eventclass: "calendar-active-3",
                hasTimeSlot: true,
                people: [{ personName: "Priyanka Gokhale" }, { personName: "Seema Rai" }],
                phone: "020-23456789",
                start: new Date(),
                url: "meet.google.com/izm-pooa-gns"
              }, title: "Java Workshop", hasTimeSlot: true, eventDateTime: new Date(), events: null, fpFlag: false
            }],

          }, id: "59460_monthid", isActive: false, isActivePeriod: true, isDisabled: false, isEvent: true, selected: false
        }
      ]

    ];

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
    expect(comp.focusrindex).toEqual(rowindex - 1);
    expect(comp.focusiindex).toEqual(calendarrow.length - 1);

    innerindex = 3;
    comp.focusiindex = 2;
    comp.refactoredleftday(rowindex, innerindex, calendarrow);
    expect(innerindex).toBe(3);
    expect(comp.focusrindex).toEqual(rowindex);
    expect(comp.focusiindex).toEqual(innerindex - 1);
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
      if (index == 2) {
        expect(day).toEqual(index);
        dayname = element;
      }
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
      if (index == 6) {
        expect(datemonth).toEqual(index);
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
    comp.formatAMPM(date);
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
    let event1 = { data: { fpFlag: false } }
    comp.onCloseClick(event1);
    event1.data.fpFlag = false;
    comp.onCloseClicked.emit(event);
  });

  it('onChipClick()', () => {
    let item: any = 'a';
    let runtimeDiv: any = 'b';
    let event1 = { pageX: 'page' }
    const emitEvent = {};
    emitEvent['event'] = event;
    emitEvent['item'] = item;
    emitEvent['this'] = this;
    emitEvent['runtimeDiv'] = runtimeDiv;
    comp.xValue = event1.pageX;
    comp.onChipClick(event1, item, runtimeDiv);
    //  emitEvent = {};
    emitEvent['event'] = event;
    emitEvent['item'] = item;
    emitEvent['this'] = this;
    emitEvent['runtimeDiv'] = runtimeDiv;
    comp.xValue = event1.pageX;
    // comp.onMoreEventClicked.emit(emitEvent);
  });
  it('onMoreClicked() else block', () => {
    let data = [
      {
        detais: { title: "Java Conference", end: new Date(), eventclass: "calendar-active-3", hasTimeSlot: true, people: [{ personName: "Priyanka Gokhale" }, { personName: "Seema Rai" }], phone: "020-23456789", start: new Date(), url: "meet.google.com/izm-pooa-gns" },
        eventDateTime: new Date(),
        events: '',
        hasTimeSlot: true,
        isEvent: true,
        title: "Java Conference"
      },
      {
        detais: { title: "Angular Conference", end: new Date(), eventclass: "calendar-active-4", hasTimeSlot: true, people: [{ personName: "Arun jain" }, { personName: "Raj Rai" }], phone: "020-23456788", start: new Date(), url: "meet.google.com/izm-pooa-gns" },
        eventDateTime: new Date(),
        events: null,
        hasTimeSlot: true,
        isEvent: true,
        title: "Angular Conference"
      },
      {
        detais: { title: "Android Conference", end: new Date(), eventclass: "calendar-active-4", hasTimeSlot: true, people: [{ personName: "Arun jain" }, { personName: "Raj Rai" }], phone: "020-23456788", start: new Date(), url: "meet.google.com/izm-pooa-gns" },
        eventDateTime: new Date(),
        events: null,
        hasTimeSlot: true,
        isEvent: true,
        title: "Android Conference"
      },
      {
        detais: { title: "IOS Conference", end: new Date(), eventclass: "calendar-active-4", hasTimeSlot: true, people: [{ personName: "Arun jain" }, { personName: "Raj Rai" }], phone: "020-23456788", start: new Date(), url: "meet.google.com/izm-pooa-gns" },
        eventDateTime: new Date(),
        events: null,
        hasTimeSlot: true,
        isEvent: true,
        title: "IOS Conference"
      }
    ];
    comp.onMoreClicked(event);

    comp.calendaryData = undefined;
    expect(comp.calendaryData).toBeUndefined();
    data['fpFlag'] = true;
    comp.openFloatingPanel = true;
  });
  it('onMoreClicked() if condition for calendaryData', () => {
    let data = [
      {
        detais: { title: "Java Conference", end: new Date(), eventclass: "calendar-active-3", hasTimeSlot: true, people: [{ personName: "Priyanka Gokhale" }, { personName: "Seema Rai" }], phone: "020-23456789", start: new Date(), url: "meet.google.com/izm-pooa-gns" },

        eventDateTime: new Date(),
        events: '',
        hasTimeSlot: true,
        isEvent: true,
        title: "Java Conference"
      },
      {
        detais: { title: "Angular Conference", end: new Date(), eventclass: "calendar-active-4", hasTimeSlot: true, people: [{ personName: "Arun jain" }, { personName: "Raj Rai" }], phone: "020-23456788", start: new Date(), url: "meet.google.com/izm-pooa-gns" },

        eventDateTime: new Date(),
        events: null,
        hasTimeSlot: true,
        isEvent: true,
        title: "Angular Conference"
      },
      {
        detais: { title: "Android Conference", end: new Date(), eventclass: "calendar-active-4", hasTimeSlot: true, people: [{ personName: "Arun jain" }, { personName: "Raj Rai" }], phone: "020-23456788", start: new Date(), url: "meet.google.com/izm-pooa-gns" },

        eventDateTime: new Date(),
        events: null,
        hasTimeSlot: true,
        isEvent: true,
        title: "Android Conference"
      },
      {
        detais: { title: "IOS Conference", end: new Date(), eventclass: "calendar-active-4", hasTimeSlot: true, people: [{ personName: "Arun jain" }, { personName: "Raj Rai" }], phone: "020-23456788", start: new Date(), url: "meet.google.com/izm-pooa-gns" },

        eventDateTime: new Date(),
        events: null,
        hasTimeSlot: true,
        isEvent: true,
        title: "IOS Conference"
      }
    ];
    comp.calendaryData = [
      [
        {
          date: new Date(), eventDetails: {
            isEvent: true,
            events: [{
              isEvent: true,
              details: {
                title: "Java Conference",
                end: new Date(),
                eventclass: "calendar-active-3",
                hasTimeSlot: true,
                people: [{ personName: "Priyanka Gokhale" }, { personName: "Seema Rai" }],
                phone: "020-23456789",
                start: new Date(),
                url: "meet.google.com/izm-pooa-gns"
              }, title: "Java Workshop", hasTimeSlot: true, eventDateTime: new Date(), events: null, fpFlag: false
            }],

          }, id: "59460_monthid", isActive: false, isActivePeriod: true, isDisabled: false, isEvent: true, selected: false
        }
      ]
    ];

    comp.onMoreClicked(event);

    expect(comp.calendaryData).toBeDefined();
    comp.calendaryData.forEach((calendarRow) => {
      calendarRow.forEach((day: any) => {
        // if (day.eventDetails) {
        expect(day.eventDetails).toBeDefined();
        day.eventDetails.events.fpFlag = false;
      });
    });
    data['fpFlag'] = true;
    comp.openFloatingPanel = true;
  });

  it('onMoreClicked() if condition for day.eventDetails', () => {
    let data = [
      {
        detais: { title: "Java Conference", end: new Date(), eventclass: "calendar-active-3", hasTimeSlot: true, people: [{ personName: "Priyanka Gokhale" }, { personName: "Seema Rai" }], phone: "020-23456789", start: new Date(), url: "meet.google.com/izm-pooa-gns" },

        eventDateTime: new Date(),
        events: '',
        hasTimeSlot: true,
        isEvent: true,
        title: "Java Conference"
      },
      {
        detais: { title: "Angular Conference", end: new Date(), eventclass: "calendar-active-4", hasTimeSlot: true, people: [{ personName: "Arun jain" }, { personName: "Raj Rai" }], phone: "020-23456788", start: new Date(), url: "meet.google.com/izm-pooa-gns" },

        eventDateTime: new Date(),
        events: null,
        hasTimeSlot: true,
        isEvent: true,
        title: "Angular Conference"
      },
      {
        detais: { title: "Android Conference", end: new Date(), eventclass: "calendar-active-4", hasTimeSlot: true, people: [{ personName: "Arun jain" }, { personName: "Raj Rai" }], phone: "020-23456788", start: new Date(), url: "meet.google.com/izm-pooa-gns" },

        eventDateTime: new Date(),
        events: null,
        hasTimeSlot: true,
        isEvent: true,
        title: "Android Conference"
      },
      {
        detais: { title: "IOS Conference", end: new Date(), eventclass: "calendar-active-4", hasTimeSlot: true, people: [{ personName: "Arun jain" }, { personName: "Raj Rai" }], phone: "020-23456788", start: new Date(), url: "meet.google.com/izm-pooa-gns" },

        eventDateTime: new Date(),
        events: null,
        hasTimeSlot: true,
        isEvent: true,
        title: "IOS Conference"
      }
    ];
    comp.calendaryData = [
      [
        {
          date: new Date(),
          id: "59460_monthid", isActive: false, isActivePeriod: true, isDisabled: false, isEvent: true, selected: false
        }
      ]
    ];

    comp.onMoreClicked(event);

    expect(comp.calendaryData).toBeDefined();
    comp.calendaryData.forEach((calendarRow) => {
      calendarRow.forEach((day: any) => {
        expect(day.eventDetails).toBeUndefined();
      });
    });
    data['fpFlag'] = true;
    comp.openFloatingPanel = true;
  });


  it('ondatefocus()', () => {
    let day = {
      eventDetails: {
        isEvent: true,
        events: [{
          isEvent: true,
          details: {
            title: "Java Conference",
            end: new Date(),
            eventclass: "calendar-active-3",
            hasTimeSlot: true,
            people: [{ personName: "Priyanka Gokhale" }, { personName: "Seema Rai" }],
            phone: "020-23456789",
            start: new Date(),
            url: "meet.google.com/izm-pooa-gns"
          }, title: "Java Workshop", hasTimeSlot: true, eventDateTime: new Date(),
          events: [{}], fpFlag: false
        }],

      }, date: new Date()
    }
    comp.ondatefocus(day);

    expect(day.eventDetails).toBeDefined();
    expect(day.eventDetails).not.toBeNull();
    day.eventDetails.events.forEach((scheduledevent: any, index: number) => {
      expect(index).toEqual(0)
      comp.ariadatalabel = comp.receiveDateFormat(day.date);
      comp.ariadatalabel = comp.ariadatalabel + scheduledevent.details.title +
        ' event scheduled ' +
        comp.formatAMPM(new Date(scheduledevent.details.start)) +
        ' to ' +
        comp.formatAMPM(new Date(scheduledevent.details.end));
      comp.ariadatalabel = comp.receiveDateFormat(day.date) + ' no events scheduled';

    });

  });


  it('addDynamicClass()', () => {
    let calculatedWidth = 140;
    let cssClass = 'rightPositionPanel';
    let nextSiblingElement = document.createElement('app-events-panel');
    comp.nativeRuntimeDiv = {};
    comp.nativeRuntimeDiv['element'] = {};
    comp.nativeRuntimeDiv.element =
      {
        'nativeElement': {
          'nextElementSibling': nextSiblingElement
        }
      }
    comp.nativeRuntimeDiv['element'] = {
      'nativeElement': {
        'nextElementSibling': nextSiblingElement
      }
    }
    comp.addDynamicClass(calculatedWidth, nextSiblingElement, cssClass);
    comp.widthPosition = calculatedWidth + 'px';
    rendererMock.addClass(nextSiblingElement, cssClass);
    rendererMock.setStyle(nextSiblingElement, 'left', comp.widthPosition);
    rendererMock.setStyle(comp.nativeRuntimeDiv.element.nativeElement.nextElementSibling, 'visibility', 'visible');

  });



  // it('nextrightday()', () => {
  //   let day = { id: "59460_monthid" };
  //   comp.nextrightday(day);
  //   let focusrowindex: number;
  //   let focusinnerindex: number;
  //   comp.calendaryData.forEach((calendarrow: any, rowindex: number) => {
  //     calendarrow.forEach((calendardata: any, innerindex: number) => {
  //       // if (day.id === calendardata.id) { 
  //         if(rowindex == 0 && innerindex == 0) {
  //       expect(day.id).toEqual(calendardata.id)
  //       //  if ((calendarrow.length - 1) === innerindex) {
  //       expect(calendarrow.length - 1).toEqual(innerindex);
  //       focusinnerindex = 0;
  //       focusrowindex = rowindex + 1;}
  //     });
  //   });

  //   const itemid = comp.calendaryData[focusrowindex][focusinnerindex];

  // });

  // it('nextleftday()', () => {
  //   let day = { id: "59460_monthid" };
  //   comp.nextleftday(day);
  //   let focusrowindex: number;
  //   let focusinnerindex: number;
  //   comp.calendaryData.forEach((calendarrow: any, rowindex: number) => {
  //     calendarrow.forEach((individualday: any, innerindex: number) => {
  //       // if (day.id === individualday.id) {
  //       expect(day.id).toEqual(individualday.id)
  //       comp.refactoredleftday(rowindex, innerindex, calendarrow);
  //     });
  //   });
  //   comp.focusrindex = 1;
  //   comp.focusiindex = 0;
  //   const itemid = comp.calendaryData[comp.focusrindex][comp.focusiindex];

  // });

     
  // it('addEventDetails() method check', () => {
  //   comp.nativeRuntimeDiv = [{
  //     element: { nativeElement: { id: 12 } },
  //     createComponent: function () { }
  //   }, {
  //     element: { nativeElement: { id: 12, nextElementSibling: '' } }, createComponent: function () { }
  //   }];
  //   let event1 = {
  //     runtimeDiv: { innerHTML: 'asd', id: 12, event: { clientX: 12, clientY: 34, pageX: '', screenX: '', layerX:'' } }
  //   };     
  //   comp. addEventDetails(DummyComponent, event1);
  //   comp.runTimeInstance = { destroy: function () { } };
  //   // if (this.runTimeInstance) {
  //     expect(comp.runTimeInstance).toBeDefined();
  //     comp.runTimeInstance.destroy();
  //     const id = event1.runtimeDiv.id;
  //     // const runTimeDivs = this.runtimeDiv1.toArray();
  //     comp.runtimeDiv1 = {
  //       toArray: function (): any[] { return [] }
  //     }
  //     const runTimeDivs = comp.runtimeDiv1.toArray();
  //     for (let i = 0; i <= runTimeDivs.length -1; i++) {
  //        expect(runTimeDivs[i].element.nativeElement.id).toEqual(id);
  //      const tpCF = comp['componentFactoryResolver'].resolveComponentFactory(
  //       DummyComponent);
  //       comp.runTimeInstance = runTimeDivs[i].createComponent(tpCF);
  //       comp.nativeRuntimeDiv = runTimeDivs[i];
  //       // comp['renderer']= {data: '', appendChild: '', destroy: function () {  }, createElement: '', createComment: '', createText:'', destroyNode: ''}
  //       // comp['renderer'].setStyle(comp.nativeRuntimeDiv.element.nativeElement.nextElementSibling, 'visibility', 'hidden');
  //       rendererMock.setStyle(comp.nativeRuntimeDiv.element.nativeElement.nextElementSibling, 'visibility', 'hidden');
  //     }
  //  });
});