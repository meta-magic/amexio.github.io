import { Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';

@Component({
    selector: 'amexio-calendar-day-timewise',
    templateUrl: './calendar.daytimewise.component.html',
    styleUrls: ['./calendar.common.css'],
})
export class AmexioCalendarDayTimeWiseComponent implements OnInit {
    @Input('headers') headers: any[];

    @Input('calendar-data') calendaryData: any[];

    @ViewChild('headerRow') headerRow: ElementRef;

    @Output('onEventClicked') onEventClicked = new EventEmitter<any>();

    @Output('onHeaderClicked') onHeaderClicked = new EventEmitter<any>();

    width: number;

    constructor() {
    }

    ngOnInit() {
        this.width = (this.headerRow.nativeElement.offsetWidth - 50) / 7;
        if ((this.width - 50) > 50) {
            this.width = this.width - 50;
        }
    }

    eventClicked(event1: any, eventData: any) {
        const eventObject = {
            event: event1,
            this: eventData.details,
        };
        this.onEventClicked.emit(eventObject);
    }

    onHeaderClick(event: any) {
        this.onHeaderClicked.emit(event);
    }

    fulldate(date: Date) {
        const days = ['sunday', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday'];
        const months = ['january', 'febuary', 'march', 'april', 'may', 'june', 'july', 'august',
            'september', 'october', 'november', 'december'];
        let ariadate = date.getDate();
        months.forEach((element: any, index: number) => {
            if (date.getMonth() === index) {
                ariadate = ariadate + element;
            }
        });
        days.forEach((individualday: any, index: number) => {
            if (date.getDay() === index) {
                ariadate = ariadate + individualday;
            }
        });
        return ariadate;
    }

}
