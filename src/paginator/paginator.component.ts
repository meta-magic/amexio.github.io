/*
 * Copyright 2016-2017 the original author or authors.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Author - Pratik Kelwalkar
 *
 */
import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';

@Component({
    selector: 'amexio-paginator',
    template: `

        <ul class="pagination justify-content-center" [ngClass]="{'pagination-lg' : size =='large','pagination-md' : size =='medium','pagination-sm' : size =='small'}" style="background-color: f6f7f9;border: 1px solid #d9d9d9;">
            <li class="page-item " (click)="onFirstClick()" style="cursor: pointer;">
                <a class="page-link" aria-label="Previous">
                    <span aria-hidden="true">&laquo;</span>
                    <span class="sr-only">First</span>
                </a>
            </li>
            <li class="page-item {{activePageIndex == 0 ? 'disabled' : ''}}" (click)="onPrevious()" style="cursor: pointer;">
                <a class="page-link" aria-label="Previous">
                    <span aria-hidden="true">&#x3C;</span>
                    <span class="sr-only">Previous</span>
                </a>
            </li>

            <ng-container *ngFor="let page of activePages;let i = index">
                <li class="page-item" style="cursor: pointer;" [ngClass]="{'active' : activePageIndex == i  }" (click)="onPageClick(page,i)">
                    <a class="page-link">{{page}}</a>
                </li>
            </ng-container>

            <li style="cursor: pointer;" class="page-item {{activePageIndex == fullPageSet.length ? 'disabled' : ''}}" (click)="onNext()">
                <a class="page-link" aria-label="Next">
                    <span aria-hidden="true">&#x3E;</span>
                    <span class="sr-only">Next</span>
                </a>
            </li>
            <li class="page-item" style="cursor: pointer;" (click)="onLastClick()">
                <a class="page-link" aria-label="Next">
                    <span aria-hidden="true">&raquo;</span>
                    <span class="sr-only">Last</span>
                </a>
            </li>

            <li class="page-item">
                <div class="btn-group" style="padding-top: 5px;padding-left: 5px;">
                    <button class="btn btn-secondary btn-sm dropdown-toggle" type="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                        {{currentRow}}
                    </button>
                    <div class="dropdown-menu amexio-scrollable">
                        <a *ngFor="let row of pageIndex;let i = index" class="dropdown-item" style="cursor : pointer;" (click)="changeRows(row,i)">{{row}}</a>
                    </div>
                </div>
            </li>

        </ul>


    `,
    styles : [`
        .amexio-scrollable{
            height: auto;
            max-height: 300px;
            overflow-x: hidden;
        }

    `]
})

export class AmexioPaginatorComponent implements OnInit{

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
            if(sIndx < this.fullPageSet.length){
                this.changeRows(this.pageIndex[this.currentRowIndex+1],this.currentRowIndex+1);
                this.activePageIndex = 1;
                this.activePage = this.activePages[1];
                this.onPageChange.emit(this.activePage);
            }
        }
    }


    changeRows(rowNumber: number,inDx : number){
        this.currentRow = rowNumber;
        this.currentRowIndex = inDx;
        this.onRowChange.emit(this.currentRow);

        this.activePages = [];
        for(let i = this.currentRow - this.rows;i<=this.currentRow;i++){
            if(i != 0)
                this.activePages.push(i);
        }
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
        this.currentRow = rowNumber;
        for(let i = 0 ; i < rowNumber; i++){
            this.activePages.push(i+1);
        }

    }

    setBoundaries(){
        this.bFirst = this.activePages[0];
        this.bLast = this.activePages[this.activePages.length-1];
    }
}
