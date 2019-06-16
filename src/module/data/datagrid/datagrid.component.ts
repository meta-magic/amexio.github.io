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
*
*/

/*
 Component Name : Amexio data grid
 Component Selector : <amexio-datagrid>
 Component Description : Data grid component to render large amount of data-set with
 various options like sorting in ascending or descending order, client-side pagination,
 column hide/unhide, single/multi selection, user define template for rendering for column
 header and column data, displaying summation of numeric column.
 */
import {
  AfterContentInit, AfterViewInit, ChangeDetectorRef, Component, ContentChildren, ElementRef, EventEmitter, HostListener, Input,
  OnDestroy, OnInit, Output, QueryList, Renderer2, ViewChild, ViewChildren,
} from '@angular/core';
import { CommonDataService } from '../../services/data/common.data.service';
import { AmexioGridColumnComponent } from './data.grid.column';
import { DataGridFilterComponent } from './datagrid.filter.component';

@Component({
  selector: 'amexio-datagrid',
  templateUrl: './datagrid.component.html',
})

export class AmexioDatagridComponent implements OnInit, OnDestroy, AfterContentInit, AfterViewInit {
  private componentLoaded: boolean;
  /*
   Properties
   name : title
   datatype : string
   version : 4.0 onwards
   default : none
   description : Title for grid.
   */
  @Input() title: string;
  /*
   Properties
   name : page-size
   datatype : number
   version : 4.0 onwards
   default : none
   description : Number of records show on one page.
   */
  @Input('page-size') pagesize: number;

  /*
   Properties
   name : http-url
   datatype : string
   version : 4.0 onwards
   default : none
   description : REST url for fetching data.
   */
  @Input('http-url') httpurl: string;

  /*
   Properties
   name : http-method
   datatype : string
   version : 4.0 onwards
   default : none
   description : Type of HTTP call, POST,GET etc.
   */
  @Input('http-method') httpmethod: string;

  /*
   Properties
   name :
   datatype : string
   version : 4.0 onwards
   default : none
   description : Key in JSON Datasource for records.
   */
  @Input('data-reader') datareader: string;

  /*
   Properties
   name : enable-checkbox
   datatype : boolean
   version : 4.0 onwards
   default : none
   description : Enables checkbox for each row, this allows user for multi selection.
   */
  @Input('enable-checkbox') enablecheckbox: boolean;

  /*
   Properties
   name : data
   datatype : any
   version : 4.0 onwards
   default : none
   description : Local Data binding.
   */
  _data: any;
  @Input('data')
  set data(value: any[]) {
    this._data = value;
    if (this.componentLoaded) {
      this.updateComponent();
    }
  }
  get data(): any[] {
    return this._data;
  }

  /*
   Events
   name : rowSelect
   datatype : none
   version : none
   default : none
   description : It will gives you row clicked data.
   */
  @Output() rowSelect: any = new EventEmitter<any>();

  /*
   Events
   name : selectedRowData
   datatype : none
   version : none
   default : none
   description : It will fire only on selection of checkbox and gives you selected record data.
   */
  @Output() selectedRowData: any = new EventEmitter<any>();

  /*
   Events
   name : onHeaderClick
   datatype : none
   version : none
   default : none
   description : It will gives you click event and column info.
   */
  @Output() onHeaderClick: any = new EventEmitter<any>();

  /*
   Properties
   name : height
   datatype : string
   version : 4.0 onwards
   default : none
   description : height of grid
   */
  @Input() height: string;

  /*
   Properties
   name : groupby
   datatype :
   version : 4.0 onwards
   default : none
   description : Set True for Enable group by functionality.
   */
  @Input() groupby = false;

  /*
   Properties
   name : groupby-data-index
   datatype : string
   version : 4.0 onwards
   default : none
   description :  Primary data-index name of the column for Grouping.
   */
  @Input('groupby-data-index') groupbydataindex: string;

  /*
   Properties
   name : enable-data-filter
   datatype : boolean
   version : 4.0 onwards
   default : none
   description :  Enables user to filter data.
   */
  @Input('enable-data-filter') enabledatafilter: boolean;

  /*
   Properties
   name : c-class
   datatype : string
   version : 4.0 onwards
   default : none
   description : Used for custom styled classes
   */
  @Input('c-class') cclass: string;

  /*
   Properties
   name : tableHeadercclass
   datatype : string
   version : 4.0 onwards
   default : none
   description : custom styled class for table header
   */
  @Input() tableHeadercclass: string;

  /*
   Properties
   name : tableTitlecclass
   datatype : string
   version : 4.0 onwards
   default : none
   description : custom styled class for table title
   */
  @Input() tableTitlecclass: string;

  /*
   Properties
   name : tableDatacclass
   datatype : string
   version : 4.0 onwards
   default : none
   description :  custom styled class for table data
   */
  @Input() tableDatacclass: string;

  /*
   Properties
   name : selected-row-color
   datatype : string
   version : 4.0 onwards
   default : none
   description :  sets color of selected row
   */
  @Input('selected-row-color') selectedrowcolor: string;

  /*
   Properties
   name : total-data-count
   datatype : number
   version : 5.5 onwards
   default : none
   description :  sets data limit for server side data rendering
   */
  @Input('total-data-count') totalDataCount: number;

  @Input('server-side-paging') serverSidePaging = false;

