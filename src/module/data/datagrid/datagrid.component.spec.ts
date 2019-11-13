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
import { AmexioRadioGroupComponent } from '../../standard/forms/radio/radiogroup.component';
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
    let comDataService: CommonDataService;
    let filterCloneData: any;
    let columnRefArray: any;

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [FormsModule, HttpClientModule],
            declarations: [AmexioGridColumnComponent, AmexioDatagridComponent, TestWrapperComponent,
                AmexioRadioGroupComponent, AmexioPaginatorComponent, AmexioContextMenuComponent, DisplayFieldComponent, CommonIconComponent, DataGridFilterComponent],
            providers: [IconLoaderService,
                CommonDataService],
        }).compileComponents();
    });
    beforeEach(() => {
        comDataService = TestBed.get(CommonDataService);
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
            value: "a"
        }, {
            filter: "1",
            index: 1,
            key: "jobTitle",
            lastColumn: 3,
            option: "OR",
            type: "string",
            value: "A"
        }];
        let filterCloneData = [{
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
            userId: "0"
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
            userId: "0"
        }];
        comp.filterOperation(filteredObj, filterCloneData);
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
            userId: "0"
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
            userId: "0"
        }];
        let resultData: any = [];
        filterCloneData.forEach((option: any, index: any) => {
            if (index == 0) {
                // expect(comp.filterOpertion(option, filteredObj)).toEqual(true);
                // resultData.push(option);
            }

            if (index == 1) {

            }

        });

        expect(resultData.length).toBeLessThan(1 * comp.pagesize);
        comp.currentPage = 1;
        comp.maxPage = 1;

        comp.data = resultData;
        comp.filterResultData = resultData;
    })

    it('filterOpertion Method', () => {
        let filteredObj = [{
            filter: "1",
            index: 0,
            key: "preferredFullName",
            lastColumn: 3,
            option: "OR",
            type: "string",
            value: "a"
        }];
        let data = {
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
            userId: "0"
        }
        comp.filterOpertion(data, filteredObj);
        const statusCollection: any = [];
        let condition = false;
        filteredObj.forEach((filterOpt: any, index: number) => {
            if (index == 0) {
                expect(filterOpt.type).toEqual('string');
                expect(filterOpt.value).toBeDefined();
                expect(data[filterOpt.key]).toBeDefined;
                expect(typeof data[filterOpt.key]).toEqual('string')
                statusCollection.push(comp.checkStringFilter(filterOpt.filter, data[filterOpt.key].toLowerCase(), filterOpt.value.toLowerCase()));
            }
            //   if(index ==1) {
            // expect(filterOpt.type).toEqual('number') 
            //     statusCollection.push(comp.checkStringFilter(filterOpt.filter, data[filterOpt.key].toLowerCase(), filterOpt.value.toLowerCase()));
            // }
            expect(statusCollection.filter((status: any) => status === true).length).toEqual(0)
            condition = true;

            return condition;
        });


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
    //     filterCloneData = [{
    //         checkBoxSelectClass: "checkbox default",
    //         emailAddress: "tomhanks@gmail.com",
    //         employeeCode: "E3",
    //         firstName: "Tom",
    //         isSelected: false,
    //         jobTitle: "Program Direct",
    //         lastName: "Hanks",
    //         phoneNumber: "408-2222222",
    //         preferredFullName: "Tom Hanks",
    //         region: "CA",
    //         salary: 14000000,
    //         userId: "0"
    //     }, {
    //         checkBoxSelectClass: "checkbox default",
    //         emailAddress: "tomhanks@gmail.com",
    //         employeeCode: "E3",
    //         firstName: "Tom",
    //         isSelected: false,
    //         jobTitle: "Architect",
    //         lastName: "Hanks",
    //         phoneNumber: "408-2222222",
    //         preferredFullName: "Anish Hanks",
    //         region: "CA",
    //         salary: 14000000,
    //         userId: "0"
    //     }];
    //     expect(filteredObj.length).toEqual(1);
    //     // here m
    //     comp.filterOperation(filteredObj, filterCloneData);

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
            delete select['checkBoxSelectClass'];
        });
        comp.selectedRowData.emit(selectedAllData);
    })


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

    it('ngOnInit  method testing if ', () => {
        fixture.detectChanges();
        comp.httpmethod = 'get';
        comp.httpurl = 'datagrid/datagrid.json';
        let random = 'gridcolumn' + window.crypto.getRandomValues(new Uint32Array(1))[0];
        comp.componentId = random;
        comp.ngOnInit();
        expect(comp.httpmethod).toBeDefined();
        expect(comp.httpurl.length).toBeDefined();
        comDataService.fetchData(comp.httpurl, comp.httpmethod).subscribe(
            (response: any) => {
                comp.cloneResponseData = response;
                comp.responseData = JSON.parse(JSON.stringify(comp.cloneResponseData));
            },
            (error: any) => {
            },
            () => {
                comp.setData(comp.responseData);
            }
        );
        comp.componentId = random;
        expect(comp.componentId).toEqual(random);
        // this.gridId = 'grid' + window.crypto.getRandomValues(new Uint32Array(1))[0];
    });

    it('addrows method call', () => {
        let index = 1;
        let row =
        {
            "countryName": "Myanmar",
            "countryCode1": "MM",
            'level': '1',
            'groupData': [{ 'level': 1 }]
        }
        comp.addRows(row, index);
        row.level = 'itemselector' + window.crypto.getRandomValues(new Uint32Array(1))[0];
    });

});
