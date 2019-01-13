
import { Component, EventEmitter, Input, Output } from '@angular/core';

import { AvailableSlotsModel } from '../../../models/availableslots.model';
import { DayModel } from '../../../models/day.model';
import { TimeUtil } from '../../../models/time.util';

@Component({
    selector: 'amexio-ee-week-daytime-availiblity',
    templateUrl: './weekdaytime.component.html',
    styleUrls: ['./weekdaytime.component.css'],
})
export class AmexioWeekDayAvailiblityComponent {

    currentDate: Date;

    datesavailable: AvailableSlotsModel[];

    viewData: DayModel[];

    @Input('height') height = 'auto';

    @Input('start-time') startTime: number;

    @Input('end-time') endTime: number;

    @Input('date')
    set date(v: Date) {
        if (v != null && v) {
            this.currentDate = new Date(v.getTime());
            this.initComponent();
        }
    }

    get date(): Date {
        return this.currentDate;
    }

    @Input('available-slots')
    set availableslots(v: AvailableSlotsModel[]) {
        if (v != null && v) {
            this.datesavailable = v;
            this.initComponent();
        }
    }

    get availableslots(): AvailableSlotsModel[] {
        return this.datesavailable;
    }

    @Output() onSelection: EventEmitter<any> = new EventEmitter<any>();

    constructor() {

    }

    onTimeClick(event1: any, dayModel1: DayModel, time1: any) {
        if (time1 && time1.available) {
            this.onSelection.emit({ event: event1, day: dayModel1, time: time1 });
        }
    }

    private initComponent() {
        if (this.currentDate) {
            this.viewData = [];
            let startDate = this.getMonday(this.currentDate);
            const d1 = new DayModel(new Date(startDate.getTime()), true, this.availableslots);
            d1.setTimeSlots(new TimeUtil().timeData(true));
            this.viewData.push(d1);
            for (let i = 1; i < 7; i++) {
                const wdate = this.createWeekDays(startDate, i);
                const d2 = new DayModel(new Date(wdate.getTime()), true, this.availableslots);
                d2.setTimeSlots(new TimeUtil().timeData(true));
                this.viewData.push(d2);
                startDate = wdate;
            }
        }

    }

    private createWeekDays(date: Date, count: number) {
        date.setHours(date.getHours() + 24);
        return date;
    }

    private getMonday(date: Date) {
        if (date) {
            const day = date.getDay() || 7;
            if (day !== 1) {
                date.setHours(-24 * (day - 1));
            }
        }
        return date;
    }
}
