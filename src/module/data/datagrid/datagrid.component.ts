/**
 * Created by pratik on 1/1/18.
 */
import {
  AfterContentInit, ChangeDetectorRef, Component, ContentChildren, DoCheck, EventEmitter, Input, OnInit, Output,
  QueryList
} from '@angular/core';
import {AmexioGridColumnComponent} from './data.grid.column';
import {CommonDataService} from "../../services/data/common.data.service";

@Component({
  selector: 'amexio-datagrid',
  template: `
    <div>
      <div class="datatabletitle">
        <span> {{title}} </span>
        <span *ngIf="columnToggle ? true:false" class="float-right"
              (click)="showToolTip = !showToolTip ; showGroupByColumn = false"
              style=" cursor: pointer;">
            &nbsp;&nbsp;<span *ngIf="!show">&#9776;</span>
            <span *ngIf="show">&#9747;</span>
          </span>

        <span *ngIf="groupByColumn ? true : false" class="float-right"
              (click)="showGroupByColumn = !showGroupByColumn; showToolTip = false"
              style=" cursor: pointer;">
            <span class="fa fa-th-list"></span>
          </span>
      </div>
      <ng-container *ngIf="filtering ? true : false">
        <div class="datatable datatable-row">
          <ng-container *ngIf="checkboxSelect">
            <div class="datatable-col">
              <div class="inputgroup">
                <div class="input-box">
                  <div *ngIf="!selectAll" (click)="selectAllRecord()" class="checkbox default"></div>
                  <div *ngIf="selectAll" (click)="selectAllRecord()" class="checkbox active">&#10004;</div>
                </div>
              </div>
            </div>
          </ng-container>

          <ng-container *ngIf="filtering ? true : false">
            <ng-container *ngFor="let cols of columns">
              <ng-container *ngIf="!cols.hidden">
                <div class="datatable-col">
                  <data-grid-filter [column]="cols"
                                      (filterObject)="getFilteredData($event)">
                  </data-grid-filter>
                </div>
              </ng-container>
            </ng-container>
          </ng-container>

        </div>
      </ng-container>

      <div>
        <ng-container *ngIf="columnToggle ? true : false">
          <span *ngIf="showToolTip" class="dropdown dropdown-right" style="width: 250px;">
        <ul class="dropdown-list">
          <li class="list-items" *ngFor="let cols of columns;let i = index;" (click)="showToolTip = !showToolTip">
            <div>
             <input type="checkbox" [attr.checked]="!cols.hidden ? true: null" (click)="onColumnCheck(cols)"/>
             <label>{{cols.text}}</label>
            </div>
          </li>
         </ul>
      </span>
        </ng-container>

        <ng-container *ngIf="groupByColumn ? true : false">
          <span *ngIf="showGroupByColumn" class="dropdown dropdown-right" style="width: 250px;">
        <ul class="dropdown-list">
          <li class="list-items" *ngFor="let cols of columns;let i = index;"
              (click)="showGroupByColumn = !showGroupByColumn">
            <div (click)="setGroupByColumn(cols)">
             <label>{{cols.text}}</label>
            </div>
          </li>
         </ul>
      </span>
        </ng-container>


      </div>
    </div>

    <div class="datatable">
      <div class="datatable-header">
        <ng-container *ngIf="checkboxSelect">
          <div class="datatable-col">
            <div class="inputgroup">
              <div class="input-box">
                <div *ngIf="!selectAll" (click)="selectAllRecord()" class="checkbox default"></div>
                <div *ngIf="selectAll" (click)="selectAllRecord()" class="checkbox active">&#10004;</div>
              </div>
            </div>
          </div>
        </ng-container>

        <ng-container *ngFor="let cols of columns">
          <ng-container *ngIf="!cols.hidden">
            <div class="datatable-col" (click)="sortOnColHeaderClick(cols, $event)">
              {{cols.text}} &nbsp;
              <ng-container *ngIf="this.sortBy==1 && cols.isColumnSort">
                &nbsp; <i class="fa fa-arrow-up"></i>
              </ng-container>
              <ng-container *ngIf="this.sortBy==2 && cols.isColumnSort">
                &nbsp;<i class="fa fa-arrow-down"></i>
              </ng-container>
            </div>
          </ng-container>
        </ng-container>
      </div>
    </div>


    <ng-container *ngIf="!groupByColumn">
      <div class="datatable-height" [style.height.px]="height">
        <div class="datatable">
          <div class="datatable-row" *ngFor="let row of viewRows;let i=index" id="{{'row'+i}}" [ngClass]="rowBgColor"
               (click)="rowClick(row, i,rowData)" #rowData>

            <ng-container *ngIf="checkboxSelect">
              <div class="datatable-col">
                <div class="inputgroup">
                  <div class="input-box">
                    <div (click)="setSelectedRow(row, check)" [class]="setCheckBoxSelectClass(check)" #check>
                      {{((setCheckBoxSelectClass(check) == 'checkbox active') && (check.classList.value == 'checkbox active')) || ((setCheckBoxSelectClass(check) == 'checkbox default') && (check.classList.value == 'checkbox active')) ? '&#10004;' : ''}}
                    </div>
                  </div>
                </div>
              </div>
            </ng-container>

            <ng-container *ngFor="let cols of columns;let colIndex = index">
              <ng-container *ngIf="!cols.hidden">
                <ng-container *ngIf="cols.dataType=='number'">
                  <div class="datatable-col" scope="row" [attr.data-label]="cols.text">
               <span>
                 {{row[cols.dataIndex]}}
               </span>
                  </div>
                </ng-container>
                <ng-container *ngIf="!cols?.bodyTemplate && cols.dataType=='string'">
                  <div class="datatable-col" scope="row" [attr.data-label]="cols.text">
                    {{row[cols.dataIndex]}}
                  </div>
                </ng-container>
                <ng-template *ngIf="cols.bodyTemplate" [ngTemplateOutlet]="cols.bodyTemplate"
                             [ngTemplateOutletContext]="{ $implicit: { text : row[cols.dataIndex] }, row: row }"></ng-template>
              </ng-container>
            </ng-container>
          </div>
        </div>
      </div>

    </ng-container>

    <!--Group BY datagrid start-->

    <ng-container *ngIf="groupByColumn && !filtering">
      <div class="datatable-height" [style.height.px]="height">
        <div class="datatable">
          <div class="datatable-row" *ngFor="let row of viewRows;let i=index" id="{{'row'+i}}" (click)="rowClick(row, i, rowData)" #rowData>
            <ng-container *ngIf="checkboxSelect">
              <div class="datatable-col">
                <div class="inputgroup">
                  <div class="input-box">
                    <div (click)="selectParent(row)" [class]="row.isSelected ?'checkbox active':'checkbox default'">
                      {{row.isSelected ? '&#10004;' : ''}}
                    </div>
                  </div>
                </div>
              </div>
            </ng-container>
            <ng-container *ngFor="let cols of columns;let colIndex = index">
              <ng-container *ngIf="isGroupChecking(row)">
                <div class="datatable-col" >
                  <ng-container *ngIf="colIndex == 0">
                    <i *ngIf="!row.expanded" class="fa fa-caret-right" aria-hidden="true" (click)="toogle(row,i)"></i>
                    <i *ngIf="row.expanded" class="fa fa-caret-down" aria-hidden="true" (click)="toogle(row,i)"></i>
                    {{row.group}}
                  </ng-container>
                </div>
              </ng-container>
              <ng-container *ngIf="!isGroupChecking(row)">
                <div class="datatable-col">
               <span style="padding-left: 20px">
              {{row[cols.dataIndex]}}
               </span>
                </div>
              </ng-container>
            </ng-container>
          </div>
        </div>
      </div>
    </ng-container>
    <!--Group BY datagrid end-->
    <div>
      <div class="footer">
        <ng-container *ngIf="pageSize && (data && data.length > pageSize)">
          <ng-container *ngIf="totalPages!=null">
            <amexio-paginator [pages]="totalPages" [rows]="pageSize"
                                (onPageChange)="loadPageData($event)"></amexio-paginator>
          </ng-container>
        </ng-container>
      </div>
    </div>
  `
})

