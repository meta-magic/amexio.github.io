import { Component, ContentChildren, EventEmitter, Input, OnInit, Output, QueryList, ViewChild } from '@angular/core';

@Component({
  selector: 'amexio-timeline-event',
  template: `<div [ngClass]="{'content-border' : contentborder == true, 'content-border2' : contentborder == false }">
               <ng-content></ng-content>
             </div>`,
})
export class AmexiotimelineeventComponent {
    /*
Properties
name : active
datatype : boolean
version : 5.2 onwards
default : false
description : The current active step.
*/
@Input() active: boolean;

  /*
Properties
name :label
datatype :string
version : 4.2onwards
default :
description : This will specify the label in timeline.
*/
@Input('label') label: string;
  /*
Properties
name :icon
datatype :string
version : 4.2onwards
default :
description : This will specify the label in timeline.
*/
@Input('icon') icon: string;
/*
Properties
name :contentborder
datatype :string
version : 4.2onwards
default : false
description : This will specify the content border in timeline.
*/
@Input('content-border') contentborder = false;
  constructor() { }
}
