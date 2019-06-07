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
 * Created by Ashwini Agre on 06/03/19.
 */

import { animate, state, style, transition, trigger } from '@angular/animations';
import {
  AfterContentInit, AfterViewInit, Component, ContentChildren, ElementRef, EventEmitter, HostListener, Input, OnChanges, OnDestroy,
  OnInit, Output, QueryList, Renderer2, SimpleChanges, ViewChild,
} from '@angular/core';
import { LifeCycleBaseComponent } from '../../base/lifecycle.base.component';
import { AmexioCardCEActionComponent } from '../common/amexio.action.component';
import { AmexioCardCEBodyComponent } from '../common/amexio.body.component';
import { AmexioCardCEHeaderComponent } from '../common/amexio.header.component';
@Component({
  selector: 'amexio-window-ce',
  templateUrl: './amexio.window.component.html',
  animations: [
    trigger('animation', [
      state('void', style({
        transform: 'translate3d(0, 25%, 0) scale(0.9)',
        opacity: 0,
      })),
      state('visible', style({
        transform: 'none',
        opacity: 1,
      })),
      transition('* => *', animate('400ms cubic-bezier(0.25, 0.8, 0.25, 1)')),
    ]),
  ],
})
export class AmexioWindowCEComponent extends LifeCycleBaseComponent implements OnChanges,
  OnInit, OnDestroy, AfterContentInit, AfterViewInit {

  @Input('bg-image') bgimage: string;

  @Input('color') color: string;

  @Input('background') background: string;

  @Input('height') height: any;

  @Input('align') align: string;

  cclass: string;

  @Input('vertical-position') verticalposition = 'center';

  @Input('horizontal-position') horizontalposition: string;

  @Input('close-on-escape') closeonescape = true;

  @Input('position-top') top: string;

  @Input('show-window') showWindow: boolean;

  @Input() show: boolean;

  @Output() showChange: EventEmitter<any> = new EventEmitter<any>();

  isFullWindow: boolean;

  @Input() maximize = false;

  @Input() closable = true;

  private window = ' window-';

  @Input('width') width: any = '90%';

  amexioComponentId = 'amexio-window';

  @ContentChildren(AmexioCardCEHeaderComponent) amexioHeader: QueryList<AmexioCardCEHeaderComponent>;
  amexioCardHeaderList: AmexioCardCEHeaderComponent[];

  @ContentChildren(AmexioCardCEActionComponent) amexioFooter: QueryList<AmexioCardCEActionComponent>;
  amexioCardActionList: AmexioCardCEActionComponent[];

  @ContentChildren(AmexioCardCEBodyComponent) amexioBody: QueryList<AmexioCardCEBodyComponent>;
  amexioCardBodyList: AmexioCardCEBodyComponent[];

  @Output() close: EventEmitter<any> = new EventEmitter<any>();

  @Input() draggable: boolean;

  @Input() resizable: boolean;

  @Input('remember-window-position') windowposition: boolean;
  maximumWindowStyle: any;

  dummyWidth: string;

  windowFlag = true;

  x: number;

  y: number;

  px: number;

  py: number;

  minArea: number;

  draggingWindow: boolean;

  globalListenFunc: () => void;
  globalClickListenFunc: () => void;
  globalDragListenFunc: () => void;

  constructor(private renderer: Renderer2) {
    super();
    this.x = 0;
    this.y = 0;
    this.px = 0;
    this.py = 0;
    this.draggingWindow = false;
    this.minArea = 20000;
  }
  onCloseClick() {
    if (this.closable) {
      this.showWindow = false;
      this.show = false;
      this.showChange.emit(false);
      this.close.emit(this.showWindow);
      if (this.windowposition) {
        this.x = 0;
        this.y = 0;
      }
    }
  }
  ngOnInit() {
    if (!this.color) {
      this.cclass = 'card-container-ce-color';
    }
    if (!this.background) {
      this.cclass = this.cclass + ' card-container-ce-bg-color';
    }
    this.setVerticlePosition();
    this.setHorizontalPosition();
    if (this.maximize) {
      this.dummyWidth = this.width;
      this.isFullWindow = true;
      this.maximumWindowStyle = this.setMaximizeClass(this.isFullWindow);
    }
    if (this.showWindow) {
      this.show = this.showWindow;
    }
    this.globalDragListenFunc = this.renderer.listen('document', 'mouseup', (e: any) => {
      this.draggingWindow = false;
    });
    super.ngOnInit();

  }
  onWindowPress(event: MouseEvent) {
    if (this.draggable) {
      this.draggingWindow = true;
      this.px = event.clientX;
      this.py = event.clientY;
    }
  }

  onWindowDrag(event: MouseEvent) {
    if (this.draggable) {
      if (!this.draggingWindow) {
        return;
      }
      const offsetX = event.clientX - this.px;
      const offsetY = event.clientY - this.py;

      this.x += offsetX;
      this.y += offsetY;
      this.px = event.clientX;
      this.py = event.clientY;
    }
  }
  setMaximizeClass(isFullWindow: boolean) {
    this.isFullWindow = isFullWindow;
    if (isFullWindow) {
      this.width = '100%';
      return {
        'margin-top': '0', 'height': '100%',
      };
    } else {
      this.width = this.dummyWidth;
      return {
        'margin-top': '1%', 'height': '96%',
      };
    }
  }

  setVerticlePosition() {
    switch (this.verticalposition) {
      case 'top': {
        this.verticalposition = 'flex-start';
        break;
      }
      case 'center': {
        this.verticalposition = 'center';
        break;
      }
      case 'bottom': {
        this.verticalposition = 'flex-end';
        break;
      }
      default: {
        this.verticalposition = 'center';
        break;
      }
    }
  }

  setHorizontalPosition() {
    switch (this.horizontalposition) {
      case 'left': {
        this.horizontalposition = 'flex-start';
        break;
      }
      case 'center': {
        this.horizontalposition = 'center';
        break;
      }
      case 'right': {
        this.horizontalposition = 'flex-end';
        break;
      }
      default: {
        this.horizontalposition = 'center';
        break;
      }
    }
  }

  /* ASSIGN PROPERTIES TO FOOTER AND HEADER*/

  ngAfterContentInit(): void {
    if (this.amexioHeader && this.amexioHeader.toArray().length > 0) {
      setTimeout(() => {
        this.amexioHeader.toArray()[0].amexioComponentId = this.amexioComponentId;
        this.amexioHeader.toArray()[0].closeable = this.closable;
        this.amexioHeader.toArray()[0].windowFlag = true;
      }, 3000);

      if (this.maximize) {
        this.amexioHeader.toArray()[0].setMaximizeData(this.maximize, this.isFullWindow);
        this.amexioHeader.toArray()[0].maximizeBehaiour.subscribe((max: any) => {
          this.maximumWindowStyle = this.setMaximizeClass(max);
        });
      }
      this.amexioHeader.toArray()[0].closeableBehaiour.subscribe((close: any) => {
        this.onCloseClick();
      });
    }
    this.setCardAligementForAllInnerComponent();

  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['show']) {
      this.setShowFlag(changes.show.currentValue);
    }
    if (changes['showWindow']) {
      this.setShowFlag(changes.showWindow.currentValue);
    }
  }
  setShowFlag(changedValue: any) {
    this.show = changedValue;
    if (this.closeonescape) {
      this.globalListenFunc = this.renderer.listen('document', 'keyup.esc', (e: any) => {
        this.showWindow = false;
        this.show = false;
        this.showChange.emit(false);
        this.close.emit(this.showWindow);
      });
    } else if (this.globalListenFunc) {
      this.globalListenFunc();
    }
  }

  getListPosition(elementRef: any): boolean {
    const height = 240;
    if ((window.screen.height - elementRef.getBoundingClientRect().bottom) < height) {
      return true;
    } else {
      return false;
    }
  }

  ngAfterViewInit() {
    super.ngAfterViewInit();
  }

  // TO SET ALIGN TO ALL INNER COMPONENT IN CARD
  setCardAligementForAllInnerComponent() {
    this.amexioCardHeaderList = this.amexioHeader.toArray();
    if (this.amexioCardHeaderList[0] !== undefined && !this.amexioCardHeaderList[0].align &&
      this.amexioCardHeaderList[0].align.length > 0) {
      this.amexioCardHeaderList[0].align = this.align;
    }

    this.amexioCardBodyList = this.amexioBody.toArray();
    if (this.amexioCardBodyList[0] !== undefined && !this.amexioCardBodyList[0].align && this.amexioCardBodyList[0].align.length > 0) {
      this.amexioCardBodyList[0].align = this.align;
    }

    this.amexioCardActionList = this.amexioFooter.toArray();
    if (this.amexioCardActionList[0] !== undefined && !this.amexioCardActionList[0].align &&
      this.amexioCardActionList[0].align.length > 0) {
      this.amexioCardActionList[0].align = this.align;
    } else if (this.amexioCardActionList[0] !== undefined &&
      this.amexioCardActionList[0].align === '') {
      this.amexioCardActionList[0].align = 'end';
    }

  }
  ngOnDestroy() {
    super.ngOnDestroy();
    if (this.globalDragListenFunc) {
      this.globalDragListenFunc();
    }
  }
}
