import { Component, ContentChildren, EventEmitter, Input, OnInit, Output, QueryList, ViewChild } from '@angular/core';

@Component({
  selector: 'amexio-timeline-event',
  template: `<div class="timeline-event-contents">
              <div class="timeline-event-icon">
                  <amexio-pane-icon [customclass]="icon"></amexio-pane-icon>
              </div>
              <div [ngClass]="{'timeline-event-content': contentborder==true,'timeline-event-content2': contentborder==false}">
                  {{label}}
                   <br>
                 <ng-content></ng-content>
               </div>
            </div>`,
})
export class AmexiotimelineeventComponent {
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