export class AmexioDatagridComponent implements OnInit, AfterContentInit, DoCheck {

  @Input() title: string;

  @Input() pageSize: number;

  @Input() httpUrl: string;

  @Input() httpMethod: string;

  @Input() dataReader: string;

  @Input() checkboxSelect: boolean;

  @Input() data: any[];

  @Output() rowSelect: any = new EventEmitter<any>();

  @Output() selectedRowData: any = new EventEmitter<any>();

  @Input() height: string;

  @Input() width: string;

  @Input() groupByColumn = false;

  @Input() groupByColumnIndex: string;

  @Input() filtering: boolean;

  @Input() cClass: string;

  @Input() tableHeadercClass: string;

  @Input() tableTitlecClass: string;

  @Input() tableDatacClass: string;

  @Input() tableRowSelectedColor: string;

  @Input() columnDefinition: any;

  @Output() onColumnClickEvent: EventEmitter<any> = new EventEmitter<any>();

  @Output() columnDataEvent: EventEmitter<any> = new EventEmitter<any>();

  @Input()  columnToggle: boolean;

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

  /*group by column attribute*/

  iconClassKey: string;

  isExpanded = false;


  @ContentChildren(AmexioGridColumnComponent) columnRef: QueryList<AmexioGridColumnComponent>;


