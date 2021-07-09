import { Component, EventEmitter, Input, OnInit, Output, ViewChild, ViewContainerRef } from '@angular/core';

@Component({
  selector: 'amexio-tab', templateUrl: './tab.pill.component.html',
})
export class AmexioTabPillComponent implements OnInit {

  /*
Properties
name : title
datatype : string
version : 4.0 onwards
default :
description : Title on Tab Button/Pill.
*/
  @Input() title: string;
  @Input() amexiotabtitle: string;
  /*
Properties
name : disabled
datatype : boolean
version : 4.1.4 onwards
default : false
description : Disable property for tab
*/
  @Input() disabled = false;

  /*
Properties
name : active
datatype : boolean
version : 4.0 onwards
default : false
description : Set true for specific tab open as default tab..
*/
  @Input() active = false;

  /*
Properties
name : icon
datatype : string
version : 4.0 onwards
default :
description : Supports glyphicon only. Can add directly home instead of 'glyphicon glyphicon-home.
*/
  @Input() icon: string;

  /*
Properties
name : amexio-color
datatype : string
version : 4.1.9 onwards
default : black
description : Font color of label
*/
  @Input('amexio-color') amexiocolor: string;

  /*
 Properties
 name : closable
 datatype : boolean
 version : 4.2 onwards
 default : false
 description : Font color of label
 */
  @Input() closable: boolean = null;

  @Input('height') height: any;

  tabId: any;

  tablk: any;

  @ViewChild('target', { read: ViewContainerRef }) public target: any;

  constructor() {
    this.tabId = Math.floor(window.crypto.getRandomValues(new Uint32Array(1))[0]);
  }

  ngOnInit() {
  }
}
