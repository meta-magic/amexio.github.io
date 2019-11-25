import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { IconLoaderService } from '../../../../../public-api';
import { CommonIconComponent } from '../../../base/components/common.icon.component';
import { CommonDataService } from '../../../services/data/common.data.service';
import { AmexioRadioGroupComponent } from '../../forms/radio/radiogroup.component';
import { DataGridFilterComponent } from './datagrid.filter.component';

import { HttpClient, HttpClientModule } from '@angular/common/http';

describe('amexio-datagrid-filter', () => {
    let comp: DataGridFilterComponent;
    let fixture: ComponentFixture<DataGridFilterComponent>;

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [FormsModule, HttpClientModule],
            declarations: [DataGridFilterComponent, CommonIconComponent, AmexioRadioGroupComponent],
            providers: [HttpClient, IconLoaderService, CommonDataService],
        });
        fixture = TestBed.createComponent(DataGridFilterComponent);
        comp = fixture.componentInstance;
    });

    it('Variabledatagrid Filter', () => {
        comp.model1 = 'OR';
    });

    xit('constructor call()', () => {
        comp.constructor();
        comp.option = 'OR';
        comp.radioGroupData = {
            response: {
                data: [{
                    filterOption: 'AND',
                }, {
                    filterOption: 'OR',
                }],
            },
        };
    });

    it('setSelectedOption If Method', () => {
        const col = {
            columnIndex: 0,
            contextmenu: 'undefined',
            dataindex: 'preferredFullName',
            datatype: 'string',
            filterIcon: true,
            hidden: false,
            lastColumn: 3,
            sort: true,
            text: 'Full Name',
            width: 'undefined',
        };

        const event = {
            filterOption: 'AND',
            selected: true,
        };

        comp.setSelectedOption(col, event);
        expect(event.filterOption).toEqual('AND');
        comp.option = 'AND';
        comp.keyUpSearch(col);

    });

    it('setSelectedOption Else Method', () => {
        const col = {
            columnIndex: 0,
            contextmenu: 'undefined',
            dataindex: 'preferredFullName',
            datatype: 'string',
            filterIcon: true,
            hidden: false,
            lastColumn: 3,
            sort: true,
            text: 'Full Name',
            width: 'undefined',
        };

        const event = {
            filterOption: 'OR',
            selected: true,
        };

        comp.setSelectedOption(col, event);
        expect(event.filterOption).not.toEqual('AND');
        comp.option = 'OR';
        comp.keyUpSearch(col);

    });

});
