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
import { AmexioRadioGroupComponent } from './../../forms/radio/radiogroup.component';
import { Component } from '@angular/core';

@Component({
    selector: 'test-cmp',
    template: `<amexio-datagrid>
    <amexio-data-table-column [data-index]="'jobTitle'" [data-type]="'string'" [hidden]="false" [text]="'Job Title'">
    </amexio-data-table-column>
    <amexio-data-table-column [data-index]="'salary'" [data-type]="'number'" [hidden]="false" [text]="'Salary'"></amexio-data-table-column>
    </amexio-datagrid>`,
})
class TestWrapperComponent {

}
describe('amexio-datagrid', () => {
    let comp: AmexioDatagridComponent;
    let fixture: ComponentFixture<TestWrapperComponent>;

    let filterCloneData: any;
    let columnRefArray: any;
    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [FormsModule, HttpClientModule],
            declarations: [AmexioGridColumnComponent, AmexioDatagridComponent, TestWrapperComponent, AmexioRadioGroupComponent, AmexioPaginatorComponent, AmexioContextMenuComponent, DisplayFieldComponent, CommonIconComponent, DataGridFilterComponent],
            providers: [IconLoaderService, CommonDataService],
        }).compileComponents();
    });
    beforeEach(() => {
        fixture = TestBed.createComponent(TestWrapperComponent);
        comp = fixture.debugElement.children[0].componentInstance;
        event = jasmine.createSpyObj('event', ['preventDefault', 'stopPropagation']);
        fixture.detectChanges();
        filterCloneData = [{
            checkBoxSelectClass: "checkbox default",
            emailAddress: "tomhanks@gmail.com",
            employeeCode: "E3",
            firstName: "Tom",
            isSelected: false,
            jobTitle: "Program Direct",
            lastName: "Hanks",
            phoneNumber: "408-2222222",
            preferredFullName: "Tom Hanks",
            region: "CA",
            salary: 14000000,
            userId: "0",
        }, {
            checkBoxSelectClass: "checkbox default",
            emailAddress: "tomhanks@gmail.com",
            employeeCode: "E3",
            firstName: "Tom",
            isSelected: false,
            jobTitle: "Architect",
            lastName: "Hanks",
            phoneNumber: "408-2222222",
            preferredFullName: "Anish Hanks",
            region: "CA",
            salary: 14000000,
            userId: "0",
        }];
    })

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
            { personName: "Jaydeep Saxena", personAge: "35", designation: "Developer", isSelected: true, checkBoxSelectClass: '' },
            { personName: "Shweta Kulkarni", personAge: "24", designation: "Jr. Developer", isSelected: true, checkBoxSelectClass: '' },
            { personName: "Karan Malohtra", personAge: "35", designation: "Developer", isSelected: true, checkBoxSelectClass: '' },
            { personName: "Krishna Sethi", personAge: "27", designation: "Software Eng", isSelected: true, checkBoxSelectClass: '' }
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
            { personName: "Jaydeep Saxena", personAge: "35", designation: "Developer", isSelected: true, checkBoxSelectClass: '' },
            { personName: "Shweta Kulkarni", personAge: "24", designation: "Jr. Developer", isSelected: true, checkBoxSelectClass: '' },
            { personName: "Karan Malohtra", personAge: "35", designation: "Developer", isSelected: true, checkBoxSelectClass: '' },
            { personName: "Krishna Sethi", personAge: "27", designation: "Software Eng", isSelected: true, checkBoxSelectClass: '' }
        ];
        comp.checkDefaultIcon = 'checkbox default';
        comp.selectAll = true;
        comp.selectAll = !comp.selectAll;
        expect(comp.selectAll).toEqual(false);
        for (const vr of comp.viewRows) {
            vr.checkBoxSelectClass = comp.checkDefaultIcon;
        }
    })

    it('filterOperation Method', () => {
        comp.pagesize = 10;
        let filteredObj = [{
            filter: "1",
            index: 0,
            key: "preferredFullName",
            lastColumn: 3,
            option: "OR",
            type: "string",
            value: "a",
        }]
        comp.filterOperation(filteredObj, filterCloneData);
        let resultData: any = [];
        filterCloneData.forEach((option: any) => {
            if (comp.filterOpertion(option, filteredObj)) {
                expect(comp.filterOpertion(option, filteredObj)).toEqual(true);
                resultData.push(option);
            }
        });

        expect(resultData.length).toBeLessThan(1 * comp.pagesize);
        comp.currentPage = 1;
        comp.maxPage = 1;

        comp.data = resultData;
        comp.filterResultData = resultData;
    })

    it('multipleColumnFilter lessthan0 and OR', () => {
        comp.filterCloneData = [{
            checkBoxSelectClass: "checkbox default",
            emailAddress: "tomhanks@gmail.com",
            employeeCode: "E3",
            firstName: "Tom",
            isSelected: false,
            jobTitle: "Program Direct",
            lastName: "Hanks",
            phoneNumber: "408-2222222",
            preferredFullName: "Tom Hanks",
            region: "CA",
            salary: 14000000,
            userId: "0",
        }, {
            checkBoxSelectClass: "checkbox default",
            emailAddress: "tomhanks@gmail.com",
            employeeCode: "E3",
            firstName: "Tom",
            isSelected: false,
            jobTitle: "Architect",
            lastName: "Hanks",
            phoneNumber: "408-2222222",
            preferredFullName: "Anish Hanks",
            region: "CA",
            salary: 14000000,
            userId: "0",
        }];
        let filteredObj = [{
            filter: "1",
            index: 0,
            key: "preferredFullName",
            lastColumn: 3,
            option: "OR",
            type: "string",
            value: "a",
        }]
        fixture.detectChanges();
        comp.multipleColumnFilter(filteredObj)
        filteredObj.sort((a: any, b: any) => {
            return a.index - b.index;
        });
        for (let i = 0; i < filteredObj.length; i++) {
            expect(filteredObj[0].index).toEqual(0)
            expect(filteredObj[0].option).toEqual('OR')
            comp.filterOperation(filteredObj, comp.filterCloneData);
        }
    })

    it('multipleColumnFilter lessthan0 and AND', () => {
        comp.filterResultData = [{
            checkBoxSelectClass: "checkbox default",
            emailAddress: "tomhanks@gmail.com",
            employeeCode: "E3",
            firstName: "Tom",
            isSelected: false,
            jobTitle: "Program Direct",
            lastName: "Hanks",
            phoneNumber: "408-2222222",
            preferredFullName: "Avanti Hanks",
            region: "CA",
            salary: 14000000,
            userId: "0",
        }, {
            checkBoxSelectClass: "checkbox default",
            emailAddress: "tomhanks@gmail.com",
            employeeCode: "E3",
            firstName: "Tom",
            isSelected: false,
            jobTitle: "Architect",
            lastName: "Hanks",
            phoneNumber: "408-2222222",
            preferredFullName: "Anish Hanks",
            region: "CA",
            salary: 14000000,
            userId: "0",
        }];
        let filteredObj = [{
            filter: "1",
            index: 0,
            key: "preferredFullName",
            lastColumn: 3,
            option: "AND",
            type: "string",
            value: "a",
        }]
        fixture.detectChanges();
        comp.multipleColumnFilter(filteredObj);

        filteredObj.sort((a: any, b: any) => {
            return a.index - b.index;
        });
        for (let i = 0; i < filteredObj.length; i++) {
            expect(filteredObj[0].index).toEqual(0)
            expect(filteredObj[0].option).toEqual('AND')
            const filterObj1 = [];
            filterObj1.push(filteredObj[0]);
            comp.filterOperation(filterObj1, comp.filterResultData);
        }
    });

    it('multipleColumnFilter greaterthan0 and OR', () => {
        comp.filterCloneData = [{
            checkBoxSelectClass: "checkbox default",
            emailAddress: "tomhanks@gmail.com",
            employeeCode: "E3",
            firstName: "Tom",
            isSelected: false,
            jobTitle: "Program Direct",
            lastName: "Hanks",
            phoneNumber: "408-2222222",
            preferredFullName: "Anna Hanks",
            region: "CA",
            salary: 14000000,
            userId: "0",
        }, {
            checkBoxSelectClass: "checkbox default",
            emailAddress: "tomhanks@gmail.com",
            employeeCode: "E3",
            firstName: "Tom",
            isSelected: false,
            jobTitle: "Architect",
            lastName: "Hanks",
            phoneNumber: "408-2222222",
            preferredFullName: "Anish Hanks",
            region: "CA",
            salary: 14000000,
            userId: "0",
        }];
        let filteredObj = [{
            filter: "1",
            index: 0,
            key: "preferredFullName",
            lastColumn: 3,
            option: "OR",
            type: "string",
            value: "a",

        }, {
            filter: "1",
            index: 1,
            key: "jobTitle",
            lastColumn: 3,
            option: "OR",
            type: "string",
            value: "v",
        }]

        fixture.detectChanges();
        comp.multipleColumnFilter(filteredObj)
        filteredObj.sort((a: any, b: any) => {
            return a.index - b.index;
        });
        for (let i = 0; i < filteredObj.length; i++) {
            if (i > 0) {
                expect(filteredObj[i].index).toBeGreaterThan(0)
                expect(filteredObj[i - 1].option).toEqual('OR')
                comp.filterOperation(filteredObj, filterCloneData);
            }
        }
    });

    it('multipleColumnFilter greaterthan0 and AND', () => {
        comp.filterResultData = [{
            checkBoxSelectClass: "checkbox default",
            emailAddress: "tomhanks@gmail.com",
            employeeCode: "E3",
            firstName: "Tom",
            isSelected: false,
            jobTitle: "Program Direct",
            lastName: "Hanks",
            phoneNumber: "408-2222222",
            preferredFullName: "Anna Hanks",
            region: "CA",
            salary: 14000000,
            userId: "0",
        }, {
            checkBoxSelectClass: "checkbox default",
            emailAddress: "tomhanks@gmail.com",
            employeeCode: "E3",
            firstName: "Tom",
            isSelected: false,
            jobTitle: "Architect",
            lastName: "Hanks",
            phoneNumber: "408-2222222",
            preferredFullName: "Anish Hanks",
            region: "CA",
            salary: 14000000,
            userId: "0",
        }];
        let filteredObj = [{
            filter: "1",
            index: 0,
            key: "preferredFullName",
            lastColumn: 3,
            option: "AND",
            type: "string",
            value: "a",

        }, {
            filter: "1",
            index: 1,
            key: "jobTitle",
            lastColumn: 3,
            option: "OR",
            type: "string",
            value: "a",
        }]
        fixture.detectChanges();
        comp.multipleColumnFilter(filteredObj)
        filteredObj.sort((a: any, b: any) => {
            return a.index - b.index;
        });
        for (let i = 0; i < filteredObj.length; i++) {
            if (i > 0) {
                expect(filteredObj[i].index).toBeGreaterThan(0)
                expect(filteredObj[i - 1].option).toEqual('AND')
                let filterObj1 = [];
                filterObj1.push(filteredObj[i]);
                comp.filterOperation(filterObj1, comp.filterResultData);
            }
        }

    })

    it('createConfig method', () => {
        comp.createConfig();
        fixture.detectChanges();
        columnRefArray = comp.columnRef.toArray();
    })

    // it('getFilteredData If Condition Method', () => {
    //     let filteredObj = [{
    //         filter: "1",
    //         index: 0,
    //         key: "preferredFullName",
    //         lastColumn: 3,
    //         option: "OR",
    //         type: "string",
    //         value: "a",
    //     }]
    //     comp.getFilteredData(filteredObj);
    //     expect(filteredObj.length).toEqual(1);
    //     // comp.filterOperation(filteredObj, filterCloneData);

    // })

    it('emitSelectedRows method if condition', () => {
        comp.emitSelectedRows();
        const sRows = [
            {
                "countryName": "British Indian Ocean Teritory",
                "countryCode1": "IO",
                "countryCode2": "IOT",
                "countryFlag": "IO.png",
                "capital": "",
                "currencyCode": "USD",
                "currencyName": "Dollar",
                "currencySymbol": "$",
                "isoNumeric": 86,
                "isSelected": false,
                "checkBoxSelectClass": "checkbox default"
            }
        ];
        fixture.detectChanges();
        const selectedAllData = JSON.parse(JSON.stringify(sRows));
        selectedAllData.forEach((select: any) => {
            expect(select).toBeDefined();
            delete select['checkBoxSelectClass'];
        });
        comp.selectedRowData.emit(selectedAllData);
    })


    it('emitSelectedRows method else condition', () => {
        comp.emitSelectedRows();
        const sRows = [{}];
        fixture.detectChanges();
        const selectedAllData = JSON.parse(JSON.stringify(sRows));
        selectedAllData.forEach((select: any) => {
            expect(select).toEqual({});
        });
    });


    it('onRowClick method  condition', () => {
        const rowData = { "countryName": "Latvia", "countryCode1": "LV", "countryCode2": "LVA", "countryFlag": "LV.png", "capital": "", "currencyCode": "LVL", "currencyName": "Lat", "currencySymbol": "Ls", "isoNumeric": 428, "isSelected": false, "checkBoxSelectClass": "checkbox default" };
        const rowIndex = 2;
        comp.onRowClick(rowData, rowIndex);
        const emitData = JSON.parse(JSON.stringify(rowData));
        delete emitData['checkBoxSelectClass'];
        comp.rowSelect.subscribe((g: any) => {
            expect(comp.rowSelect).toEqual(g, emitData);
        });
        comp.selectedRowNo = rowIndex;
    });
});
