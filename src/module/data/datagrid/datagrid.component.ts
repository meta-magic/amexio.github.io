

/*
 Component Name : Amexio data grid
 Component Selector : <amexio-datagrid>
 Component Description : Data grid component to render large amount of data-set with various options like sorting in ascending or descending order, client-side pagination, column hide/unhide, single/multi selection, user define template for rendering for column header and column data, displaying summation of numeric column.
 */
import {
  AfterContentInit, ChangeDetectorRef, Component, ContentChildren, EventEmitter, Input, OnInit, Output,
  QueryList
} from '@angular/core';
import {AmexioGridColumnComponent} from "./data.grid.column";
import {CommonDataService} from "../../services/data/common.data.service";

@Component({
  selector: 'amexio-datagrid',
  template: `
  <div class="datagrid">
  <div class="datatabletitle">
      <span> {{title}} </span>
      <span *ngIf="enablecolumnfiter ? true:false" class="float-right" (click)="showToolTip = !showToolTip ; showGroupByColumn = false"
          style=" cursor: pointer;">
          &nbsp;&nbsp;
          <span *ngIf="!show">&#9776;</span>
          <span *ngIf="show">&#9747;</span>
      </span>

      <span *ngIf="groupby ? true : false" class="float-right" (click)="showGroupByColumn = !showGroupByColumn; showToolTip = false"
          style=" cursor: pointer;">
          <!--<span class="fa fa-th-list"></span>-->
          <amexio-data-icon key="datagrid_list"></amexio-data-icon>
      </span>
  </div>
  <!--Filter with Checkbox datagrid start-->
  <ng-container *ngIf="enabledatafilter ? true : false">
      <div class="datatable datatable-row">
          <ng-container *ngIf="enablecheckbox">
              <div class="datatable-col col-group datatable-checkbox-width">
                  <div class="inputgroup">
                      <div class="input-box">
                          <div *ngIf="!selectAll" (click)="selectAllRecord()" class="checkbox default"></div>
                          <div *ngIf="selectAll" (click)="selectAllRecord()" class="checkbox active">&#10004;</div>
                      </div>
                  </div>
              </div>
          </ng-container>

          <!--Filter datagrid start-->
          <ng-container *ngIf="enabledatafilter ? true : false">
              <ng-container *ngFor="let cols of columns">
                  <ng-container *ngIf="!cols.hidden">
                      <div class="datatable-col col-group" [style.width.%]="cols.width">
                          <data-grid-filter [column]="cols" (filterObject)="getFilteredData($event)">
                          </data-grid-filter>
                      </div>
                  </ng-container>
              </ng-container>
          </ng-container>

      </div>
  </ng-container>

  <!--Filter datagrid start-->
  <ng-container *ngIf="globalfilter ? true : false">
      <div class="datatable datatable-row">
          <ng-container class="datatable datatable-column">
              <div class="inputgroup" style="padding-left: 1%; padding-right: 1%">
                  <input type="text"  [(ngModel)]="filterValue" (keyup)="keyUpSearch($event)" type="text" class="input-control" aria-label="Text input with dropdown button">
                  <!--<i class="fa fa-filter" aria-hidden="true" (click)="showToolTip = !showToolTip"></i>-->
                  <span class="datatable-filter-icon">
                      <amexio-data-icon key="datagrid_filter" (click)="showToolTip = !showToolTip"></amexio-data-icon>
                  </span>
                  <span *ngIf="showToolTip" class="dropdown" style="width: 250px; right: 10px">
                      <ul class="dropdown-list" *ngFor="let opt of globalFilterOptions">
                          <li class="list-items">
                              <div (click)="selectedOption(opt)">
                                  {{opt.key}}&nbsp;
                                  <i [class]="opt.checkedStatus" aria-hidden="true"></i>
                              </div>
                          </li>
                      </ul>
                  </span>
              </div>
          </ng-container>
      </div>
  </ng-container>

  <div>
      <ng-container *ngIf="enablecolumnfiter ? true : false">
          <span *ngIf="showToolTip" class="dropdown dropdown-right" style="width: 250px;">
              <ul class="dropdown-list">
                  <li class="list-items" *ngFor="let cols of columns;let i = index;" (click)="showToolTip = !showToolTip">
                      <div>
                          <input type="checkbox" [attr.checked]="!cols.hidden ? true: null" (click)="onColumnCheck(cols)" />
                          <label>{{cols.text}}</label>
                      </div>
                  </li>
              </ul>
          </span>
      </ng-container>

      <ng-container *ngIf="groupby ? true : false">
          <span *ngIf="showGroupByColumn" class="dropdown dropdown-right" style="width: 250px;">
              <ul class="dropdown-list">
                  <li class="list-items" *ngFor="let cols of columns;let i = index;" (click)="showGroupByColumn = !showGroupByColumn">
                      <div (click)="setGroupByColumn(cols)">
                          <label>{{cols.text}}</label>
                      </div>
                  </li>
              </ul>
          </span>
      </ng-container>
  </div>
</div>

<!--Checkbox datagrid with datatypes condition start-->
<div class="datatable">
  <div class="datatable-header">
      <ng-container *ngIf="enablecheckbox">
          <div class="datatable-col datatable-checkbox-width checkbox-col">
              <div class="inputgroup">
                  <div class="input-box">
                      <div *ngIf="!selectAll" (click)="selectAllRecord()" class="checkbox default"></div>
                      <div *ngIf="selectAll" (click)="selectAllRecord()" class="checkbox active">&#10004;</div>
                  </div>
              </div>
          </div>
      </ng-container>
      <!--datagrid start unhidden-->
      <ng-container *ngFor="let cols of columns">
          <ng-container *ngIf="!cols.hidden">
              <ng-container *ngIf="cols.datatype=='string'">
                <!-- -------------------- -->
              <div class="datatable-col" [style.width.%]="cols.width" (click)="sortOnColHeaderClick(cols, $event)">

                    <ng-container *ngIf="cols.headerTemplate">
                      <ng-template  [ngTemplateOutlet]="cols.headerTemplate"
                                    [ngTemplateOutletContext]="{column:cols ,index: i}"></ng-template>
                    </ng-container>
                    <ng-container *ngIf="!cols.headerTemplate">
                      {{cols.text}} &nbsp;

                    </ng-container>
                    <ng-container *ngIf="this.sortBy==1   && cols.isColumnSort">
                    <amexio-data-icon key="datagrid_arrowup"></amexio-data-icon>
                    <!--&nbsp; <i class="fa fa-arrow-up"></i>-->
                </ng-container>
                <ng-container *ngIf="this.sortBy==2  && cols.isColumnSort">
                    <!--&nbsp;<i class="fa fa-arrow-down"></i>-->
                    <amexio-data-icon key="datagrid_arrowdown"></amexio-data-icon>
                </ng-container>
                  </div>
              </ng-container>
              <ng-container *ngIf="cols.datatype=='number'">
                  <div class="datatable-col" [style.width.%]="cols.width" (click)="sortOnColHeaderClick(cols, $event)">
                    <ng-container *ngIf="cols.headerTemplate">
                      <ng-template  [ngTemplateOutlet]="cols.headerTemplate"
                                    [ngTemplateOutletContext]="{column:cols ,index: i}"></ng-template>
                    </ng-container>
                    <ng-container *ngIf="!cols.headerTemplate">
                      <span class="float-right">
                          {{cols.text}} &nbsp;
                          <ng-container *ngIf="this.sortBy==1 && cols.isColumnSort">
                              <amexio-data-icon key="datagrid_arrowup"></amexio-data-icon>
                              <!--&nbsp; <i class="fa fa-arrow-up"></i>-->
                          </ng-container>
                          <ng-container *ngIf="this.sortBy==2 && cols.isColumnSort">
                              <!--&nbsp;<i class="fa fa-arrow-down"></i>-->
                              <amexio-data-icon key="datagrid_arrowdown"></amexio-data-icon>
                          </ng-container>
                      </span>
                    </ng-container>
                  </div>
              </ng-container>
          </ng-container>
      </ng-container>
  </div>
</div>

<!--Group BY datagrid start-->
<ng-container *ngIf="!groupby">
  <div class="datatable-height" [style.height.px]="height">
      <div class="datatable">
          <div style="height: 300px;" *ngIf="mask">
              <div class="spinner"></div>
          </div>
          <ng-container *ngIf="!mask">
              <div class="datatable-row" *ngFor="let row of viewRows;let i=index" id="{{'row'+i}}" [ngClass]="{'datatable-row-active':row.isSelected}"
                  (click)="onRowClick(row, i)">

                  <ng-container *ngIf="enablecheckbox">
                      <div class="datatable-col datatable-checkbox-width checkbox-col">
                          <div class="inputgroup">
                              <div class="input-box">
                                  <div (click)="setSelectedRow(row, check)" [class]="setCheckBoxSelectClass(check)" #check>
                                      {{((setCheckBoxSelectClass(check) == 'checkbox active') && (check.classList.value == 'checkbox active')) || ((setCheckBoxSelectClass(check)
                                      == 'checkbox default') && (check.classList.value == 'checkbox active')) ? '&#10004;'
                                      : ''}}
                                  </div>
                              </div>
                          </div>
                      </div>
                  </ng-container>

                  <ng-container *ngFor="let cols of columns;let colIndex = index">
                      <ng-container *ngIf="!cols.hidden">
                          <ng-container *ngIf="cols.datatype=='number'">
                              <div class="datatable-col" [style.width.%]="cols.width" scope="row" [attr.data-label]="cols.text">
                                  <span class="float-right">
                                      <ng-container *ngIf="row[cols.dataindex]!= null;else elseBlock">
                                          {{row[cols.dataindex]}}
                                      </ng-container>
                                      <ng-template #elseBlock>
                                          &nbsp;
                                      </ng-template>

                                  </span>
                              </div>
                          </ng-container>
                          <ng-container *ngIf="!cols?.bodyTemplate && cols.datatype=='string'">
                              <div class="datatable-col" [style.width.%]="cols.width" scope="row" [attr.data-label]="cols.text">
                                  <ng-container *ngIf="row[cols.dataindex]!= null ;else elseBlock">
                                      {{row[cols.dataindex]}}
                                  </ng-container>
                                  <ng-template #elseBlock>
                                      &nbsp;
                                  </ng-template>
                              </div>
                          </ng-container>
                          <ng-container *ngIf="cols.bodyTemplate">
                              <div class="datatable-col" [style.width.%]="cols.width" scope="row" [attr.data-label]="cols.text">
                                  <ng-template [ngTemplateOutlet]="cols.bodyTemplate" [ngTemplateOutletContext]="{ $implicit: { text : row[cols.dataindex] }, row: row }"></ng-template>
                              </div>
                          </ng-container>
                      </ng-container>

                  </ng-container>
              </div>
          </ng-container>

      </div>
  </div>

</ng-container>

<!--Group BY datagrid end-->

<!--Group BY and Filter Data datagrid start-->
<ng-container *ngIf="groupby && !enabledatafilter">
  <div class="datatable-height" [style.height.px]="height">
      <div class="datatable" style="table-layout: inherit !important;">
          <div style="height: 300px;" *ngIf="mask">
              <div class="spinner"></div>
          </div>
          <ng-container *ngIf="!mask">
              <div class="datatable-row" *ngFor="let row of viewRows;let i=index" id="{{'row'+i}}" [ngClass]="{'datatable-row-active':row.isSelected}"
                  (click)="toogle(row, i)">
                  <ng-container *ngIf="enablecheckbox">
                      <div class="datatable-col datatable-checkbox-width checkbox-col">
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

                          <ng-container *ngIf="colIndex == 0">
                              <div class="datatable-col col-group">
                                  <!--<i *ngIf="!row.expanded" class="fa fa-caret-right" aria-hidden="true" (click)="toogle(row,i)"></i>-->
                                  <ng-container *ngIf="!row.expanded">
                                      <amexio-data-icon key="datagrid_expand"></amexio-data-icon>
                                  </ng-container>
                                  <ng-container *ngIf="row.expanded">
                                      <amexio-data-icon key="datagrid_collapse"></amexio-data-icon>
                                  </ng-container>
                                  {{row.group}}
                              </div>
                          </ng-container>

                          <ng-container *ngIf="colIndex != 0">
                              <div class="datatable-col col-hidden">
                              </div>
                          </ng-container>
                      </ng-container>
                      <ng-container *ngIf="!isGroupChecking(row)">
                          <ng-container *ngIf="cols.datatype=='string'">
                              <div class="datatable-col" [style.width.%]="cols.width" [attr.data-label]="cols.text">
                                  <ng-container *ngIf="colIndex == 0">
                                      <span style="padding-left: 20px">
                                          {{row[cols.dataindex]}}
                                      </span>
                                  </ng-container>
                                  <ng-container *ngIf="colIndex != 0">
                                      {{row[cols.dataindex]}}
                                  </ng-container>
                              </div>
                          </ng-container>
                          <ng-container *ngIf="cols.datatype=='number'">

                              <div class="datatable-col" [style.width.%]="cols.width" [attr.data-label]="cols.text">

                                  <ng-container *ngIf="colIndex == 0">
                                      <span style="padding-left: 20px">
                                          <ng-container *ngIf="row[cols.dataindex]!= null ;else elseBlock">
                                              {{row[cols.dataindex]}}
                                          </ng-container>
                                          <ng-template #elseBlock>
                                              &nbsp;
                                          </ng-template>

                                      </span>
                                  </ng-container>
                                  <ng-container *ngIf="colIndex != 0">
                                      <span class="float-right">
                                          <ng-container *ngIf="row[cols.dataindex]!= null ;else elseBlock">
                                              {{row[cols.dataindex]}}
                                          </ng-container>
                                          <ng-template #elseBlock>
                                              &nbsp;
                                          </ng-template>
                                      </span>
                                  </ng-container>

                              </div>

                          </ng-container>

                      </ng-container>
                  </ng-container>
              </div>
          </ng-container>

      </div>
  </div>
</ng-container>
<!--Group BY and Filter Data datagrid end-->


<!-- Footer of the grid -->
<div class="footer">
  <ng-container *ngIf="pagesize && (data && data.length > pagesize)">
      <ng-container *ngIf="totalPages!=null">
          <amexio-paginator [pages]="totalPages" [rows]="pagesize" (onPageChange)="loadPageData($event)"></amexio-paginator>
      </ng-container>
  </ng-container>
</div>
  `
})