  /*
   Properties
   name : column-defintion
   datatype : any
   version : 4.0 onwards
   default : none
   description :  If you don't want to use '<amexio-data-table-column>' tag then pass JSON data.
   */
  _columndefintion: any;
  @Input('column-defintion')
  set columndefintion(value: any) {
    this._columndefintion = value;
    if (this.componentLoaded) {
      this.updateComponent();
    }
  }
  get columndefintion(): any {
    return this._columndefintion;
  }

  /*
   Properties
   name : enable-column-fiter
   datatype : boolean
   version : 4.0 onwards
   default : none
   description :  Set false to hide Column toggle functionality.
   */
  @Input('enable-column-fiter') enablecolumnfiter: boolean;

  /*
   Properties
   name : enable-column-filter
   datatype : boolean
   version : 4.0 onwards
   default : true
   description :  Set false to hide Column toggle functionality.
   */
  @Input('enable-column-filter') enablecolumnfilter: boolean;

  /*
   Properties
   name : global-fiter
   datatype : boolean
   version : 4.2 onwards
   default : false
   description :  Set false to hide Column toggle functionality.
   */
  @Input('global-filter') globalfilter: boolean;

  /*
   Properties
   name : context-menu
   datatype : any[]
   version : 5.0.1 onwards
   default :
   description : Context Menu provides the list of menus on right click of row.
   */
  @Input('context-menu') contextmenu: any[];

  enableHeader: boolean;

  @Output() rightClick: any = new EventEmitter<any>();

  /*
   Events
   name : onPageChange
   datatype : none
   version : none
   default : none
   description : It will gives you current and next page info
   */
  @Output() onPageChange: EventEmitter<any> = new EventEmitter<any>();

  themeCss: any;

  amexioComponentId = 'amexio-grid';

  columns: any[] = [];

  viewRows: any[] = [];

  maxPage: number;

  currentPage: number;

  sortColumn: any;

  pageNumbers: number[];

  selectedRowNo: number;

  selectAll = false;

  selectedRows: any[];

  summary: any[];

  contextStyle: any;

  summaryData: any[];

  isSummary: boolean;

  sortBy: number;

  cloneData: any;

  responseData: any;

  filterCloneData: any;

  rowId: any;

  previousData: any;

  columnPreviewData: any;

  showToolTip: boolean;

  showGroupByColumn: boolean;

  totalPages: number;

  /*global filter column attribute*/

  filterValue: any;

  globalFilterOptions: any[] = [];

  flag: boolean;

  tempContextMenu: any[] = [];

  mouseLocation: { left: number; top: number } = { left: 0, top: 0 };

  posixUp: boolean;

  rightClickRowData: any;

  /*group by column attribute*/

  iconclassKey: string;

  isExpanded = false;

  mask = true;

  private checkIcon = 'fa fa-check';

  private plusIcon = 'fa fa-plus';

  private checkDefaultIcon = 'checkbox default';

  checkBoxSelectClass = '';

  globalClickListenFunc: () => void;

  showEnableColumnFilter = false;

  filterComRef: any[] = [];

  columnCountArray: any[] = [];

  arrayTabIndex: any[] = [];

  tabindex = '-1';

  columnHiddenIndexArray: any[] = [];

  prevlistindex = -1;

  firstIndex: 1;

  listindex = -1;

  componentId: string;

  gridId: string;

  stringFilterArray: any[] = [];

  numberFilterArray: any[] = [];

  fliterFlag = false;

  @ViewChildren(DataGridFilterComponent) filterRef: QueryList<DataGridFilterComponent>;

  @ContentChildren(AmexioGridColumnComponent) columnRef: QueryList<AmexioGridColumnComponent>;

  @ViewChild('pageId') pageId: any;

  constructor(
    public element: ElementRef, public dataTableService: CommonDataService,
    private cd: ChangeDetectorRef, private renderer: Renderer2,
  ) {
    this.selectedRows = [];
    this.sortBy = -1;

    this.globalFilterOptions = [{
      key: 'Start With', value: '1', checkedStatus: this.checkIcon, type: 'string',
    }, {
      key: 'Ends With', value: '2', checkedStatus: '', type: 'string',
    }, {
      key: 'Contains', value: '3', checkedStatus: '', type: 'string',
    }];
  }

  ngOnInit() {
    if (this.enablecolumnfiter) {
      this.enablecolumnfilter = this.enablecolumnfiter;
    }
    this.isExpanded = true;
    this.iconclassKey = this.plusIcon;

    if (this.enabledatafilter === true) {
      this.globalfilter = false;
    }

    if (this.selectedrowcolor == null || this.selectedrowcolor === '') {
      this.selectedrowcolor = '#dcecf7';
    }
    if (this.httpmethod && this.httpurl) {
      this.dataTableService.fetchData(this.httpurl, this.httpmethod).subscribe(
        (response) => {
          this.responseData = response;
        },
        (error) => {
        },
        () => {
          this.setData(this.responseData);
        },
      );
    } else if (this.data) {
      this.setData(this.data);
      this.previousData = JSON.parse(JSON.stringify(this.data));
    }
    this.componentLoaded = true;

    this.checkBoxSelectClass = this.setCheckBoxSelectClass();

    this.componentId = 'gridcolumn' + Math.floor(Math.random() * 1000 + 999);

    this.gridId = 'grid' + Math.floor(Math.random() * 1000 + 999);
  }

  ngAfterViewInit(): void {
    if (this.enabledatafilter) {
      this.filterComRef = this.filterRef.toArray();
    }
  }

