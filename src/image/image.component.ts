/*
 * Copyright 2016-2017 the original author or authors.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Author - Sagar Jadhav
 *
 */
import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';


@Component({
    selector: 'amexio-image',
    template: `
        <!--Normal image-->
        <ng-container *ngIf="imagePath || (imagePath && imageClass)">
            <img class="img-fluid" [src]="imagePath" [attr.class]="cClass" (click)="onImageClick($event)" [attr.title]="tooltipMessage">
        </ng-container>

        <!--this is for material design-->
        <ng-container *ngIf="imageClass && mdbClass && !imagePath">
            <i [attr.class]="imageClass" [attr.title]="tooltipMessage" (click)="onImageClick($event)"  >{{mdbClass}}</i>
        </ng-container>

        <!--this is for fontawesome-->
        <ng-container *ngIf="imageClass && (!imagePath && !mdbClass)">
            <i [attr.class]="imageClass" [attr.title]="tooltipMessage" (click)="onImageClick($event)"></i>
        </ng-container>

        <ng-container *ngIf=" title ">
            <span class="amexio-image-title">{{title}}</span>
        </ng-container>
    `,
    styles:[
            `
            .amexio-image-title{
                font-size: medium;
            }
        `
    ]
})

export class ImageComponent implements OnInit {

    @Input() tooltipMessage:string;

    @Input() title:string;

    @Input() imagePath:string;

    @Input() imageClass:string;

    @Input() cClass:string;

    @Input() mdbClass:string;

    @Output() onClick:EventEmitter<any>=new EventEmitter<any>();

    constructor() {

    }

    onImageClick(event:any){
        this.onClick.emit(event);
    }
    ngOnInit(): void {
    }

}
