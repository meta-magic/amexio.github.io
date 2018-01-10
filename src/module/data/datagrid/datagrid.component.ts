/**
 * Created by pratik on 1/1/18.
 */
import {
  AfterContentInit, Component, ContentChildren, EventEmitter, Input, OnInit, Output,
  QueryList
} from '@angular/core';
import {AmexioGridColumnComponent} from "../treegrid/column.component";
import {CommonDataService} from "../../services/data/common.data.service";

@Component({
 selector: 'amexio-datagrid',
 template: `
   <!--<div class="datatable">
       <div class="datatable-header">
         <div class="datatable-col header">
           {{title}}
         </div>
         <div class="datatable-col header">
           <i class="fa fa-bars" aria-hidden="true" (click)="showToolTip = !showToolTip"  style="float : right;"></i>
           <div style="padding-left: 30%">
            <span *ngIf="showToolTip" class="dropdown" style="width: 20%;">
              <ul class="dropdown-list">
                <li class="list-items" style="background-color: lightgray" *ngFor="let cols of columns;let i = index;" (click)="showToolTip = !showToolTip">
                  <input type="checkbox"  [attr.checked]="!cols.hidden ? true: null" (click)="onColumnCheck(cols)"/>
                  <label>{{cols.text}}</label>
                </li>
              </ul>
           </span>  
           </div>
         </div>

       </div>
     
     <div class="datatable-row" style="background-color: lightgray">
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
       <div class="datatable-col " *ngFor="let cols of columns">
         <ng-container *ngIf="!cols.hidden">{{cols.text}}</ng-container>
       </div>
     </div>
     
     
      
     <div class="datatable">
      <ng-container *ngIf="checkboxSelect">
        <div class="datatable-row" *ngFor="let row of viewRows;let i=index">
          <div class="datatable-col">
            <div class="inputgroup">
              <div class="input-box">
                <div  *ngIf="!selectAll" (click)="selectAll = !selectAll" class="checkbox default"></div>
                <div *ngIf="selectAll" (click)="selectAll = !selectAll" class="checkbox active">&#10004;</div>
              </div>
            </div>
          </div>
          <div class="datatable-col" *ngFor="let cols of columns;let colIndex = index">
            <ng-container *ngIf="!cols.hidden">
              {{row[cols.dataIndex]}}
            </ng-container>
          </div>
        </div>
      </ng-container>
     </div>
     
   

   <div style="text-align: center">
     <amexio-paginator [pages]="50" [rows]="pageSize"></amexio-paginator>
   </div>
 -->
   <div>
     
     <div class="title">
       <span> {{title}} </span>
         <span class="float-right" (click)="showToolTip = !showToolTip" style=" cursor: pointer;">
            <span *ngIf="!show">&#9776;</span>
            <span *ngIf="show">&#9747;</span>
          </span>
     </div>
     
     <ng-container *ngIf="filtering">
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
         <ng-container *ngFor="let cols of columns">
           <div class="datatable-col">
             <data-grid-filter [column]="cols"
                               (filterObject)="getFilteredData($event)"></data-grid-filter>
           </div>
         </ng-container>
       </div>
     </ng-container>
     
     <div>
       
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
       
     </div>
   </div>

   <div class="datatable">
     <div class="datatable-header">
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
       
       <ng-container *ngFor="let cols of columns">
         <ng-container *ngIf="!cols.hidden">
           <div class="datatable-col">
             {{cols.text}}
           </div>
         </ng-container>
       </ng-container>
      
       <!--<div class="datatable-col header"> COL 3 <span>&#x2191;</span></div>-->
     </div>
   </div>
   <div class="datatable">
     <div class="datatable-row" *ngFor="let row of viewRows;let i=index">

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
       
       <ng-container *ngFor="let cols of columns;let colIndex = index">
         <ng-container *ngIf="!cols.hidden">
           <div class="datatable-col" scope="row" [attr.data-label]="cols.text">
             {{row[cols.dataIndex]}}
           </div>
         </ng-container>
       </ng-container>
       
       <!--<div class="datatable-col" data-label="col 2">02/01/2016</div>
       <div class="datatable-col" scope="row" data-label="COL 3">Visa - 3412</div>
       <div class="datatable-col" data-label="COL 4">02/01/2016</div>-->
     </div>
   </div>

   <!--<div>
     <span>Column Group</span>
     <div class="datatable">
       <div class="datatable-row">
         <div class="datatable-col" scope="row" data-label="col 1">Visa - 3412</div>
         <div class="datatable-col" data-label="col 2">02/01/2016</div>
         <div class="datatable-col" scope="row" data-label="COL 3">Visa - 3412</div>
         <div class="datatable-col" data-label="COL 4">02/01/2016</div>
       </div>
       <div class="datatable-row">
         <div class="datatable-col" scope="row" data-label="COL 1">Visa - 34</div>
         <div class="datatable-col" data-label="COL 2">02/01/2017</div>
         <div class="datatable-col" scope="row" data-label="COL 3">Visa - 34</div>
         <div class="datatable-col" data-label="COL 4">02/01/2017</div>
       </div>
       <div class="datatable-row">
         <div class="datatable-col" scope="row" data-label="COL 1">Visa - 35</div>
         <div class="datatable-col" data-label="COL 2">02/01/2018</div>
         <div class="datatable-col" scope="row" data-label="COL 3">Visa - 35</div>
         <div class="datatable-col" data-label="COL 4">02/01/2018</div>
       </div>
     </div>
   </div>-->

   <div>
     <div class="footer">
       <ng-container *ngIf="totalPages!=null">
         <amexio-paginator [pages]="totalPages" [rows]="pageSize" (onPageChange)="loadPageData($event)"></amexio-paginator>  
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

  @Input() dataTableBindData: any;

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

  @Input() columnLocalData: any;

  @Output() onColumnClickEvent: EventEmitter<any> = new EventEmitter<any>();

  @Output() columnDataEvent: EventEmitter<any> = new EventEmitter<any>();

  columns: any[] = [];

  data: any[];

  viewRows: any[] = [];

  maxPage: number;

  currentPage: number;

  sortColumn: any;

  pageNumbers: number[];

  elementId: string;

  selectedRowNo: number;

  selectAll: boolean;

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


  constructor(public dataTableService : CommonDataService) { }

  ngOnInit() {
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
      if (columnConfig.bodyTemplate == null && columnConfig.headerTemplate == null) {
        columnData = {
          text: columnConfig.text, dataIndex: columnConfig.dataIndex,
          hidden: columnConfig.hidden, dataType : columnConfig.dataType
        };
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

}
