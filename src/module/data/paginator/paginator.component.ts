/**
 * Created by ketangote on 11/23/17.
 */

/*
 Component Name : Amexio paginator
 Component Selector : <amexio-paginator>
 Component Description : Paginator is a generic widget to display content in paged format.
*/
import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { PageInfo } from '../../../models/paginator.model';

@Component({
  selector: 'amexio-paginator', templateUrl: './paginator.component.html',
})

export class AmexioPaginatorComponent implements OnChanges, OnInit {

  show: boolean;

  @Input('server-side-paging') serverSidePaging = false;

  /*
   Properties
   name : pages
   datatype : any
   version : 4.0 onwards
   default : none
   description : Total Number of records
   */
  @Input() pages: any;

  /*
   Properties
   name : rows
   datatype : any
   version : 4.0 onwards
   default : none
   description : number of records on one page
   */
  @Input() rows = 10;

  /*
   Properties
   name : size
   datatype : any
   version : 4.0 onwards
   default : none
   description : number of pages to be displayed
   */
  @Input() size: any;

  /*
   Events
   name : onRowChange
   datatype : none
   version : none
   default : none
   description : if you click on '<<' will get 1st record and if you click on '>>' will get last record.
   */
  @Output() onRowChange: EventEmitter<any> = new EventEmitter<any>();

  /*
   Events
   name : onPageChange
   datatype : none
   version : none
   default : none
   description : It will gives you current page number
   */
  @Output() onPageChange: EventEmitter<any> = new EventEmitter<any>();

  fullPageSet: any[] = [];

  activePages: any[] = [];

  activePageIndex: any;

  activePage: number;

  pageIndex: any[] = [];

  bFirst: any;

  bLast: any;

  currentRow: number;

  currentRowIndex: number;

  componentId: string;

  currentState: PageInfo;

  futureState: PageInfo;

  cloneRow: number = null;

  constructor() { }

  ngOnInit() {
    if (this.size == null || this.size === '') {
      this.size = 'medium';
    }
    this.initializePages();
    this.componentId = this.createCompId('paginator', this.pages);
  }
  createCompId(inputType: any, name: any) {
    return inputType + '_' + name + '_' + Math.floor(Math.random() * 1000 + 999);
  }

  ngOnChanges(change: SimpleChanges) {

    if (change.pages && !change.pages.isFirstChange()) {
      this.initializePages();
    }
    if (change.rows && !change.rows.isFirstChange()) {
      this.initializePages();
    }
  }

  initializePages() {
    if (this.serverSidePaging && this.rows >= 10) {
      this.cloneRow = this.rows;
      this.rows = 10;
    }
    if (this.rows > this.pages) {
      this.rows = this.pages;
    }
    this.fullPageSet.length = 0;
    this.activePages.length = 0;
    this.pageIndex.length = 0;

    if (this.rows != null) {
      for (let i = 0; i < this.pages; i++) {
        this.fullPageSet.push(i + 1);
      }
      this.calculateRows();
      this.setRows(this.rows);
    } else {
      for (let i = 0; i < this.pages; i++) {
        this.fullPageSet.push(i + 1);
        this.activePages.push(i + 1);
      }
    }
    this.setBoundaries();
    this.activePageIndex = 0;
    this.currentRowIndex = 0;
    this.activePage = this.activePageIndex + 1;
  }

  onFirstClick() {
    this.setPageState(this.activePage, 1);
    this.activePageIndex = 0;
    this.changeRows(this.pageIndex[0], 0, null);
    this.onPageChange.emit(this.createOnPageEmitObject(this.activePage));
  }

  onLastClick() {
    this.activePageIndex = this.activePages.length - 1;
    this.setPageState(this.activePage, this.pageIndex[this.pageIndex.length - 1]);
    this.changeRows(this.pageIndex[this.pageIndex.length - 1], this.pageIndex.length - 1, null);

    this.activePageIndex = this.activePages.length - 1;
    this.activePage = this.activePages[this.activePages.length - 1];
    this.onPageChange.emit(this.createOnPageEmitObject(this.activePage));
  }