  updateComponent() {
    if (!this.fliterFlag && this.previousData != null && JSON.stringify(this.previousData) !== JSON.stringify(this.data)) {
      this.previousData = JSON.parse(JSON.stringify(this.data));
      this.setChangeData(this.data);
    }
    if (this.columnPreviewData != null && this.columndefintion != null &&
      JSON.stringify(this.columnPreviewData) !== JSON.stringify(this.columndefintion)) {
      this.columnPreviewData = JSON.parse(JSON.stringify(this.columndefintion));
      this.columns = this.columndefintion;
    }
    this.fliterFlag = false;
  }

  ngAfterContentInit() {
    if (this.columndefintion) {
      this.columns = this.columndefintion;
      this.columnPreviewData = JSON.parse(JSON.stringify(this.columndefintion));
    } else {
      this.createConfig();
    }
    this.getColumnCount();
    this.checkFirstTabIndex(1);
  }

  createConfig() {
    this.columns = [];
    let columnRefArray = [];
    columnRefArray = this.columnRef.toArray();
    for (const cr of columnRefArray) {
      const columnConfig = cr;
      let columnData: any;
      if (columnConfig.headerTemplate != null && columnConfig.bodyTemplate != null) {
        columnData = {
          text: columnConfig.text,
          dataindex: columnConfig.dataindex,
          hidden: columnConfig.hidden,
          datatype: columnConfig.datatype,
          headerTemplate: columnConfig.headerTemplate,
          width: columnConfig.width,
          sort: columnConfig.sort,
          bodyTemplate: columnConfig.bodyTemplate,
          contextmenu: columnConfig.contextmenu,
        };
      } else if (columnConfig.headerTemplate != null && columnConfig.bodyTemplate == null) {
        columnData = {
          text: columnConfig.text,
          dataindex: columnConfig.dataindex,
          hidden: columnConfig.hidden,
          datatype: columnConfig.datatype,
          width: columnConfig.width,
          sort: columnConfig.sort,
          headerTemplate: columnConfig.headerTemplate,
          contextmenu: columnConfig.contextmenu,
        };
      } else if (columnConfig.bodyTemplate != null && columnConfig.headerTemplate == null) {
        columnData = {
          text: columnConfig.text,
          dataindex: columnConfig.dataindex,
          hidden: columnConfig.hidden,
          datatype: columnConfig.datatype,
          width: columnConfig.width,
          sort: columnConfig.sort,
          bodyTemplate: columnConfig.bodyTemplate,
          contextmenu: columnConfig.contextmenu,
        };
      } else if (columnConfig.bodyTemplate == null && columnConfig.headerTemplate == null) {
        columnData = {
          text: columnConfig.text,
          dataindex: columnConfig.dataindex,
          hidden: columnConfig.hidden,
          width: columnConfig.width,
          sort: columnConfig.sort,
          datatype: columnConfig.datatype,
          contextmenu: columnConfig.contextmenu,
        };
      }
      if (columnConfig.summarytype) {
        columnData['summarytype'] = columnConfig.summarytype;
      }

      if (columnConfig.summarycaption) {
        columnData['summarycaption'] = columnConfig.summarycaption;
      }

      this.columns.push(columnData);
      this.enableHeaderMethod();
    }
  }

  // Enables header if text to any of the column is given
  enableHeaderMethod() {
    this.columns.forEach((element: any) => {
      if (element.text) {
        this.enableHeader = true;
      }
    });
  }

  setChangeData(httpResponse: any) {
    this.setSelectedFlag(httpResponse);
    if (this.groupby) {
      this.cloneData = JSON.parse(JSON.stringify(this.data));
      const groups = {};
      this.commonMethod(this.cloneData, groups);
    }
    if (this.enabledatafilter) {
      this.filterCloneData = JSON.parse(JSON.stringify(this.data));
    }
    if (this.globalfilter) {
      this.filterCloneData = JSON.parse(JSON.stringify(this.data));
    }
    if (!this.groupby) {
      this.renderData();
    }
    this.setPaginatorData();
    this.mask = false;
  }

  setData(httpResponse: any) {
    this.viewRows = this.getResponseData(httpResponse);
    this.setSelectedFlag(this.viewRows);
    this.data = this.viewRows;
    if (this.groupby) {
      this.cloneData = JSON.parse(JSON.stringify(this.data));
    }
    if (this.enabledatafilter) {
      this.filterCloneData = JSON.parse(JSON.stringify(this.data));
    }
    if (this.globalfilter) {
      this.filterCloneData = JSON.parse(JSON.stringify(this.data));
    }
    this.renderData();
    if (this.groupby) {
      this.setColumnData();
    }
    this.setPaginatorData();
    this.mask = false;
  }

  setPaginatorData() {
    if (this.serverSidePaging && this.totalDataCount && this.viewRows.length > 0) {
      if (!this.pagesize && !this.totalPages) {
        this.pagesize = this.viewRows.length;
        this.totalPages = Math.ceil(this.totalDataCount / this.pagesize);
      }
    } else {
      this.totalPages = this.pageNumbers.length;
    }
  }

  setSelectedFlag(viewRows: any) {
    viewRows.forEach((row: any) => {
      if (!row.hasOwnProperty('isSelected')) {
        row['isSelected'] = false;
      }
    });
  }

  setGroupByColumn(col: any) {
    this.groupbydataindex = col.dataindex;
    this.selectAll = false;
    this.setColumnData();
  }
  // Method required for global filter

  keyUpSearch() {

    if (this.filterValue == null || this.filterValue === '') {
      this.removeGlobalFilter();
    }
    const filter: any = {
      value: this.filterValue,
    };

    this.globalFilterOptions.forEach((opt: any) => {
      if (opt.checkedStatus === this.checkIcon) {
        filter['filter'] = opt.value;
      }
    });
    this.getGlobalFilteredData(filter);
  }

