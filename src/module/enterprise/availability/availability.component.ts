import { AfterViewInit, Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';

@Component({
    selector: 'amexio-availability',
    templateUrl: './availability.component.html',
})
export class AvailabilityComponent implements OnInit, AfterViewInit {
    @Input('start-date') startDate: string;
    @Input('end-date') endDate: string;
    @Input('start-time') startTime: number;
    @Input('end-time') endTime: number;
    @Input() timezone: boolean;
    @Input('label-data') labelData: any;
    @ViewChild('datesdiv') elementView: ElementRef;
    @ViewChild('datesseconddiv') elementView1: ElementRef;
    @ViewChild('datesfirstdiv') elementView2: ElementRef;

    completeNewArr: any = [];
    datesArrlen = 0;
    slotTimeArr: any[] = [];
    sDate = new Date();
    eDate = new Date();
    dateArr: any = [];
    dateArr1: any = [];
    completeTimeArr: any = [];
    dateSpanHt = 18;
    dateSpanWt = 46;
    dateSpanlist: any = [];
    legendObj = {};
    newTimeArr: any = [];
    constructor() {

    }

    ngOnInit() {
        this.sDate = new Date(this.startDate);
        this.eDate = new Date(this.endDate);
        let i = 0;
        this.dateArr = [{ dates: [], timearr: [] }];
        this.dateArr1 = [];
        let d;
        if (this.sDate < this.eDate) {
            do {
                d = new Date(this.sDate.getFullYear(), this.sDate.getMonth(), this.sDate.getDate() + i);
                const dobj = { date: d };
                this.dateArr[0].dates.push(dobj);
                i++;
            } while (d < this.eDate);
        } else if (this.sDate === this.eDate) {
            d = new Date(this.sDate.getFullYear(), this.sDate.getMonth(), this.sDate.getDate() + i);
            const dobj = { date: d };
            this.dateArr[0].dates.push(dobj);
        }
        i = 0;
        this.sDate = new Date(this.startDate);
        this.eDate = new Date(this.eDate);
        const arr: any = [];
        if (this.sDate < this.eDate) {
            do {
                d = new Date(this.sDate.getFullYear(), this.sDate.getMonth(), this.sDate.getDate() + i);
                const dobj = { date: d, slots: arr };
                dobj.slots = this.setSlots(d);
                this.dateArr1.push(dobj);
                i++;
            } while (d < this.eDate);
        } else if (this.sDate === this.eDate) {
            d = new Date(this.sDate.getFullYear(), this.sDate.getMonth(), this.sDate.getDate() + i);
            const dobj = { date: d, slots: arr };
            dobj.slots = this.setSlots(d);
            this.dateArr1.push(dobj);
        }
        this.initializeTimeArr();
        this.generateTimeArr();
        this.datesArrlen = this.dateArr[0].dates.length;
        let j;
        for (j = 0; j < this.datesArrlen; j++) {
            this.dateSpanlist.push(j);
        }
        this.generateLegendArr();
        this.generateSlotTimeArr();
    }

    generateSlotTimeArr() {
        let i = this.startTime;
        while (i <= this.endTime) {
            this.newTimeArr.push(i);
            i++;
        }
    }

    setSlots(d: Date) {
        const slot = [];
        let difference = this.startTime - this.endTime;
        if (difference < 0) {
            difference = difference * (-1);
        }
        let i = 0;
        while (i < difference) {
            const obj = {};
            const date1 = new Date(d.getFullYear(), d.getMonth(), d.getDate());
            const date2 = new Date(d.getFullYear(), d.getMonth(), d.getDate());
            date1.setHours(this.startTime + i);
            date2.setHours(this.startTime + i + 1);
            obj['starttime'] = date1;
            obj['endtime'] = date2;
            this.chkLabels(d, obj);
            slot.push(obj);
            i++;
        }

        return slot;
    }

    chkLabels(d: Date, obj: any) {
        this.labelData.forEach((labelelement: any) => {
            if (labelelement.available) {
                labelelement.available.forEach((availableElement: any) => {

                    if (availableElement.date) {
                        const dt = new Date(availableElement.date);
                        if ((d.getDate() === dt.getDate()) && (d.getMonth() === dt.getMonth()) &&
                            (d.getFullYear() === dt.getFullYear())) {

                        }
                    }

                });
            }
        });
    }

    ngAfterViewInit() {
        let divHt;
        let divWt;
        let divWt1;
        divHt = this.elementView.nativeElement.offsetHeight;
        divWt = this.elementView1.nativeElement.offsetWidth;
        divWt1 = this.elementView2.nativeElement.offsetWidth;

        this.dateSpanHt = Math.round(divHt / this.datesArrlen);
        this.dateSpanWt = Math.round((divWt - divWt1) / this.newTimeArr.length);
    }

    generateLegendArr() {
        this.labelData.forEach((element: any) => {
            this.legendObj[element.label] = false;
        });
    }

    initializeTimeArr() {
        this.completeTimeArr = ['12am', '1am', '2am', '3am', '4am', '5am', '6am', '7am', '8am',
            '9am', '10am', '11am', '12pm', '1pm', '2pm', '3pm', '4pm',
            '5pm', '6pm', '7pm', '8pm', '9pm', '10pm', '11pm',
        ];
    }

    chkRedundancy(sentdate: any) {

    }

    generateTimeArr() {
        let startindex;
        let endindex;

        this.completeTimeArr.forEach((element: any, index: number) => {
            if (element === this.startTime) {
                startindex = index;
            }
            if (element === this.endTime) {
                endindex = index;
            }
        });
        this.setTimeArr(startindex, endindex);
    }

    setTimeArr(startindex: number, endindex: number) {
        const tarr: any = [];
        this.completeTimeArr.forEach((element: any, index: number) => {
            if ((index >= startindex) && (index <= endindex)) {
                const tobj = { time: element };
                tarr.push(tobj);
            }
        });
        this.dateArr[0].timearr = tarr;
    }

    onSelection(radioData: any) {
        this.labelData.forEach((data: any, index: number) => {
            if (data.label === radioData.label) {
                if (data.available) {
                    data.available.forEach((availableData: any) => {
                        if (availableData.time) {
                            availableData.time.forEach((timeData: any) => {
                            });
                        }
                    });
                }
            }
        });
    }

}
