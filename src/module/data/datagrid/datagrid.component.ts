/**
 * Created by pratik on 1/1/18.
 */
import {
  AfterContentInit, Component, ContentChildren, EventEmitter, Input, OnInit, Output,
  QueryList
} from '@angular/core';
import {AmexioGridColumnComponent} from "./data.grid.column";
import {CommonDataService} from "../../services/data/common.data.service";

@Component({
  selector: 'amexio-datagrid',
  template: `    
    <div>
      <div class="title">
        <span> {{title}} </span>
        <span *ngIf="columnToggle ? true:false" class="float-right" (click)="showToolTip = !showToolTip" style=" cursor: pointer;">
            <span *ngIf="!show">&#9776;</span>
            <span *ngIf="show">&#9747;</span>
          </span>
      </div>
      <ng-container *ngIf="filtering ? true : false">
        <div class="datatable datatable-row">
          <ng-container *ngIf="checkboxSelect">
            <div class="datatable-col">
              <div class="inputgroup">
                <div class="input-box">
                  <div  *ngIf="!selectAll" (click)="selectAll = !selectAll" class="checkbox default"></div>
                  <div *ngIf="selectAll" (click)="selectAll = !selectAll" class="checkbox active">&#10004;</div>
                </div>
              </div>
            </div>
          </ng-container>

          <ng-container *ngIf="filtering ? true : false">
            <ng-container *ngFor="let cols of columns">
              <div class="datatable-col">
                <data-grid-filter [column]="cols"
                                    (filterObject)="getFilteredData($event)"></data-grid-filter>
              </div>
            </ng-container>
          </ng-container>

        </div>
      </ng-container>

      <div>

        <ng-container *ngIf="columnToggle ? true : false" >
          <span *ngIf="showToolTip" class="dropdown dropdown-right" style="width: 250px;">
        <ul class="dropdown-list">
          <li class="list-items" *ngFor="let cols of columns;let i = index;" (click)="showToolTip = !showToolTip">
            <div>
             <input type="checkbox"  [attr.checked]="!cols.hidden ? true: null" (click)="onColumnCheck(cols)"/>
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
                <div  *ngIf="!selectAll" (click)="selectAllVisibleRows()" class="checkbox default"></div>
                <div *ngIf="selectAll" (click)="selectAllVisibleRows()"  class="checkbox active">&#10004;</div>
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

    <div class="datatable">
      <div class="datatable-row" *ngFor="let row of viewRows;let i=index" id="{{'row'+i}}" (click)="rowClick(row, i)">

        <ng-container *ngIf="checkboxSelect">
          <div class="datatable-col">
            <div class="inputgroup">
              <div class="input-box">
                <div  (click)="setSelectedRow(row, check)" [class]="setCheckBoxSelectClass(check)" #check>{{((setCheckBoxSelectClass(check) == 'checkbox active') && (check.classList.value == 'checkbox active')) || ((setCheckBoxSelectClass(check) == 'checkbox default') && (check.classList.value == 'checkbox active')) ? '&#10004;' : ''}}</div>
              </div>
            </div>
          </div>
        </ng-container>

        <ng-container *ngFor="let cols of columns;let colIndex = index">
          <ng-container *ngIf="!cols.hidden">
            <ng-container *ngIf="cols.dataType=='number'">
              <div  class="datatable-col" scope="row" [attr.data-label]="cols.text">
               <span style="float: right">
                 {{row[cols.dataIndex]}}
               </span>
              </div>
            </ng-container>
            <ng-container *ngIf="!cols?.bodyTemplate && cols.dataType=='string'">
              <div  class="datatable-col" scope="row" [attr.data-label]="cols.text">
                {{row[cols.dataIndex]}}
              </div>
            </ng-container>
            <ng-template *ngIf="cols.bodyTemplate" [ngTemplateOutlet]="cols.bodyTemplate"
                         [ngTemplateOutletContext]="{ $implicit: { text : row[cols.dataIndex] }, row: row }"></ng-template>
          </ng-container>
        </ng-container>
      </div>
    </div>

    <div>
      <div class="footer">
        <ng-container *ngIf="pageSize && (data && data.length > pageSize)">
          <ng-container *ngIf="totalPages!=null">
            <amexio-paginator [pages]="totalPages" [rows]="pageSize" (onPageChange)="loadPageData($event)"></amexio-paginator>
          </ng-container>
        </ng-container>
      </div>
    </div>
  `
})

