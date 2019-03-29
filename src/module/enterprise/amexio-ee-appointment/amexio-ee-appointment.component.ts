
import { Component, EventEmitter, Input, Output} from '@angular/core';
import { AvailableSlotsModel } from './../../../models/availableslots.model';
import { DayModel } from './../../../models/day.model';
import { TimeUtil } from './../../../models/time.util';

@Component({
    selector: 'amexio-ee-appointment',
    templateUrl: './amexio-ee-appointment.component.html',
})
export class AmexioWeekDayAvailiblityComponent {

    currentDate: Date;

    datesavailable: AvailableSlotsModel[];

    ariadateavailable: any = [];

    viewData: DayModel[];

    noOfDaysArray: any = [];

    selectedDays: any = [];

    randomid: any;

    data1: any = [];

    actualtime: string;

    month = ['January', 'Feburary', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

    day = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];

    @Input('height') height = 'auto';

    @Input('start-time') startTime: number;

    @Input('end-time') endTime: number;

    @Input('no-of-days') noOfDays = 7;

    @Input('multi-select') multiSelect = false;

    @Input('available-slots-bg-color') availableSlotsBgColor = '';

    @Input('available-slots-color') availableSlotsColor = '';

    @Input('selected-slot-color') selectedSlotColor = '';

    @Input('selected-slot-bg-color') selectedSlotBgColor = '';

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

    @Output() onSingleSelect: EventEmitter<any> = new EventEmitter<any>();
    @Output() onMultiSelect: EventEmitter<any> = new EventEmitter<any>();

    constructor() {
    }

    onTimeClick(event1: any, dayModel1: DayModel, time1: any) {
        if (time1 && time1.available && this.multiSelect) {
            this.onMultiSelection(dayModel1, time1);
        } else if (time1 && time1.available && !this.multiSelect) {

            this.viewData.forEach((object) => {
                object.timeslots.forEach((element: any) => {
                    if (element === time1) {
                        element.selected = true;
                    } else {
                        element.selected = false;
                    }
                });
            });
            this.onSingleSelect.emit({ date: dayModel1.date, time: time1.time, timeId: time1.timeId });
        }
    }
    onArrowDown(data1: any) {
        this.actualtime = '';
        const tempid = data1.ariaId;
        let slicedid = tempid.slice(6);
        slicedid++;
        const newid = this.randomid + '-' + slicedid;
        document.getElementById(newid).focus();
    }

    readtime(data1: any) {
        const t = parseInt(data1.time, 10);
        const t1 = t % 12;
        if (t1 <= 12) {
            if (t1 === 0) {
                this.actualtime = 12 + ' ' + 'am';
            }else {
                this.actualtime = t1 + ' ' + 'am';
            }
        } else {
            this.actualtime = t1 + ' ' + 'pm';
        }

    }
    onArrowUp(data1: any) {
        const tempid = data1.ariaId;
        let slicedid = tempid.slice(6);
        slicedid--;
        const newid = this.randomid + '-' + slicedid;
        document.getElementById(newid).focus();
    }
    onArrowRight(data1: any) {
        this.onArrowDown(data1);
    }

    onArrowLeft(data1: any) {
        this.onArrowUp(data1);
    }
    getFullMonthName(dayModel1: DayModel) {
        const months = ['January', 'Febuary', 'March', 'April', 'May',
            'June', 'July', 'August', 'September', 'October', 'November', 'December'];
        const datemonth = dayModel1.date.getMonth();
        let monthString = '';
        months.forEach((element: any, index: number) => {
            if (datemonth === index) {
                monthString = element;
            }
        });
        return monthString;
    }
    getFullDayName(dayModel1: DayModel) {
        const weekdays = ['Sunday', 'Monday', 'Tuesday', 'Wednesday',
            'Thursday', 'Friday', 'Saturday'];
        const day = dayModel1.date.getDay();
        let dayname = '';
        weekdays.forEach((element: any, index: number) => {
            if (day === index) {
                dayname = element;
            }
        });
        return dayname;
    }
    gettime() {

    }
    private initComponent() {
        if (this.currentDate) {
            this.viewData = [];
            this.randomid = Math.floor(Math.random() * 90000) + 10000;
            const clonedDate = new Date(this.currentDate.getTime());
            let startDate = clonedDate;
            const d1 = new DayModel(new Date(startDate.getTime()), true, this.availableslots);
            d1.setTimeSlots(this.setStyle(new TimeUtil().timeData(true)));
            d1['fulldate'] = this.getFullDayName(d1) + ' ' + d1.date.getDate() + ' ' + this.getFullMonthName(d1)
            + ' ' + d1.date.getFullYear() + ' ' + d1.date.getUTCHours();
            this.viewData.push(d1);
            this.noOfDaysArray = [];
            for (let i = 0; i < this.noOfDays; i++) {
                this.noOfDaysArray.push(i);
            }
            for (let i = 1; i < this.noOfDays; i++) {
                const wdate = this.createWeekDays(startDate, i);
                const d2 = new DayModel(new Date(wdate.getTime()), true, this.availableslots);
                d2.setTimeSlots(this.setStyle(new TimeUtil().timeData(true)));
                d2['fulldate'] = this.getFullDayName(d2) + ' ' + d2.date.getDate()
                + ' ' + this.getFullMonthName(d2) + ' ' + d2.date.getFullYear() + ' ' + d2.date.getUTCHours();
                this.viewData.push(d2);
                startDate = wdate;
            }
            let inc = 0;
            this.viewData.forEach((element: any) => {
                if (element.availableSlots) {
                    element.timeslots.forEach((data: any) => {
                        if (data.available) {
                            data['ariaId'] = this.randomid + '-' + inc;
                            inc++;
                        }
                    });
                }

            });
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

    onMultiSelection(dayModel1: any, time1: any) {
        dayModel1.timeslots.forEach((obj: any) => {
            if (obj === time1) {
                const selectedAppointDate = {
                    date: dayModel1.date,
                    time: obj.time,
                    timeId: obj.timeId,
                };
                obj.selected = true;
                if (this.selectedDays.length > 0) {
                    this.selectedDays.forEach((item: any, index: number) => {
                        if (item.date === selectedAppointDate.date) {
                            this.selectedDays.splice(index, 1);
                        }
                    });
                    this.selectedDays.push(selectedAppointDate);
                } else {
                    this.selectedDays.push(selectedAppointDate);
                }
            } else {
                obj.selected = false;
            }
        });
        this.onSingleSelect.emit({ date: dayModel1.date, time: time1.time, timeId: time1.timeId });
        this.onMultiSelect.emit(this.selectedDays);
    }

    getAvailableStyle(): any {
        return {
            'background-color': this.availableSlotsBgColor,
            'color': this.availableSlotsColor,
        };
    }

    getSelectedStyle(): any {
        return {
            'background-color': this.selectedSlotBgColor,
            'color': this.selectedSlotColor,
        };
    }

    setStyle(timeModelData: any): any {
        timeModelData.forEach((time: any) => {
            time.selectedStyleClass = this.getSelectedStyle();
            time.availableStyleClass = this.getAvailableStyle();
        });
        return timeModelData;
    }
}
