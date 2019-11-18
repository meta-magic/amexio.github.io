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
import {
  AfterViewInit, Component, ElementRef, EventEmitter, HostBinding, Inject,
  Input, OnInit, Output, ViewChild,
} from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Component({
  selector: 'amexio-header', template: `
  <span style=" flex: auto;"   #contentWrapper>
  <ng-content ></ng-content>
  </span>
  <span>
  <em  *ngIf="minimize" class="fa fa-window-minimize" (click)="onMinimizeClick($event)"
  style = "cursor: pointer"></em>

  <amexio-c-icon style = "padding-left: 10px" class="cursor-style" *ngIf="(isFullWindow && maximize )"
  [key]="'window_maximize'" (onClick)="sizeChange($event)"></amexio-c-icon>
  <amexio-c-icon style = "padding-left: 10px" class="cursor-style"
  *ngIf="(!isFullWindow && maximize )"
  [key]="'window_restore'" (click)="sizeChange($event)"></amexio-c-icon>

  <amexio-c-icon style = "padding-left: 10px" class="cursor-style" *ngIf="(fullScreenFlag && fullscreenMaxCard)"
  [key]="'full-screen-max-icon'" (onClick)="maxScreenChangeCard($event)"></amexio-c-icon>
  <amexio-c-icon style = "padding-left: 10px" class="cursor-style"
  *ngIf="(fullScreenFlag && !fullscreenMaxCard)"
  [key]="'full-screen-min-icon'" (click)="minScreenChangeCard($event)"></amexio-c-icon>

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

  @ViewChild('contentWrapper', /* TODO: add static flag */ { static: true}) content: ElementRef;

  @HostBinding('style.color') color = '';
  @Input() padding: string;

  @Output() minimizeWindow: any = new EventEmitter<any>();

  @Output() closeDataEmit: any = new EventEmitter<any>();

  @Output() maximizeWindow: any = new EventEmitter<any>();
  @Output() maximizeWindow1: any = new EventEmitter<any>();
  @Output() minimizeWindow1: any = new EventEmitter<any>();
  @Input('minimized-icon') minimizeIcon: any;

  minimize = false;

  closeable = false;

  maximize = false;

  isFullWindow = false;

  fullScreenFlag: boolean;

  fullscreenMaxCard: boolean;

  closeableBehaiour = new BehaviorSubject(false);

  maximizeBehaiour = new BehaviorSubject(null);
  aComponent: string;
  aComponent1: string;
  textName: any;
  elem: any;
  constructor( @Inject(DOCUMENT) public document: any) {

  }

  ngOnInit() {
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

  setMaximizeData(maximize: boolean, isFullWindow: boolean, event: any) {
    this.maximize = maximize;
    this.isFullWindow = isFullWindow;
    this.maximizeBehaiour.next({isFullWindow: this.isFullWindow, event1: event});
  }

  setMaterialDesignStatus(materialDesign: boolean) {
    if (materialDesign) {
      this.background = 'white';
      this.color = 'black';
    }
  }

  sizeChange(event: any) {
    this.isFullWindow = !this.isFullWindow;
    this.maximizeBehaiour.next({isFullWindow: this.isFullWindow, event1: event});
  }

  onCloseClick() {
    this.isFullWindow = true;
    this.closeableBehaiour.next(false);
    this.closeDataEmit.emit(this);
  }

  onMinimizeClick() {
    this.closeableBehaiour.next(false);
    this.minimizeWindow.emit(this);
  }

  maxScreenChangeCard(event: any) {
    this.maximizeWindow1.emit({ tempEvent: event, tempThis: this });
  }

  minScreenChangeCard(event: any) {
    this.minimizeWindow1.emit({ tempEvent: event, tempThis: this });
  }
}
