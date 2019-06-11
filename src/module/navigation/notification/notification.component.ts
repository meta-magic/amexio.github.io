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
* Created by ketangote on 12/18/17.
*/

import {
  AfterContentInit, ChangeDetectorRef, Component, ContentChild, EventEmitter, HostListener, Input, OnInit, Output,
  TemplateRef,
} from '@angular/core';

export enum KEY_CODE_notify {
  esc = 27,
}

@Component({
  selector: 'amexio-notification', templateUrl: './notification.component.html',
})
export class AmexioNotificationComponent implements OnInit {

  /*
 Properties
 name : data
 datatype : any
 version : 4.2 onwards
 default : none
 description :  what you want to display on notification window by using data.
 */
  @Input('data') messageData: any[] = [];
  /*
Properties
name : icon
datatype : any
version : 5.3.1 onwards
default : none
description : icon to the notification .
*/
  @Input('icon') icon: any;
  /*
Properties
name : closable
datatype : boolean
version : 4.0 onwards
default : false
description : User can close the window.
*/
  @Input() closable = true;

  /*
Properties
name : vertical-position
datatype : string
version : 4.2 onwards
default : none
description : Position of notification window vertically:
 top or bottom or center. This attribute is ignored if user specify
  position explicitly (using position-top/position-bottom/position-center/position-right/position-left)
*/

  @Input('vertical-position') verticalposition: string;
  /*
  Properties
  name : horizontal-position
  datatype : string
  version : 4.2 onwards
  default : none
  description : Position of notification Window horizontally:
  left or right or center. This attribute is ignored if user specify
   position explicitly (using position-top/position-bottom/position-center/position-left/position-right)
  */

  @Input('horizontal-position') horizontalposition: string;

  /*
   Properties
   name : auto-dismiss-msg
   datatype : boolean
   version : 4.2 onwards
   default : none
   description :notification message will dismiss automatically.
   */
  @Input('auto-dismiss-msg') autodismissmsg: boolean;
  /*
    Properties
    name : auto-dismiss-msg-interval
    datatype : number
    version : 4.2 onwards
    default : none
    description :notification message will dismiss after some user define interval.
    */
  @Input('auto-dismiss-msg-interval') autodismissmsginterval: number;
  /*
    Properties
    name : close-on-escape
    datatype : boolean
    version : 4.2 onwards
    default : none
    description : close the notification window on click on ESC button.
    */
  @Input('close-on-escape') closeonescape: boolean;
  /*
    Properties
    name : background-color
    datatype : string
    version : 4.2 onwards
    default : none
    description : background color to the notification window .
    */
  @Input('background-color') backgroundColor: string;
  /*
    Properties
    name : foreground-color
    datatype : string
    version : 4.2 onwards
    default : none
    description : foreground color to the notification window text .
    */
  @Input('foreground-color') foregroundColor: string;

  data: any[];

  positionclass: string;

  customClass: boolean;
  componentID: any;

  private notificationVertialCss = 'notification-vertical-';

  private notificationHorizontalCss = ' notification-horizontal-';

  @ContentChild('amexioNotificationTemp') notificationTemplate: TemplateRef<any>;

  // Escape Key Functionality
  @HostListener('window:keyup.esc', ['$event']) keyEvent(event: KeyboardEvent) {
    if (this.closeonescape === true) {
      this.messageData.length = 0;
    }
  }
  constructor(private ref: ChangeDetectorRef) {
  }
  ngOnInit() {
    this.componentID = Math.floor(Math.random() * 1000 + 999);
    if (this.autodismissmsg) {
      if (!this.autodismissmsginterval) {
        this.autodismissmsginterval = 1500;
      }
      if (this.messageData !== null) {
        setInterval(() => {
          if (this.messageData.length > 0) {
            this.messageData.shift();
            this.ref.markForCheck();
          }
        }, this.autodismissmsginterval);
      }
    }
    if (this.verticalposition === null) {
      this.verticalposition = 'top';
    } else if (this.horizontalposition === null) {
      this.horizontalposition = 'right';
    }
    this.positionclass = this.notificationVertialCss + this.verticalposition + this.notificationHorizontalCss + this.horizontalposition;
  }
  closeNotification(msg: any) {
    const count = this.messageData.length;
    for (let i = 0; i < count; i++) {
      if (this.messageData[i] === msg) {
        this.messageData.splice(msg, 1);
      }
    }
  }
}
