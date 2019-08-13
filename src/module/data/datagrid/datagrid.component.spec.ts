import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { IconLoaderService } from '../../../index';
import { AmexioDatagridComponent } from './datagrid.component';
import { CommonDataService } from '../../services/data/common.data.service';
import { AmexioGridColumnComponent } from './data.grid.column';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { DataGridFilterComponent } from './datagrid.filter.component';
import { CommonIconComponent } from './../../base/components/common.icon.component';
import { DisplayFieldComponent } from './../../base/display-field/display-field.component';
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


    it('setCheckBoxSelectClass  if Check', () => {
        comp.selectAll = true;
        comp.setCheckBoxSelectClass();
        expect(comp.selectAll).toEqual(true);
        return comp.checkBoxActive;
    })
    it('setCheckBoxSelectClass else Check', () => {
        comp.selectAll = false;
        comp.setCheckBoxSelectClass();
        expect(comp.selectAll).toEqual(false);
        return comp.checkDefaultIcon;
    })
    it('setSelectedRow If Check', () => {
        let rowData: any;
        let event = {
            classList: {
                value: 'checkbox active'
            }
        };
        comp.setSelectedRow(rowData, event);
        expect(event.classList.value).toEqual(comp.checkDefaultIcon);
        comp.selectedRows.push(rowData);
        event.classList.value = comp.checkBoxActive;
    })

    it('setSelectedRow Else Check', () => {
        let rowData: { countryName: "Myanmar", countryCode1: "MM", countryCode2: "MMR", countryFlag: "MM.png", capital: "" }
        let event = {
            classList: {
                value: 'checkbox default'
            }
        };
        comp.setSelectedRow(rowData, event);
        expect(event.classList.value).not.toEqual(comp.checkDefaultIcon);
        const indexOf = comp.selectedRows.indexOf(rowData);
        comp.selectedRows.splice(indexOf, 1);
        event.classList.value = comp.checkDefaultIcon;

    })

    it('setSelectedFlag If Check', () => {
        let viewRows1 = [
            { personName: "Jaydeep Saxena", personAge: "35", designation: "Developer" },
            { personName: "Shweta Kulkarni", personAge: "24", designation: "Jr. Developer" },
            { personName: "Karan Mathur", personAge: "35", designation: "Developer" },
            { personName: "Krishna Sethi", personAge: "32", designation: "Software Tester" }
        ];
        comp.setSelectedFlag(viewRows1);
        viewRows1 = [
            { personName: "Jaydeep Saxena", personAge: "35", designation: "Developer" },
            { personName: "Shweta Kulkarni", personAge: "24", designation: "Jr. Developer" },
            { personName: "Karan Mathur", personAge: "35", designation: "Developer" },
            { personName: "Krishna Sethi", personAge: "32", designation: "Software Tester" }
        ];
        viewRows1.forEach((row: any) => {
            expect(row.hasOwnProperty('isSelected')).toEqual(false);
            row['isSelected'] = false;
            row['checkBoxSelectClass'] = comp.checkDefaultIcon;
        })

    })

    it('setSelectedFlag ElseIf check', () => {
        comp.enablecheckbox = true;
        let viewRows2 = [
            { personName: "Jaydeep Saxena", personAge: "35", designation: "Developer", isSelected: true },
            { personName: "Shweta Kulkarni", personAge: "24", designation: "Jr. Developer", isSelected: true },
            { personName: "Karan Malohtra", personAge: "35", designation: "Developer", isSelected: true },
            { personName: "Krishna Sethi", personAge: "27", designation: "Software Eng", isSelected: true }
        ];
        comp.setSelectedFlag(viewRows2);
        viewRows2 = [
            { personName: "Jaydeep Saxena", personAge: "35", designation: "Developer", isSelected: true },
            { personName: "Shweta Kulkarni", personAge: "24", designation: "Jr. Developer", isSelected: true },
            { personName: "Karan Malohtra", personAge: "35", designation: "Developer", isSelected: true },
            { personName: "Krishna Sethi", personAge: "27", designation: "Software Eng", isSelected: true }
        ];
        viewRows2.forEach((row: any) => {
            expect(row.hasOwnProperty('isSelected')).toEqual(true);
            expect(row.isSelected).toEqual(true);
            expect(comp.enablecheckbox).toEqual(true);
            row.isSelected = false;
            row['checkBoxSelectClass'] = comp.checkBoxActive;
        })
    })
    it('selectAllRecord Check if condition', () => {  
        comp.checkDefaultIcon = 'checkbox default';
        comp.checkBoxActive = 'checkbox active';    
        comp.selectAllRecord();
        comp.viewRows = [
            { personName: "Jaydeep Saxena", personAge: "35", designation: "Developer", isSelected: true ,checkBoxSelectClass: ''},
            { personName: "Shweta Kulkarni", personAge: "24", designation: "Jr. Developer", isSelected: true,checkBoxSelectClass: ''},
            { personName: "Karan Malohtra", personAge: "35", designation: "Developer", isSelected: true,checkBoxSelectClass: '' },
            { personName: "Krishna Sethi", personAge: "27", designation: "Software Eng", isSelected: true ,checkBoxSelectClass: ''}
        ];
        comp.checkBoxActive = 'checkbox active';   
         comp.selectAll = false;
         comp.selectAll = !comp.selectAll;   
        expect(comp.selectAll).toEqual(true);
       for (const vr of comp.viewRows) {
        vr.checkBoxSelectClass = comp.checkBoxActive;
        comp.selectedRows.push(vr);
       }
    })

    it('selectAllRecord toggle Check', () => {
        comp.selectAllRecord();
        comp.selectAll = true;
        expect(comp.selectAll).toEqual(true);
        comp.selectAll = false;
    })
    it('selectAllRecord Else Check', () => {
         comp.checkBoxActive = 'checkbox active';
         comp.selectAllRecord();
         comp.viewRows = [
            { personName: "Jaydeep Saxena", personAge: "35", designation: "Developer", isSelected: true ,checkBoxSelectClass: ''},
            { personName: "Shweta Kulkarni", personAge: "24", designation: "Jr. Developer", isSelected: true,checkBoxSelectClass: ''},
            { personName: "Karan Malohtra", personAge: "35", designation: "Developer", isSelected: true,checkBoxSelectClass: '' },
            { personName: "Krishna Sethi", personAge: "27", designation: "Software Eng", isSelected: true ,checkBoxSelectClass: ''}
        ];
        comp.checkDefaultIcon = 'checkbox default';
         comp.selectAll = true;
         comp.selectAll = !comp.selectAll;
        expect(comp.selectAll).toEqual(false);
        for (const vr of comp.viewRows) {
            vr.checkBoxSelectClass = comp.checkDefaultIcon;
        }
    })
});
