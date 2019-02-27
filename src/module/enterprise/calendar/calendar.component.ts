import { AmexioDateUtils } from '../../utils/dateutils';

import { CALENDAR } from './calendar.const';
import { CalendarEventModel } from './calendarevent.model';

import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
    selector: 'amexio-calendar',
    templateUrl: './calendar.component.html',
    styleUrls: ['./calendar.component.css', './calendar.common.css'],
})
export class AmexioCalendarComponent implements OnInit {

    displayHeaders: string[] = [];
    calendarMonthData: any[] = [];
    calendarWeekData: any[] = [];
    currrentDate: any;
    currentState: string; // month/week/day

    adu: AmexioDateUtils;

    weekobject: {
        isEvent: boolean, details: null, title: null, hasTimeSlot: boolean,
        eventDateTime: null, events: any[], diff: number, diffwithslot: number,
        eventDetails: any,
    };

    weekHeaders: { title: any, daywiseevent: any, time: any };

    @Input('header-type') headertype: string; // short/full/min

    @Input('events') events: any[];

    @Input('title') title: string;

    @Output('onEventClicked') onEventClicked = new EventEmitter<any>();

    constructor() {
        this.currentState = CALENDAR.MONTH;
        this.headertype = CALENDAR.SHORT;
        this.currrentDate = new Date();
        this.events = [];
        this.adu = new AmexioDateUtils();
        this.weekHeaders = { title: CALENDAR.ALL_DAY_TEXT, daywiseevent: null, time: null };
    }

    ngOnInit() {
        this.initCalendar();
    }

    initCalendar() {
        this.validateEventData();
        this.createData(this.currrentDate);
    }

    private validateEventData() {
        const newEvents: any[] = [];
        this.events.forEach((event: any) => {
            if ((event.start + '').indexOf('T') !== -1) {
                event.hasTimeSlot = true;
            }
            if (event.end) {
                const events1 = this.generatEventData(new Date(event.start), new Date(event.end));
                events1.forEach((event1) => {
                    const newobj = Object.assign({}, event);
                    newobj.start = event1;
                    newEvents.push(newobj);
                });
            }
        });
        newEvents.forEach((event) => {
            this.events.push(event);
        });
    }

    private generatEventData(startDate: any, endDate: any) {
        const event = [];
        let flag = false;
        while (startDate.getTime() <= endDate.getTime()) {
            if (flag) {
                event.push(new Date(startDate.getTime()));
            }
            flag = true;
            startDate.setDate(startDate.getDate() + 1);
        }
        return event;
    }

    private hasEvent(date: any) {
        const eventsData: any[] = [];
        const flag = { isEvent: false };
        if (this.events && this.events.length > 0) {
            this.events.forEach((event: any) => {
                const eventStartDate = new Date(event.start);
                const isEvent = this.adu.isDateEqual(date, eventStartDate);
                if (isEvent) {
                    eventsData.push(new CalendarEventModel(isEvent, event, event.title, event.hasTimeSlot, date, null));
                    flag.isEvent = isEvent;
                }
            });
        }
        flag['events'] = eventsData;
        return flag;
    }

    private createData(selectedPeriod: any) {
        if (this.currentState === CALENDAR.MONTH) {
            this.displayHeaders = CALENDAR.DAY_NAME[this.headertype];
            this.createDaysForCurrentMonths(selectedPeriod);
        } else if (this.currentState === CALENDAR.WEEK || this.currentState === CALENDAR.DAY) {
            let weekDays = [];
            if (this.currentState === CALENDAR.WEEK) {
                weekDays = this.adu.createDaysForWeek(selectedPeriod, this.currrentDate);
            } else {
                weekDays = [];
                weekDays.push(new Date(this.currrentDate.getTime()));
            }
            this.displayHeaders = weekDays;
            this.createDaysForCurrentWeek(selectedPeriod);
        }
    }

    private createDaysForCurrentMonths(selectedPeriod: any) {
        this.calendarMonthData = [];
        const monthData: any[] = this.adu.createDaysForMonths(selectedPeriod, this.currrentDate);
        monthData.forEach((week: any[]) => {
            const rowDays: any[] = [];
            week.forEach((day) => {
                const eventDetails = this.hasEvent(day.date);
                if (eventDetails && eventDetails.isEvent) {
                    day.eventDetails = eventDetails;
                    day.isEvent = eventDetails.isEvent;

                }
                rowDays.push(day);
            });
            this.calendarMonthData.push(rowDays);
        });
    }

