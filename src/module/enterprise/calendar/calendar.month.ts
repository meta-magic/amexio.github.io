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
    ariadatalabel: any;
    focusrindex: number;
    focusiindex: number;
    constructor() {
    }

    eventClicked(event1: any, eventData: any) {
        const eventObject = {
            event: event1,
            this: eventData.details,
        };
        this.onEventClicked.emit(eventObject);
    }

    nextrightday(day: any) {
        let focusrowindex: number;
        let focusinnerindex: number;
        this.calendaryData.forEach((calendarrow: any, rowindex: number) => {
            calendarrow.forEach((calendardata: any, innerindex: number) => {
                if (day.id === calendardata.id) {
                    if ((calendarrow.length - 1) === innerindex) {
                        focusinnerindex = 0;
                        focusrowindex = rowindex + 1;
                    } else {
                        focusinnerindex = innerindex + 1;
                        focusrowindex = rowindex;
                    }
                }
            });
        });
        const itemid = this.calendaryData[focusrowindex][focusinnerindex];
        document.getElementById(itemid['id']).focus();
    }

    nextleftday(day: any) {
        this.calendaryData.forEach((calendarrow: any, rowindex: number) => {
            calendarrow.forEach((individualday: any, innerindex: number) => {
                if (day.id === individualday.id) {
                    this.refactoredleftday(rowindex, innerindex, calendarrow);
                }
            });
        });
        const itemid = this.calendaryData[this.focusrindex][this.focusiindex];
        document.getElementById(itemid['id']).focus();
    }

    refactoredleftday(rowindex: number, innerindex: number, calendarrow: any) {
        if (rowindex === 0) {
            if (innerindex > 0) {
                this.focusrindex = rowindex;
                this.focusiindex = innerindex - 1;
            } else {
                this.focusrindex = rowindex;
                this.focusiindex = innerindex;
            }
        } else {
            if (innerindex === 0) {
                this.focusrindex = rowindex - 1;
                this.focusiindex = calendarrow.length - 1;
            } else {
                this.focusrindex = rowindex;
                this.focusiindex = innerindex - 1;
            }
        }
    }
    nexttopday(day: any) {
        let focusrowindex: number;
        let focusinnerindex: number;
        this.calendaryData.forEach((calrow: any, calrowindex: number) => {
            calrow.forEach((calday: any, calinnerindex: number) => {
                if (day.id === calday.id) {
                    if (calrowindex > 0) {
                        focusrowindex = calrowindex - 1;
                        focusinnerindex = calinnerindex;
                    } else {
                        focusrowindex = calrowindex;
                        focusinnerindex = calinnerindex;
                    }
                }
            });
        });

        const itemid = this.calendaryData[focusrowindex][focusinnerindex];
        document.getElementById(itemid['id']).focus();
    }

    nextbottomday(day: any) {
        let focusrowindex: number;
        let focusinnerindex: number;
        this.calendaryData.forEach((calrow: any, calindex: number) => {
            calrow.forEach((calday: any, innerindex: number) => {
                if (day.id === calday.id) {
                    if ((calindex < (calrow.length - 1))) {
                        focusrowindex = calindex + 1;
                        focusinnerindex = innerindex;
                    } else {
                        focusrowindex = calindex;
                        focusinnerindex = innerindex;
                    }
                }
            });
        });
        const itemid = this.calendaryData[focusrowindex][focusinnerindex];
        document.getElementById(itemid['id']).focus();
    }

    ondatefocus(day: any) {
        this.ariadatalabel = '';
        if (day.eventDetails && day.eventDetails !== null) {
            day.eventDetails.events.forEach((scheduledevent: any, index: number) => {
                if (index === 0) {
                    this.ariadatalabel = this.receiveDateFormat(day.date);
                }

                this.ariadatalabel = this.ariadatalabel + scheduledevent.details.title +
                    ' event scheduled ' +
                    this.formatAMPM(new Date(scheduledevent.details.start)) +
                    ' to ' +
                    this.formatAMPM(new Date(scheduledevent.details.end));
            });
        } else {
            this.ariadatalabel = this.receiveDateFormat(day.date) + ' no events scheduled';
        }
    }

    formatAMPM(date: Date) {
        let hours = date.getHours();
        const minutes = date.getMinutes();
        let lmins;
        const ampm = hours >= 12 ? 'pm' : 'am';
        hours = hours % 12;
        hours = hours ? hours : 12; // the hour '0' should be '12'
        lmins = minutes < 10 ? '0' + minutes : minutes;
        return (hours + ':' + lmins + ' ' + ampm);
    }

    receiveDateFormat(day: Date) {
        let datestring = '';
        datestring = (day).getDate() + this.getFullMonthName(new Date(day)) +
            this.getFullDayName(new Date(day));
        return datestring;
    }

    getFullMonthName(recevieddate: Date) {
        const months = ['January', 'Febuary', 'March', 'April', 'May', 'June',
            'July', 'August', 'September', 'October', 'November', 'December'];
        const datemonth = recevieddate.getMonth();
        let monthString = '';
        months.forEach((element: any, index: number) => {
            if (datemonth === index) {
                monthString = element;
            }
        });
        return monthString;
    }

    getFullDayName(receiveddate: Date) {
        const weekdays = ['Sunday', 'Monday', 'Tuesday', 'Wednesday',
            'Thursday', 'Friday', 'Saturday'];
        const day = receiveddate.getDay();
        let dayname = '';
        weekdays.forEach((element: any, index: number) => {
            if (day === index) {
                dayname = element;
            }
        });
        return dayname;
    }
}
