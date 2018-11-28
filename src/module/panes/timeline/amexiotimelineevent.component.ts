import { Component, ContentChildren, EventEmitter, HostBinding, Input, OnInit, Output, QueryList, ViewChild } from '@angular/core';

@Component({
  selector: 'amexio-timeline-event',
  template: `<div class="timeline-badge " [ngClass]="{'timeline-badge-center': (alignment === 'center')
  , 'timeline-badge-left': (alignment === 'right')
  , 'timeline-badge-right': (alignment === 'left')}">
<amexio-pane-icon [customclass]="icon"></amexio-pane-icon>
</div>
<div class="timeline-panel" [ngClass]="{'timeline-panel-border':contentborder,
 'timeline-panel-float-right': (contentalignment == 'right'),
 'timeline-panel-float-left': (contentalignment == 'left'),
 'timeline-panel-center': (alignment === 'center'),
 'timeline-panel-right': (alignment === 'right'),
 'timeline-panel-left': (alignment === 'left')}">
<div *ngIf="label"><b>{{label}}</b></div>
<ng-content></ng-content>
</div>`,
})
export class AmexiotimelineeventComponent {
  @HostBinding('attr.class') timelineclass = 'timeline-item';
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
  @Input('content-border') contentborder = true;

  @Input('content-alignment') contentalignment: string;

  alignment = 'center';

  constructor() {
  }

}