export class AmexioDatagridComponent implements OnInit, AfterContentInit{

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
  @Input('enable-column-fiter')  enablecolumnfiter: boolean;

 /*
   Properties
   name : global-fiter
   datatype : boolean
   version : 4.2 onwards
   default : false
   description :  Set false to hide Column toggle functionality.
   */
  @Input('global-filter') globalfilter: boolean;

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

  /*global filter column attribute*/

  filterValue: any;

  globalFilterOptions: any;


  /*group by column attribute*/

  iconclassKey: string;

  isExpanded = false;

  mask : boolean = true;

  @ContentChildren(AmexioGridColumnComponent) columnRef: QueryList<AmexioGridColumnComponent>;


  constructor(public dataTableService: CommonDataService,  private cd: ChangeDetectorRef) {
    this.selectedRows = [];
    this.sortBy = -1;

    this.globalFilterOptions = [
      {
        'key': 'Start With', 'value': '1', 'checkedStatus': 'fa fa-check'
      },
      {
        'key': 'Ends With', 'value': '2', 'checkedStatus': ''
      }, {
        'key': 'Contains', 'value': '3', 'checkedStatus': ''
      }];
  }

  ngOnInit() {

    this.isExpanded = true;
    this.iconclassKey = 'fa fa-plus';

    if(this.enabledatafilter == true){
      this.globalfilter = false;
          }

    if (this.selectedrowcolor == null || this.selectedrowcolor == '') {
      this.selectedrowcolor = '#dcecf7';
    }
    if (this.httpmethod && this.httpurl){
      this.dataTableService.fetchData(this.httpurl, this.httpmethod).subscribe(
        response => {
          this.responseData = response;
        },
        error => {
        },
        () => {
          this.setData(this.responseData);
        }
      );
    } else if (this.data) {
      this.setData(this.data);
      this.previousData = JSON.parse(JSON.stringify(this.data));
    }
    this.componentLoaded = true;
  }