  checkStatus(opt: any) {
    this.globalFilterOptions.forEach((item: any) => {
      item.checkedStatus = '';
    });
    opt.checkedStatus = this.checkIcon;
  }

  selectedOption(opt: any) {
    this.checkStatus(opt);
    const filter: any = {
      value: this.filterValue,
      filter: opt.value,
      type: opt.type,
    };
    if (this.filterValue) {
      this.getGlobalFilteredData(filter);
    }
    this.showToolTip = false;
  }
  removeGlobalFilter() {
    this.filterValue = '';
  }
  getGlobalFilteredData(filteredObj: any) {
    this.fliterFlag = true;
    const resultData: any = [];
    if (filteredObj) {
      this.filterCloneData.forEach((row: any) => {
        if (this.checkValueInColumn(row, filteredObj)) {
          resultData.push(row);
        }
      });

      if (resultData.length < (1 * this.pagesize)) {
        this.currentPage = 1;
        this.maxPage = 1;
      }
      this.data = resultData;
    } else {
      this.data = this.filterCloneData;
    }
    this.renderData();
  }

  checkValueInColumn(row: any, filteredObj: any): boolean {
    let searchStatus = false;
    const statusCollection: any = [];
    this.columns.forEach((opt: any) => {
      let optvalue = '';
      let filtervalue = '';
      if (typeof row[opt.dataindex] === 'string') {
        optvalue = row[opt.dataindex].toLowerCase();
      }
      if (typeof filteredObj.value === 'string') {
        filtervalue = filteredObj.value.toLowerCase();
      }
      if (filteredObj.filter === '1') {
        statusCollection.push(optvalue.startsWith(filtervalue));
      } else if (filteredObj.filter === '2') {
        statusCollection.push(optvalue.endsWith(filtervalue));
      } else if (filteredObj.filter === '3') {
        statusCollection.push(optvalue.includes(filtervalue));
      }
    });
    if (statusCollection.filter((status: any) => status === true).length > 0) {
      searchStatus = true;
    }
    return searchStatus;
  }

  filterConditionMethod(filteredObj: any, option: any, opt: any) {
    const status = false;
    this.data = [];
    let condition: any;
    if (filteredObj.filter === '1') {
      condition = option[opt.dataindex].toLowerCase().startsWith(filteredObj.value.toLowerCase());
      this.setstatus(condition);
    }
    if (filteredObj.filter === '2') {
      condition = option[opt.dataindex].toLowerCase().endsWith(filteredObj.value.toLowerCase());
      this.setstatus(condition);
    }
    if (filteredObj.filter === '3') {
      condition = option[opt.dataindex].toLowerCase().includes(filteredObj.value.toLowerCase());
      this.setstatus(condition);
    }

  }

  // Refactored code to avoid duplication: for filter grid
  setstatus(condition: any) {
    if (condition) {
      status = condition;
    }
  }

  setColumnData() {
    this.data = this.cloneData;
    const groups = {};
    this.commonMethod(this.data, groups);
  }

  commonMethod(data: any, groups: any) {
    data.forEach((option: any) => {
      const groupName = option[this.groupbydataindex];
      if (!groups[groupName]) {
        groups[groupName] = [];
      }
      groups[groupName].push(option);
    });
    data = [];
    for (const groupName in groups) {
      if (groups.hasOwnProperty(groupName)) {
        data.push({ expanded: false, isSelected: false, group: groupName, groupData: groups[groupName] });
      }
    }
    this.data = data;
    /*-------Aggregation---------*/
    this.renderData();
    this.cd.detectChanges();
  }

  renderData() {   // calculate page no for pagination
    if (this.data) {
      this.maxPage = 0;
      this.pageNumbers = [];
      if (this.data.length > (1 * this.pagesize)) {
        this.maxPage = Math.floor((this.data.length / this.pagesize));
        if ((this.data.length % this.pagesize) > 0) {
          this.maxPage++;
        }
      }
      for (let pageNo = 1; pageNo <= this.maxPage; pageNo++) {
        this.pageNumbers.push(pageNo);
      }
      this.totalPages = this.pageNumbers.length;
    }
    if (this.pagesize >= 1) {
      this.getPageSize();
    } else {
      this.viewRows = this.data;
    }
    this.selectedRowNo = -1;
  }

  // Method Calls when page size is more than 1
  private getPageSize() {
    const rowsTemp = this.data;
    const newRows = [];
    let startIndex = 0;
    let endIndex = this.pagesize;
    if (this.currentPage > 1) {
      startIndex = (this.currentPage - 1) * this.pagesize;
      endIndex = startIndex + this.pagesize;
    }
    while (startIndex <= endIndex - 1) {
      if (rowsTemp[startIndex]) {
        newRows.push(rowsTemp[startIndex]);
      }
      startIndex++;
    }
    this.viewRows = newRows;
  }

  getResponseData(httpResponse: any) {
    let responsedata = httpResponse;
    if (this.datareader != null) {
      const dr = this.datareader.split('.');
      for (const ir of dr) {
        responsedata = responsedata[ir];
      }
    } else {
      responsedata = httpResponse;
    }

    return responsedata;
  }

