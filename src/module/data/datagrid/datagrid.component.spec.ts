import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { IconLoaderService } from '../../../index';
import { AmexioDatagridComponent } from './datagrid.component';
import { CommonDataService } from '../../services/data/common.data.service';
import { AmexioGridColumnComponent } from './data.grid.column';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { DataGridFilterComponent } from './datagrid.filter.component';
import { CommonIconComponent } from './../../base/components/common.icon.component';
import {DisplayFieldComponent} from './../../base/display-field/display-field.component';
import { AmexioContextMenuComponent } from './../../base/base.contextmenu.component';
import { AmexioPaginatorComponent } from './../paginator/paginator.component';

describe('amexio-datagrid', () => {
    let comp: AmexioDatagridComponent;
    let fixture: ComponentFixture<AmexioDatagridComponent>;

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [FormsModule, HttpClientModule],
            declarations: [AmexioDatagridComponent, AmexioPaginatorComponent, AmexioContextMenuComponent, DisplayFieldComponent, CommonIconComponent, DataGridFilterComponent, AmexioGridColumnComponent],
            providers: [IconLoaderService, CommonDataService],
        });
        fixture = TestBed.createComponent(AmexioDatagridComponent);
        comp = fixture.componentInstance;

    });

    it('Variabledatagrid check', () => {
        comp.checkDefaultIcon = 'checkbox default';
        comp.checkBoxActive = 'checkbox active';
    });

    it('selectRecord Check', () => {       
        comp.selectAllRecord();
        comp.selectAll = false;
       expect(comp.selectAll).toEqual(false);
       comp.selectAll = true;
       expect(comp.selectAll).toEqual(true);
       for (const vr of comp.viewRows) {
        vr.checkBoxSelectClass = comp.checkBoxActive;
        comp.selectedRows.push(vr);
       }
    })

    it('selectRow Else Check', () => {
        comp.selectAllRecord();
        comp.selectAll = true;
        expect(comp.selectAll).toEqual(true);
        comp.selectAll = false;
        expect(comp.selectAll).toEqual(false);
        for (const vr of comp.viewRows) {
            vr.checkBoxSelectClass = comp.checkDefaultIcon;
        }
    })

    it('setCheckBoxSelectClass Check', () => {
        comp.setCheckBoxSelectClass();
        comp.selectAll = true;
        expect(comp.selectAll).toEqual(true);
        return comp.checkBoxActive;
    })

    it('setSelectedRow If Check', () => {
        let rowData: any;
        let event = { classList: {
            value:'checkbox active'
        }};
        comp.setSelectedRow(rowData, event);
        expect(event.classList.value).toEqual(comp.checkDefaultIcon);
        comp.selectedRows.push(rowData);
        event.classList.value = comp.checkBoxActive;
    })

    it('setSelectedRow Else Check', () => {
        let rowData: {countryName: "Myanmar", countryCode1: "MM", countryCode2: "MMR", countryFlag: "MM.png", capital: ""}
        let event = { classList: {
            value:'checkbox default'
        }};
        comp.setSelectedRow(rowData, event);
        expect(event.classList.value).not.toEqual(comp.checkDefaultIcon);
        const indexOf = comp.selectedRows.indexOf(rowData);
        comp.selectedRows.splice(indexOf, 1);
        event.classList.value = comp.checkDefaultIcon;

    })
});
