import {
    Component, ComponentFactoryResolver, ElementRef, EventEmitter, Input, Output,
    Renderer2, ViewChild, ViewChildren, ViewContainerRef,
} from '@angular/core';

@Component({
    selector: 'amexio-calendar-month',
    templateUrl: './calendar.month.html',
    styleUrls: ['./calendar.common.css'],
})
export class AmexioCalendarMonthComponent {

    @Input('headers') headers: any[];

    @Input('calendar-data') calendaryData: any[];

    @Input('calendar-row') calendarRow: any[];

    @Input('no-of-events') noOfEvents: number;

    @Output('onEventClicked') onEventClicked = new EventEmitter<any>();

    @Output('onCloseClick') onCloseClicked = new EventEmitter<any>();

    @Output('onMoreEventClicked') onMoreEventClicked = new EventEmitter<any>();

    @ViewChildren('runtimeDiv', { read: ViewContainerRef }) runtimeDiv: any;

    @ViewChildren('runtimeDiv1', { read: ViewContainerRef }) runtimeDiv1: any;

    xValue: any;
    openFloatingPanel = false;
    ariadatalabel: any;
    focusrindex: number;
    focusiindex: number;
    nativeRuntimeDiv: any;
    runTimeInstance: any;
    widthPosition: string;
    heightPosition: string;
    calculatedWidth: number;
    leftPositionPanel = 'leftPositionPanel';
    rightPositionPanel = 'rightPositionPanel';
    dropdownstyle: any;

    constructor(private componentFactoryResolver: ComponentFactoryResolver, private renderer: Renderer2) { }
    onMoreClicked(data: any) {
        if (this.calendaryData) {
            this.calendaryData.forEach((calendarRow) => {
                calendarRow.forEach((day: any) => {
                    if (day.eventDetails) {
                        day.eventDetails.events.fpFlag = false;
                    }
                });
            });
        }
        data['fpFlag'] = true;
        this.openFloatingPanel = true;
    }

    onCloseClick(event: any) {
        event.data.fpFlag = false;
        this.onCloseClicked.emit(event);
    }

    onChipClick(event: any, item: any, runtimeDiv: any) {
        const emitEvent = {};
        emitEvent['event'] = event;
        emitEvent['item'] = item;
        emitEvent['this'] = this;
        emitEvent['runtimeDiv'] = runtimeDiv;
        this.xValue = event.pageX;

        this.onMoreEventClicked.emit(emitEvent);
    }

    addComponent(amexioComponent: any, event: any): any {
        if (this.runTimeInstance) {
            this.runTimeInstance.destroy();
        }
        event.runtimeDiv.innerHTML = '';
        const id = event.runtimeDiv.id;
        const runTimeDivs = this.runtimeDiv.toArray();
        for (let i = 0; i <= runTimeDivs.length; i++) {
            if (runTimeDivs[i].element.nativeElement.id === id) {
                const tpCF = this.componentFactoryResolver.resolveComponentFactory(
                    amexioComponent,
                );
                this.runTimeInstance = runTimeDivs[i].createComponent(tpCF);
                this.nativeRuntimeDiv = runTimeDivs[i];
                this.renderer.setStyle(this.nativeRuntimeDiv.element.nativeElement.nextElementSibling, 'visibility', 'hidden');

                setTimeout(() => {
                    if (455 > (screen.width - this.xValue)) {
                        this.calculatedWidth = (screen.width - event.event.clientX);
                        this.widthPosition = this.calculatedWidth + 'px';
                        this.heightPosition = event.event.clientX + 'px';
                        this.renderer.addClass(this.nativeRuntimeDiv.element.nativeElement.nextElementSibling, 'leftPositionPanel');
                        this.renderer.setStyle(this.nativeRuntimeDiv.element.nativeElement.nextElementSibling, 'right', this.widthPosition);
                        this.renderer.setStyle(this.nativeRuntimeDiv.element.nativeElement.nextElementSibling, 'visibility', 'visible');
                    } else {
                        this.calculatedWidth = event.event.clientX - (event.event.layerX + event.event.offsetX);
                        this.widthPosition = this.calculatedWidth + 'px';
                        this.renderer.addClass(this.nativeRuntimeDiv.element.nativeElement.nextElementSibling, 'rightPositionPanel');
                        this.renderer.setStyle(this.nativeRuntimeDiv.element.nativeElement.nextElementSibling, 'left', this.widthPosition);
                        this.renderer.setStyle(this.nativeRuntimeDiv.element.nativeElement.nextElementSibling, 'visibility', 'visible');

                    }

                }, 200);
                return this.runTimeInstance;
            }

        }

    }

    addDynamicClass(calculatedWidth: any, nextSiblingElement: any, cssClass: any) {
        this.widthPosition = calculatedWidth + 'px';
        this.renderer.addClass(nextSiblingElement, cssClass);
        this.renderer.setStyle(nextSiblingElement, 'left', this.widthPosition);
        this.renderer.setStyle(this.nativeRuntimeDiv.element.nativeElement.nextElementSibling, 'visibility', 'visible');
    }

    addEventDetails(amexioComponent: any, event: any): any {
        if (this.runTimeInstance) {
            this.runTimeInstance.destroy();
        }
        event.runtimeDiv.innerHTML = '';
        const id = event.runtimeDiv.id;
        const runTimeDivs = this.runtimeDiv1.toArray();
        for (let i = 0; i <= runTimeDivs.length; i++) {
            if (runTimeDivs[i].element.nativeElement.id === id) {
                const tpCF = this.componentFactoryResolver.resolveComponentFactory(
                    amexioComponent,
                );
                this.runTimeInstance = runTimeDivs[i].createComponent(tpCF);
                this.nativeRuntimeDiv = runTimeDivs[i];
                this.renderer.setStyle(this.nativeRuntimeDiv.element.nativeElement.nextElementSibling, 'visibility', 'hidden');

                setTimeout(() => {
                    if (455 > (screen.width - event.event.pageX)) {
                        this.calculatedWidth = (event.event.screenX - event.event.layerX);
                        this.addDynamicClass(this.calculatedWidth, this.nativeRuntimeDiv.element.nativeElement.nextElementSibling,
                            this.leftPositionPanel);
                    } else {
                        this.calculatedWidth = (event.event.layerX + event.event.offsetX - 50);
                        this.addDynamicClass(this.calculatedWidth, this.nativeRuntimeDiv.element.nativeElement.nextElementSibling,
                            this.rightPositionPanel);

                    }

                }, 200);
                return this.runTimeInstance;

            }
        }

    }

    eventClicked(event1: any, eventData: any, runTimeDiv: any) {
        const eventObject = {};
        eventObject['event'] = event1;
        eventObject['item'] = eventData;
        eventObject['this'] = this;
        eventObject['runtimeDiv'] = runTimeDiv;
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