    private createDaysForCurrentWeek(selectedPeriod: any) {
        this.calendarWeekData = [];

        const allday = Object.assign({}, this.weekHeaders);
        allday.daywiseevent = [];
        this.displayHeaders.forEach((date: any) => {
            const eventDetails1 = this.hasWeekEvent(date, true);
            const weekobj = Object.assign({}, this.weekobject);
            weekobj.title = eventDetails1.title;
            weekobj.eventDateTime = date;
            weekobj.isEvent = eventDetails1.isEvent;
            weekobj.eventDetails = eventDetails1;
            allday.daywiseevent.push(weekobj);
        });
        this.calendarWeekData.push(allday);

        CALENDAR.DAY_TIME_SERIES.forEach((time: any) => {
            const dateTime = new Date();
            dateTime.setHours(time.hr, time.min);
            const daywiseevent: any[] = [];
            const timeDataDayWise = { title: time.hr + ':' + time.min, time: dateTime };
            this.displayHeaders.forEach((day: any) => {
                const dateTime1 = new Date(day.getTime());
                dateTime1.setHours(time.hr, time.min, 0);
                const eventDetails1 = this.hasWeekEvent(dateTime1, false);
                const weekobj = {
                    title: eventDetails1.title, eventdatetime: dateTime1,
                    isEvent: eventDetails1.isEvent, eventDetails: eventDetails1,
                };
                daywiseevent.push(weekobj);
            });
            timeDataDayWise['daywiseevent'] = daywiseevent;
            this.calendarWeekData.push(timeDataDayWise);
        });
    }

    private hasWeekEvent(wsd: any, wholeday: boolean) {
        const adu = new AmexioDateUtils();
        const weekDateSlotStart = adu.getDateWithSecondsZero(wsd.getTime());
        const weekDateSlotEnd = adu.getDateWithSecondsZero(weekDateSlotStart.getTime());
        weekDateSlotEnd.setHours(weekDateSlotEnd.getHours(), 59);
        const weekEventObject = Object.assign({}, this.weekobject);
        if (this.events && this.events.length > 0) {
            this.events.forEach((event: any) => {
                const eventStartDate = adu.getDateWithSecondsZero(new Date(event.start).getTime());
                const isEvent = this.isEventPresent(event, wholeday, eventStartDate, weekDateSlotEnd, weekDateSlotStart);
                if (event.hasTimeSlot && !wholeday && event.end && isEvent) {
                    const eventEndDate = adu.getDateWithSecondsZero(new Date(event.end).getTime());
                    weekEventObject.diff = ((eventEndDate.getTime() - eventStartDate.getTime()) / 1000) / 60;
                    weekEventObject.diffwithslot = ((eventStartDate.getTime() - weekDateSlotStart.getTime()) / 1000) / 60;
                }
                if (isEvent && !weekEventObject.isEvent) {
                    weekEventObject.hasTimeSlot = event.hasTimeSlot;
                    weekEventObject.eventDateTime = eventStartDate;
                    weekEventObject.isEvent = isEvent;
                    weekEventObject.details = event;
                    weekEventObject.title = event.title;
                }

            });
        }

        return weekEventObject;
    }

    private isEventPresent(event: any, wholeday: boolean, eventStartDate: any, weekDateSlotEnd: any, weekDateSlotStart: any) {
        let isEvent = false;
        if (event.hasTimeSlot && !wholeday) {
            if (event.end) {
                isEvent = ((weekDateSlotEnd.getTime() > eventStartDate.getTime())
                    && (eventStartDate.getTime() >= weekDateSlotStart.getTime()));
            }
        } else if (wholeday && !event.hasTimeSlot) {
            isEvent = new AmexioDateUtils().isDateEqual(eventStartDate, weekDateSlotStart);
        }
        return isEvent;
    }

    private getWeekObject(event: any, eventDateTime: any, isEvent: boolean, diff: number, diffwithslot: number): any {
        const flag = Object.assign({}, this.weekobject);
        flag.hasTimeSlot = event.hasTimeSlot;
        flag.eventDateTime = eventDateTime;
        flag.isEvent = isEvent;
        flag.details = event;
        flag.title = event.title;
        flag.diff = diff;
        flag.diffwithslot = diff;
        return flag;
    }

    setState(state: string) {
        this.currentState = state;
        this.currrentDate = new Date();
        this.createData(this.currrentDate);
        this.currrentDate = new Date();
    }

    previous() {
        let newDate = new Date(this.currrentDate.getTime());
        if (this.currentState === CALENDAR.MONTH) {
            newDate.setMonth(newDate.getMonth() - 1);
        } else if (this.currentState === CALENDAR.WEEK) {
            newDate = this.adu.getPrevSunday(newDate);
        } else if (this.currentState === CALENDAR.DAY) {
            newDate.setDate(newDate.getDate() - 1);
        }
        this.currrentDate = new Date(newDate);
        this.createData(this.currrentDate);
    }

    next() {
        let newDate = new Date(this.currrentDate.getTime());
        if (this.currentState === CALENDAR.MONTH) {
            newDate.setMonth(newDate.getMonth() + 1);
        } else if (this.currentState === CALENDAR.WEEK) {
            newDate = this.adu.getNextSunday(newDate);
        } else if (this.currentState === CALENDAR.DAY) {
            newDate.setDate(newDate.getDate() + 1);
        }
        this.currrentDate = new Date(newDate);
        this.createData(this.currrentDate);
    }

    onMonthEvent(event: any) {
        this.onEventClicked.emit(event);
    }

    onDayTimeWiseEvent(event: any) {
        this.onEventClicked.emit(event);
    }
}
