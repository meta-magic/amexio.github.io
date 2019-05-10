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
* Created by dattaram on 23/1/18.
*/
// Dialogue
import { animate, state, style, transition, trigger } from '@angular/animations';
import {
  AfterContentInit, Component, ContentChildren, EventEmitter, HostListener, Input,
  OnChanges, OnDestroy, OnInit, Output, QueryList, Renderer2,
  SimpleChanges,
} from '@angular/core';

import { AmexioFooterComponent } from '../action/pane.action.footer';
@Component({
  selector: 'amexio-dialogue',
  templateUrl: './dialogue.pane.component.html',
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
export class AmexiodialoguePaneComponent implements AfterContentInit, OnChanges, OnInit, OnDestroy {

  /*
   Properties
   name : close-on-escape
   datatype : string
   version : 4.2onwards
   default : false
   description : Enables And Disables the Escape button.
   */
  @Input('close-on-escape') closeonescape: boolean;

  /*
   Properties
   name : button-type
   datatype : string
   version : 4.2onwards
   default : theme-color
   description : show the type of button.
   */
  @Input('button-type') buttontype: string;

  /*
   Properties
   name : button-size
   datatype :  string
   version : 4.2 onwards
   default :
   description : Different Sizes of Buttons availabe : large, default, small & xsmall
   */
  @Input('button-size') buttonsize: string = 'large' || 'small' || 'default' || 'xsmall';

  /*
   Properties
   name : footer-align
   datatype : string
   version : 4.0 onwards
   default : right
   description : Alignment of footer contents to right or left.
   */
  @Input('footer-align') footeralign: string;

  /*
   Properties
   name : content-align
   datatype : string
   version : 4.0 onwards
   default : center
   description : Alignment of  contents to right or left or center.
   */
  @Input('content-align') contentalign: string;

  /*
   Properties
   name : show-dialogue
   datatype :  boolean
   version : 4.0 onwards
   default : false
   description : 	Show / Hide Dialogue..
   */
  @Input('show-dialogue') showdialogue: boolean;

  @Input() show: boolean;

  @Output() showChange: EventEmitter<any> = new EventEmitter<any>();

  /*
   Properties
   name : closable
   datatype :  boolean
   version : 4.0 onwards
   default : false
   description : User can close the Dialogue.
   */
  @Input() closable: boolean;

  /*
   Properties
   name : title
   datatype :  string
   version : 4.0 onwards
   default :
   description : Title for dialog.
   */
  @Input() title: string;

  /*
   Properties
   name :  message
   datatype :  string
   version : 4.0 onwards
   default :
   description : Alert or confirm message
   */
  @Input() message: string;

  /*
   Properties
   name :  custom
   datatype :  boolean
   version : 4.0 onwards
   default : false
   description : User can custom dialogue box.
   */
  @Input() custom: boolean;

  /*
   Properties
   name :  type
   datatype :  'confirm'| 'alert'
   version : 4.0 onwards
   default : confirm
   description : Mode to open, alert or dialogue mode.
   */
  @Input() type: 'confirm' | 'alert';

  /*
   Properties
   name : primary-action-label
   datatype :  'string
   version : 4.0 onwards
   default :
   description : Label to be displayed for primary action.
   */
  @Input('primary-action-label') primaryactionlabel: string;

  /*
   Properties
   name : secondary-action-label
   datatype :  string
   version : 4.0 onwards
   default :
   description : Label to be displayed for secondary action.
   */
  @Input('secondary-action-label') secondaryactionlabel: string;

  /*
   Properties
   name : message-type
   datatype :  string
   version : 4.0 onwards
   default :
   description : Type of message like error,warning,help.
   */
  @Input('message-type') messagetype: string;

  @Input('material-design') materialDesign: boolean;

  /*
   Events
   name : actionStatus
   datatype :  none
   version : none
   default : none
   description : Fire when click on yes or no button
   */
  @Output() actionStatus: EventEmitter<any> = new EventEmitter<any>();

  /*
   Events
   name : onSuccess
   datatype :  none
   version : none
   default : none
   description : Fire when click on yes or no button
   */
  @Output() onSuccess: EventEmitter<any> = new EventEmitter<any>();

  /*
   Events
   name : onFailure
   datatype :  none
   version : none
   default : none
   description : Fire when click on yes or no button
   */
  @Output() onCancel: EventEmitter<any> = new EventEmitter<any>();

  /*
   Events
   name : close
   datatype :  none
   version : none
   default : none
   description : Fire when user close dialogue
   */
  @Output() close: EventEmitter<any> = new EventEmitter<any>();

  @ContentChildren(AmexioFooterComponent) amexioFooter: QueryList<AmexioFooterComponent>;

  themeCss: any;

  amexioComponentId = 'amexio-dialogue';

  value = 0;
  defaultStyle: string;
  componentId: string;
  globalListenFunc: () => void;

  constructor(private renderer: Renderer2) {
    this.closable = true;
    this.secondaryactionlabel = 'Cancel';
    this.primaryactionlabel = 'Ok';
    this.custom = false;
    this.buttonsize = 'default';
    this.buttontype = 'theme-color';
    this.closeonescape = true;
  }

  ngOnInit() {

    if (this.showdialogue) {
      this.show = this.showdialogue;
    }
    if (this.footeralign == null) {
      this.footeralign = 'right';
    }
    if (this.contentalign == null || this.contentalign === '') {
      this.contentalign = 'center';
    }
    if (this.type == null) {
      this.type = 'confirm';
    }
    this.defaultStyle = this.getDefaultStyle();
    this.buttontype = this.getStyle();
    this.componentId = this.createCompId('dialog', this.type);
  }

  ngAfterContentInit(): void {
    if (this.amexioFooter) {
      this.amexioFooter.toArray().forEach((footer: any) => {
        footer.footer = true;
      });
    }
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['show']) {
      this.show = changes.show.currentValue;
      this.escapeMethod();
    } else if (changes['showdialogue']) {
      this.show = changes.showdialogue.currentValue;
      this.escapeMethod();
    }
  }

  // Method called on escape
  escapeMethod() {
    if (this.show && this.closeonescape) {
      this.globalListenFunc = this.renderer.listen('document', 'keyup.esc', (e: any) => {
        this.showdialogue = false;
        this.show = false;
        this.showChange.emit(false);
      });
    } else if (this.globalListenFunc) {
      this.globalListenFunc();
    }
  }
  onCloseClick() {
    if (this.closable) {
      this.showdialogue = false;
      this.show = false;
      this.showChange.emit(false);
      this.close.emit(false);
    }
  }
  getStatus(v: any) {
    this.onCloseClick();
    this.actionStatus.emit(v);
    if (v === 'ok') {
      this.onSuccess.emit(v);
    } else {
      this.onCancel.emit(v);
    }
  }

  getDefaultStyle() {
    if (this.materialDesign) {
      return 'transparent';
    } else {
      return 'defualt';
    }
  }

  getStyle() {
    if (this.materialDesign) {
      this.buttontype = 'transparent';
      return this.buttontype;
    } else {
      return this.buttontype;
    }
  }

  ngOnDestroy(): void {
    if (this.globalListenFunc) {
      this.globalListenFunc();
    }
  }
  createCompId(inputType: any, name: any) {
    return inputType + '_' + name + '_' + Math.floor(Math.random() * 1000 + 999);
  }

  // Theme Apply
  setColorPalette(themeClass: any) {
    this.themeCss = themeClass;
  }
}
