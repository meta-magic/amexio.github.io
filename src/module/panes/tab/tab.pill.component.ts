/**
 * Created by pratik on 8/12/17.
 */

/*
Component Name : Amexio Tab
Component Selector : <amexio-tab>
Component Description: Tab component for Angular Apps with multiple configurations
such as Tab, Icon support

*/
import { Component, EventEmitter, Input, OnInit, Output, ViewChild, ViewContainerRef} from '@angular/core';

@Component({
  selector: 'amexio-tab', templateUrl: './tab.pill.component.html',
})
export class AmexioTabPill implements OnInit {

  /*
Properties
name : title
datatype : string
version : 4.0 onwards
default :
description : Title on Tab Button/Pill.
*/
  @Input() title: string;

  /*
Properties
name : disabled
datatype : boolean
version : 4.1.4 onwards
default : false
description : Disable property for tab
*/
  @Input() disabled: boolean = false;

  /*
Properties
name : active
datatype : boolean
version : 4.0 onwards
default : false
description : Set true for specific tab open as default tab..
*/
  @Input() active: boolean = false;

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
@Input('amexio-color')  amexiocolor: string;

 /*
Properties
name : closable
datatype : boolean
version : 4.2 onwards
default : false
description : Font color of label
*/
@Input() closable: boolean = null;

  tabId: number;
  @ViewChild('target', { read: ViewContainerRef }) public target: any;

  @ViewChild('tabpill', { read: ViewContainerRef }) public tabpill: any;

  constructor() {
    this.tabId = Math.floor(Math.random() * 90000) + 10000;
  }

  ngOnInit() {
  }
  
  destroy(){
    
  }  
  
  
}
