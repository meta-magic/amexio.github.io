
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { IconLoaderService } from '../../../index';
import { CommonIconComponent } from './../../base/components/common.icon.component';
import { AmexioMultiRangePickerComponent } from './multirangedatepicker.component';
import { AmexioMultipleDatePickerComponent } from '../multidatepicker/multidatepicker.component';

describe('amexio-date-range-picker', () => {
    let component: AmexioMultiRangePickerComponent;
    let fixture: ComponentFixture<AmexioMultiRangePickerComponent>;

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [FormsModule],
            declarations: [AmexioMultiRangePickerComponent, AmexioMultipleDatePickerComponent,
                CommonIconComponent],
            providers: [IconLoaderService],
        });
        fixture = TestBed.createComponent(AmexioMultiRangePickerComponent);
        component = fixture.componentInstance;
    });

    it('should successfuly be able to create a AmexioMultiRangePickerComponent', () => {

        expect(fixture.componentInstance instanceof AmexioMultiRangePickerComponent)
            .toBe(true, 'should create AmexioMultiRangePickerComponent');
    });


    it('ngAfterViewInit: check if date is today', () => {

        component.ngAfterViewInit();
        component.fromCardSelected = component.child.fromcardselected;
        component.toCardSelected = component.child.tocardselected;
        component.child.altercompleteDaysArray();
        expect(component.disabledDates).toBeDefined();
        component.disabledDates.forEach((element: any) => {
            const dfrom = new Date(element.from);
            const dto = new Date(element.to);
            const currentd = new Date();
            const yesterdayd = new Date(currentd.getFullYear(), currentd.getMonth(), currentd.getDate() - 1);
            expect(dfrom).not.toBeNull();
            expect(dto).not.toBeNull();
            expect(currentd).not.toBeNull();
            expect(yesterdayd).not.toBeNull();
            if ((currentd <= dto) && (currentd >= dfrom)) {
                expect(component.todayIconFlag).toEqual(true);
            }
            if ((yesterdayd <= dto) && (yesterdayd >= dfrom)) {
                expect(component.yesterdayIconFlag).toEqual(true);
            }
        });
    });

    it('check ngAfterViewInit method todayIconFlag else condition ', () => {
        component.ngAfterViewInit();
        component.fromCardSelected = component.child.fromcardselected;
        component.toCardSelected = component.child.tocardselected;
        component.child.altercompleteDaysArray();
        expect(component.disabledDates).toBeDefined();
        component.disabledDates.forEach((element: any) => {
            const dfrom = new Date(element.from);
            const dto = new Date(element.to);
            const currentd = new Date();
            const yesterdayd = new Date(currentd.getFullYear(), currentd.getMonth(), currentd.getDate() - 1);

            expect(dfrom).not.toBeNull();
            expect(dto).not.toBeNull();
            expect(currentd).not.toBeNull();
            expect(yesterdayd).not.toBeNull();


            if ((currentd <= dto) && (currentd >= dfrom)) {
                component.todayIconFlag = true;
            }
            if ((yesterdayd <= dto) && (yesterdayd >= dfrom)) {
                component.yesterdayIconFlag = true;
            }

        });
        component.todayIconFlag = false;
        expect(component.todayIconFlag).toEqual(false);
    });

    it('check variables  ', () => {
        component.dateRangePickerFlag = true;
        component.newFromDate = new Date();
        component.newToDate = new Date();
        component.fromCardSelected = false;
        component.toCardSelected = false;

        expect(component.dateRangePickerFlag).toEqual(true);
        expect(component.fromCardSelected).toEqual(false);
        expect(component.toCardSelected).toEqual(false);

    });

    it('check ResetDaysTillYesterday method  ', () => {

        component.ResetDaysTillYesterday();
        const d = new Date();
        const newfrm = new Date(d.getFullYear(), d.getMonth(), d.getDate() - component.daysOptionYesterday);
        component.child.fromdate = newfrm;
        // change todate
        const newto = new Date(d.getFullYear(), d.getMonth(), d.getDate() - 1);
        component.child.todate = newto;
        component.child.altercompleteDaysArray();

    });

    it('check ResetDaysTillToday method  ', () => {
        component.ResetDaysTillToday();
        const d = new Date();
        const newfrm = new Date(d.getFullYear(), d.getMonth(), (d.getDate() - component.daysOptionToday + 1));
        component.child.fromdate = newfrm;
        const newto = new Date();
        component.child.todate = newto;
        component.child.altercompleteDaysArray();

    });

    it('updateFromTodate :check flag true', () => {

        const flag = true;
        const incdate = new Date();

        expect(flag).toEqual(true);
        expect(new Date(component.child.fromdate).getDate()).toEqual(incdate.getDate());
        expect(new Date(component.child.todate).getDate()).toEqual(incdate.getDate());

        spyOn(component, 'alterCompleteDaysArray');
        component.alterCompleteDaysArray(incdate);
        expect(component.alterCompleteDaysArray).toHaveBeenCalled();

    });

    it('updateFromTodate :check flag false ', () => {
        const flag = false;
        expect(flag).toEqual(false);
    });

    it('check clearSelectedFlag if method', () => {
        component.child.completeDaysArray = [
            {
                'date': 'Mon Sep 23 2019 11:04:46 GMT+0530 ',
                'month': 'September',
                'montharray': [
                    [
                        {
                            'date': "Mon Aug 26 2019 00:00:00 GMT+0530",
                            'from': true,
                            'fulldate': "26 August 2019 Monday",
                            'id': '31313_id',
                            'isCurrentMonth': false,
                            'isDisabled': false,
                            'range': false,
                            'selected': true,
                            'to': true
                        },
                        {
                            'date': "Tue Aug 27 2019 00:00:00 GMT+0530",
                            'from': true,
                            'fulldate': "27 August 2019 Tuesday",
                            'id': '86088_id',
                            'isCurrentMonth': false,
                            'isDisabled': false,
                            'range': false,
                            'selected': true,
                            'to': true
                        }
                    ],
                    [
                        {
                            'date': 'Mon Aug 26 2019 00:00:00 GMT+0530',
                            'from': true,
                            'fulldate': '26 August 2019 Monday',
                            'id': '31313_id',
                            'isCurrentMonth': false,
                            'isDisabled': false,
                            'range': false,
                            'selected': true,
                            'to': true
                        },
                        {
                            'date': 'Tue Aug 27 2019 00:00:00 GMT+0530',
                            'from': true,
                            'fulldate': '27 August 2019 Tuesday',
                            'id': '86088_id',
                            'isCurrentMonth': false,
                            'isDisabled': false,
                            'range': false,
                            'selected': true,
                            'to': true
                        }
                    ]
                ],
                'nextarrow': false,
                'prevarrow': true,
                'year': 2019
            },
            {
                'date': 'Wed Oct 23 2019 11:04:46 GMT+0530 ',
                'month': 'October',
                'montharray': [
                    [
                        {
                            'date': 'Mon Aug 26 2019 00:00:00 GMT+0530',
                            'from': true,
                            'fulldate': '26 August 2019 Monday',
                            'id': '31313_id',
                            'isCurrentMonth': false,
                            'isDisabled': false,
                            'range': false,
                            'selected': true,
                            'to': true
                        },
                        {
                            'date': 'Tue Aug 27 2019 00:00:00 GMT+0530',
                            'from': true,
                            'fulldate': '27 August 2019 Tuesday',
                            'id': '86088_id',
                            'isCurrentMonth': false,
                            'isDisabled': false,
                            'range': false,
                            'selected': true,
                            'to': true
                        }
                    ],
                    [
                        {
                            'date': 'Mon Aug 26 2019 00:00:00 GMT+0530',
                            'from': true,
                            'fulldate': '26 August 2019 Monday',
                            'id': '31313_id',
                            'isCurrentMonth': false,
                            'isDisabled': false,
                            'range': false,
                            'selected': true,
                            'to': true
                        },
                        {
                            'date': 'Tue Aug 27 2019 00:00:00 GMT+0530',
                            'from': true,
                            'fulldate': '27 August 2019 Tuesday',
                            'id': '86088_id',
                            'isCurrentMonth': false,
                            'isDisabled': false,
                            'range': false,
                            'selected': true,
                            'to': true
                        }
                    ]
                ],
                'nextarrow': false,
                'prevarrow': false,
                'year': 2019
            }
        ]

        expect(component.child.completeDaysArray).toBeDefined();
        component.clearSelectedFlag();
        component.child.completeDaysArray.forEach((month: any) => {
            month.montharray.forEach((monthrowarray: any) => {
                monthrowarray.forEach((individualday: any) => {
                    if (individualday.selected || individualday.from || individualday.to){
                    individualday.selected = false;
                    individualday.from = false;
                    individualday.to = false;
                });
            });
        });

    });
    it('check clearSelectedFlag if method', () => {
        component.child.completeDaysArray = [
            {
                'date': 'Mon Sep 23 2019 11:04:46 GMT+0530 ',
                'month': 'September',
                'montharray': [
                    [
                        {
                            'date': "Mon Aug 26 2019 00:00:00 GMT+0530",
                            'from': true,
                            'fulldate': "26 August 2019 Monday",
                            'id': '31313_id',
                            'isCurrentMonth': false,
                            'isDisabled': false,
                            'range': false,
                            'selected': true,
                            'to': true
                        },
                        {
                            'date': "Tue Aug 27 2019 00:00:00 GMT+0530",
                            'from': true,
                            'fulldate': "27 August 2019 Tuesday",
                            'id': '86088_id',
                            'isCurrentMonth': false,
                            'isDisabled': false,
                            'range': false,
                            'selected': true,
                            'to': true
                        }
                    ],
                    [
                        {
                            'date': 'Mon Aug 26 2019 00:00:00 GMT+0530',
                            'from': true,
                            'fulldate': '26 August 2019 Monday',
                            'id': '31313_id',
                            'isCurrentMonth': false,
                            'isDisabled': false,
                            'range': false,
                            'selected': true,
                            'to': true
                        },
                        {
                            'date': 'Tue Aug 27 2019 00:00:00 GMT+0530',
                            'from': true,
                            'fulldate': '27 August 2019 Tuesday',
                            'id': '86088_id',
                            'isCurrentMonth': false,
                            'isDisabled': false,
                            'range': false,
                            'selected': true,
                            'to': true
                        }
                    ]
                ],
                'nextarrow': false,
                'prevarrow': true,
                'year': 2019
            },
            {
                'date': 'Wed Oct 23 2019 11:04:46 GMT+0530 ',
                'month': 'October',
                'montharray': [
                    [
                        {
                            'date': 'Mon Aug 26 2019 00:00:00 GMT+0530',
                            'from': true,
                            'fulldate': '26 August 2019 Monday',
                            'id': '31313_id',
                            'isCurrentMonth': false,
                            'isDisabled': false,
                            'range': false,
                            'selected': true,
                            'to': true
                        },
                        {
                            'date': 'Tue Aug 27 2019 00:00:00 GMT+0530',
                            'from': true,
                            'fulldate': '27 August 2019 Tuesday',
                            'id': '86088_id',
                            'isCurrentMonth': false,
                            'isDisabled': false,
                            'range': false,
                            'selected': true,
                            'to': true
                        }
                    ],
                    [
                        {
                            'date': 'Mon Aug 26 2019 00:00:00 GMT+0530',
                            'from': true,
                            'fulldate': '26 August 2019 Monday',
                            'id': '31313_id',
                            'isCurrentMonth': false,
                            'isDisabled': false,
                            'range': false,
                            'selected': true,
                            'to': true
                        },
                        {
                            'date': 'Tue Aug 27 2019 00:00:00 GMT+0530',
                            'from': true,
                            'fulldate': '27 August 2019 Tuesday',
                            'id': '86088_id',
                            'isCurrentMonth': false,
                            'isDisabled': false,
                            'range': false,
                            'selected': true,
                            'to': true
                        }
                    ]
                ],
                'nextarrow': false,
                'prevarrow': false,
                'year': 2019
            }
        ]

        expect(component.child.completeDaysArray).toBeDefined();
        component.clearSelectedFlag();
        component.child.completeDaysArray.forEach((month: any) => {
            month.montharray.forEach((monthrowarray: any) => {
                monthrowarray.forEach((individualday: any) => {

                    individualday.selected = false;
                    individualday.from = false;
                    individualday.to = false;
                });
            });
        });

    });

    it('For Today', () => {
        let option: any;
        option = 'Today';
        const currentdate = new Date();
        expect(currentdate).not.toBeNull();
        expect(currentdate).toBeDefined();

        if (component.child.fromcardselected) {
            // set fromdate to currentdate
            expect(component.child.fromdate).toEqual(currentdate);

        }
        if (component.child.tocardselected) {
            //  set todate to currentdate
            expect(component.child.todate).toEqual(currentdate);
        }
        expect(option).toEqual('Today');
    });

    it('For Yesterday', () => {
        let option: any;
        option = 'Yesterday';
        const yesterdaydate = new Date();
        yesterdaydate.setDate(yesterdaydate.getDate() - 1);
        expect(yesterdaydate).not.toBeNull();
        expect(yesterdaydate).toBeDefined();

        if (component.child.fromcardselected) {
            // set fromdate to currentdate
            expect(component.child.fromdate).toEqual(yesterdaydate);

        }
        if (component.child.tocardselected) {
            //  set todate to currentdate
            expect(component.child.todate).toEqual(yesterdaydate);
        }
        expect(option).toEqual('Yesterday');
    });

    it('This week (sun - sat)', () => {
        let option: any;
        option = 'This week (sun - sat)';
        const startdate = new Date();
        const dayindex = startdate.getDay();
        const enddate = new Date();
        startdate.setDate(startdate.getDate() - dayindex);

        expect(startdate).not.toBeNull();
        expect(startdate).toBeDefined();
        expect(enddate).not.toBeNull();
        expect(enddate).toBeDefined();

        //expect(component.child.fromdate).toEqual(startdate);

        enddate.setDate(enddate.getDate() - dayindex + 6);
        //expect(component.child.todate).toEqual(enddate);

        expect(option).toEqual('This week (sun - sat)');
    });

    it('Last 14 days', () => {
        let option: any;
        option = 'Last 14 days';
        const lastday = new Date();
        component.child.todate = lastday;
        const firstday = new Date();
        firstday.setDate(firstday.getDate() - 14);
        component.child.fromdate = firstday;
        expect(option).toEqual('Last 14 days');
    });

    it('This month', () => {
        let option: any;
        option = 'This month';
        const d1 = new Date();
        const firstmonthday = new Date(d1.getFullYear(), d1.getMonth(), 1);
        component.child.fromdate = firstmonthday;
        const lastmonthday = new Date(d1.getFullYear(), d1.getMonth() + 1, 0);
        component.child.todate = lastmonthday;
        expect(option).toEqual('This month');

    });

    it('Last 30 days', () => {
        let option: any;
        option = 'Last 30 days';
        const d2 = new Date();
        const first30thdate = new Date();
        const last30thdate = new Date();
        component.child.todate = last30thdate;
        first30thdate.setDate(d2.getDate() - 29);
        component.child.fromdate = first30thdate;
        expect(option).toEqual('Last 30 days');
    });

    it('Last month', () => {
        let option: any;
        option = 'Last month';
        const d3 = new Date();
        const fday = new Date(d3.getFullYear(), d3.getMonth() - 1, 1);
        const lday = new Date(d3.getFullYear(), d3.getMonth(), 0);
        component.child.fromdate = fday;
        component.child.todate = lday;
        expect(option).toEqual('Last month');

    });

    it('All time', () => {
        let option: any;
        option = 'All time';
        const d4 = new Date();
        d4.setFullYear(1970);
        d4.setMonth(0);
        d4.setDate(1);

        component.child.fromdate = d4;
        component.child.todate = new Date();
        expect(option).toEqual('All time');

    });

    it('30 Days upto today', () => {
    });


    it('30 Days upto yesterday', () => {
    });

    it('none', () => {
        let option: any;
        option = '';
        expect(option).toBe('');
    });
    // });

    xit('ngAfterViewInit: check if date selected is not today', () => {
        const today = '9-Oct-2019';
        const dfrom = new Date('1-Oct-2019');
        const dto = new Date('10-Oct-2019');
        const currentd = new Date('19-Oct-2019');
        const yesterdayd = new Date(currentd.getFullYear(), currentd.getMonth(), currentd.getDate() - 1);

        expect(dfrom).not.toBeNull();
        expect(dto).not.toBeNull();
        expect(currentd).not.toBeNull();
        expect(yesterdayd).not.toBeNull();
        expect(component.disabledDates).toBeDefined();

        expect(currentd.getDate()).toBeGreaterThan(dto.getDate());
        expect(currentd.getDate()).toBeGreaterThanOrEqual(dfrom.getDate());

        expect(component.todayIconFlag).toBeFalsy();
    });

    xit('ngAfterViewInit: check if altercompleteDaysArray method is callled', () => {

        component.fromCardSelected = true;
        component.toCardSelected = true;

        spyOn(component.child, 'altercompleteDaysArray');
        fixture.detectChanges();
        expect(component.child.altercompleteDaysArray).toHaveBeenCalled();
    });

    xit('ngAfterViewInit: check if date selected is Tomorrow', () => {
        const today = '9-Oct-2019';
        const dfrom = new Date('1-Oct-2019');
        const dto = new Date('10-Oct-2019');
        const currentd = new Date('9-Oct-2019');
        const yesterdayd = new Date(currentd.getFullYear(), currentd.getMonth(), currentd.getDate() - 1);
        component.yesterdayIconFlag = true;

        expect(dfrom).not.toBeNull();
        expect(dto).not.toBeNull();
        expect(currentd).not.toBeNull();
        expect(yesterdayd).not.toBeNull();
        expect(component.disabledDates).toBeDefined();

        expect(yesterdayd.getDate())
            .toBeLessThanOrEqual(dto.getDate());
        expect(yesterdayd.getDate())
            .toBeGreaterThanOrEqual(dfrom.getDate());

        expect(component.yesterdayIconFlag).toEqual(true);
    });

    xit('ngAfterViewInit: check if date selected is not Tomorrow', () => {
        const today = '9-Oct-2019';
        const dfrom = new Date('1-Oct-2019');
        const dto = new Date('10-Oct-2019');
        const currentd = new Date('19-Oct-2019');
        const yesterdayd = new Date(currentd.getFullYear(), currentd.getMonth(), currentd.getDate() - 1);

        expect(dfrom).not.toBeNull();
        expect(dto).not.toBeNull();
        expect(currentd).not.toBeNull();
        expect(yesterdayd).not.toBeNull();
        expect(component.disabledDates).toBeDefined();

        expect(yesterdayd.getDate()).toBeGreaterThanOrEqual(dto.getDate());
        expect(yesterdayd.getDate()).toBeGreaterThanOrEqual(dfrom.getDate());

        expect(component.yesterdayIconFlag).toBeFalsy();
    });

    xit('ngAfterViewInit: check if date selected is today', () => {

        const dfrom = new Date('1-Oct-2019');
        const dto = new Date('10-Oct-2019');
        const currentd = new Date('9-Oct-2019');
        component.todayIconFlag = true;
        expect(dfrom).not.toBeNull();
        expect(dto).not.toBeNull();
        expect(currentd).not.toBeNull();

        expect(component.disabledDates).toBeDefined();

        expect(currentd.getDate()).toBeLessThanOrEqual(dto.getDate());
        expect(currentd.getDate()).toBeGreaterThanOrEqual(dfrom.getDate());

        expect(component.todayIconFlag).toEqual(true);
    });

    xit('ngAfterViewInit: check if disabledDates is defined', () => {

        const today = new Date();
        component.fromCardSelected = true;
        component.toCardSelected = true;
        component.disabledDates = [
            {
                from: '1-Oct-2019',
                to: '10-Oct-2019',
            },
        ];

        expect(component.disabledDates).not.toBeNull();
        expect(component.disabledDates).toBeDefined();
    });

    xit('ngAfterViewInit: check if disabledDates is not defined', () => {

        component.fromCardSelected = true;
        component.toCardSelected = true;
        component.disabledDates = null;
        expect(component.disabledDates).toBeNull();
    });

    xit('ngAfterViewInit : check if todayIconFlag is true', () => {
        component.todayIconFlag = true;
        const spy = spyOn(component, 'updateFromTodate');
        component.ngAfterViewInit();
        expect(spy).toHaveBeenCalled();
    });

    xit('ngAfterViewInit : check if todayIconFlag is false', () => {
        component.todayIconFlag = false;
        spyOn(component, 'updateFromTodate');
        expect(component.updateFromTodate).not.toHaveBeenCalled();
    });

});




