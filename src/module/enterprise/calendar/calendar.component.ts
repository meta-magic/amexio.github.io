import { CALENDAR } from './calendar.const';
import { CalendarEventModel } from './calendarevent.model';

import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { AmexioDateUtils } from '../../utils/dateutils';

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
    _calenadrDate: any;
    prevMonthPressed = false;
    nextMonthPressed = false;
    dayPressed = false;
    weekPressed = false;
    monthPressed = false;
    yearPressed = false;

    adu: AmexioDateUtils;

    weekobject: {
        isEvent: boolean, details: null, title: null, hasTimeSlot: boolean,
        eventDateTime: null, events: any[], diff: number, diffwithslot: number,
        eventDetails: any,
    };

    weekHeaders: { title: any, daywiseevent: any, time: any };
    prevbtnid: any;
    nextbtnid: any;
    daybtnid: any;
    weekbtnid: any;
    monthbtnid: any;
    yearbtnid: any;
    @Input('header-type') headertype: string; // short/full/min

    @Input('events') events: any[];

    @Input('title') title: string;

    @Input('calendar-date')
    set calendardate(v: any) {
        if (v != null) {
            try {
                this._calenadrDate = v;
                this.currrentDate = new Date(v);
            } catch (e) {
                this.currrentDate = new Date();
            }
        }
    }

    get calendardate() {
        return this._calenadrDate;
    }
    @Input('event-color-grouping') eventColorGrouping: boolean;

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
        this.prevbtnid = Math.floor(Math.random() * 90000) + 10000 + '_previd';
        this.nextbtnid = Math.floor(Math.random() * 90000) + 10000 + '_nextid';
        this.daybtnid = Math.floor(Math.random() * 90000) + 10000 + '_dayid';
        this.weekbtnid = Math.floor(Math.random() * 90000) + 10000 + '_weekid';
        this.monthbtnid = Math.floor(Math.random() * 90000) + 10000 + '_monthid';
        this.yearbtnid = Math.floor(Math.random() * 90000) + 10000 + '_yearid';
    }

    private validateEventData() {
        const newEvents: any[] = [];
        let i = 1;
        this.events.forEach((event: any) => {
            if ((event.start + '').indexOf('T') !== -1) {
                event.hasTimeSlot = true;
            }
            if (i > 9) {
                i = 1;
            }
            if (this.eventColorGrouping) {
                event['eventclass'] = 'calendar-active-' + i;
            }
            if (event.end) {
                const events1 = this.generatEventData(new Date(event.start), new Date(event.end));
                events1.forEach((event1) => {
                    const newobj = Object.assign({}, event);
                    newobj.start = event1;
                    newEvents.push(newobj);
                });
            }
            i++;
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
            this.calendarMonthData = this.createDaysForCurrentMonths(selectedPeriod, this.currrentDate);
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
        } else if (this.currentState === CALENDAR.YEAR) {
            this.displayHeaders = CALENDAR.DAY_NAME[CALENDAR.SHORT];
            this.calendarMonthData = this.createYearData();
        }
    }

    private createYearData(): any[] {
        const yearData = [];
        const year = this.currrentDate.getUTCFullYear();
        const months = CALENDAR.MONTH_NAME[CALENDAR.FULL];
        for (let i = 0; i < months.length; i++) {
            const monthDate = new Date(year, i, 1);
            const monthData1 = this.createDaysForCurrentMonths(monthDate, new Date());
            yearData.push(Object.assign({}, { month: monthDate, title: months[i], data: monthData1 }));
        }
        return yearData;
    }

    private createDaysForCurrentMonths(selectedPeriod: any, currrentDate: any): any[] {
        const calendarMonthData: any[] = [];
        const monthData: any[] = this.adu.createDaysForMonths(selectedPeriod, currrentDate);
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
            calendarMonthData.push(rowDays);
        });
        return calendarMonthData;
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
                    weekEventObject.diff = (((eventEndDate.getTime() - eventStartDate.getTime())
                        - (86400000 * Math.floor((eventEndDate - eventStartDate) / 86400000))) / 1000) / 60;
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
        this.dayPressed = false;
        this.weekPressed = false;
        this.yearPressed = false;
        this.monthPressed = false;
        if (state === 'day') {
            this.dayPressed = true;

        } else if (state === 'week') {
            this.weekPressed = true;

        } else if (state === 'month') {
            this.monthPressed = true;
        } else if (state === 'year') {
            this.yearPressed = true;
        }
        this.currentState = state;
        this.currrentDate = new Date();
        this.createData(this.currrentDate);
        this.currrentDate = new Date();
    }

    previous() {
        this.prevMonthPressed = true;
        let newDate = new Date(this.currrentDate.getTime());
        if (this.currentState === CALENDAR.MONTH) {
            newDate.setMonth(newDate.getMonth() - 1);
        } else if (this.currentState === CALENDAR.WEEK) {
            newDate = this.adu.getPrevSunday(newDate);
        } else if (this.currentState === CALENDAR.DAY) {
            newDate.setDate(newDate.getDate() - 1);
        } else if (this.currentState === CALENDAR.YEAR) {
            newDate.setUTCFullYear(newDate.getUTCFullYear() - 1);
        }
        this.currrentDate = new Date(newDate);
        this.createData(this.currrentDate);
    }

    next() {
        this.nextMonthPressed = true;
        let newDate = new Date(this.currrentDate.getTime());
        if (this.currentState === CALENDAR.MONTH) {
            newDate.setMonth(newDate.getMonth() + 1);
        } else if (this.currentState === CALENDAR.WEEK) {
            newDate = this.adu.getNextSunday(newDate);
        } else if (this.currentState === CALENDAR.DAY) {
            newDate.setDate(newDate.getDate() + 1);
        } else if (this.currentState === CALENDAR.YEAR) {
            newDate.setUTCFullYear(newDate.getUTCFullYear() + 1);
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

    onYearEvent(event: any) {
        this.navigateToDayMode(event.this.date);
    }

    onDaytimeHeaderClick(event: any) {
        if (this.currentState === CALENDAR.WEEK) {
            this.navigateToDayMode(event);
        }
    }

    onYearHeaderClicked(event: any) {
        this.currrentDate = new Date(event.month);
        this.currentState = CALENDAR.MONTH;
        this.createData(this.currrentDate);
    }

    navigateToDayMode(date: any) {
        this.currentState = CALENDAR.DAY;
        this.currrentDate = new Date(date);
        this.createData(this.currrentDate);
    }

}