  selectAllRecord() {
    this.selectAll = !this.selectAll;

    if (this.selectAll) {
      for (const vr of this.viewRows) {
        this.selectedRows.push(vr);
      }
    } else {
      this.selectedRows = [];
    }
    this.emitSelectedRows();

    if (this.groupby) {
      if (!this.selectAll) {
        this.viewRows.forEach((row) => {
          row.isSelected = false;
          row.groupData.forEach((node: any) => {
            node.isSelected = false;
          });
        });
      } else {
        this.viewRows.forEach((row) => {
          row.isSelected = true;
          row.groupData.forEach((node: any) => {
            node.isSelected = true;
          });
        });
      }
    }
  }

  onColumnCheck(column: any) {
    column.hidden = !column.hidden;
    this.getColumnCount();
    this.checkFirstTabIndex(1);
  }

  onRowClick(rowData: any, rowIndex: any) {
    this.data.forEach((opt: any) => {
      opt.isSelected = false;
      if (opt.hasOwnProperty('groupData')) {
        opt.groupData.forEach((optChild: any) => {
          optChild.isSelected = false;
        });
      }
    });
    rowData.isSelected = !rowData.isSelected;
    rowIndex = 'row' + rowIndex;
    this.rowId = rowIndex;
    this.rowSelect.emit(rowData);
    this.selectedRowNo = rowIndex;
  }

  loadPageData(pageInfo: any) {
    if (this.serverSidePaging) {
      this.onPageChange.emit(pageInfo);
    } else {
      this.currentPage = pageInfo.pageNumber;
      this.renderData();
    }

  }

  getFilteredData(filteredObj: any) {
    this.fliterFlag = true;
    const resultData: any = [];
    if (filteredObj.length > 0) {
      this.filterCloneData.forEach((option: any) => {
        if (this.filterOpertion(option, filteredObj)) {
          resultData.push(option);
        }
      });
      if (resultData.length < (1 * this.pagesize)) {
        this.currentPage = 1;
        this.maxPage = 1;
      }
      this.data = resultData;
    } else {
      this.data = this.filterCloneData;
    }

    this.renderData();
  }

  filterOpertion(data: any, filteredObj: any) {
    const statusCollection: any = [];
    let condition = false;
    filteredObj.forEach((filterOpt: any) => {
      if (filterOpt.type === 'string') {
        if (filterOpt.value && data[filterOpt.key] && typeof data[filterOpt.key] === 'string') {
          statusCollection.push(this.checkStringFilter(filterOpt.filter, data[filterOpt.key].toLowerCase(), filterOpt.value.toLowerCase()));
        }

      } else if (filterOpt.type === 'number') {
        statusCollection.push(this.checkNumberFilter(filterOpt.filter, data[filterOpt.key], filterOpt.value));
      }
    });

    if (statusCollection.filter((status: any) => status === true).length > 0) {
      condition = true;
    }
    return condition;
  }

  checkNumberFilter(filter: string, key: any, value: number): boolean {
    if (filter === '<') {
      return key > value;
    } else if (filter === '>') {
      return key < value;
    } else if (filter === '>=') {
      return key <= value;
    } else if (filter === '=<') {
      return key >= value;
    } else if (filter === '==') {
      return key === value;
    } else if (filter === '!=') {
      return key !== value;
    } else {
      return key !== value;
    }
  }

  checkStringFilter(filter: string, key: any, value: string): boolean {
    if (filter === '3') {
      return key.includes(value);
    } else if (filter === '1') {
      return key.startsWith(value);
    } else if (filter === '2') {
      return key.endsWith(value);
    } else {
      return key !== value;
    }
  }

  setSelectedRow(rowData: any, event: any) {
    if (event.classList.value === this.checkDefaultIcon) {
      this.selectedRows.push(rowData);
      event.classList.value = 'checkbox active';
    } else {
      const indexOf = this.selectedRows.indexOf(rowData);
      this.selectedRows.splice(indexOf, 0);
      event.classList.value = this.checkDefaultIcon;
    }
    this.emitSelectedRows();
  }

  emitSelectedRows() {
    const sRows = [];
    for (const sr of this.selectedRows) {
      if (sr) {
        sRows.push(sr);
      }
    }
    this.selectedRowData.emit(sRows);

  }

  setCheckBoxSelectClass() {
    if (this.selectAll) {
      return 'checkbox active';
    } else if (!this.selectAll) {
      return this.checkDefaultIcon;
    }
  }

  sortOnColHeaderClick(sortCol: any, clickEvent: any) {

    this.onHeaderClick.emit({ event: clickEvent, data: sortCol });
    if (sortCol.sort) {
      if (this.sortBy === -1) {
        this.sortBy = 1;
      } else if (this.sortBy === 1) {
        this.sortBy = 2;
      } else if (this.sortBy === 2) {
        this.sortBy = 1;
      }
      this.setSortColumn(sortCol, this.sortBy);
    }

  }

  setSortColumn(sortCol: any, _sortBy: number) {

    /*------set column sort false for other column--------*/
    this.columns.forEach((opt) => {
      opt['isColumnSort'] = false;
    });
    this.sortBy = _sortBy;
    this.sortColumn = sortCol;
    this.sortColumn.sort = true;
    this.sortColumn.isColumnSort = true;

    this.sortData();
  }

  sortData() {
    if (this.sortColumn) {
      let sortColDataIndex: any;
      const sortOrder = this.sortBy;
      if (this.sortColumn.dataindex && this.sortColumn.datatype) {
        const dataindex = this.sortColumn.dataindex;
        sortColDataIndex = dataindex;
        if (this.sortColumn.datatype === 'string') {

          if (this.groupby) {
            this.sortOrderGrpBy(sortOrder);
          } else {
            this.data.sort((a, b) => {
              const x = a[sortColDataIndex].toLowerCase();
              const y = b[sortColDataIndex].toLowerCase();
              return this.noGrpBySortOrder(sortOrder, x, y);
            });
          }
        } else if (this.sortColumn.datatype === 'number') {
          this.sortOrderByNumber(sortOrder, sortColDataIndex);
        } else if (this.sortColumn.datatype === 'boolean') {
          this.sortOrderByBoolean(sortOrder, sortColDataIndex);
        }
      }
    }
    this.renderData();
  }

