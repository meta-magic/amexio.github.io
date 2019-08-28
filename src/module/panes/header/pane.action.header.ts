/*
 * Copyright [2019] [Metamagic]
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *
 * Created by kedar on 8/8/19.
 */
import { DOCUMENT } from '@angular/common';
import { AfterViewInit, Component, ElementRef, EventEmitter, HostBinding, Inject,
Input, OnInit, Output, ViewChild } from '@angular/core';
import { BehaviorSubject } from 'rxjs/index';

@Component({
  selector: 'amexio-header', template: `
  <span style=" flex: auto;"   #contentWrapper>
  <ng-content ></ng-content>
  </span>
  <span>
  <em  *ngIf="minimize" class="fa fa-window-minimize" (click)="onMinimizeClick($event)"
  style = "cursor: pointer"></em>

  <amexio-c-icon style = "padding-left: 10px" class="cursor-style" *ngIf="(isFullWindow && maximize )"
  [key]="'window_maximize'" (onClick)="sizeChange()"></amexio-c-icon>
  <amexio-c-icon style = "padding-left: 10px" class="cursor-style"
  *ngIf="(!isFullWindow && maximize )"
  [key]="'window_restore'" (click)="sizeChange()"></amexio-c-icon>

  <amexio-c-icon style = "padding-left: 10px" class="cursor-style" *ngIf="(fullScreenFlag && fullscreenMax)"
  [key]="'full-screen-max-icon'" (onClick)="maxScreenChange($event)"></amexio-c-icon>
  <amexio-c-icon style = "padding-left: 10px" class="cursor-style"
  *ngIf="(fullScreenFlag && !fullscreenMax)"
  [key]="'full-screen-min-icon'" (click)="minScreenChange($event)"></amexio-c-icon>

  <amexio-c-icon class="cursor-style"
  style = "padding-left: 10px"
  *ngIf="closeable" [key]="'window_close'" (onClick)="onCloseClick()">
  </amexio-c-icon>

  </span>
  `,
  styles: [
    `
  .cursor-style {
  cursor:pointer;
  }
  `,
  ],
})

export class AmexioHeaderComponent implements OnInit, AfterViewInit {

  @HostBinding('class.modal-card-header') get c1() { return this.aComponent; }
  @HostBinding('class.modal-window-header') get c2() { return this.aComponent1; }

  @HostBinding('style.justify-content') jstyfy = 'space-between';

  @HostBinding('style.background') background = '';

  @ViewChild('contentWrapper') content: ElementRef;

  @HostBinding('style.color') color = '';
  @Input() padding: string;

  @Output() minimizeWindow: any = new EventEmitter<any>();

  @Output() closeDataEmit: any = new EventEmitter<any>();

  @Output() maximizeWindow: any = new EventEmitter<any>();

  @Input('minimized-icon') minimizeIcon: any;

  minimize = false;

  closeable = false;

  maximize = false;

  isFullWindow = false;

  fullScreenFlag: boolean;

  fullscreenMax: boolean;

  closeableBehaiour = new BehaviorSubject(false);

  maximizeBehaiour = new BehaviorSubject(false);
  desktopFlag: boolean;
  aComponent: string;
  aComponent1: string;
  textName: any;
  elem: any;
  constructor(@Inject(DOCUMENT) public document: any) {

  }

  ngOnInit() {
    this.elem = document.documentElement;
    document.addEventListener('webkitfullscreenchange', this.exitHandler.bind(this), false);
    document.addEventListener('mozfullscreenchange', this.exitHandler.bind(this), false);
    document.addEventListener('fullscreenexit', this.exitHandler.bind(this), false);
    document.addEventListener('MSFullscreenChange', this.exitHandler.bind(this), false);
  }
  ngAfterViewInit() {
    this.textName = this.content.nativeElement.textContent;
    if (this.textName && this.minimizeIcon) {
      return this.textName;
    }
    if (this.textName && !this.minimizeIcon) {
      return this.textName;
    } else if (!this.textName && this.minimizeIcon) {
      return this.minimizeIcon;
    } else if (!this.minimizeIcon && !this.textName) {
      this.textName = [];
      this.minimizeIcon = 'fa fa-file';
    }
  }

  setMaximizeData(maximize: boolean, isFullWindow: boolean) {
    this.maximize = maximize;
    this.isFullWindow = isFullWindow;
    this.maximizeBehaiour.next(this.isFullWindow);
  }

  setMaterialDesignStatus(materialDesign: boolean) {
    if (materialDesign) {
      this.background = 'white';
      this.color = 'black';
    }
  }

  sizeChange() {
    this.isFullWindow = !this.isFullWindow;
    this.maximizeBehaiour.next(this.isFullWindow);
  }

  onCloseClick() {
    this.closeableBehaiour.next(false);
    this.closeDataEmit.emit(this);
  }

  onMinimizeClick() {
    this.closeableBehaiour.next(false);
    this.minimizeWindow.emit(this);
  }

  maxScreenChange(event: any) {
    event.stopPropagation();
    this.fullscreenMax = !this.fullscreenMax;
    this.maximizeBehaiour.next(this.fullscreenMax);
    this.maximizeWindow.emit(this, this.fullscreenMax);
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
  }

  minScreenChange(event: any) {
    this.fullscreenMax = false;
    this.maximizeBehaiour.next(this.fullscreenMax);
    this.maximizeWindow.emit(this, this.fullscreenMax);
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
  }
  exitHandler() {
    if (!document.webkitIsFullScreen) {
     this.fullscreenMax = true;
     this.maximizeBehaiour.next(this.fullscreenMax);
     this.maximizeWindow.emit(this, this.fullscreenMax);
    }
  }
}