  onPrevious() {
    if (this.activePageIndex !== 0) { // within row bounds
      this.activePageIndex -= 1;
      this.activePage = this.activePages[this.activePageIndex];
      this.setPageState(this.activePageIndex, this.activePage);
      this.onPageChange.emit(this.createOnPageEmitObject(this.activePage));
    } else {
      // load prev rows
      let sIndx;
      if (this.fullPageSet.indexOf(this.activePage) === 1) {
        sIndx = this.fullPageSet.indexOf(this.activePage);
      } else {
        sIndx = this.fullPageSet.indexOf(this.activePage) - 1;
      }
      if (sIndx > 0) {
        this.changeRows(this.pageIndex[this.currentRowIndex - 1], this.currentRowIndex - 1, null);
        this.activePageIndex = this.activePages.length - 2;
        this.activePage = this.activePages[this.activePages.length - 2];
        this.setPageState(this.activePageIndex, this.activePage);
        this.onPageChange.emit(this.createOnPageEmitObject(this.activePage));
      }
    }
  }

  onNext() {
    if (this.activePageIndex !== this.activePages.length - 1) { // within row bounds
      this.activePageIndex += 1;
      this.activePage = this.activePages[this.activePageIndex];
      this.setPageState(this.activePageIndex, this.activePage);
      this.onPageChange.emit(this.createOnPageEmitObject(this.activePage));
    } else {
      // load next rows
      const sIndx = this.fullPageSet.indexOf(this.activePage) + 1;
      if (sIndx <= this.fullPageSet.length - 1) {
        this.changeRows(this.pageIndex[this.currentRowIndex + 1], this.currentRowIndex + 1, null);
        this.activePageIndex = 1;
        this.activePage = this.activePages[1];
        this.setPageState(this.activePageIndex, this.activePage);
        this.onPageChange.emit(this.createOnPageEmitObject(this.activePage));
      }
    }
  }
  /* If page size is less then row*/
  changeRows(rowNumber: number, inDx: number, event: any) {
    if (rowNumber != null) {
      this.activePages = [];
      if (this.pages < rowNumber) {
        this.currentRow = this.pages;
        for (let i = this.currentRow - this.rows + 1; i <= this.currentRow; i++) {
          if (i !== 0) {
            this.activePages.push(i);
          }
        }
      } else {
        this.getCurrentRow(rowNumber);
      }
      this.onPageChangeMethod(inDx);
      if (event) {
        this.show = !this.show;
      }
    }
  }

  // Method to get current row
  private getCurrentRow(rowNumber: any) {
    this.currentRow = rowNumber;
    for (let i = this.currentRow - this.rows; i <= this.currentRow; i++) {
      if (i !== 0) {
        this.activePages.push(i);
      }
    }
  }

  // Method called on on change and emits onchange event
  private onPageChangeMethod(inDx: number) {
    this.currentRowIndex = inDx;
    this.onRowChange.emit(this.currentRow);
    this.setBoundaries();
    this.activePageIndex = 0;
    this.activePage = this.activePages[0];
    this.onPageChange.emit(this.createOnPageEmitObject(this.activePage));
  }

  onPageClick(page: number, index: number) {
    this.setPageState(this.activePageIndex + 1, page);
    this.activePageIndex = index;
    this.activePage = page;
    this.onPageChange.emit(this.createOnPageEmitObject(this.activePage));
  }

  calculateRows() {
    for (let i = 0; i < this.rows; i++) {
      this.activePages.push(i + 1);
    }
    this.currentRow = this.rows;
    // calc rows
    const loopI = Math.round(this.pages / this.rows);

    for (let i = 1; i <= loopI; i++) {
      this.pageIndex.push(this.rows * i);
    }
  }

  setRows(rowNumber: number) {
    this.activePages = [];
    if (rowNumber > this.pages) {
      this.currentRow = this.pages;
    } else {
      this.currentRow = rowNumber;
    }
    for (let i = 0; i < this.currentRow; i++) {
      this.activePages.push(i + 1);
    }

  }

  setBoundaries() {
    this.bFirst = this.activePages[0];
    this.bLast = this.activePages[this.activePages.length - 1];
  }

  showColumnOptions() {
    this.show = !this.show;
  }

  setPageState(currentPageIndex: number, futurePageIndex: number) {
    this.currentState = new PageInfo(currentPageIndex, (this.rows * currentPageIndex), this.rows);
    this.futureState = new PageInfo(futurePageIndex, (this.rows * futurePageIndex), this.rows);
  }

  // CREATE ON PAGE EMIT OBJECT

  createOnPageEmitObject(activePage: number): any {
    return {
      pageNumber: activePage,
      current: this.currentState,
      next: this.futureState,
    };
  }
}
