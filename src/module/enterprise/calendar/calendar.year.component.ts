import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
    selector: 'amexio-calendar-year',
    templateUrl: './calendar.year.component.html',
    styleUrls: ['./calendar.common.css'],
})
export class AmexioCalendarYearComponent {

    @Input('headers') headers: any[];

    @Input('calendar-data') calendaryData: any[];

    @Output('onEventClicked') onEventClicked = new EventEmitter<any>();

    @Output('onHeaderClicked') onHeaderClicked = new EventEmitter<any>();

    constructor() {
    }

    eventClicked(event1: any, eventData: any) {
        const eventObject = {
            event: event1,
            this: eventData,
        };
        this.onEventClicked.emit(eventObject);
    }

    monthClicked(event: any) {
        this.onHeaderClicked.emit(event);
    }
}
