/**
 * Created by ketangote on 11/23/17.
 */



import {Component, EventEmitter, Input, Output} from '@angular/core';

@Component({
  selector: 'amexio-paginator',
  templateUrl : './paginator.component.html',
  styleUrls : ['./paginator.component.scss']
})
export class AmexioPaginatorComponent {

  show : boolean;

  @Input()  pages : any;

  @Input()  rows : any;

  @Input()  size : any;

  @Output() onRowChange : EventEmitter<any> = new EventEmitter<any>();

  @Output()    onPageChange : EventEmitter<any> = new EventEmitter<any>();

  fullPageSet : any[] = [];

  activePages : any[] = [];

  activePageIndex : any;

  activePage : number;

  pageIndex : any[] = [];

  bFirst : any;

  bLast : any;

  currentRow : number;

  currentRowIndex : number;

  constructor(){

  }

  ngOnInit(){
    if(this.size == null || this.size == '')
      this.size = 'medium';

    if(this.rows != null){
      for (let i = 0; i < this.pages;i++){
        this.fullPageSet.push(i+1);
      }
      this.calculateRows();
      this.setRows(this.rows);
    }
    else{
      for (let i = 0; i < this.pages;i++){
        this.fullPageSet.push(i+1);
        this.activePages.push(i+1);
      }
    }

    this.setBoundaries();
    this.activePageIndex = 0;
    this.currentRowIndex = 0;
  }


  onFirstClick(){
    this.activePageIndex = 0;
    this.changeRows(this.pageIndex[0],0);
  }


  onLastClick(){
    this.activePageIndex = this.activePages.length - 1;
    this.changeRows(this.pageIndex[this.pageIndex.length - 1],this.pageIndex.length - 1);
    this.activePageIndex = this.activePages.length-1;
    this.activePage = this.activePages[this.activePages.length-1];
    this.onPageChange.emit(this.activePage);
  }

  onPrevious(){
    if(this.activePageIndex != 0){ //within row bounds
      this.activePageIndex -= 1;
      this.activePage = this.activePages[this.activePageIndex];
      this.onPageChange.emit(this.activePage);
    }
    else{
      // load prev rows
      let sIndx = this.fullPageSet.indexOf(this.activePage) - 1;
      if(sIndx>0){
        this.changeRows(this.pageIndex[this.currentRowIndex-1],this.currentRowIndex-1);
        this.activePageIndex = this.activePages.length-2;
        this.activePage = this.activePages[this.activePages.length-2];
        this.onPageChange.emit(this.activePage);
      }
    }
  }

  onNext(){
    if(this.activePageIndex != this.activePages.length-1){ //within row bounds
      this.activePageIndex += 1;
      this.activePage = this.activePages[this.activePageIndex];
      this.onPageChange.emit(this.activePage);
    }
    else{
      //load next rows
      let sIndx = this.fullPageSet.indexOf(this.activePage) + 1;
      if(sIndx < this.fullPageSet.length-1){
        this.changeRows(this.pageIndex[this.currentRowIndex+1],this.currentRowIndex+1);
        this.activePageIndex = 1;
        this.activePage = this.activePages[1];
        this.onPageChange.emit(this.activePage);
      }
    }
  }


  changeRows(rowNumber: number,inDx : number){
    /* If page size is less then row*/
    this.activePages = [];
    if(this.pages < rowNumber) {
      this.currentRow = this.pages;
      for(let i = this.currentRow - this.rows+1;i<=this.currentRow;i++){
        if(i != 0)
          this.activePages.push(i);
      }
    } else {
      this.currentRow = rowNumber;
      for(let i = this.currentRow - this.rows;i<=this.currentRow;i++){
        if(i != 0)
          this.activePages.push(i);
      }
    }
    this.currentRowIndex = inDx;
    this.onRowChange.emit(this.currentRow);

    this.setBoundaries();
    this.activePageIndex = 0;
    this.activePage = this.activePages[0];
    this.onPageChange.emit(this.activePage);
  }

  onPageClick(page : number,index : number){
    this.activePageIndex = index;
    this.activePage = page;

    this.onPageChange.emit(this.activePage);
  }

  calculateRows(){
    for(let i = 0; i < this.rows ; i++){
      this.activePages.push(i+1);
    }
    this.currentRow = this.rows;
    //calc rows
    let loopI = Math.round(this.pages/this.rows);

    for(let i = 1;i <= loopI ; i++){
      this.pageIndex.push(this.rows * i);
    }
  }

  setRows(rowNumber : number){
    this.activePages = [];
    if(rowNumber > this.pages) {
      this.currentRow = this.pages;
    } else {
      this.currentRow = rowNumber;
    }
    for(let i = 0 ; i < this.currentRow; i++){
      this.activePages.push(i+1);
    }

  }

  setBoundaries(){
    this.bFirst = this.activePages[0];
    this.bLast = this.activePages[this.activePages.length-1];
  }

  showColumnOptions(){
    this.show = !this.show;
  }



}
