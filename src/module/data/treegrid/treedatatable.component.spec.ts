// import { ComponentFixture, TestBed } from '@angular/core/testing';
// import { DebugElement, InjectionToken, Component } from '@angular/core';
// import { FormsModule } from "@angular/forms";
// import { TreeDataTableComponent } from "./treedatatable.component";
// import { CommonDataService } from '../../services/data/common.data.service';
// import { CommonIconComponent } from '../../base/components/common.icon.component';
// import { IconLoaderService } from '../../../index';
// import { HttpClientModule, HttpClient } from '@angular/common/http';
// import { AmexioGridColumnComponent } from '../datagrid/data.grid.column';

// import { AmexioContextMenuComponent } from './../../base/base.contextmenu.component';
// import { DisplayFieldComponent } from './../../base/display-field/display-field.component';

// import { LifeCycleBaseComponent } from './../../base/lifecycle.base.component';
// import { DataGridFilterComponent } from '../../data/datagrid/datagrid.filter.component';
// import { AmexioPaginatorComponent } from './../paginator/paginator.component';
// import { AmexioRadioGroupComponent } from './../../forms/radio/radiogroup.component';

// // import { provide } from '@angular/core';
// // import { DOCUMENT } from '@angular/common';

// // export const DOCUMENT = new InjectionToken<Document>('DocumentToken');


// @Component({
//     selector: 'test-tree-data-table',
//     template: `<amexio-tree-data-table>
//     <amexio-data-table-column [data-index]="'jobTitle'" [data-type]="'string'" [hidden]="false" [text]="'Job Title'">
//     </amexio-data-table-column>
//     <amexio-data-table-column [data-index]="'salary'" [data-type]="'number'" [hidden]="false" [text]="'Salary'"></amexio-data-table-column>
//     </amexio-tree-data-table >`,
// })
// class TestTreeTableComponent {

// }
// describe('amexio-Tree-datatable', () => {
//     let comp: TreeDataTableComponent;
//     let fixture: ComponentFixture<TestTreeTableComponent>;

//     beforeEach(() => {
//         TestBed.configureTestingModule({
//             imports: [FormsModule, HttpClientModule],
//             declarations: [AmexioGridColumnComponent,
//                 TestTreeTableComponent,
//                 TreeDataTableComponent,
//                 LifeCycleBaseComponent,
//                 AmexioRadioGroupComponent, AmexioPaginatorComponent,
//                 AmexioContextMenuComponent, DisplayFieldComponent,
//                 CommonIconComponent, DataGridFilterComponent],
//             providers: [IconLoaderService, CommonDataService,
//             // {provide:  useClass: TestTreeTableComponent}

//             ],
         
//         }).compileComponents();
//     });
//     beforeEach(() => {
//         fixture = TestBed.createComponent(TestTreeTableComponent);
//         comp = fixture.debugElement.children[0].componentInstance;
//         event = jasmine.createSpyObj('event', ['preventDefault', 'stopPropagation']);
//         fixture.detectChanges();
//     });

//     // it('should call initializer function in constructor', () => {
//     //     TestBed.createComponent(TreeDataTableComponent); // this is the trigger of constructor method
//     //    expect(service.initialize).toHaveBeenCalled(); // sample jasmine spy based test case
//     // });

//     it('variable check ()', () => {
//         fixture.detectChanges();
//         comp.mask = true;
//         expect(comp.mask).toEqual(true);
//     });

//     // it('ngAfterContentInit method check ()', () => {
//     //     fixture.detectChanges();
//     //     comp.ngAfterContentInit();
//     //     comp.createConfig();
//     //     // super(service);
//     // });

// });
