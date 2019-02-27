import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';

@Component({
    selector: 'amexio-calendar-day-timewise',
    templateUrl: './calendar.daytimewise.component.html',
})
export class AmexioCalendarDayTimeWiseComponent implements OnInit {

    @Input('headers') headers: any[];
    @Input('calendar-data') calendaryData: any[];
    @ViewChild('headerRow') headerRow: ElementRef;

    width: number;

    constructor() {
    }

    ngOnInit() {
        this.width = (this.headerRow.nativeElement.offsetWidth - 50) / 7;
        if ((this.width - 50) > 50) {
            this.width = this.width - 50;
        }
    }
}
