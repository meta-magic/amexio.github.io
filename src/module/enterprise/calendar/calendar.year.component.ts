import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
    selector: 'amexio-calendar-year',
    templateUrl: './calendar.year.component.html',
    styleUrls: ['./calendar.common.css'],
})
export class AmexioCalendarYearComponent {
    rightfocusrowindex: number;
    rightfocusinnerindex: number;
    rightfocuscalindex: number;
    isextremeright = false;
    leftfocusrowindex: number;
    leftfocusinnerindex: number;
    leftfocuscalindex: number;
    isextremeleft = false;
    @Input('headers') headers: any[];

    @Input('calendar-data') calendaryData: any[];

    @Output('onEventClicked') onEventClicked = new EventEmitter<any>();

    @Output('onHeaderClicked') onHeaderClicked = new EventEmitter<any>();

    @Output('onLeftNavigate') onleftnavigate = new EventEmitter<any>();

    @Output('onRightNavigate') onrightnavigate = new EventEmitter<any>();

    @Output('onTopNavigate') ontopnavigate = new EventEmitter<any>();

    @Output('onBottomNavigate') onbottomnavigate = new EventEmitter<any>();

    isdaypressed = false;
    constructor() {
    }

    eventClicked(event1: any, eventData: any) {
        this.isdaypressed = true;
        const eventObject = {
            event: event1,
            this: eventData,
        };
        this.onEventClicked.emit(eventObject);
    }

    monthClicked(event: any) {
        this.onHeaderClicked.emit(event);
    }
    navigateright(day: any) {
        this.calendaryData.forEach((calendarrow: any, rowindex: number) => {
            calendarrow.data.forEach((calendardata: any, innerindex: number) => {
                calendardata.forEach((calelement: any, calindex: number) => {
                    if (day.id === calelement.id) {
                        this.refactorednavigateright(calindex, calendardata, innerindex, calendarrow, rowindex);
                    }
                });
            });
        });
        if (!this.isextremeright) {
            const itemid = this.calendaryData[this.rightfocusrowindex].data[this.rightfocusinnerindex][this.rightfocuscalindex];
            document.getElementById(itemid['id']).focus();
        }
    }

    refactorednavigateright(calindex: number, calendardata: any, innerindex: number, calendarrow: any, rowindex: number) {
        if (calindex === (calendardata.length - 1) &&
            innerindex === (calendarrow.data.length - 1) &&
            rowindex === (this.calendaryData.length - 1)) {
            this.onrightnavigate.emit();
            this.isextremeright = true;
            this.setExtremeFocus();
        } else if (calindex === (calendardata.length - 1)) {
            // chk condn for last row
            if ((calendarrow.data.length - 1) === innerindex) {
                this.rightfocusrowindex = rowindex + 1; // by inc:-> next month
                this.rightfocusinnerindex = 0; // by inc:-> next row in same month
                this.rightfocuscalindex = 0; // by inc:-> next day
            } else {
                this.rightfocusrowindex = rowindex; // by inc:-> next month
                this.rightfocusinnerindex = innerindex + 1; // by inc:-> next row in same month
                this.rightfocuscalindex = 0; // by inc:-> next day
            }
        } else {
            this.rightfocusrowindex = rowindex; // by inc:-> next month
            this.rightfocusinnerindex = innerindex; // by inc:-> next row in same month
            this.rightfocuscalindex = calindex + 1; // by inc:-> next day
        }
    }

    navigateleft(day: any) {
        this.calendaryData.forEach((calendarrow: any, rowindex: number) => {
            calendarrow.data.forEach((calendardata: any, innerindex: number) => {
                calendardata.forEach((calelement: any, calindex: number) => {
                    if (day.id === calelement.id) {
                        this.refactoredleftnavigate(rowindex, innerindex, calindex, calendarrow, calendardata);
                    }
                });
            });
        });
        if (!this.isextremeleft) {
            const itemid = this.calendaryData[this.leftfocusrowindex].data[this.leftfocusinnerindex][this.leftfocuscalindex];
            document.getElementById(itemid['id']).focus();
        }
    }

