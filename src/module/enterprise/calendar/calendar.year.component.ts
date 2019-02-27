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

    constructor() {
    }

    eventClicked(event1: any, eventData: any) {
        if (eventData.isEvent) {
            const eventObject = {
                event: event1,
                this: eventData,
            };
            this.onEventClicked.emit(eventObject);
        }
    }
}