  sortOrderByBoolean(sortOrder: any, sortColDataIndex: any) {
    this.data.sort((a, b) => {
      const x = a[sortColDataIndex];
      const y = b[sortColDataIndex];
      if (sortOrder === 1) {
        return (x === y) ? 0 : x ? -1 : 1;
      }
    });
    if (sortOrder === 2) {
      this.data.reverse();
    }
  }

  // Sort Order for number field
  sortOrderByNumber(sortOrder: any, sortColDataIndex: any) {
    if (this.groupby) {
      this.data.sort((a, b) => {
        const x = a.group;
        const y = b.group;

        if (sortOrder === 2) {
          return y - x;
        } else {
          return x - y;
        }

      });
    } else {
      this.data.sort((a, b) => {
        const x = a[sortColDataIndex];
        const y = b[sortColDataIndex];
        if (sortOrder === 2) {
          return y - x;
        } else {
          return x - y;
        }
      });
    }
  }

  // Sort order if group by is false
  noGrpBySortOrder(sortOrder: any, x: any, y: any) {
    if (sortOrder === 2) {
      if (x < y) {
        return 1;
      }
      if (x > y) {
        return -1;
      }
    } else {
      if (x < y) {
        return -1;
      }
      if (x > y) {
        return 1;
      }
    }
    return 0;
  }

  // Sort Order if group by is true
  sortOrderGrpBy(sortOrder: any) {
    this.data.sort((a, b) => {
      const x = a.group.toLowerCase();
      const y = b.group.toLowerCase();

      if (sortOrder === 2) {
        if (x < y) {
          return 1;
        }
        if (x > y) {
          return -1;
        }
      } else {
        if (x < y) {
          return -1;
        }
        if (x > y) {
          return 1;
        }
      }

      return 0;
    });
  }

  /* grouby column methods*/

  onTabClick(btn: any) {
    btn.classList.toggle('active-accordion');
    const panel = btn.nextElementSibling;
    if (this.iconclassKey === this.plusIcon) {
      this.iconclassKey = 'fa fa-minus';
    } else if (this.iconclassKey === 'fa fa-minus') {
      this.iconclassKey = this.plusIcon;
    }
    if (panel.style.maxHeight) {
      panel.style.maxHeight = null;
    } else {
      panel.style.maxHeight = panel.scrollHeight + 'px';
    }
  }

  toogle(row: any, index: number) {
    row.expanded = !row.expanded;
    if (row.expanded) {
      if (row.hasOwnProperty('groupData')) {
        this.addRows(row, index);
      }
    } else {
      if (row.hasOwnProperty('groupData')) {
        this.removeRows(row);
      }
    }
  }

  addRows(row: any, index: number) {
    row.level = Math.floor(Math.random() * 900) + 100;
    row.groupData.forEach((node: any, index1: any) => {
      node.level = row.level;
      this.viewRows.splice(index + (index1 + 1), 0, node);
    });
  }

  removeRows(row: any) {
    let count = 0;
    this.viewRows.forEach((node: any) => {
      if (!node.hasOwnProperty('group') && node.level === row.level) {
        count++;
      }
    });
    this.viewRows.forEach((node: any, index: any) => {
      if (!node.hasOwnProperty('group') && node.level === row.level) {
        this.viewRows.splice(index, count);
      }
    });
  }

  isGroupChecking(row: any) {
    if (row.hasOwnProperty('group')) {
      return true;
    } else {
      return false;
    }
  }

  selectParent(row: any) {
    if (this.groupby) {
      row.isSelected = !row.isSelected;
      row.groupData.forEach((node: any) => {
        node.isSelected = !node.isSelected;
      });
      this.selectedRows = [];
      this.viewRows.forEach((rows) => {
        if (rows.isSelected) {
          this.selectedRows.push(rows);
        }
      });
      this.emitSelectedRows();
    }
  }

  loadContextMenu(event: any, row: any, col: any, ref: any) {
    if (this.contextmenu && this.contextmenu.length > 0) {
      this.tempContextMenu = [];
      this.tempSelectedFlag(this.viewRows);
      this.mouseLocation.left = event.clientX;
      this.mouseLocation.top = event.clientY;
      row.isSelected = true;

      if (col.contextmenu && col.contextmenu.length > 0) {
        this.flag = true;
        this.tempContextMenu = col.contextmenu;
        this.addListner();
      } else if (this.contextmenu && this.contextmenu.length > 0) {
        this.tempContextMenu = this.contextmenu;
        this.flag = true;
        this.addListner();
      }
      this.posixUp = this.getListPosition(ref);
      event.preventDefault();
      event.stopPropagation();
      this.rightClickRowData = row;
    }
  }

  rightClickDataEmit(Data: any) {
    this.rightClick.emit(Data);
  }

  // Method to get List position
  private getListPosition(elementRef: any) {
    const height = 240;
    if ((window.screen.height - elementRef.getBoundingClientRect().bottom) < height) {
      return true;
    } else {
      return false;
    }
  }

