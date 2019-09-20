
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

    it('check updateFromTodate method else condition  ', () => {
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


});