  constructor(public dataTableService: CommonDataService,  private cd: ChangeDetectorRef) {
    this.selectedRows = [];
    this.sortBy = -1;
  }

  ngOnInit() {

    this.isExpanded = true;
    this.iconClassKey = 'fa fa-plus';

    if (this.tableRowSelectedColor == null || this.tableRowSelectedColor == '') {
      this.tableRowSelectedColor = '#dcecf7';
    }
    if (this.httpMethod && this.httpUrl){
      this.dataTableService.fetchData(this.httpUrl, this.httpMethod).subscribe(
        response => {
          this.responseData = response.json();
        },
        error => {
        },
        () => {
          this.setData(this.responseData);
        }
      );
    } else if (this.data) {
      this.previousData = JSON.parse(JSON.stringify(this.data));
      this.setData(this.data);
    }
    if (this.columnDefinition && this.columnDefinition.length > 0 ) {
      this.columnPreviewData = JSON.parse(JSON.stringify(this.columnDefinition));
      this.columns = this.columnDefinition;
    }
  }

  ngDoCheck() {
    if (this.previousData != null && JSON.stringify(this.previousData) != JSON.stringify(this.data)){
      this.previousData = JSON.parse(JSON.stringify(this.data));
      this.setData(this.data);
    }
    if (this.columnPreviewData != null && JSON.stringify(this.columnPreviewData) != JSON.stringify(this.columnDefinition)) {
      this.columnPreviewData = JSON.parse(JSON.stringify(this.columnDefinition));
      this.columns = this.columnDefinition;
    }
  }

  ngAfterContentInit() {
    if (this.columnDefinition && this.columnDefinition.length > 0) {
      this.columns = this.columnDefinition;
    } else {
      this.createConfig();
    }
  }

  createConfig() {
    let columnRefArray = [];
    columnRefArray = this.columnRef.toArray();
    for (let cr = 0 ; cr < columnRefArray.length; cr++) {
      const columnConfig = columnRefArray[cr];
      let columnData: any;
      if (columnConfig.headerTemplate != null && columnConfig.bodyTemplate != null) {
        columnData = {
          text: columnConfig.text,
          dataIndex: columnConfig.dataIndex,
          hidden: columnConfig.hidden,
          dataType: columnConfig.dataType,
          headerTemplate: columnConfig.headerTemplate,
          bodyTemplate: columnConfig.bodyTemplate
        };
      } else if (columnConfig.headerTemplate != null && columnConfig.bodyTemplate == null) {
        columnData = {
          text: columnConfig.text,
          dataIndex: columnConfig.dataIndex,
          hidden: columnConfig.hidden,
          dataType: columnConfig.dataType,
          headerTemplate: columnConfig.headerTemplate
        };
      } else if (columnConfig.bodyTemplate != null && columnConfig.headerTemplate == null) {
        columnData = {
          text: columnConfig.text,
          dataIndex: columnConfig.dataIndex,
          hidden: columnConfig.hidden,
          dataType: columnConfig.dataType,
          bodyTemplate: columnConfig.bodyTemplate
        };
      } else if (columnConfig.bodyTemplate == null && columnConfig.headerTemplate == null) {
        columnData = {
          text: columnConfig.text,
          dataIndex: columnConfig.dataIndex,
          hidden: columnConfig.hidden,
          dataType: columnConfig.dataType
        };
      }
      if (columnConfig.summaryType) {
        columnData['summaryType'] = columnConfig.summaryType;
      }

      if (columnConfig.summaryCaption) {
        columnData['summaryCaption'] = columnConfig.summaryCaption;
      }

      this.columns.push(columnData);
    }
  }