  // Method to get Selected Row
  private tempSelectedFlag(viewRows: any) {
    viewRows.forEach((row: any) => {
      if (row.isSelected) {
        row.isSelected = false;
      }
    });
  }

  addListner() {
    this.globalClickListenFunc = this.renderer.listen('document', 'click', (e: any) => {
      this.flag = false;
      this.showToolTip = false;
      this.showEnableColumnFilter = false;
      if (!this.flag || !this.showToolTip || !this.showEnableColumnFilter) {
        this.removeListner();
      }
    });
  }

  removeListner() {
    if (this.globalClickListenFunc) {
      this.globalClickListenFunc();
    }
  }

  ngOnDestroy(): void {
    this.removeListner();
  }

  onFilterIconClick(event: any) {
    event.stopImmediatePropagation();
    this.addListner();
    this.showEnableColumnFilter = false;
    this.showToolTip = !this.showToolTip;
  }
  groupbyIconClick() {
    this.showEnableColumnFilter = false;
    this.showGroupByColumn = !this.showGroupByColumn;
    this.showToolTip = false;
}
onEnableColumnClick(event: any) {
    event.stopImmediatePropagation();
    this.addListner();
    this.showToolTip = false;
    this.showEnableColumnFilter = !this.showEnableColumnFilter;
    this.showGroupByColumn = false;
  }

  getFilterClick() {
    this.filterComRef.forEach((com: any) => {
      com.showToolTip = false;
    });
  }
  // TAB NAVIGATION
  // LEFT ARROW
  arrowLeft(ref: any) {
    const intId = (ref.id).substring(ref.id.search('-') + 1, (ref.id).length);
    const unitId = parseInt(intId, 10) % 10;
    const firstId = intId.slice(0, -1);
    this.findPreviousColumn(unitId, firstId);
  }

  // RIGHT ARROW
  arrowRight(ref: any) {
    const intId = (ref.id).substring(ref.id.search('-') + 1, (ref.id).length);
    const unitId = parseInt(intId, 10) % 10;
    const firstId = intId.slice(0, -1);
    this.findNextColumn(unitId, firstId);
  }

  // UP ARROW
  arrowUp(ref: any) {
    const intId = (ref.id).substring(ref.id.search('-') + 1, (ref.id).length);
    const unitId = intId.slice(0, -1);
    if (unitId > 1 && document.getElementById(this.title + '-' + (parseInt(intId, 10) - 10).toString())) {
      document.getElementById(this.title + '-' + (parseInt(intId, 10) - 10).toString()).focus();
    }
  }

  // DOWN ARROW
  arrowDown(ref: any) {
    const intId = (ref.id).substring(ref.id.search('-') + 1, (ref.id).length);
    const firstId = parseInt(intId.slice(0, -1), 10);
    if ((this.pagesize && firstId < this.pagesize && firstId < this.viewRows.length || (firstId <= this.viewRows.length - 1))
      && document.getElementById(this.title + '-' + (parseInt(intId, 10) + 10).toString())) {
      document.getElementById(this.title + '-' + (parseInt(intId, 10) + 10).toString()).focus();
    }
  }

  // END
  keyEnd(ref: any) {
    const intId = (ref.id).substring(ref.id.search('-') + 1, (ref.id).length);
    const unitId = parseInt(intId, 10) % 10;
    const firstId = intId.slice(0, -1);
    const newLastId = this.columns.length;
    this.findHomeColumn(unitId, firstId, newLastId);
  }

  // END: TO FIND LAST COLUMN
  findLastColumn(unitId: any, firstId: any, newLastId: any) {
    if (this.columnHiddenIndexArray.length >= 1 && this.columnHiddenIndexArray.includes(newLastId)) {
      this.findHomeColumn(unitId, firstId, newLastId - 1);
    } else {
      const generatedId = firstId + '' + newLastId;
      document.getElementById(this.title + '-' + (parseInt(generatedId, 10)).toString()).focus();
    }
  }

  // HOME
  keyHome(ref: any) {
    const intId = (ref.id).substring(ref.id.search('-') + 1, (ref.id).length);
    const unitId = parseInt(intId, 10) % 10;
    this.findHomeColumn(unitId, intId.slice(0, -1), 1);
  }

  // HOME: TO FIND FIRST COLUMN
  findHomeColumn(unitId: any, firstId: any, newFirstId: any) {
    if (this.columnHiddenIndexArray.length >= 1 && this.columnHiddenIndexArray.includes(newFirstId)) {
      this.findHomeColumn(unitId, firstId, newFirstId + 1);
    } else {
      const generatedId = firstId + '' + newFirstId;
      document.getElementById(this.title + '-' + (parseInt(generatedId, 10)).toString()).focus();
    }
  }

  // CONTROL HOME
  keyControlHome() {
    const unitId = 1;
    const firstId = 1;
    this.findControlHomeColumn(unitId, firstId);
  }

  // CONTROL HOME COLUMN
  findControlHomeColumn(unitId: any, firstId: any) {
    if (this.columnHiddenIndexArray.length >= 1 && this.columnHiddenIndexArray.includes(unitId)) {
      this.findControlHomeColumn(unitId + 1, firstId);
    } else {
      const generatedId = firstId + '' + unitId;
      document.getElementById(this.title + '-' + (parseInt(generatedId, 10)).toString()).focus();
    }
  }

  // CONTROL END
  keyControlEnd() {
    const unitId = this.columns.length;
    if (this.pagesize && this.viewRows.length >= this.pagesize) {
      const firstId = this.pagesize;
      this.findControlEndColumn(unitId, firstId);
    } else {
      const firstId = this.viewRows.length;
      this.findControlEndColumn(unitId, firstId);
    }
  }

