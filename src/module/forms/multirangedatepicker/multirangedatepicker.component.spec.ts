
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

    it('ngAfterViewInit: check if disabledDates is not defined', () => {
        component.fromCardSelected = component.child.fromcardselected;
        component.toCardSelected = component.child.tocardselected;
        component.disabledDates = null;
        expect(component.disabledDates).toBeNull();
    });

    it('ngAfterViewInit: check if date is today', () => {

        component.ngAfterViewInit();
        component.fromCardSelected = component.child.fromcardselected;
        component.toCardSelected = component.child.tocardselected;
        component.child.altercompleteDaysArray();


   component.disabledDates = [
            {
                "from": "13-Jul-2018",
                "to": "15-Jul-2018"
            },
            {
                "from": "20-Jul-2018",
                "to": "23-Jul-2018"
            },
            {
                "from": "15-Jun-2018",
                "to": "19-Jun-2018"
            },
            {
                "from": "27-Jun-2018",
                "to": "29-Jun-2018"
            },
            {
                "from": "23-Aug-2018",
                "to": "28-Aug-2018"
            },
            {
                "from": "17-Aug-2018",
                "to": "19-Aug-2018"
            },
            {
                "from": "19-Sep-2018",
                "to": "21-Sep-2018"
            },
            {
                "from": "1-Nov-2018",
                "to": "30-Nov-2018"
            }
        ];
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
                expect(currentd.getDate()).toBeLessThanOrEqual(dto.getDate());
                expect(currentd.getDate()).toBeGreaterThanOrEqual(dfrom.getDate());

                expect(component.todayIconFlag).toEqual(true);
            }
            if ((yesterdayd <= dto) && (yesterdayd >= dfrom)) {
                component.yesterdayIconFlag = true;

                expect(yesterdayd.getDate()).toBeLessThanOrEqual(dto.getDate());
                expect(yesterdayd.getDate()).toBeGreaterThanOrEqual(dfrom.getDate());
                expect(component.yesterdayIconFlag).toEqual(true);
            }
            component.todayIconFlag = true;
            expect(component.todayIconFlag).toEqual(true);
            if (component.todayIconFlag) {
                // spyOn(component, 'updateFromTodate');
                expect(component.updateFromTodate).toHaveBeenCalled;
            }
        });
    });

    it('ngAfterViewInit: method todayIconFlag is false ', () => {
        component.ngAfterViewInit();
        component.fromCardSelected = component.child.fromcardselected;
        component.toCardSelected = component.child.tocardselected;
        component.child.altercompleteDaysArray();

        component.disabledDates = [
            {
                "from": "13-Jul-2018",
                "to": "15-Jul-2018"
            },
            {
                "from": "20-Jul-2018",
                "to": "23-Jul-2018"
            },
            {
                "from": "15-Jun-2018",
                "to": "19-Jun-2018"
            },
            {
                "from": "27-Jun-2018",
                "to": "29-Jun-2018"
            },
            {
                "from": "23-Aug-2018",
                "to": "28-Aug-2018"
            },
            {
                "from": "17-Aug-2018",
                "to": "19-Aug-2018"
            },
            {
                "from": "19-Sep-2018",
                "to": "21-Sep-2018"
            },
            {
                "from": "1-Nov-2018",
                "to": "30-Nov-2018"
            }
        ];
        expect(component.disabledDates).toBeDefined();
        component.disabledDates.forEach((element: any) => {
            const dfrom = new Date(element.from);
            const dto = new Date(element.to);
            const currentd = new Date();
            const today = new Date(currentd.getFullYear(), currentd.getMonth(), currentd.getDate() + 1);
            const yesterdayd = new Date(currentd.getFullYear(), currentd.getMonth(), currentd.getDate() - 1);

            expect(dfrom).not.toBeNull();
            expect(dto).not.toBeNull();
            expect(currentd).not.toBeNull();
            expect(yesterdayd).not.toBeNull();
            expect(today.getDate()).toBeGreaterThanOrEqual(dto.getDate());
            expect(today.getDate()).toBeLessThanOrEqual(dfrom.getDate());
            component.todayIconFlag = false;
        });

        expect(component.todayIconFlag).toEqual(false);
        expect(component.updateFromTodate).not.toHaveBeenCalled;
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

    it('ResetDaysTillYesterday: till yesterday   ', () => {

        component.ResetDaysTillYesterday();
        const d = new Date();
        const newfrm = new Date(d.getFullYear(), d.getMonth(), d.getDate() - component.daysOptionYesterday);
        component.child.fromdate = newfrm;
        // change todate
        const newto = new Date(d.getFullYear(), d.getMonth(), d.getDate() - 1);
        component.child.todate = newto;
        component.child.altercompleteDaysArray();

    });

    it('ResetDaysTillToday: till today ', () => {
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

        component.alterCompleteDaysArray(incdate);
        expect(component.alterCompleteDaysArray).toHaveBeenCalled;

    });

    it('updateFromTodate :check flag false ', () => {
        const flag = false;
        expect(flag).toEqual(false);
    });

    it('clearSelectedFlag :if individualday.selected is true', () => {
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
                    individualday.selected = true;
                    individualday.from = false;
                    individualday.to = false;
                    expect(individualday.selected).toEqual(true);;
                    expect(individualday.from).toEqual(false);;
                    expect(individualday.to).toEqual(false);;

                    if (individualday.selected || individualday.from || individualday.to) {

                        individualday.selected = false;
                        individualday.from = false;
                        individualday.to = false;
                        expect(individualday.selected).toEqual(false);;
                        expect(individualday.from).toEqual(false);;
                        expect(individualday.to).toEqual(false);;
                    }
                });
            });

        });
    });

    it('clearSelectedFlag :if individualday.from is true', () => {
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
                    individualday.from = true;
                    individualday.selected = false;
                    individualday.to = false;
                    expect(individualday.from).toEqual(true);;
                    expect(individualday.selected).toEqual(false);;
                    expect(individualday.to).toEqual(false);;
                    if (individualday.selected || individualday.from || individualday.to) {

                        individualday.selected = false;
                        individualday.from = false;
                        individualday.to = false;

                        expect(individualday.selected).toEqual(false);;
                        expect(individualday.from).toEqual(false);;
                        expect(individualday.to).toEqual(false);;
                    }
                });
            });
        });

    });

    it('clearSelectedFlag :if individualday.to is true', () => {
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

                    individualday.to = true;
                    individualday.selected = false;
                    individualday.from = false;
                    expect(individualday.to).toEqual(true);;
                    expect(individualday.selected).toEqual(false);;
                    expect(individualday.from).toEqual(false);;
                    if (individualday.selected || individualday.from || individualday.to) {
                        individualday.selected = false;
                        individualday.from = false;
                        individualday.to = false;
                        expect(individualday.selected).toEqual(false);;
                        expect(individualday.from).toEqual(false);;
                        expect(individualday.to).toEqual(false);;
                    }
                });
            });
        });
    });

    it('clearSelectedFlag : if individualday.to and individualday.selected is true', () => {
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

                    individualday.to = true;
                    individualday.selected = true;
                    individualday.from = false;
                    expect(individualday.to).toEqual(true);;
                    expect(individualday.selected).toEqual(true);;
                    expect(individualday.from).toEqual(false);;
                    if (individualday.selected || individualday.from || individualday.to) {
                        individualday.selected = false;
                        individualday.from = false;
                        individualday.to = false;
                        expect(individualday.selected).toEqual(false);;
                        expect(individualday.from).toEqual(false);;
                        expect(individualday.to).toEqual(false);;
                    }
                });
            });
        });
    });

    it('clearSelectedFlag :if all false', () => {
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

                    individualday.to = false;
                    individualday.selected = false;
                    individualday.from = false;
                    expect(individualday.to).toEqual(false);;
                    expect(individualday.selected).toEqual(false);;
                    expect(individualday.from).toEqual(false);;
                });
            });
        });
    });

    it('Option: Today selecetd to-from-date true', () => {
        let option: any;
        option = 'Today';
        component.selectRangeOption(option);
        const currentdate = new Date();
        expect(currentdate).not.toBeNull();
        expect(currentdate).toBeDefined();
        component.child.fromcardselected = true;
        if (component.child.fromcardselected) {
            // set fromdate to currentdate
            expect(component.child.fromcardselected).toEqual(true);;
            component.child.fromdate = currentdate;
            expect(component.child.fromdate).toEqual(currentdate);
        }
        component.child.tocardselected = false;
        if (component.child.tocardselected) {
            //  set todate to currentdate
            expect(component.child.tocardselected).toEqual(true);;
            component.child.todate = currentdate;
            expect(component.child.todate).toEqual(currentdate);
        }
        expect(option).toEqual('Today');
    });

    it('Option: Today selecetd to-from-date false', () => {
        let option: any;
        option = 'Today';
        component.selectRangeOption(option);
        const currentdate = new Date();
        expect(currentdate).not.toBeNull();
        expect(currentdate).toBeDefined();
        component.child.fromcardselected = false;
        expect(component.child.fromcardselected).toEqual(false);;

        component.child.tocardselected = false;
        expect(component.child.tocardselected).toEqual(false);;
        expect(option).toEqual('Today');
    });

    it('Option: Yesterday to-from-date true', () => {
        let option: any;
        option = 'Yesterday';
        component.selectRangeOption(option);
        const yesterdaydate = new Date();
        yesterdaydate.setDate(yesterdaydate.getDate() - 1);
        expect(yesterdaydate).not.toBeNull();
        expect(yesterdaydate).toBeDefined();

        component.child.fromcardselected = true;

        if (component.child.fromcardselected) {
            // set fromdate to currentdate
            component.child.fromdate = yesterdaydate;
            expect(component.child.fromdate).toEqual(yesterdaydate);
            expect(component.child.fromcardselected).toEqual(true);
        }
        component.child.tocardselected = true;

        if (component.child.tocardselected) {
            //  set todate to currentdate
            component.child.todate = yesterdaydate;
            expect(component.child.tocardselected).toEqual(true);
            expect(component.child.todate).toEqual(yesterdaydate);
        }
        expect(option).toEqual('Yesterday');
    });

    it('Option: Yesterday to-from-date false', () => {
        let option: any;
        option = 'Yesterday';
        component.selectRangeOption(option);
        const yesterdaydate = new Date();
        yesterdaydate.setDate(yesterdaydate.getDate() - 1);
        expect(yesterdaydate).not.toBeNull();
        expect(yesterdaydate).toBeDefined();

        component.child.fromcardselected = false;
        expect(component.child.fromcardselected).toEqual(false);
        expect(component.child.fromdate).not.toEqual(yesterdaydate);
        component.child.tocardselected = false;
        expect(component.child.tocardselected).toEqual(false);
        expect(component.child.todate).not.toEqual(yesterdaydate);

        expect(option).toEqual('Yesterday');
    });

    it('Option: This week (sun - sat)', () => {
        let option: any;
        option = 'This week (sun - sat)';
        component.selectRangeOption(option);
        const startdate = new Date();
        const dayindex = startdate.getDay();
        const enddate = new Date();
        startdate.setDate(startdate.getDate() - dayindex);

        expect(startdate).not.toBeNull();
        expect(startdate).toBeDefined();
        expect(enddate).not.toBeNull();
        expect(enddate).toBeDefined();

        enddate.setDate(enddate.getDate() - dayindex + 6);

        expect(option).toEqual('This week (sun - sat)');
    });

    it('Option: Last 14 days', () => {
        let option: any;
        option = 'Last 14 days';
        component.selectRangeOption(option);
        const lastday = new Date();
        component.child.todate = lastday;
        const firstday = new Date();
        firstday.setDate(firstday.getDate() - 14);
        component.child.fromdate = firstday;
        expect(option).toEqual('Last 14 days');
    });

    it('Option: This month', () => {
        let option: any;
        option = 'This month';
        component.selectRangeOption(option);
        const d1 = new Date();
        const firstmonthday = new Date(d1.getFullYear(), d1.getMonth(), 1);
        component.child.fromdate = firstmonthday;
        const lastmonthday = new Date(d1.getFullYear(), d1.getMonth() + 1, 0);
        component.child.todate = lastmonthday;
        expect(option).toEqual('This month');

    });

    it('Option: Last 30 days', () => {
        let option: any;
        option = 'Last 30 days';
        component.selectRangeOption(option);
        const d2 = new Date();
        const first30thdate = new Date();
        const last30thdate = new Date();
        component.child.todate = last30thdate;
        first30thdate.setDate(d2.getDate() - 29);
        component.child.fromdate = first30thdate;
        expect(option).toEqual('Last 30 days');
    });

    it('Option: Last month', () => {
        let option: any;
        option = 'Last month';
        component.selectRangeOption(option);
        const d3 = new Date();
        const fday = new Date(d3.getFullYear(), d3.getMonth() - 1, 1);
        const lday = new Date(d3.getFullYear(), d3.getMonth(), 0);
        component.child.fromdate = fday;
        component.child.todate = lday;
        expect(option).toEqual('Last month');

    });

    it('Option: All time', () => {
        let option: any;
        option = 'All time';
        component.selectRangeOption(option);
        const d4 = new Date();
        d4.setFullYear(1970);
        d4.setMonth(0);
        d4.setDate(1);

        component.child.fromdate = d4;
        component.child.todate = new Date();
        expect(option).toEqual('All time');

    });

    it('Option: 30 Days upto today', () => {
        let option: any;
        option = '30 Days upto today';
        component.selectRangeOption(option);
    });


    it('Option: 30 Days upto yesterday', () => {
        let option: any;
        option = '30 Days upto yesterday';
        component.selectRangeOption(option);
    });

    it('Option: default', () => {
        let option: any;
        option = '';
        expect(option).toBe('');
    });


    it('altercompleteDaysArray: for same dates', () => {
        const incdate = new Date();
        component.alterCompleteDaysArray(incdate);
        // spyOn(component,'clearSelectedFlag');
        // fixture.detectChanges();
        // component.clearSelectedFlag();

        //        expect(component.clearSelectedFlag()).toHaveBeenCalled();


        component.child.completeDaysArray = [
            {
                'date': 'Mon Aug 26 2019 00:00:00 GMT+0530',
                'month': 'August',
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
            }
        ];


        component.child.completeDaysArray.forEach((month: any) => {
            month.montharray.forEach((monthrowarray: any) => {

                monthrowarray.forEach((individualday: any) => {
                    const inddate = new Date(individualday.date);
                    if ((inddate.getFullYear() === incdate.getFullYear()) &&
                        (inddate.getMonth() === incdate.getMonth()) &&
                        (inddate.getDate() === incdate.getDate())) {

                        expect(inddate.getFullYear()).toEqual(incdate.getFullYear());
                        expect(inddate.getMonth()).toEqual(incdate.getMonth());
                        expect(inddate.getDate()).toEqual(incdate.getDate());

                        individualday.selected = true;
                        individualday.from = true;
                        individualday.to = true;

                        expect(individualday.selected).toEqual(true);;
                        expect(individualday.from).toEqual(true);;
                        expect(individualday.to).toEqual(true);;
                    }
                });

            });
        });
    });

    it('altercompleteDaysArray: for different year', () => {
        const incdate = new Date('Mon Aug 26 2017 00:00:00 GMT+0530');
        component.alterCompleteDaysArray(incdate);
        // spyOn(component,'clearSelectedFlag');
        // fixture.detectChanges();
        // component.clearSelectedFlag();

        //        expect(component.clearSelectedFlag()).toHaveBeenCalled();


        component.child.completeDaysArray = [
            {
                'date': 'Mon Aug 26 2017 00:00:00 GMT+0530',
                'month': 'August',
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
                        }
                    ]
                ],
                'nextarrow': false,
                'prevarrow': true,
                'year': 2019
            }
        ];


        component.child.completeDaysArray.forEach((month: any) => {
            month.montharray.forEach((monthrowarray: any) => {

                monthrowarray.forEach((individualday: any) => {
                    const inddate = new Date(individualday.date);

                    expect(inddate.getFullYear()).not.toEqual(incdate.getFullYear());
                    expect(inddate.getMonth()).toEqual(incdate.getMonth());
                    expect(inddate.getDate()).toEqual(incdate.getDate());


                    individualday.selected = false;
                    individualday.from = false;
                    individualday.to = false;


                    expect(individualday.selected).toEqual(false);;
                    expect(individualday.from).toEqual(false);;
                    expect(individualday.to).toEqual(false);;
                });

            });
        });
    });

    it('altercompleteDaysArray: for different year and day', () => {
        const incdate = new Date('Mon Aug 2 2017 00:00:00 GMT+0530');
        component.alterCompleteDaysArray(incdate);
        // spyOn(component,'clearSelectedFlag');
        // fixture.detectChanges();
        // component.clearSelectedFlag();

        //        expect(component.clearSelectedFlag()).toHaveBeenCalled();


        component.child.completeDaysArray = [
            {
                'date': 'Mon Aug 26 2017 00:00:00 GMT+0530',
                'month': 'August',
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
            }
        ];


        component.child.completeDaysArray.forEach((month: any) => {
            month.montharray.forEach((monthrowarray: any) => {

                monthrowarray.forEach((individualday: any) => {
                    const inddate = new Date(individualday.date);

                    expect(inddate.getFullYear()).not.toEqual(incdate.getFullYear());
                    expect(inddate.getMonth()).toEqual(incdate.getMonth());
                    expect(inddate.getDate()).not.toEqual(incdate.getDate());


                    individualday.selected = false;
                    individualday.from = false;
                    individualday.to = false;


                    expect(individualday.selected).toEqual(false);;
                    expect(individualday.from).toEqual(false);;
                    expect(individualday.to).toEqual(false);;
                });

            });
        });
    });

    it('altercompleteDaysArray: for different year, month and day', () => {
        const incdate = new Date('Mon Oct 2 2017 00:00:00 GMT+0530');
        component.alterCompleteDaysArray(incdate);
        // spyOn(component,'clearSelectedFlag');
        // fixture.detectChanges();
        // component.clearSelectedFlag();

        // expect(component.clearSelectedFlag()).toHaveBeenCalled();


        component.child.completeDaysArray = [
            {
                'date': 'Mon Aug 26 2017 00:00:00 GMT+0530',
                'month': 'August',
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
            }
        ];


        component.child.completeDaysArray.forEach((month: any) => {
            month.montharray.forEach((monthrowarray: any) => {

                monthrowarray.forEach((individualday: any) => {
                    const inddate = new Date(individualday.date);

                    expect(inddate.getFullYear()).not.toEqual(incdate.getFullYear());
                    expect(inddate.getMonth()).not.toEqual(incdate.getMonth());
                    expect(inddate.getDate()).not.toEqual(incdate.getDate());


                    individualday.selected = false;
                    individualday.from = false;
                    individualday.to = false;


                    expect(individualday.selected).toEqual(false);;
                    expect(individualday.from).toEqual(false);;
                    expect(individualday.to).toEqual(false);;
                });

            });
        });
    });

    /*
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

        expect(component.todayIconFlag).toEqual(false);;
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

        expect(component.yesterdayIconFlag).toEqual(false);;
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
*/
});