  setData(httpResponse: any){
    this.viewRows = this.getResponseData(httpResponse);
    this.setSelectedFlag(this.viewRows);
    this.data = this.viewRows;
    if (this.groupByColumn) {
      this.cloneData = JSON.parse(JSON.stringify(this.data));
    }
    if (this.filtering) {
      this.filterCloneData = JSON.parse(JSON.stringify(this.data));
    }
    this.renderData();
    if (this.groupByColumn) {
      this.setColumnData();
    }
    this.totalPages = this.pageNumbers.length;

  }

  setSelectedFlag(viewRows: any) {
    viewRows.forEach((row: any) => {
      if (!row.hasOwnProperty('isSelected')) {
        row['isSelected'] = false;
      }
    });
  }

  setGroupByColumn(col: any) {
    this.groupByColumnIndex = col.dataIndex;
    this.selectAll = false;
    this.setColumnData();
  }

  setColumnData() {
    this.data = this.cloneData;
    const groups = {};
    this.data.forEach((option) => {
      const groupName = option[this.groupByColumnIndex];
      if (!groups[groupName]) {
        groups[groupName] = [];
      }
      groups[groupName].push(option);
    });
    this.data = [];
    for (const groupName in groups) {
      this.data.push({expanded: false, isSelected: false, group: groupName, groupData: groups[groupName]});
    }

    /*-------Aggregation---------*/

    /* this.data.forEach((groupdata)=>{
     let aggregateValue :  number;
     let dummyA={};
     let k;
     let arrayIndex;
     this.columns.forEach((columnOption)=> {
     if(columnOption.aggregate==true) {
     k = columnOption.dataIndex;
     aggregateValue =0;
     groupdata.groupData.forEach((childData, index) => {
     aggregateValue = +(aggregateValue + Number(childData[columnOption.dataIndex]));
     arrayIndex = index;

     });
     dummyA[k]=aggregateValue;
     }

     });

     groupdata.groupData[arrayIndex+1]=dummyA;

     });*/
    this.renderData();
    this.cd.detectChanges();
  }

  renderData() {
    //calculate page no for pagination
    if (this.data) {
      this.maxPage = 0;
      this.pageNumbers = [];
      if (this.data.length > (1 * this.pageSize)) {
        this.maxPage = Math.floor((this.data.length / this.pageSize));
        if ((this.data.length % this.pageSize) > 0) {
          this.maxPage++;
        }
      }
      for (let pageNo = 1; pageNo <= this.maxPage; pageNo++) {
        this.pageNumbers.push(pageNo);
      }
    }
    if (this.pageSize >= 1) {
      const rowsTemp = this.data;
      const newRows = [];
      let startIndex = 0;
      let endIndex = this.pageSize;
      if (this.currentPage > 1) {
        startIndex = (this.currentPage - 1) * this.pageSize;
        endIndex = startIndex + this.pageSize;
      }
      while (startIndex <= endIndex - 1) {
        if (rowsTemp[startIndex]) {
          newRows.push(rowsTemp[startIndex]);
        }
        startIndex++;
      }
      this.viewRows = newRows;

    } else {
      this.viewRows = this.data;
    }
    this.selectedRowNo = -1;
  }

  getResponseData(httpResponse: any){
    let responsedata = httpResponse;
    if (this.dataReader != null){
      const dr = this.dataReader.split('.');
      for (let ir = 0 ; ir < dr.length; ir++){
        responsedata = responsedata[dr[ir]];
      }
    }
    else{
      responsedata = httpResponse;
    }

    return responsedata;
  }