  ngDoChekck(){
    this.updateComponent();
  }
  updateComponent() {
  if (this.previousData != null && JSON.stringify(this.previousData) != JSON.stringify(this.data)){
        this.previousData = JSON.parse(JSON.stringify(this.data));
        this.setChangeData(this.data);
      }
    if(this.columnPreviewData != null && this.columndefintion != null) {
      if (JSON.stringify(this.columnPreviewData) != JSON.stringify(this.columndefintion)) {
        this.columnPreviewData = JSON.parse(JSON.stringify(this.columndefintion));
        this.columns = this.columndefintion;
      }
    }

  }

  ngAfterContentInit() {
    if ( this.columndefintion) {
      this.columns = this.columndefintion;
      this.columnPreviewData = JSON.parse(JSON.stringify(this.columndefintion));
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
          dataindex: columnConfig.dataindex,
          hidden: columnConfig.hidden,
          datatype: columnConfig.datatype,
          headerTemplate: columnConfig.headerTemplate,
          width: columnConfig.width,
          sort: columnConfig.sort,
          bodyTemplate: columnConfig.bodyTemplate
        };
      } else if (columnConfig.headerTemplate != null && columnConfig.bodyTemplate == null) {
        columnData = {
          text: columnConfig.text,
          dataindex: columnConfig.dataindex,
          hidden: columnConfig.hidden,
          datatype: columnConfig.datatype,
          width: columnConfig.width,
          sort: columnConfig.sort,
          headerTemplate: columnConfig.headerTemplate
        };
      } else if (columnConfig.bodyTemplate != null && columnConfig.headerTemplate == null) {
        columnData = {
          text: columnConfig.text,
          dataindex: columnConfig.dataindex,
          hidden: columnConfig.hidden,
          datatype: columnConfig.datatype,
          width: columnConfig.width,
          sort: columnConfig.sort,
          bodyTemplate: columnConfig.bodyTemplate
        };
      } else if (columnConfig.bodyTemplate == null && columnConfig.headerTemplate == null) {
        columnData = {
          text: columnConfig.text,
          dataindex: columnConfig.dataindex,
          hidden: columnConfig.hidden,
          width: columnConfig.width,
          sort: columnConfig.sort,
          datatype: columnConfig.datatype
        };
      }
      if (columnConfig.summarytype) {
        columnData['summarytype'] = columnConfig.summarytype;
      }

