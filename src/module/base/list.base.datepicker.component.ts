/*
* Copyright [2019] [Metamagic]
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*     http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/

import { ChangeDetectorRef, Component, ElementRef, Renderer2 } from '@angular/core';
import { AmexioFormValidator } from '../forms/form-validator/amexio.form.validator.component';
import { BaseInput } from './base.input.component';
// @Component({
//     selector: 'list.base.datepicker',
//     template: './list.base.datepicker.component.html',
// })

export class ListBaseDatepickerComponent<T> extends AmexioFormValidator {

    self = false;
    itemClick = false;
    dropdownstyle: any;
    documentClickListener: any;
    listen = true;
    yearList1: any[];
    yearList2: any[];
    monthList1: any[];
    monthList2: any[];
    currrentDate: any;
    curYear: any;
    monthNo: any;
    yearNo: any;

    constructor(public renderer: Renderer2, public element: ElementRef, private cd: ChangeDetectorRef) {
        super();
        this.hide();
    }

    focus(event: any) {
        this.self = true;
        this.dropdownstyle = { visibility: 'visible' };
        this.bindDocumentClickListener();
    }

    blur(event: any) {
        this.itemClicked();
    }

    itemClicked() {
        this.itemClick = true;
        this.hide();
        this.unbindDocumentClickListener();
        this.clearClicks();
    }

    bindDocumentClickListener() {
        if (!this.documentClickListener && this.listen) {
            this.documentClickListener = this.renderer
                .listen('document', 'click', (event: any) => this.handleDocumentListener(event));

        }
    }

    handleDocumentListener(event: any) {
        if (!this.self && !this.itemClick) {
            this.hide();
            this.unbindDocumentClickListener();
        }
        this.clearClicks();
        this.cd.markForCheck();
    }

    clearClicks() {
        this.self = false;
        this.itemClick = false;
    }

    unbindDocumentClickListener() {
        if (this.documentClickListener) {
            this.documentClickListener();
            this.documentClickListener = null;
        }
    }

    hide() {
        if (this.listen) {
            this.dropdownstyle = { visibility: 'hidden' };
        }
    }

    commonDeclaration() {
        this.currrentDate = new Date();
        this.yearList1 =
            [{ year: 0, flag: false, disabled: false },
            { year: 0, flag: false, disabled: false },
            { year: 0, flag: false, disabled: false },
            { year: 0, flag: false, disabled: false },
            { year: 0, flag: false, disabled: false },
            ];
        // generate yearlist1 ids
        this.yearList1.forEach((yearlist1element: any) => {
            yearlist1element['id'] = window.crypto.getRandomValues(new Uint32Array(1))[0] / 4294967295 + '_id';
        });
        this.yearList2 = [{ year: 0, flag: false, disabled: false }, { year: 0, flag: false, disabled: false },
        { year: 0, flag: false, disabled: false }, { year: 0, flag: false, disabled: false },
        { year: 0, flag: false, disabled: false }];
        // generate yearlist2 ids
        this.yearList2.forEach((yearlist2element: any) => {
            yearlist2element['id'] = window.crypto.getRandomValues(new Uint32Array(1))[0] / 4294967295 + '_id';
        });
        this.monthList1 = [
            { name: 'Jan', flag: false, num: 4, fullname: 'January' },
            { name: 'Feb', flag: false, fullname: 'febuary' },
            { name: 'Mar', flag: false, fullname: 'march' },
            { name: 'Apr', flag: false, fullname: 'april' },
            { name: 'May', flag: false, fullname: 'may' },
            { name: 'Jun', flag: false, fullname: 'june' },
        ];
        // generate id for monthlist1
        this.monthList1.forEach((monthlist1element: any) => {
            monthlist1element['id'] = window.crypto.getRandomValues(new Uint32Array(1))[0] / 4294967295 + '_id';
        });
        this.monthList2 = [
            { name: 'Jul', flag: false, fullname: 'july' },
            { name: 'Aug', flag: false, fullname: 'august' },
            { name: 'Sep', flag: false, fullname: 'september' },
            { name: 'Oct', flag: false, fullname: 'october' },
            { name: 'Nov', flag: false, fullname: 'november' },
            { name: 'Dec', flag: false, fullname: 'december' },
        ];
        // generate id for monthlist 2
        this.monthList2.forEach((monthlist2element: any) => {
            monthlist2element['id'] = window.crypto.getRandomValues(new Uint32Array(1))[0] / 4294967295 + '_id';
        });

        this.curYear = this.currrentDate.getFullYear();
        let i = 0;
        let j = 0;
        for (i = 4; i >= 0; i--) {
            this.yearList1[j].year = this.curYear - i;
            j++;
        }
        j = 0;
        for (i = 1; i <= 5; i++) {
            this.yearList2[j].year = this.curYear + i;
            j++;
        }
    }

    getDropdownMonth(month: any) {
        this.monthList1.forEach((element: any) => {
            this.elementFlagMethod(element);
        });
        this.monthList2.forEach((element: any) => {
            this.elementFlagMethod(element);
        });
        this.monthList1.forEach((element: any) => {
            this.chkMonth(element, month);
        });
        this.monthList2.forEach((element: any) => {
            this.chkMonth(element, month);
        });
        switch (month.name) {
            case 'Jan':
                this.monthNo = 0;
                break;
            case 'Feb':
                this.monthNo = 1;
                break;
            case 'Mar':
                this.monthNo = 2;
                break;
            case 'Apr':
                this.monthNo = 3;
                break;
            case 'May':
                this.monthNo = 4;
                break;
            case 'Jun':
                this.monthNo = 5;
                break;
            case 'Jul':
                this.monthNo = 6;
                break;
            case 'Aug':
                this.monthNo = 7;
                break;
            case 'Sep':
                this.monthNo = 8;
                break;
            case 'Oct':
                this.monthNo = 9;
                break;
            case 'Nov':
                this.monthNo = 10;
                break;
            case 'Dec':
                this.monthNo = 11;
                break;
            default:
                break;
        }
        this.focus({});
    }

    // Added method to avois recursive code
    elementFlagMethod(element: any) {
        if (element.flag) {
            element.flag = false;
        }
    }

    // this function broken from chk month getDropdownMonth()
    chkMonth(element: any, month: any) {
        if (element.name === month.name) {
            element.flag = true;
        }
    }

    getDropdownYear(year: any) {
        this.yearList1.forEach((element: any) => {
            // negate dropdown year flag
            this.yearFlagNegate(element);
        });
        this.yearList2.forEach((element: any) => {
            // negate dropdown year flag
            this.yearFlagNegate(element);
        });
        this.yearList1.forEach((element: any) => {
            this.yearFlag(element, year);
        });
        this.yearList2.forEach((element: any) => {
            this.yearFlag(element, year);
        });
        this.yearNo = year.year;
        this.focus({});
    }

    // this function is broken from getDropdownYear
    private yearFlagNegate(element: any) {
        this.elementFlagMethod(element);
    }

    // this function is broken from getDropdownYear
    yearFlag(element: any, year: any) {
        if (element.year === year.year) {
            element.flag = true;
        }
    }
}
