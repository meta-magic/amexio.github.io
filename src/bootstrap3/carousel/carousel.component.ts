/*
 * Copyright 2016-2017 the original author or authors.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Author - Ketan Gote, Pratik Kelwalkar, Dattaram Gawas
 *
 */

import {AfterViewInit, Component, Input, OnInit} from '@angular/core';
import {CarouselService} from "./carousel.service";

@Component({
    selector: 'amexio-carousel',
    template:`

        <div [attr.id]="elementId" [attr.class]="className" data-ride="carousel">
            <!-- Indicators -->
            <ol class="carousel-indicators">
                <li *ngFor="let scroll of viewData;let i =index"  [attr.data-target]="'#'+elementId" [attr.data-slide-to]="i" class="" [ngClass]="{'active':scroll.active}"></li>
            </ol>
            <!-- Wrapper for slides -->
            <div class="carousel-inner">
                <div class="item" [ngClass]="{'active':scrollData.active}"  *ngFor="let scrollData of viewData" >
                    <div class="text-center">{{scrollData.title}}</div>
                    <ng-container *ngIf="isContent">
                        <div [innerHTML]="scrollData.content"></div>
                    </ng-container>
                    <ng-container *ngIf="!isContent">
                        <img [src]="scrollData.img" alt="Los Angeles" style="width:100%;">
                        <div class="carousel-caption">
                            <h3>{{scrollData.caption}}</h3>
                        </div>
                    </ng-container>
                </div>
                <!-- Left and right controls -->
                <a class="left carousel-control" [attr.href]="'#'+elementId" data-slide="prev">
                    <span class="glyphicon glyphicon-chevron-left"></span>
                    <span class="sr-only">Previous</span>
                </a>
                <a class="right carousel-control" [attr.href]="'#'+elementId" data-slide="next">
                    <span class="glyphicon glyphicon-chevron-right"></span>
                    <span class="sr-only">Next</span>
                </a>
            </div>
        </div>
    `,
    providers : [CarouselService]
})
export class CarouselComponent implements OnInit,AfterViewInit {

    @Input()
    httpUrl : string;

    @Input()
    httpMethod : string;

    @Input()
    dataReader : string;

    @Input()
    scrollViewBindData : any;

    @Input()
    isContent : boolean = false;

    viewData : any[];

    elementId : any;

    className: any;

    response : any;

    constructor(private carouselService : CarouselService) {
        this.elementId = 'scroll'+Math.round(Math.random()*200);
        this.className ='carousel slide';
    }

    ngOnInit() {
        if(this.httpMethod && this.httpUrl){
            this.carouselService.fetchData(this.httpUrl,this.httpMethod).subscribe(
                response=>{
                    this.response = response.json();
                },
                error=>{
                },
                ()=>{
                    this.setData(this.response);
                }
            );
        }
        else if(this.scrollViewBindData){
            this.setData(this.scrollViewBindData);
        }
    }

    ngAfterViewInit(){

    }
    setData(httpResponse: any){
        let responsedata = httpResponse;
        let dr = this.dataReader.split(".");
        for(let ir = 0 ; ir<dr.length; ir++){
            responsedata = responsedata[dr[ir]];
        }
        this.viewData = responsedata;


    }

}
