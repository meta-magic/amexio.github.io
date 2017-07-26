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

import { Component, Input, OnInit} from '@angular/core';
import {CommonHttpService} from '../common.http.service';

@Component({
    selector: 'amexio-carousel',
    template: `      
        <div [attr.id]="elementId" [attr.class]="className" data-ride="carousel">
          <ol class="carousel-indicators">
            <li *ngFor="let scroll of viewData;let i =index"  [attr.data-target]="'#'+elementId" [attr.data-slide-to]="i" class="" [ngClass]="{'active':scroll.active}"></li>
          </ol>
          <div class="carousel-inner" role="listbox">
            <div class="carousel-item" [ngClass]="{'active':scrollData.active}"  *ngFor="let scrollData of viewData">
              <ng-container *ngIf="isContent">
                <div [innerHTML]="scrollData.content"></div>
              </ng-container>
              <ng-container *ngIf="!isContent">
                <img class="d-block img-fluid" [src]="scrollData.img" alt="First slide" style="width: 100%">
                <div class="carousel-caption  d-md-block">
                  <h3>{{scrollData.title}}</h3>
                  <p>{{scrollData.caption}}</p>
                </div>
              </ng-container>
            </div>
          </div>
          <a class="carousel-control-prev" [attr.href]="'#'+elementId" role="button" data-slide="prev">
            <span class="carousel-control-prev-icon" aria-hidden="true"></span>
            <span class="sr-only">Previous</span>
          </a>
          <a class="carousel-control-next" [attr.href]="'#'+elementId" role="button" data-slide="next">
            <span class="carousel-control-next-icon" aria-hidden="true"></span>
            <span class="sr-only">Next</span>
          </a>
        </div>
    `,
    providers:[CommonHttpService]
})
export class CarouselComponent implements OnInit {

    @Input()
    httpUrl: string;

    @Input()
    httpMethod: string;

    @Input()
    dataReader: string;

    @Input()
    scrollViewBindData: any;

    @Input()
    isContent= false;

    viewData: any[];

    elementId: any;

    className: any;

    response: any;

    constructor(private carouselService: CommonHttpService) {
        this.elementId = 'scroll' + Math.round(Math.random() * 200);
        this.className = 'carousel slide';
    }

    ngOnInit() {
        if (this.httpMethod && this.httpUrl) {
            this.carouselService.fetchData(this.httpUrl, this.httpMethod).subscribe(
                response => {
                    this.response = response.json();
                },
                error => {
                },
                () => {
                    this.setData(this.response);
                }
            );
        } else if (this.scrollViewBindData) {
            this.setData(this.scrollViewBindData);
        }
    }
    setData(httpResponse: any) {
        let responsedata = httpResponse;
        const dr = this.dataReader.split('.');
        for (let ir = 0 ; ir < dr.length; ir++) {
            responsedata = responsedata[dr[ir]];
        }
        this.viewData = responsedata;
    }
}