    refactoredleftnavigate(rowindex: number, innerindex: number, calindex: number, calendarrow: any, calendardata: any) {
        if (rowindex === 0 && innerindex === 0 && calindex === 0) {
            this.onleftnavigate.emit();
            this.isextremeleft = true;
            this.setExtremeFocus();
        } else if (calindex === 0) {
            // chk for first row
            if (innerindex === 0) {
                this.leftfocusrowindex = rowindex - 1;
                this.leftfocusinnerindex = calendarrow.data.length - 1; // row change
                this.leftfocuscalindex = calendardata.length - 1; // last ele of month
            } else {
                this.leftfocusrowindex = rowindex;
                this.leftfocusinnerindex = innerindex - 1;
                this.leftfocuscalindex = calendardata.length - 1;
            }
        } else {
            this.leftfocusrowindex = rowindex;
            this.leftfocusinnerindex = innerindex;
            this.leftfocuscalindex = calindex - 1;
        }
    }

    navigatedown(day: any) {
        let focusrowindex: number;
        let focusinnerindex: number;
        let focuscalindex: number;
        let isextremedown = false;
        this.calendaryData.forEach((calendarrow: any, rowindex: number) => {
            calendarrow.data.forEach((calendardata: any, innerindex: number) => {
                calendardata.forEach((calelement: any, calindex: number) => {
                    if (day.id === calelement.id) {
                        if (rowindex === (this.calendaryData.length - 1) &&
                            innerindex === (calendarrow.data.length - 1)) {
                            this.onbottomnavigate.emit();
                            isextremedown = true;
                            this.setExtremeFocus();
                        } else if (innerindex === (calendarrow.data.length - 1)) {
                            focusrowindex = rowindex + 1;
                            focusinnerindex = 0;
                            focuscalindex = 0;
                        } else {
                            focusrowindex = rowindex;
                            focusinnerindex = innerindex + 1;
                            focuscalindex = calindex;
                        }
                    }
                });
            });
        });
        if (!isextremedown) {
            const itemid = this.calendaryData[focusrowindex].data[focusinnerindex][focuscalindex];
            document.getElementById(itemid['id']).focus();
        }
    }

    navigateup(day: any) {
        let focusrowindex: number;
        let focusinnerindex: number;
        let focuscalindex: number;
        let isextremetop = false;
        this.calendaryData.forEach((calendarrow: any, rowindex: number) => {
            calendarrow.data.forEach((calendardata: any, innerindex: number) => {
                calendardata.forEach((calelement: any, calindex: number) => {
                    if (day.id === calelement.id) {
                        if (rowindex === 0 && innerindex === 0) {
                            this.ontopnavigate.emit();
                            isextremetop = true;
                            this.setExtremeFocus();
                        } else if (innerindex === 0) {
                            focusrowindex = rowindex - 1;
                            focusinnerindex = calendarrow.data.length - 1;
                            focuscalindex = calendardata.length - 1;
                        } else {
                            focusrowindex = rowindex;
                            focusinnerindex = innerindex - 1;
                            focuscalindex = calindex;
                        }
                    }
                });
            });
        });
        if (!isextremetop) {
            const itemid = this.calendaryData[focusrowindex].data[focusinnerindex][focuscalindex];
            document.getElementById(itemid['id']).focus();
        }
    }

    setExtremeFocus() {
        setTimeout(() => {
            let itemid;
            this.calendaryData.forEach((calendarrow: any, rowindex: number) => {
                calendarrow.data.forEach((calendardata: any, innerindex: number) => {
                    calendardata.forEach((calelement: any, calindex: number) => {
                        if (rowindex === 0 && innerindex === 0 && calindex === 0) {
                            itemid = this.calendaryData[0].data[0][0];
                            document.getElementById(itemid['id']).focus();
                        }
                    });
                });
            });
        }, 0);
    }
}
