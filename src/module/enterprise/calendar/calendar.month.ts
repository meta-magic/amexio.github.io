import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
    selector: 'amexio-calendar-month',
    templateUrl: './calendar.month.html',
    styleUrls: ['./calendar.common.css'],
})
export class AmexioCalendarMonthComponent {

    @Input('headers') headers: any[];

    @Input('calendar-data') calendaryData: any[];

    @Input('calendar-row') calendarRow: any[];

    @Output('onEventClicked') onEventClicked = new EventEmitter<any>();

    constructor() {
    }

    eventClicked(event1: any, eventData: any) {
        const eventObject = {
            event: event1,
            this: eventData.details,
        };
        this.onEventClicked.emit(eventObject);
    }

}
