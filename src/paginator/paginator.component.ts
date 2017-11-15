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
            <li class="page-item " (click)="onFirstClick()">
                <a class="page-link" href="#" aria-label="Previous">
                    <span aria-hidden="true">&laquo;</span>
                    <span class="sr-only">First</span>
                </a>
            </li>
            <li class="page-item {{activePageIndex == 0 ? 'disabled' : ''}}" (click)="onPrevious()">
                <a class="page-link" href="#" aria-label="Previous">
                    <span aria-hidden="true">&#x3C;</span>
                    <span class="sr-only">Previous</span>
                </a>
            </li>

            <ng-container *ngFor="let page of pagesArray;let i = index">
                <li class="page-item" style="cursor: pointer;" [ngClass]="{'active' : activePageIndex == i  }" (click)="onPageClick(page,i)">
                    <a class="page-link">{{page}}</a>
                </li>
            </ng-container>

            <li class="page-item {{activePageIndex == pagesArray.length ? 'disabled' : ''}}" (click)="onNext()">
                <a class="page-link" href="#" aria-label="Next">
                    <span aria-hidden="true">&#x3E;</span>
                    <span class="sr-only">Next</span>
                </a>
            </li>
            <li class="page-item" (click)="onLastClick()">
                <a class="page-link" href="#" aria-label="Next">
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
                        <a *ngFor="let row of pageIndex" class="dropdown-item" style="cursor : pointer;" (click)="changeRows(row)">{{row}}</a>
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

export class AmexioPaginatorComponent implements OnInit {

    @Input()   rows : number;

    @Input()   pages : number;

    @Input()   size : string;

    pagesArray : number[] = [];

    pageIndex : number[] = [];

    currentRow : number ;

    activePageIndex : number = 0;

    first : number;

    last : number;

    @Output()    onPageChange : EventEmitter<any> = new EventEmitter<any>();

    @Output()    onRowChange : EventEmitter<any> = new EventEmitter<any>();

    constructor() { }

    ngOnInit() {
        if(this.size == null || this.size == '')
            this.size = 'medium';

        if(this.rows != null){
            this.calculateRows();
            this.setRows(this.rows);
        }
        else{
            for (let i = 0; i < this.pages;i++){
                this.pagesArray.push(i+1);
            }
        }
    }

    setRows(rowNumber : number){
        this.currentRow = rowNumber;
        for(let i = 0 ; i < rowNumber; i++){
            this.pagesArray.push(i+1);
        }

    }

    calculateRows(){
        for(let i = 0; i < this.rows ; i++){
            this.pagesArray.push(i+1);
        }
        this.currentRow = this.rows;
        //calc rows
        let loopI = Math.round(this.pages/this.rows);

        for(let i = 1;i <= loopI ; i++){
            this.pageIndex.push(this.rows * i);
        }
    }

    onPageClick(pageNumber : number, index : number){
        this.activePageIndex = index;
        this.onPageChange.emit(pageNumber);
    }

    onPrevious(){
        if(this.activePageIndex != 0){
            this.activePageIndex -= 1;
            this.onPageChange.emit(this.activePageIndex+1);
        }
    }

    onNext(){
        if(this.activePageIndex != this.pagesArray.length-1){
            this.activePageIndex += 1;
            this.onPageChange.emit(this.activePageIndex+1);
        }
    }

    onFirstClick(){
        this.activePageIndex = 0;
        this.onPageChange.emit(this.first);
    }

    onLastClick(){
        this.activePageIndex = this.pagesArray.length-1;
        this.onPageChange.emit(this.last);
    }

    changeRows(rowNumber : number){
        this.currentRow = rowNumber;
        this.onRowChange.emit(this.currentRow);

        this.pagesArray = [];
        for(let i = this.currentRow - this.rows;i<=this.currentRow;i++){
            this.pagesArray.push(i);
        }
        this.setBoundaries();

    }

    setBoundaries(){
        this.first = this.pagesArray[0];
        this.last = this.pagesArray[this.pagesArray.length];
    }
}