      if (columnConfig.summarycaption) {
        columnData['summarycaption'] = columnConfig.summarycaption;
      }

      this.columns.push(columnData);
    }
  }

  setChangeData(httpResponse: any){
    this.setSelectedFlag(httpResponse);
    if (!this.groupby) {
      this.renderData();
    }
    this.totalPages = this.pageNumbers.length;
    this.mask = false;
  }

  setData(httpResponse: any){
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
    this.totalPages = this.pageNumbers.length;
    this.mask = false;
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

  //Method required for global filter

  keyUpSearch() {

    if (this.filterValue == null || this.filterValue === '') {
      this.removeGlobalFilter();
    }
    let filter: any = {
      value: this.filterValue
    }

    this.globalFilterOptions.forEach((opt: any) => {
      if (opt.checkedStatus === 'fa fa-check') {
        filter['filter'] = opt.value;
      }
    });
    this.getGlobalFilteredData(filter);
  }

  checkStatus() {
    this.globalFilterOptions.forEach((opt: any) => {
      opt.checkedStatus = '';
    });
  }

  selectedOption(opt: any) {
    this.checkStatus();
    let filter: any = {
      value: this.filterValue,
      filter: opt.value,
    }
    opt.checkedStatus = 'fa fa-check';
    if (this.filterValue) {
      this.getGlobalFilteredData(filter);
    }
    this.showToolTip = false;
  }

  removeGlobalFilter() {
    this.filterValue = '';
  }

  getGlobalFilteredData(filteredObj: any) {
    let status = false;
      this.data = [];
     let condition: any;
      this.filterCloneData.forEach((option: any) => {
        this.columns.forEach((opt:any)=>{
         if (filteredObj.filter == '1') {
         condition = option[opt.dataindex].toLowerCase().startsWith(filteredObj.value.toLowerCase());
          if(condition) {
          status = condition;
          }
        }
        if (filteredObj.filter == '2') {
        condition = option[opt.dataindex].toLowerCase().endsWith(filteredObj.value.toLowerCase());
         if(condition) {
         status = condition;
         }
       }
       if (filteredObj.filter == '3') {
      condition = option[opt.dataindex].toLowerCase().includes(filteredObj.value.toLowerCase());
       if(condition) {
       status = condition;
       }
     }
        });

        if (status) {
          this.data.push(option);
          status = false;
        }
      });

      if (this.data.length > (1 * this.pagesize)) {
        this.pagingRegenration();
        this.renderData();
      } else {
        this.viewRows = this.data;
        this.currentPage = 1;
        this.maxPage = 1;
      }
  }

  setColumnData() {
    this.data = this.cloneData;
    const groups = {};
    this.data.forEach((option) => {
      const groupName = option[this.groupbydataindex];
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
     k = columnOption.dataindex;
     aggregateValue =0;
     groupdata.groupData.forEach((childData, index) => {
     aggregateValue = +(aggregateValue + Number(childData[columnOption.dataindex]));
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
      if (this.data.length > (1 * this.pagesize)) {
        this.maxPage = Math.floor((this.data.length / this.pagesize));
        if ((this.data.length % this.pagesize) > 0) {
          this.maxPage++;
        }
      }
      for (let pageNo = 1; pageNo <= this.maxPage; pageNo++) {
        this.pageNumbers.push(pageNo);
      }
    }
    if (this.pagesize >= 1) {
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

    } else {
      this.viewRows = this.data;
    }
    this.selectedRowNo = -1;
  }

  getResponseData(httpResponse: any){
    let responsedata = httpResponse;
    if (this.datareader != null){
      const dr = this.datareader.split('.');
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

  onColumnCheck(column: any){
    column.hidden = !column.hidden;
  }

  onRowClick(rowData: any, rowIndex: any) {
    this.data.forEach((opt: any) =>{
      opt.isSelected = false;
      if(opt.hasOwnProperty('groupData')) {
        opt.groupData.forEach((optChild: any) =>{
          optChild.isSelected = false;
        })
      }
    });
    rowData.isSelected = !rowData.isSelected;
    /* if(rowRef.classList.contains('datatable-row-active')){
     rowRef.classList.remove('datatable-row-active');
     } else {
     rowRef.classList.add('datatable-row-active');
     }*/
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
      if (this.data.length > (1 * this.pagesize)) {
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
      if (filterOpt.filter == '3') {
        if (filterOpt.type == 'string') {
          condition = data[filterOpt.key].toLowerCase().includes(filterOpt.value.toLowerCase());
        }
        statusArray.push(condition);
      }
      if (filterOpt.filter == '1') {
        if (filterOpt.type == 'string') {
          condition = data[filterOpt.key].toLowerCase().startsWith(filterOpt.value.toLowerCase());
        }
        statusArray.push(condition);
      } else if (filterOpt.filter == '2') {
        if (filterOpt.type == 'string') {
          condition = data[filterOpt.key].toLowerCase().endsWith(filterOpt.value.toLowerCase());
        }
        statusArray.push(condition);
      } else if (filterOpt.filter == '<') {
        if (filterOpt.type == 'number') {
          condition = data[filterOpt.key] > filterOpt.value;
        }
        statusArray.push(condition);
      } else if (filterOpt.filter == '>') {
        if (filterOpt.type == 'number') {
          condition = data[filterOpt.key] < filterOpt.value;
        }
        statusArray.push(condition);
      } else if (filterOpt.filter == '>=') {
        if (filterOpt.type == 'number') {
          condition = data[filterOpt.key] <= filterOpt.value;
        }
        statusArray.push(condition);
      } else if (filterOpt.filter == '=<') {
        if (filterOpt.type == 'number') {
          condition = data[filterOpt.key] >= filterOpt.value;
        }
        statusArray.push(condition);
      } else if (filterOpt.filter == '==') {
        if (filterOpt.type == 'number') {
          condition = data[filterOpt.key] == filterOpt.value;
        } else {
          condition = data[filterOpt.key].toLowerCase() == filterOpt.value.toLowerCase();
        }
        statusArray.push(condition);
      } else if (filterOpt.filter == '!=') {
        if (filterOpt.type == 'number') {
          condition = data[filterOpt.key] != filterOpt.value;
        } else {
          condition = data[filterOpt.key].toLowerCase() != filterOpt.value.toLowerCase();
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
    this.maxPage = Math.floor((this.data.length / this.pagesize));
    if ((this.data.length % this.pagesize) > 0) {
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
     this.onHeaderClick.emit({event: event, data: sortCol});
    if(sortCol.sort) {
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
        } else if (this.sortColumn.datatype === 'number') {
          if (this.groupby) {
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
    if (this.iconclassKey == 'fa fa-plus'){
      this.iconclassKey = 'fa fa-minus';
    }
    else if (this.iconclassKey == 'fa fa-minus'){
      this.iconclassKey = 'fa fa-plus';
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
      if(row.hasOwnProperty('groupData')) {
        this.addRows(row, index);
      }
    }else{
      if(row.hasOwnProperty('groupData')) {
        this.removeRows(row);
      }
    }
  }

  addRows(row: any, index: number) {
    row.level =  Math.floor(Math.random() * 900) + 100;
    row.groupData.forEach((node: any, index1: any) => {
      node.level = row.level;
      this.viewRows.splice(index + (index1 + 1), 0 , node);
    });
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
}