export class AmexioDatagridComponent implements OnInit,AfterContentInit {

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

  @Input() columnLocalData: any;

  @Output() onColumnClickEvent: EventEmitter<any> = new EventEmitter<any>();

  @Output() columnDataEvent: EventEmitter<any> = new EventEmitter<any>();

  @Input()  columnToggle: boolean;

  columns: any[] = [];

  viewRows: any[] = [];

  maxPage: number;

  currentPage: number;

  sortColumn: any;

  pageNumbers: number[];

  elementId: string;

  selectedRowNo: number;

  selectAll = false;

  selectedRows: any[];

  summary: any[];

  summaryData: any[];

  isSummary: boolean;

  smallScreen: boolean;

  sortBy: number;

  randomIDCheckALL: string;

  cloneData: any;

  dropdownData: any;

  responseData: any;

  filterCloneData: any;

  rowId: any;

  headerCheckboxId: string;

  previousData : any;

  columnPreviewData: any;

  showToolTip : boolean;

  totalPages : number;

  @ContentChildren(AmexioGridColumnComponent) columnRef: QueryList<AmexioGridColumnComponent>;


  constructor(public dataTableService : CommonDataService) {
    this.selectedRows = [];
    this.sortBy = -1;
  }

  ngOnInit() {
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
      // this.previousValue = JSON.parse(JSON.stringify(this.data));
      this.setData(this.data);
    }
  }


  ngAfterContentInit() {
    this.createConfig();
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
    this.data = this.viewRows;
    this.renderData();
    this.totalPages = this.pageNumbers.length;

    if (this.groupByColumn) {
      this.cloneData = JSON.parse(JSON.stringify(this.data));
    }
    if (this.filtering) {
      this.filterCloneData = JSON.parse(JSON.stringify(this.data));
    }
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

  getResponseData(httpResponse : any){
    let responsedata = httpResponse;
    if(this.dataReader != null){
      let dr = this.dataReader.split('.');
      for (let ir = 0 ; ir < dr.length; ir++){
        responsedata = responsedata[dr[ir]];
      }
    }
    else{
      responsedata = httpResponse;
    }

    return responsedata;
  }

  onColumnCheck(column : any){
    column.hidden = !column.hidden;
  }

  rowClick(rowData: any, rowIndex: any) {
    rowIndex = 'row' + rowIndex;
    if (this.rowId) {
      document.getElementById(this.rowId).style.backgroundColor = 'white';
    }
    this.rowId = rowIndex;
    document.getElementById(rowIndex).style.backgroundColor = this.tableRowSelectedColor;
    this.rowSelect.emit(rowData);
    this.selectedRowNo = rowIndex;
  }


  loadPageData(pageNumber : number){
    this.currentPage = pageNumber;
    this.renderData();
  }

  getFilteredData(filteredObj: any) {
    let status = false;
    if (filteredObj.length > 0) {
      this.data = [];
      this.filterCloneData.forEach((option : any) => {
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
    filteredObj.forEach((filterOpt : any) => {
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
    statusArray.forEach((opt : any) => {
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

  selectAllVisibleRows() {
    this.selectAll = !this.selectAll;
    if (this.selectAll) {
      for (let vr = 0; vr < this.viewRows.length; vr++) {
        this.selectedRows.push(this.viewRows[vr]);
      }
    } else {
      this.selectedRows = [];
    }
    this.emitSelectedRows();
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
    if(this.selectAll) {
      return 'checkbox active';
    } else if(!this.selectAll) {
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



}
