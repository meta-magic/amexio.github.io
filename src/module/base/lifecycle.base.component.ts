/*
* Copyright [2019] [Metamagic]
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*     http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*
*Created by ashwini on 01/03/19.
*/
import { DOCUMENT } from '@angular/common';
import { AfterViewInit, Component, EventEmitter, Inject, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { BehaviorSubject } from 'rxjs/index';

// @Component({
//     selector: 'life-cycle',
//     template: './lifecycle.base.component.html',
// })
export class LifeCycleBaseComponent implements OnDestroy, OnInit, AfterViewInit {
    @Input('enable-lifecycle-events') enableLifeCycleEvents: string;
    @Output() initiated: any = new EventEmitter<any>();
    @Output() ready: any = new EventEmitter<any>();
    @Output() minimizeWindow2: any = new EventEmitter<any>();
    @Output() destroy: any = new EventEmitter<any>();
    yesFullScreen: boolean;
    roundedgeclass: string;
    fullscreenMax = false;
    desktopFlag: boolean;
    elem: any;
    instance: any;

    maximizeBehaiourCe1 = new BehaviorSubject(false);
    constructor( @Inject(DOCUMENT) public document?: any) {

    }
    ngOnInit() {
        this.elem = document.documentElement;
        document.addEventListener('webkitfullscreenchange', this.exitHandler.bind(this), false);
        document.addEventListener('mozfullscreenchange', this.exitHandler.bind(this), false);
        document.addEventListener('fullscreenexit', this.exitHandler.bind(this), false);
        document.addEventListener('MSFullscreenChange', this.exitHandler.bind(this), false);

        if (this.enableLifeCycleEvents === 'all' || this.enableLifeCycleEvents === 'init') {
            this.lifeCycleInit();
        }
    }

    ngAfterViewInit() {
        if (this.enableLifeCycleEvents === 'all' || this.enableLifeCycleEvents === 'ready') {
            this.lifeCycleAfterViewInit();
        }
    }
    ngOnDestroy() {
        if (this.enableLifeCycleEvents === 'all' || this.enableLifeCycleEvents === 'destroy') {
            this.lifeCycleDestroy();
        }
    }
    lifeCycleInit() {
        this.initiated.emit();
    }
    lifeCycleAfterViewInit() {
        this.ready.emit();
    }
    lifeCycleDestroy() {
        this.destroy.emit();
    }

    setRoundEdge(type: any) {
        if (type === 'round-edge') {
            this.roundedgeclass = 'roundEdgeCommonCss';
        } else if (type === 'classic') {
            this.roundedgeclass = 'classicCommonCss';
        }
    }

    setFullScreen(type: any) {
        this.yesFullScreen = true;
        if (type === 'browser') {
            this.desktopFlag = false;
        } else if (type === 'desktop') {
            this.desktopFlag = true;
        }
    }

    maxScreenChange(event: any) {
        event.stopPropagation();
        this.fullscreenMax = !this.fullscreenMax;
        if (this.elem.requestFullscreen && this.desktopFlag) {
            this.elem.requestFullscreen();
        } else if (this.elem.mozRequestFullScreen && this.desktopFlag) {
            /* Firefox */
            this.elem.mozRequestFullScreen();
        } else if (this.elem.webkitRequestFullscreen && this.desktopFlag) {
            /* Chrome, Safari and Opera */
            this.elem.webkitRequestFullscreen();
        } else if (this.elem.msRequestFullscreen && this.desktopFlag) {
            /* IE/Edge */
            this.elem.msRequestFullscreen();
        }
        return this.fullscreenMax;
    }

    minScreenChange(event: any) {
        event.stopPropagation();
        this.fullscreenMax = !this.fullscreenMax;

        if (this.document.exitFullscreen && this.desktopFlag) {
            this.document.exitFullscreen();
        } else if (this.document.mozCancelFullScreen && this.desktopFlag) {
            /* Firefox */
            this.document.mozCancelFullScreen();
        } else if (this.document.webkitExitFullscreen && this.desktopFlag) {
            /* Chrome, Safari and Opera */
            this.document.webkitExitFullscreen();
        } else if (this.document.msExitFullscreen && this.desktopFlag) {
            /* IE/Edge */
            this.document.msExitFullscreen();
        }
        return this.fullscreenMax;
    }

    exitHandler() {
        if (!document['webkitIsFullScreen']) {
            this.fullscreenMax = false;
            if (this.instance !== undefined &&
                (this.instance.amexioComponentId === 'amexio-card-ce' || this.instance.amexioComponentId === 'amexio-card'
                || this.instance.amexioComponentId === 'amexio-window')) {
                this.instance.maximizeflagchanged = false;
                if (this.instance.headerinst !== undefined) {
                    this.instance.headerinst.fullscreenMaxCard = true;
                }
            }
        }
    }
}
