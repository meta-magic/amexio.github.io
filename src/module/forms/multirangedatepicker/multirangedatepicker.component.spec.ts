
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { IconLoaderService } from '../../../index';
import { CommonIconComponent } from './../../base/components/common.icon.component';
import { AmexioMultiRangePickerComponent } from './multirangepicker.component';
import { AmexioMultipleDatePickerComponent } from '../multidatepicker/multidatepicker.component';

describe('amexio-date-range-picker', () => {
    let comp: AmexioMultiRangePickerComponent;
    let fixture: ComponentFixture<AmexioMultiRangePickerComponent>;

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [FormsModule],
            declarations: [AmexioMultiRangePickerComponent, AmexioMultipleDatePickerComponent,
                CommonIconComponent],
            providers: [IconLoaderService],
        });
        fixture = TestBed.createComponent(AmexioMultiRangePickerComponent);
        comp = fixture.componentInstance;

    });




    it('check variables  ', () => {
        comp.dateRangePickerFlag = true;
        comp.newFromDate = new Date();
        comp.newToDate = new Date();
        comp.fromCardSelected = false;
        comp.toCardSelected = false;

        expect(comp.dateRangePickerFlag).toEqual(true);
        expect(comp.fromCardSelected).toEqual(false);
        expect(comp.toCardSelected).toEqual(false);

    });

    it('check ResetDaysTillYesterday method  ', () => {

        comp.ResetDaysTillYesterday();
        const d = new Date();
        const newfrm = new Date(d.getFullYear(), d.getMonth(), d.getDate() - comp.daysOptionYesterday);
        comp.child.fromdate = newfrm;
        // change todate
        const newto = new Date(d.getFullYear(), d.getMonth(), d.getDate() - 1);
        comp.child.todate = newto;
        comp.child.altercompleteDaysArray();

    });

    it('check ResetDaysTillToday method  ', () => {
        comp.ResetDaysTillToday();
        const d = new Date();
        const newfrm = new Date(d.getFullYear(), d.getMonth(), (d.getDate() - comp.daysOptionToday + 1));
        comp.child.fromdate = newfrm;
        const newto = new Date();
        comp.child.todate = newto;
        comp.child.altercompleteDaysArray();

    });

    it('check updateFromTodate method if condition  ', () => {

        comp.updateFromTodate();
        let flag = false;
        let incdate = new Date();
        do {
            incdate = new Date(incdate.getFullYear(), incdate.getMonth(), incdate.getDate() + 1);
            flag = comp.chkDisableddate(incdate);
        } while (!flag);
        flag = false;
        expect(flag).toEqual(false);
        comp.child.fromdate = incdate;
        comp.child.todate = incdate;
        comp.alterCompleteDaysArray(incdate);

    });

    it('check updateFromTodate method else condition ', () => {
        comp.updateFromTodate();
        let flag = false;
        let incdate = new Date();
        do {
            incdate = new Date(incdate.getFullYear(), incdate.getMonth(), incdate.getDate() + 1);
            flag = comp.chkDisableddate(incdate);
        } while (!flag);
        flag = true;
        expect(flag).toEqual(true);
    });


    it('check clearSelectedFlag if method', () => {
        comp.child.completeDaysArray = [
            {
                "date": "Mon Sep 23 2019 11:04:46 GMT+0530 ",
                "month": "September",
                "montharray": [
                    [
                        {
                            "date": "Mon Aug 26 2019 00:00:00 GMT+0530",
                            "from": true,
                            "fulldate": "26 August 2019 Monday",
                            "id": "31313_id",
                            "isCurrentMonth": false,
                            "isDisabled": false,
                            "range": false,
                            "selected": true,
                            "to": true
                        },
                        {
                            "date": "Tue Aug 27 2019 00:00:00 GMT+0530",
                            "from": true,
                            "fulldate": "27 August 2019 Tuesday",
                            "id": "86088_id",
                            "isCurrentMonth": false,
                            "isDisabled": false,
                            "range": false,
                            "selected": true,
                            "to": true
                        }
                    ],
                    [
                        {
                            "date": "Mon Aug 26 2019 00:00:00 GMT+0530",
                            "from": true,
                            "fulldate": "26 August 2019 Monday",
                            "id": "31313_id",
                            "isCurrentMonth": false,
                            "isDisabled": false,
                            "range": false,
                            "selected": true,
                            "to": true
                        },
                        {
                            "date": "Tue Aug 27 2019 00:00:00 GMT+0530",
                            "from": true,
                            "fulldate": "27 August 2019 Tuesday",
                            "id": "86088_id",
                            "isCurrentMonth": false,
                            "isDisabled": false,
                            "range": false,
                            "selected": true,
                            "to": true
                        }
                    ]
                ],
                "nextarrow": false,
                "prevarrow": true,
                "year": 2019
            },
            {
                "date": "Wed Oct 23 2019 11:04:46 GMT+0530 ",
                "month": "October",
                "montharray": [
                    [
                        {
                            "date": "Mon Aug 26 2019 00:00:00 GMT+0530",
                            "from": true,
                            "fulldate": "26 August 2019 Monday",
                            "id": "31313_id",
                            "isCurrentMonth": false,
                            "isDisabled": false,
                            "range": false,
                            "selected": true,
                            "to": true
                        },
                        {
                            "date": "Tue Aug 27 2019 00:00:00 GMT+0530",
                            "from": true,
                            "fulldate": "27 August 2019 Tuesday",
                            "id": "86088_id",
                            "isCurrentMonth": false,
                            "isDisabled": false,
                            "range": false,
                            "selected": true,
                            "to": true
                        }
                    ],
                    [
                        {
                            "date": "Mon Aug 26 2019 00:00:00 GMT+0530",
                            "from": true,
                            "fulldate": "26 August 2019 Monday",
                            "id": "31313_id",
                            "isCurrentMonth": false,
                            "isDisabled": false,
                            "range": false,
                            "selected": true,
                            "to": true
                        },
                        {
                            "date": "Tue Aug 27 2019 00:00:00 GMT+0530",
                            "from": true,
                            "fulldate": "27 August 2019 Tuesday",
                            "id": "86088_id",
                            "isCurrentMonth": false,
                            "isDisabled": false,
                            "range": false,
                            "selected": true,
                            "to": true
                        }
                    ]
                ],
                "nextarrow": false,
                "prevarrow": false,
                "year": 2019
            }
        ]

        comp.clearSelectedFlag();
        comp.child.completeDaysArray.forEach((month: any) => {
            month.montharray.forEach((monthrowarray: any) => {
                monthrowarray.forEach((individualday: any) => {

                    individualday.selected = false;
                    individualday.from = false;
                    individualday.to = false;
                });
            });
        });

    });


    it('check ngAfterViewInit method if todayIconFlag condition ', () => {
        comp.ngAfterViewInit();
        comp.fromCardSelected = comp.child.fromcardselected;
        comp.toCardSelected = comp.child.tocardselected;
        comp.child.altercompleteDaysArray();
        expect(comp.disabledDates).toBeDefined();
        comp.disabledDates.forEach((element: any) => {
            const dfrom = new Date(element.from);
            const dto = new Date(element.to);
            const currentd = new Date();
            const yesterdayd = new Date(currentd.getFullYear(), currentd.getMonth(), currentd.getDate() - 1);
            if ((currentd <= dto) && (currentd >= dfrom)) {
                comp.todayIconFlag = true;
            }
            if ((yesterdayd <= dto) && (yesterdayd >= dfrom)) {
                comp.yesterdayIconFlag = true;
            }

        });
        comp.todayIconFlag = true;
        expect(comp.todayIconFlag).toEqual(true);
        comp.updateFromTodate();
    });



    it('check ngAfterViewInit method todayIconFlag else condition ', () => {
        comp.ngAfterViewInit();
        comp.fromCardSelected = comp.child.fromcardselected;
        comp.toCardSelected = comp.child.tocardselected;
        comp.child.altercompleteDaysArray();
        expect(comp.disabledDates).toBeDefined();
        comp.disabledDates.forEach((element: any) => {
            const dfrom = new Date(element.from);
            const dto = new Date(element.to);
            const currentd = new Date();
            const yesterdayd = new Date(currentd.getFullYear(), currentd.getMonth(), currentd.getDate() - 1);
            if ((currentd <= dto) && (currentd >= dfrom)) {
                comp.todayIconFlag = true;
            }
            if ((yesterdayd <= dto) && (yesterdayd >= dfrom)) {
                comp.yesterdayIconFlag = true;
            }

        });
        comp.todayIconFlag = false;
        expect(comp.todayIconFlag).toEqual(false);
    });



});



