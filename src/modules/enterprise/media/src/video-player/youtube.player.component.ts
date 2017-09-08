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
declare var $;
@Component({
    selector: 'amexio-ee-youtube-player',
    template: `
        <div >
      <span  class="close-button">
        <i class="fa fa-times fa-lg" (click)="routeBackToApp()" aria-hidden="true"></i>
      </span>
            <div class="text-center">
                <iframe  [height]="height" width="98%"
                         style="position: absolute; top: 0; right: 0; bottom: 0; left: 0;padding-top: 30px;padding-left: 30px"
                         [src]="url" frameborder="0"
                         allowfullscreen>
                </iframe>
            </div>
        </div>
    `,
    styles:[`
        .close-button{
            cursor: pointer;
            padding-left: 98%;color:gray;background: radial-gradient(ellipse at top right,rgba(0,0,0,.4) 0,rgba(0,0,0,0)70%,rgba(0,0,0,0) 100%);
        }
    `]
})

export class AmexioYoutubePlayerComponent implements OnInit {

    name: string;

    @Input()  url: string;

    @Input()  height: any;

    @Output() onCloseVideoPlayer: EventEmitter<any>= new EventEmitter<any>();

    constructor() {

    }

    ngOnInit() {
        if (this.height == null || this.height === 'undefined') {
            this.height = '98%' ;
        }
    }

    routeBackToApp() {
        this.onCloseVideoPlayer.emit(this.url);
    }
}