  // CONTROL END COLUMN
  findControlEndColumn(unitId: any, firstId: any) {
    if (this.columnHiddenIndexArray.length >= 1 && this.columnHiddenIndexArray.includes(unitId)) {
      this.findControlHomeColumn(unitId - 1, firstId);
    } else {
      const generatedId = firstId + '' + unitId;
      document.getElementById(this.title + '-' + (parseInt(generatedId, 10)).toString()).focus();
    }

  }

  // TO GET COLUMN COUNT EXCLUDING HIDDEN COLUMNS
  getColumnCount() {
    if (this.columns) {
      this.columnHiddenIndexArray = [];
      this.columns.forEach((element: any, index: any) => {
        if (!element.hidden) {
          this.columnCountArray.push(element);
        } else {
          this.columnHiddenIndexArray.push(index + 1);
        }
      });
    }
  }

  // TO FIND NEXT COLUMN: RIGHT ARROW
  findNextColumn(index: any, firstId: any) {
    if (index < this.columns.length) {
      if (this.columnHiddenIndexArray.length >= 1 && this.columnHiddenIndexArray.includes(index + 1)) {
        index = index + 1;
        this.findNextColumn(index, firstId);
      } else {
        const generatedId = firstId + '' + (index + 1);
        document.getElementById(this.title + '-' + (parseInt(generatedId, 10)).toString()).focus();
      }
    }
  }

  // TO FIND PREVIOUS COLUMN: LEFT ARROW
  findPreviousColumn(index: any, firstId: any) {
    if (index > 1) {
      if (this.columnHiddenIndexArray.length >= 1 && this.columnHiddenIndexArray.includes(index - 1)) {
        index = index - 1;
        this.findPreviousColumn(index, firstId);
      } else {
        const generatedId = firstId + '' + (index - 1);
        document.getElementById(this.title + '-' + (parseInt(generatedId, 10)).toString()).focus();
      }
    }
  }

  // DEFAULT FIRST TAB
  checkFirstTabIndex(index: any) {
    if (this.columnHiddenIndexArray.length >= 1) {
      if (this.columnHiddenIndexArray.includes(index)) {
        this.firstIndex = index + 1;
        this.checkFirstTabIndex(this.firstIndex);
      }
    } else {
      this.firstIndex = 1;
    }
  }

  // DOWN COLUMN: DOWN ARROW
  onArrowdownList(listId: any) {
    const unitId = parseInt(listId, 10);
    const nextId = unitId + 1;
    if (nextId < this.columns.length) {
      document.getElementById(nextId.toString()).focus();
    } else {
      listId = '-1';
      this.onArrowdownList(listId);
    }
  }

  // UP COLUMN: UP ARROW
  onArrowUpList(listId: any) {
    const unitId = parseInt(listId, 10);
    const previousId = unitId - 1;
    if (previousId >= 0) {
      document.getElementById(previousId.toString()).focus();
    } else {
      const nextId = this.columns.length;
      listId = nextId.toString();
      this.onArrowUpList(listId);
    }
  }

  onArrowUpGlobalList(listId: any) {
    const unitId = parseInt(listId, 10);
    const previousId = unitId - 1;
    if (previousId >= 0) {
      document.getElementById(previousId.toString()).focus();
    } else {
      const nextId = this.globalFilterOptions.length;
      listId = nextId.toString();
      this.onArrowUpGlobalList(listId);
    }
  }

  onArrowdownGlobalList(listId: any) {
    const unitId = parseInt(listId, 10);
    const nextId = unitId + 1;
    if (nextId < this.globalFilterOptions.length) {
      document.getElementById(nextId.toString()).focus();
    } else {
      listId = '-1';
      this.onArrowdownGlobalList(listId);
    }
  }

  onPageDownClick() {
    if (this.pageId.activePage < this.pagesize) {
      this.pageId.onPageClick(this.pageId.activePage + 1, this.pageId.activePage);
      const pageInfo = { pageNumber: this.pageId.activePage, current: this.pageId.activePage, next: this.pageId.activePage + 1 };
      this.loadPageData(pageInfo);
      this.checkFirstTabIndex(1);
      setTimeout(() => {
        this.keyControlHome();
      }, 100);
    }
  }

  onPageUpClick() {
    if (this.pageId.activePage > 1) {
      this.pageId.onPageClick(this.pageId.activePage - 1, this.pageId.activePage - 2);
      const pageInfo = { pageNumber: this.pageId.activePage - 1, current: this.pageId.activePage, next: this.pageId.activePage + 1 };
      this.loadPageData(pageInfo);
      setTimeout(() => {
        this.keyControlEnd();
      }, 100);
    }
  }

  showGroupCol() {
    this.showGroupByColumn = !this.showGroupByColumn;
  }

  findContolEndGrpBy() {
    if (this.viewRows && this.viewRows.length > 0) {
      const firstLevelGrid: any[] = [];
      const unitId = this.columns.length;
      const firstId = this.viewRows.length;
      this.viewRows.forEach((element, index) => {
        if (element.hasOwnProperty('expanded')) {
          firstLevelGrid.push(element);
        }
      });
      if (!firstLevelGrid[firstLevelGrid.length - 1].expanded) {
        this.findControlEndColumn(1, firstId);
      } else {
        this.findControlEndColumn(unitId, firstId);
      }
    }
  }

  setColorPalette(themeClass: any) {
    this.themeCss = themeClass;
  }
}