  selectAllRecord() {
    this.selectAll = !this.selectAll;

    if (this.selectAll) {
      for (let vr = 0; vr < this.viewRows.length; vr++) {
        this.selectedRows.push(this.viewRows[vr]);
      }
    } else {
      this.selectedRows = [];
    }
    this.emitSelectedRows();

    if (this.groupByColumn) {
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

  onColumnCheck(column: any){
    column.hidden = !column.hidden;
  }

  rowClick(rowData: any, rowIndex: any, rowRef: any) {
    if(rowRef.classList.contains('datatable-row-active')){
      rowRef.classList.remove('datatable-row-active');
    } else {
      rowRef.classList.add('datatable-row-active');
    }
    rowIndex = 'row' + rowIndex;
    this.rowId = rowIndex;
    this.rowSelect.emit(rowData);
    this.selectedRowNo = rowIndex;
  }


  loadPageData(pageNumber: number){
    this.currentPage = pageNumber;
    this.renderData();
  }

  getFilteredData(filteredObj: any) {
    let status = false;
    if (filteredObj.length > 0) {
      this.data = [];
      this.filterCloneData.forEach((option: any) => {
        status = this.filterOpertion(option, filteredObj);
        if (status) {
          this.data.push(option);
          status = false;
        }
      });
      if (this.data.length > (1 * this.pageSize)) {
        this.pagingRegenration();
        this.renderData();
      } else {
        this.viewRows = this.data;
        this.currentPage = 1;
        this.maxPage = 1;
        // this.cd.detectChanges();
      }

    } else {
      this.data = this.filterCloneData;
      this.pagingRegenration();
      this.renderData();
    }
  }

  filterOpertion(data: any, filteredObj: any) {
    const statusArray: any = [];
    let condition: any;
    filteredObj.forEach((filterOpt: any) => {
      if (filterOpt.filter === '3') {
        if (filterOpt.type === 'string') {
          condition = data[filterOpt.key].toLowerCase().includes(filterOpt.value.toLowerCase());
        }
        statusArray.push(condition);
      }
      if (filterOpt.filter === '1') {
        if (filterOpt.type === 'string') {
          condition = data[filterOpt.key].toLowerCase().startsWith(filterOpt.value.toLowerCase());
        }
        statusArray.push(condition);
      } else if (filterOpt.filter === '2') {
        if (filterOpt.type === 'string') {
          condition = data[filterOpt.key].toLowerCase().endsWith(filterOpt.value.toLowerCase());
        }
        statusArray.push(condition);
      } else if (filterOpt.filter === '<') {
        if (filterOpt.type === 'number') {
          condition = data[filterOpt.key] > filterOpt.value;
        }
        statusArray.push(condition);
      } else if (filterOpt.filter === '>') {
        if (filterOpt.type === 'number') {
          condition = data[filterOpt.key] < filterOpt.value;
        }
        statusArray.push(condition);
      } else if (filterOpt.filter === '>=') {
        if (filterOpt.type === 'number') {
          condition = data[filterOpt.key] <= filterOpt.value;
        }
        statusArray.push(condition);
      } else if (filterOpt.filter === '=<') {
        if (filterOpt.type === 'number') {
          condition = data[filterOpt.key] >= filterOpt.value;
        }
        statusArray.push(condition);
      } else if (filterOpt.filter === '==') {
        if (filterOpt.type === 'number') {
          condition = data[filterOpt.key] === filterOpt.value;
        } else {
          condition = data[filterOpt.key].toLowerCase() === filterOpt.value.toLowerCase();
        }
        statusArray.push(condition);
      } else if (filterOpt.filter === '!=') {
        if (filterOpt.type === 'number') {
          condition = data[filterOpt.key] !== filterOpt.value;
        } else {
          condition = data[filterOpt.key].toLowerCase() !== filterOpt.value.toLowerCase();
        }
        statusArray.push(condition);
      }
    });
    statusArray.forEach((opt: any) => {
      if (opt === false) {
        condition = false;
      }
    });
    return condition;
  }

  pagingRegenration() {
    this.maxPage = Math.floor((this.data.length / this.pageSize));
    if ((this.data.length % this.pageSize) > 0) {
      this.maxPage++;
    }
    for (let pageNo = 1; pageNo <= this.maxPage; pageNo++) {
      this.pageNumbers.push(pageNo);
    }
    // this.cd.detectChanges();
  }

  setSelectedRow(rowData: any, event: any) {
    if (event.classList.value == 'checkbox default') {
      this.selectedRows.push(rowData);
      event.classList.value = 'checkbox active';
    } else {
      const indexOf = this.selectedRows.indexOf(rowData);
      delete this.selectedRows[indexOf];
      event.classList.value = 'checkbox default';
    }
    this.emitSelectedRows();
  }

  emitSelectedRows() {
    const sRows = [];
    for (let sr = 0; sr < this.selectedRows.length; sr++) {
      if (this.selectedRows[sr]) {
        sRows.push(this.selectedRows[sr]);
      }
    }
    this.selectedRowData.emit(sRows);

  }

  setCheckBoxSelectClass(event: any) {
    if (this.selectAll) {
      return 'checkbox active';
    } else if (!this.selectAll) {
      return 'checkbox default';
    }
  }

  sortOnColHeaderClick(sortCol: any, event: any) {
    this.onColumnClickEvent.emit(event);
    this.columnDataEvent.emit(sortCol);
    if (this.sortBy === -1) {
      this.sortBy = 1;
    } else if (this.sortBy === 1) {
      this.sortBy = 2;
    } else if (this.sortBy === 2) {
      this.sortBy = 1;
    }
    this.setSortColumn(sortCol, this.sortBy);
  }

  setSortColumn(sortCol: any, _sortBy: number) {
    /*------set column sort false for other column--------*/
    this.columns.forEach((opt) => {
      opt['isColumnSort'] = false;
    });
    this.sortBy = _sortBy;
    this.sortColumn = sortCol;
    this.sortColumn.isColumnSort = true;

    this.sortData();
  }

  sortData() {
    if (this.sortColumn) {
      let sortColDataIndex: any;
      const sortOrder = this.sortBy;
      if (this.sortColumn.dataIndex && this.sortColumn.dataType) {
        const dataIndex = this.sortColumn.dataIndex;
        sortColDataIndex = dataIndex;
        if (this.sortColumn.dataType === 'string') {

          if (this.groupByColumn) {
            this.data.sort(function (a, b) {
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
          } else {
            this.data.sort(function (a, b) {
              const x = a[sortColDataIndex].toLowerCase();
              const y = b[sortColDataIndex].toLowerCase();

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
        } else if (this.sortColumn.dataType === 'number') {
          if (this.groupByColumn) {
            this.data.sort(function (a, b) {
              const x = a.group;
              const y = b.group;

              if (sortOrder === 2) {
                return y - x;
              } else {
                return x - y;
              }

            });
          } else {
            this.data.sort(function (a, b) {
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
      }
    }
    this.renderData();
  }

  /*grouby column methods*/

  onTabClick(btn: any){
    btn.classList.toggle('active-accordion');
    const panel = btn.nextElementSibling;
    // let icon = btn.children[0].children[0];

    if (this.iconClassKey == 'fa fa-plus'){
      this.iconClassKey = 'fa fa-minus';
    }
    else if (this.iconClassKey == 'fa fa-minus'){
      this.iconClassKey = 'fa fa-plus';
    }

    if (panel.style.maxHeight){
      panel.style.maxHeight = null;
    } else {
      panel.style.maxHeight = panel.scrollHeight + 'px';
    }
  }


  toogle(row: any, index: number) {
    row.expanded = !row.expanded;
    if (row.expanded){
      this.addRows(row, index);
    }else{
      this.removeRows(row);
    }
  }

  addRows(row: any, index: number) {
    row.level =  Math.floor(Math.random() * 900) + 100;
    row.groupData.forEach((node: any, index1: any) => {
      node.level = row.level;
      this.viewRows.splice(index + (index1 + 1), 0 , node);
    });
    console.log(this.viewRows);
  }

  removeRows(row: any) {
    let count = 0;
    this.viewRows.forEach((node: any) => {
      if (!node.hasOwnProperty('group') && node.level == row.level) {
        count ++;
      }
    });
    this.viewRows.forEach((node: any, index: any) => {
      if (!node.hasOwnProperty('group') && node.level == row.level) {
        this.viewRows.splice(index, count);
      }
    });
  }

  isGroupChecking(row: any) {
    if (row.hasOwnProperty('group')) {
      return true;
    }else {
      return false;
    }
  }

  getCheckboxStyle(row: any) {
    const status = false;
    return status;
  }

  selectParent(row: any) {
    if (this.groupByColumn) {
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
}
